import React from "react";
import { ScoreHistoryEntry } from "@/types/billiard";
import { History, X, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HistoryDrawerModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: ScoreHistoryEntry[];
}

export function HistoryDrawerModal({
  isOpen,
  onClose,
  history,
}: HistoryDrawerModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 p-5 shadow-2xl relative max-h-[85vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <History className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-100">
              Nhật Ký Ghi Điểm Bàn Đấu
            </h3>
            <p className="text-xs text-slate-400">
              {history.length} lượt thao tác gần nhất
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
          {history.length === 0 ? (
            <p className="text-center text-xs text-slate-500 py-8">
              Chưa có thao tác ghi điểm nào trong ván này.
            </p>
          ) : (
            history.map((entry) => {
              const date = new Date(entry.timestamp);
              const timeStr = `${date.getHours().toString().padStart(2, "0")}:${date
                .getMinutes()
                .toString()
                .padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;

              return (
                <div
                  key={entry.id}
                  className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-200">
                        {entry.playerName}
                      </span>
                      <span
                        className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded ${
                          entry.delta > 0
                            ? "bg-emerald-950/60 text-emerald-400 border border-emerald-800/40"
                            : "bg-red-950/60 text-red-400 border border-red-800/40"
                        }`}
                      >
                        {entry.delta > 0 ? `+${entry.delta}` : entry.delta}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1">
                      <Clock className="w-3 h-3" />
                      <span>{timeStr}</span>
                      {entry.note && <span>• {entry.note}</span>}
                    </div>
                  </div>

                  <div className="text-right text-xs font-mono text-slate-400">
                    <span className="text-slate-500">{entry.scoreBefore}</span>
                    <span className="mx-1">➔</span>
                    <span className="font-bold text-slate-200">{entry.scoreAfter}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="pt-3 mt-3 border-t border-slate-800">
          <Button variant="outline" onClick={onClose} className="w-full h-11 text-xs">
            Đóng nhật ký
          </Button>
        </div>
      </div>
    </div>
  );
}
