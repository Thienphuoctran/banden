import React from "react";
import { Player, Direction } from "@/types/billiard";
import { ArrowRight, ArrowLeft, RefreshCw, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TurnQueueBarProps {
  players: Player[];
  orderedPlayerIds: string[];
  currentTurnIndex: number;
  direction: Direction;
  currentRackNumber: number;
  onAdvanceTurn: () => void;
  onOpenNewRackModal: () => void;
}

export function TurnQueueBar({
  players,
  orderedPlayerIds,
  currentTurnIndex,
  direction,
  currentRackNumber,
  onAdvanceTurn,
  onOpenNewRackModal,
}: TurnQueueBarProps) {
  const isClockwise = direction === "clockwise";

  return (
    <div className="sticky top-[60px] z-30 w-full bg-slate-950/95 border-b border-slate-800/90 backdrop-blur-xl px-3 py-2 shadow-lg">
      <div className="max-w-3xl mx-auto">
        {/* Header thông tin hàng đợi & chiều đánh */}
        <div className="flex items-center justify-between text-xs mb-1.5 px-1">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-amber-400 font-mono tracking-tight flex items-center gap-1">
              <span>VÁN #{currentRackNumber}</span>
            </span>

            {/* Mũi tên hiển thị chiều quay lượt đánh */}
            <div
              className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border transition-colors ${
                isClockwise
                  ? "bg-emerald-950/50 border-emerald-500/40 text-emerald-300"
                  : "bg-purple-950/50 border-purple-500/40 text-purple-300"
              }`}
            >
              {isClockwise ? (
                <>
                  <ArrowRight className="w-3 h-3 text-emerald-400 animate-pulse" />
                  <span>Chiều Thuận</span>
                </>
              ) : (
                <>
                  <ArrowLeft className="w-3 h-3 text-purple-400 animate-pulse" />
                  <span>Chiều Nghịch (Đảo)</span>
                </>
              )}
            </div>
          </div>

          {/* Nút chốt ván sang ván mới */}
          <button
            onClick={onOpenNewRackModal}
            className="text-[11px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 bg-amber-950/40 border border-amber-500/30 px-2 py-0.5 rounded-lg transition-colors"
          >
            <Zap className="w-3 h-3 text-amber-400" />
            <span>Chốt Ván ➔ Xếp Ván Mới</span>
          </button>
        </div>

        {/* Thanh Queue danh sách cơ thủ trượt ngang */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
          {orderedPlayerIds.map((playerId, index) => {
            const player = players.find((p) => p.id === playerId);
            if (!player) return null;
            const isActive = index === currentTurnIndex;

            return (
              <div
                key={playerId}
                className={`flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border transition-all duration-300 ${
                  isActive
                    ? "bg-cyan-950/80 border-cyan-400 text-white shadow-md shadow-cyan-500/30 scale-105 ring-1 ring-cyan-400"
                    : "bg-slate-900/60 border-slate-800 text-slate-400 opacity-80"
                }`}
              >
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black text-slate-950"
                  style={{ backgroundColor: player.avatarColor }}
                >
                  {index + 1}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold leading-none truncate max-w-[90px]">
                    {player.name}
                  </span>
                  {isActive && (
                    <span className="text-[9px] text-cyan-300 font-extrabold flex items-center gap-0.5 animate-pulse mt-0.5">
                      <span>CẦM CƠ 🎱</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
