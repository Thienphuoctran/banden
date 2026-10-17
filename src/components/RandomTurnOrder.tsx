import React, { useState } from "react";
import { Player } from "@/types/billiard";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shuffle, Sparkles, Trophy, ChevronDown, ChevronUp } from "lucide-react";

interface RandomTurnOrderProps {
  players: Player[];
  onOrderAssigned: (orderedIds: string[]) => void;
}

export function RandomTurnOrder({ players, onOrderAssigned }: RandomTurnOrderProps) {
  const [isShuffling, setIsShuffling] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  // Bốc thăm ngẫu nhiên toàn bộ thứ tự đánh trong 0.6s
  const handleRandomize = () => {
    if (players.length === 0 || isShuffling) return;
    setIsShuffling(true);

    let count = 0;
    const interval = setInterval(() => {
      count++;
      // Tạo hiệu ứng xáo trộn chớp nhoáng
      if (count >= 6) {
        clearInterval(interval);
        const shuffled = [...players].sort(() => Math.random() - 0.5);
        onOrderAssigned(shuffled.map((p) => p.id));
        setIsShuffling(false);
      }
    }, 100);
  };

  // Sắp xếp các cơ thủ theo thứ tự lượt đánh đã được gán
  const orderedPlayers = [...players]
    .filter((p) => p.turnOrder !== null)
    .sort((a, b) => (a.turnOrder || 0) - (b.turnOrder || 0));

  const hasOrders = orderedPlayers.length > 0;

  return (
    <Card className="border-cyan-500/30 bg-slate-900/80 backdrop-blur-xl shadow-lg shadow-cyan-950/20">
      <CardHeader className="p-3.5 pb-2 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
            🎲
          </div>
          <div>
            <CardTitle className="text-sm font-bold text-cyan-300 flex items-center gap-1.5">
              Bốc Thăm Thứ Tự Lượt Đánh
            </CardTitle>
            <p className="text-[11px] text-slate-400">
              Chia lượt ngẫu nhiên cho toàn bộ cơ thủ
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-slate-400 hover:text-white p-1"
        >
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </CardHeader>

      {isExpanded && (
        <CardContent className="p-3.5 pt-1 space-y-3">
          {/* Nút Bốc Thăm 1 Click Cực Nhanh */}
          <Button
            variant="neon"
            size="lg"
            onClick={handleRandomize}
            disabled={isShuffling || players.length === 0}
            className="w-full h-11 text-xs md:text-sm font-black shadow-md shadow-cyan-500/25 active:scale-95"
          >
            <Shuffle className={`w-4 h-4 mr-1.5 ${isShuffling ? "animate-spin" : ""}`} />
            {isShuffling ? "ĐANG XÁO TRỘN LƯỢT ĐÁNH..." : "BỐC THĂM THỨ TỰ (1-CLICK)"}
          </Button>

          {/* Danh sách thứ tự lượt đánh */}
          {hasOrders ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 animate-in fade-in duration-200">
              {orderedPlayers.map((p) => {
                const isFirst = p.turnOrder === 1;
                return (
                  <div
                    key={p.id}
                    className={`p-2 rounded-xl border flex items-center gap-2 transition-all ${
                      isFirst
                        ? "bg-amber-950/40 border-amber-500/50 text-amber-300 shadow-sm shadow-amber-950/40"
                        : "bg-slate-950/60 border-slate-800 text-slate-200"
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black font-mono ${
                        isFirst
                          ? "bg-amber-500 text-slate-950"
                          : "bg-slate-800 text-slate-300"
                      }`}
                    >
                      #{p.turnOrder}
                    </span>
                    <div className="truncate">
                      <div className="text-xs font-bold truncate flex items-center gap-1">
                        <span>{p.name}</span>
                        {isFirst && <Trophy className="w-3 h-3 text-amber-400 flex-shrink-0" />}
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {isFirst ? "Đánh trước / Phá bi" : `Lượt số ${p.turnOrder}`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-xs text-slate-500 py-1">
              Chưa bốc thăm lượt đánh. Bấm nút trên để máy chia ngẫu nhiên.
            </p>
          )}
        </CardContent>
      )}
    </Card>
  );
}
