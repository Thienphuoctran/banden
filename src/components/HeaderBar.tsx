import React from "react";
import { CircleDollarSign, RotateCcw, Clock, Maximize2, Minimize2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface HeaderBarProps {
  tableName: string;
  pricePerPoint: number;
  historyCount: number;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onOpenSettings: () => void;
  onOpenHistory: () => void;
  onResetScores: () => void;
}

export function HeaderBar({
  tableName,
  pricePerPoint,
  historyCount,
  isFullscreen,
  onToggleFullscreen,
  onOpenSettings,
  onOpenHistory,
  onResetScores,
}: HeaderBarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-xl px-3 py-2.5">
      <div className="max-w-2xl mx-auto flex items-center justify-between gap-2">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 shadow-md shadow-emerald-500/20 text-white font-black text-base">
            🎱
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-extrabold text-sm text-slate-100 tracking-tight">
                Bida Bắn Đền
              </h1>
              <Badge variant="neon" className="text-[9px] py-0 px-1.5">
                HÀ NỘI
              </Badge>
            </div>
            <p className="text-[10px] text-slate-400 font-medium truncate max-w-[120px] sm:max-w-xs">
              {tableName}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5">
          {/* Biểu tượng đồng hồ nhỏ 🕒 mở lịch sử cộng trừ điểm */}
          <button
            onClick={onOpenHistory}
            className="relative h-9 px-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-300 flex items-center gap-1 text-xs font-bold active:scale-95 transition-all"
            title="Nhật ký điểm số"
          >
            <Clock className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">Nhật ký</span>
            <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-cyan-500 text-[9px] font-black text-slate-950">
              {historyCount > 9 ? "9+" : historyCount}
            </span>
          </button>

          {/* Nút Toàn Màn Hình ⛶ */}
          <button
            onClick={onToggleFullscreen}
            className={`h-9 px-2.5 rounded-xl border text-xs font-bold flex items-center gap-1 active:scale-95 transition-all ${
              isFullscreen
                ? "bg-cyan-950/60 border-cyan-400 text-cyan-300 shadow-sm shadow-cyan-500/20"
                : "bg-slate-900 border-slate-800 text-slate-300 hover:text-cyan-300"
            }`}
            title="Toàn màn hình bảng điểm"
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Thu nhỏ</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Toàn màn</span>
              </>
            )}
          </button>

          {/* Đơn giá */}
          <button
            onClick={onOpenSettings}
            className="h-9 px-2.5 rounded-xl bg-slate-900 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center gap-1 active:scale-95 transition-all"
            title="Cấu hình đơn giá"
          >
            <CircleDollarSign className="w-3.5 h-3.5 text-amber-400" />
            <span>{pricePerPoint.toLocaleString("vi-VN")}đ</span>
          </button>

          {/* Ván mới */}
          <button
            onClick={onResetScores}
            className="h-9 w-9 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-400 flex items-center justify-center active:scale-95 transition-all"
            title="Đặt lại điểm số ván mới"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
