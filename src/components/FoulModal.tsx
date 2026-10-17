import React from "react";
import { Player } from "@/types/billiard";
import { AlertTriangle, ArrowRight, RotateCcw, X, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FoulModalProps {
  isOpen: boolean;
  onClose: () => void;
  player?: Player;
  onFoulWithBall: (playerId: string) => void;
  onFoulWithoutBall: (playerId: string) => void;
}

export function FoulModal({
  isOpen,
  onClose,
  player,
  onFoulWithBall,
  onFoulWithoutBall,
}: FoulModalProps) {
  if (!isOpen || !player) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-red-500/40 p-5 shadow-2xl relative shadow-red-950/40">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tiêu đề lỗi */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-9 h-9 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-red-400">
              Xử Lý Lỗi / Chết Cái
            </h3>
            <p className="text-xs text-slate-300 font-semibold">
              Cơ thủ: <span className="text-white font-bold">{player.name}</span>
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-400 mb-4 leading-relaxed">
          Chọn tình huống chết cái để hệ thống tự động điều phối lượt cơ theo luật Bắn Đền Hà Nội:
        </p>

        {/* 2 Lựa chọn theo đặc tả */}
        <div className="space-y-3">
          {/* Lựa chọn 1: Đã ăn bi trước khi chết cái */}
          <button
            onClick={() => {
              onFoulWithBall(player.id);
              onClose();
            }}
            className="w-full p-3.5 rounded-xl bg-slate-950/80 border border-slate-700 hover:border-cyan-400 text-left transition-all group active:scale-95"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-sm text-slate-100 group-hover:text-cyan-300">
                1. ĐÃ ĂN ÍT NHẤT 1 BI
              </span>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400" />
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">
              Cơ thủ đã ăn bi mục tiêu rồi mới chết cái. Lượt đánh chuyển bình thường sang người kế tiếp theo chiều ban đầu.
            </p>
          </button>

          {/* Lựa chọn 2: Chưa ăn bi nào đã chết cái */}
          <button
            onClick={() => {
              onFoulWithoutBall(player.id);
              onClose();
            }}
            className="w-full p-3.5 rounded-xl bg-red-950/30 border border-red-500/50 hover:bg-red-900/40 text-left transition-all group active:scale-95"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-black text-sm text-red-400 group-hover:text-red-300 flex items-center gap-1.5">
                <RotateCcw className="w-4 h-4 text-red-400" />
                2. CHƯA ĂN BI NÀO ĐÃ CHẾT CÁI
              </span>
            </div>
            <p className="text-[11px] text-red-200/80 leading-snug">
              Chết cái chay! Lượt lập tức <span className="font-bold text-amber-300">đảo ngược về người đánh trước</span> và <span className="font-bold text-amber-300">ĐẢO CHIỀU</span> toàn bộ vòng tròn bàn đấu.
            </p>
          </button>
        </div>

        <div className="mt-4 pt-2">
          <Button
            variant="ghost"
            onClick={onClose}
            className="w-full h-10 text-xs text-slate-400"
          >
            Hủy thao tác
          </Button>
        </div>
      </div>
    </div>
  );
}
