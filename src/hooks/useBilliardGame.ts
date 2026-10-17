import { useState, useEffect, useCallback } from "react";
import { Player, ScoreHistoryEntry, GameSettings } from "@/types/billiard";

const STORAGE_KEY = "ban_den_billiard_state_v2";

const DEFAULT_PLAYERS: Player[] = [
  { id: "p1", name: "Cơ thủ Tuấn", score: 0, avatarColor: "#06b6d4", turnOrder: 1 },
  { id: "p2", name: "Cơ thủ Hùng", score: 0, avatarColor: "#f59e0b", turnOrder: 2 },
  { id: "p3", name: "Cơ thủ Nam", score: 0, avatarColor: "#10b981", turnOrder: 3 },
  { id: "p4", name: "Cơ thủ Cường", score: 0, avatarColor: "#8b5cf6", turnOrder: 4 },
];

const DEFAULT_SETTINGS: GameSettings = {
  pricePerPoint: 3000,
  tableName: "Bàn VIP 1 - Bắn Đền Hà Nội",
  unit: "đ",
};

export function useBilliardGame() {
  const [players, setPlayers] = useState<Player[]>(DEFAULT_PLAYERS);
  const [settings, setSettings] = useState<GameSettings>(DEFAULT_SETTINGS);
  const [history, setHistory] = useState<ScoreHistoryEntry[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Nạp từ LocalStorage khi khởi tạo
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.players && Array.isArray(parsed.players)) setPlayers(parsed.players);
        if (parsed.settings) setSettings(parsed.settings);
        if (parsed.history && Array.isArray(parsed.history)) setHistory(parsed.history);
      }
    } catch (e) {
      console.warn("Lỗi tải LocalStorage:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Tự động lưu mỗi khi có thay đổi
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ players, settings, history })
      );
    } catch (e) {
      console.error("Lỗi lưu LocalStorage:", e);
    }
  }, [players, settings, history, isLoaded]);

  // Thêm người chơi mới
  const addPlayer = useCallback((name: string) => {
    if (!name.trim()) return;
    const colors = ["#06b6d4", "#f59e0b", "#10b981", "#8b5cf6", "#ec4899", "#3b82f6", "#f97316"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const newPlayer: Player = {
      id: "p_" + Date.now(),
      name: name.trim(),
      score: 0,
      avatarColor: randomColor,
      turnOrder: players.length + 1,
    };
    setPlayers((prev) => [...prev, newPlayer]);
  }, [players.length]);

  // Bớt người chơi
  const removePlayer = useCallback((id: string) => {
    setPlayers((prev) => prev.filter((p) => p.id !== id));
  }, []);

  // Cộng / trừ điểm cho cơ thủ
  const modifyScore = useCallback((playerId: string, delta: number, note?: string) => {
    setPlayers((prev) => {
      const target = prev.find((p) => p.id === playerId);
      if (!target) return prev;

      const scoreBefore = target.score;
      const scoreAfter = scoreBefore + delta;

      const newEntry: ScoreHistoryEntry = {
        id: "hist_" + Date.now() + "_" + Math.random().toString(36).substring(2, 5),
        playerId,
        playerName: target.name,
        delta,
        scoreBefore,
        scoreAfter,
        timestamp: Date.now(),
        note: note || (delta > 0 ? `Ăn +${delta} điểm` : `Phạt ${delta} điểm`),
      };

      setHistory((h) => [newEntry, ...h.slice(0, 49)]);
      return prev.map((p) => (p.id === playerId ? { ...p, score: scoreAfter } : p));
    });
  }, []);

  // Hoàn tác (Undo) hành động gần nhất
  const undo = useCallback(() => {
    if (history.length === 0) return null;
    const [lastAction, ...remainingHistory] = history;

    setPlayers((prev) =>
      prev.map((p) =>
        p.id === lastAction.playerId
          ? { ...p, score: lastAction.scoreBefore }
          : p
      )
    );
    setHistory(remainingHistory);
    return lastAction;
  }, [history]);

  // Bốc thăm ngẫu nhiên thứ tự lượt đánh (1-Click)
  const randomizeTurnOrders = useCallback(() => {
    setPlayers((prev) => {
      const shuffled = [...prev].sort(() => Math.random() - 0.5);
      const idOrderMap = new Map(shuffled.map((p, idx) => [p.id, idx + 1]));
      return prev.map((p) => ({
        ...p,
        turnOrder: idOrderMap.get(p.id) || null,
      }));
    });
  }, []);

  // Thay đổi đơn giá tiền / điểm
  const setPricePerPoint = useCallback((price: number) => {
    setSettings((s) => ({ ...s, pricePerPoint: Math.max(0, price) }));
  }, []);

  // Đặt lại điểm số (giữ lại cơ thủ & thứ tự)
  const resetScores = useCallback(() => {
    setPlayers((prev) => prev.map((p) => ({ ...p, score: 0 })));
    setHistory([]);
  }, []);

  return {
    players,
    settings,
    history,
    isLoaded,
    addPlayer,
    removePlayer,
    modifyScore,
    undo,
    randomizeTurnOrders,
    setPricePerPoint,
    resetScores,
  };
}
