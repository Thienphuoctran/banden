import React from "react";
import { Player } from "@/types/billiard";
import { Receipt, X, Trophy, AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SettlementModalProps {
  isOpen: boolean;
  onClose: () => void;
  players: Player[];
  pricePerPoint: number;
  onResetScores: () => void;
}

export function SettlementModal({
  isOpen,
  onClose,
  players,
  pricePerPoint,
  onResetScores,
}: SettlementModalProps) {
  if (!isOpen) return null;

  // Sắp xếp người chơi từ điểm cao nhất đến thấp nhất
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  const totalPositiveScore = sortedPlayers
    .filter((p) => p.score > 0)
    .reduce((sum, p) => sum + p.score, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 p-5 shadow-2xl relative max-h-[90vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tiêu đề */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Receipt className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-slate-100">
              Bảng Tổng Kết Tiền Bắn Đền
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Đơn giá: {pricePerPoint.toLocaleString("vi-VN")}đ/điểm
            </p>
          </div>
        </div>

        {/* Danh sách thành viên & tiền thắng / thua */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
          {sortedPlayers.map((player, index) => {
            const money = player.score * pricePerPoint;
            const isWinner = index === 0 && player.score > 0;
            const isLoser = index === sortedPlayers.length - 1 && player.score < 0;

            return (
              <div
                key={player.id}
                className={`p-3 rounded-xl border flex items-center justify-between transition-colors ${
                  isWinner
                    ? "bg-emerald-950/30 border-emerald-500/40"
                    : isLoser
                    ? "bg-red-950/30 border-red-500/40"
                    : "bg-slate-950/60 border-slate-800"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-bold text-slate-500 w-4">
                    #{index + 1}
                  </span>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-slate-950"
                    style={{ backgroundColor: player.avatarColor }}
                  >
                    {player.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-slate-200">
                        {player.name}
                      </span>
                      {isWinner && <Trophy className="w-3.5 h-3.5 text-amber-400" />}
                    </div>
                    <span className="text-xs text-slate-400">
                      {player.score > 0 ? `+${player.score}` : player.score} điểm
                    </span>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <div
                    className={`text-base font-extrabold ${
                      money > 0
                        ? "text-emerald-400"
                        : money < 0
                        ? "text-red-400"
                        : "text-slate-400"
                    }`}
                  >
                    {money > 0 ? "+" : ""}
                    {money.toLocaleString("vi-VN")}đ
                  </div>
                  <span className="text-[10px] text-slate-500">
                    {money > 0 ? "Thu về" : money < 0 ? "Bắn đền / Nộp" : "Hòa tiền"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Nút hành động */}
        <div className="pt-4 mt-3 border-t border-slate-800 flex gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 h-11 text-xs text-slate-300"
          >
            Đóng bảng
          </Button>
          <Button
            variant="temple"
            onClick={() => {
              if (confirm("Bạn có chắc chắn muốn đặt lại điểm 0 cho ván mới?")) {
                onResetScores();
                onClose();
              }
            }}
            className="flex-1 h-11 text-xs font-bold"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" />
            Chốt & Ván Mới
          </Button>
        </div>
      </div>
    </div>
  );
}
