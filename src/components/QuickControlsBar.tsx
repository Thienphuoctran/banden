import React from "react";
import { Undo2, UserPlus, Receipt, Dices } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScoreHistoryEntry } from "@/types/billiard";

interface QuickControlsBarProps {
  canUndo: boolean;
  lastAction?: ScoreHistoryEntry;
  onUndo: () => void;
  onOpenAddPlayer: () => void;
  onOpenSettlement: () => void;
  onToggleWheel: () => void;
  isWheelOpen: boolean;
}

export function QuickControlsBar({
  canUndo,
  lastAction,
  onUndo,
  onOpenAddPlayer,
  onOpenSettlement,
  onToggleWheel,
  isWheelOpen,
}: QuickControlsBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-3 bg-slate-950/90 border-t border-slate-800 backdrop-blur-xl">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
        {/* Nút Hoàn tác (Undo) cực kỳ tiện lợi */}
        <div className="flex-1">
          <Button
            variant="outline"
            size="lg"
            onClick={onUndo}
            disabled={!canUndo}
            className={`w-full h-12 flex items-center justify-center gap-2 rounded-xl text-xs md:text-sm font-bold border-amber-500/40 ${
              canUndo
                ? "bg-amber-950/30 text-amber-300 hover:bg-amber-900/50 shadow-md shadow-amber-950/30"
                : "bg-slate-900/50 text-slate-500 border-slate-800"
            }`}
          >
            <Undo2 className="w-4 h-4 text-amber-400" />
            <div className="text-left leading-tight">
              <div>HOÀN TÁC (UNDO)</div>
              {lastAction && (
                <div className="text-[10px] text-amber-400/80 font-normal truncate max-w-[120px] md:max-w-xs">
                  {lastAction.playerName} ({lastAction.delta > 0 ? "+" : ""}{lastAction.delta})
                </div>
              )}
            </div>
          </Button>
        </div>

        {/* Nút bật/tắt Vòng quay */}
        <Button
          variant="outline"
          size="lg"
          onClick={onToggleWheel}
          className={`h-12 px-3 md:px-4 rounded-xl text-xs md:text-sm font-bold flex items-center gap-1.5 ${
            isWheelOpen
              ? "bg-cyan-950/60 text-cyan-300 border-cyan-500/50"
              : "bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800"
          }`}
          title="Bật/Tắt Vòng quay may mắn"
        >
          <Dices className="w-4 h-4 text-cyan-400" />
          <span className="hidden sm:inline">Vòng quay</span>
        </Button>

        {/* Nút Tổng kết tiền ván */}
        <Button
          variant="outline"
          size="lg"
          onClick={onOpenSettlement}
          className="h-12 px-3 md:px-4 rounded-xl text-xs md:text-sm font-bold bg-slate-900 text-emerald-400 border-emerald-900/40 hover:bg-emerald-950/30 flex items-center gap-1.5"
          title="Bảng tổng kết tiền thắng/thua"
        >
          <Receipt className="w-4 h-4 text-emerald-400" />
          <span className="hidden sm:inline">Tổng kết</span>
        </Button>

        {/* Nút thêm cơ thủ */}
        <Button
          variant="neon"
          size="lg"
          onClick={onOpenAddPlayer}
          className="h-12 px-3.5 md:px-5 rounded-xl text-xs md:text-sm font-black flex items-center gap-1.5 shadow-cyan-500/25"
        >
          <UserPlus className="w-4 h-4" />
          <span>+ Cơ thủ</span>
        </Button>
      </div>
    </div>
  );
}
