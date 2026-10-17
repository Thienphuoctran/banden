import React, { useState } from "react";
import { Player } from "@/types/billiard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, Edit3, Plus, Minus } from "lucide-react";

interface ScoreboardListProps {
  players: Player[];
  pricePerPoint: number;
  onModifyScore: (playerId: string, delta: number, note?: string) => void;
  onRemovePlayer: (playerId: string) => void;
}

export function ScoreboardList({
  players,
  pricePerPoint,
  onModifyScore,
  onRemovePlayer,
}: ScoreboardListProps) {
  const [customInputPlayerId, setCustomInputPlayerId] = useState<string | null>(null);
  const [customValue, setCustomValue] = useState<string>("");

  const handleCustomSubmit = (playerId: string, isAdd: boolean) => {
    const val = parseInt(customValue, 10);
    if (!isNaN(val) && val > 0) {
      onModifyScore(playerId, isAdd ? val : -val, `Nhập trực tiếp ${isAdd ? "+" : "-"}${val}`);
    }
    setCustomInputPlayerId(null);
    setCustomValue("");
  };

  if (players.length === 0) {
    return (
      <div className="p-8 text-center rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-400">
        <p className="text-sm">Chưa có cơ thủ nào trong bàn.</p>
        <p className="text-xs text-slate-500 mt-1">Bấm "+ Thêm cơ thủ" ở góc dưới để bắt đầu.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {players.map((player) => {
        const money = player.score * pricePerPoint;
        const isPositive = player.score > 0;
        const isNegative = player.score < 0;

        return (
          <Card
            key={player.id}
            className="border-slate-800/80 bg-slate-900/70 backdrop-blur-md overflow-hidden relative"
          >
            {/* Vạch màu định danh cơ thủ ở mép trái */}
            <div
              className="absolute left-0 top-0 bottom-0 w-1.5"
              style={{ backgroundColor: player.avatarColor }}
            />

            <CardContent className="p-4 pl-4.5">
              {/* Hàng trên: Thông tin cơ thủ & Tiền quy đổi */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-slate-950 shadow-sm"
                    style={{ backgroundColor: player.avatarColor }}
                  >
                    {player.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm md:text-base text-slate-100">
                        {player.name}
                      </span>
                      {player.turnOrder && (
                        <Badge variant="gold" className="text-[10px] py-0 px-1.5">
                          Lượt #{player.turnOrder}
                        </Badge>
                      )}
                    </div>
                    {/* Quy đổi tiền tức thời */}
                    <p
                      className={`text-xs font-bold font-mono ${
                        isPositive
                          ? "text-emerald-400"
                          : isNegative
                          ? "text-red-400"
                          : "text-slate-400"
                      }`}
                    >
                      {money > 0 ? "+" : ""}
                      {money.toLocaleString("vi-VN")}đ
                    </p>
                  </div>
                </div>

                {/* Điểm số lớn ở bên phải */}
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div
                      className={`text-3xl md:text-4xl font-black font-mono tracking-tight ${
                        isPositive
                          ? "text-emerald-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.4)]"
                          : isNegative
                          ? "text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.4)]"
                          : "text-slate-300"
                      }`}
                    >
                      {player.score > 0 ? `+${player.score}` : player.score}
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                      Điểm
                    </span>
                  </div>

                  {/* Nút xóa cơ thủ */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemovePlayer(player.id)}
                    className="h-8 w-8 p-0 text-slate-500 hover:text-red-400 hover:bg-red-500/10 ml-1"
                    title="Xóa cơ thủ khỏi bàn"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>

              {/* Hàng dưới: Hệ thống nút bấm 1 tay (One-Hand Touch Targets) */}
              <div className="grid grid-cols-6 gap-1.5 md:gap-2">
                {/* Trừ điểm */}
                <Button
                  variant="outline"
                  size="default"
                  onClick={() => onModifyScore(player.id, -5, "Phạt -5 điểm")}
                  className="h-11 md:h-12 bg-red-950/20 border-red-900/40 text-red-400 hover:bg-red-900/40 text-xs md:text-sm font-bold font-mono"
                >
                  -5
                </Button>

                <Button
                  variant="outline"
                  size="default"
                  onClick={() => onModifyScore(player.id, -2, "Trừ -2 điểm")}
                  className="h-11 md:h-12 bg-red-950/20 border-red-900/40 text-red-400 hover:bg-red-900/40 text-xs md:text-sm font-bold font-mono"
                >
                  -2
                </Button>

                <Button
                  variant="outline"
                  size="default"
                  onClick={() => onModifyScore(player.id, -1, "Trừ -1 điểm")}
                  className="h-11 md:h-12 bg-red-950/30 border-red-900/50 text-red-300 hover:bg-red-900/50 text-base md:text-lg font-black font-mono"
                >
                  -1
                </Button>

                {/* Cộng điểm */}
                <Button
                  variant="outline"
                  size="default"
                  onClick={() => onModifyScore(player.id, 1, "Ăn +1 điểm")}
                  className="h-11 md:h-12 bg-emerald-950/30 border-emerald-900/50 text-emerald-300 hover:bg-emerald-900/50 text-base md:text-lg font-black font-mono"
                >
                  +1
                </Button>

                <Button
                  variant="outline"
                  size="default"
                  onClick={() => onModifyScore(player.id, 2, "Ăn +2 điểm")}
                  className="h-11 md:h-12 bg-emerald-950/20 border-emerald-900/40 text-emerald-400 hover:bg-emerald-900/40 text-xs md:text-sm font-bold font-mono"
                >
                  +2
                </Button>

                <Button
                  variant="outline"
                  size="default"
                  onClick={() => onModifyScore(player.id, 5, "Ăn +5 điểm")}
                  className="h-11 md:h-12 bg-emerald-950/20 border-emerald-900/40 text-emerald-400 hover:bg-emerald-900/40 text-xs md:text-sm font-bold font-mono"
                >
                  +5
                </Button>
              </div>

              {/* Hộp nhập số điểm trực tiếp tùy ý */}
              {customInputPlayerId === player.id ? (
                <div className="mt-2.5 flex items-center gap-2 p-2 rounded-xl bg-slate-950 border border-slate-700">
                  <input
                    type="number"
                    value={customValue}
                    onChange={(e) => setCustomValue(e.target.value)}
                    placeholder="Nhập số điểm..."
                    autoFocus
                    className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 outline-none px-2 font-mono"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCustomSubmit(player.id, false)}
                    className="h-8 px-2.5 text-xs text-red-400 border-red-900/50"
                  >
                    <Minus className="w-3 h-3 mr-0.5" /> Trừ
                  </Button>
                  <Button
                    size="sm"
                    variant="neon"
                    onClick={() => handleCustomSubmit(player.id, true)}
                    className="h-8 px-2.5 text-xs"
                  >
                    <Plus className="w-3 h-3 mr-0.5" /> Cộng
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setCustomInputPlayerId(null)}
                    className="h-8 px-2 text-xs text-slate-400"
                  >
                    Hủy
                  </Button>
                </div>
              ) : (
                <div className="mt-2 text-right">
                  <button
                    onClick={() => {
                      setCustomInputPlayerId(player.id);
                      setCustomValue("");
                    }}
                    className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Nhập số điểm tùy ý</span>
                  </button>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
