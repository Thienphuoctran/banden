import React from "react";
import { ScoreHistoryEntry } from "@/types/billiard";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { History, Clock, ArrowRight, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ScoreHistorySectionProps {
  history: ScoreHistoryEntry[];
  onUndo: () => void;
  canUndo: boolean;
}

export function ScoreHistorySection({
  history,
  onUndo,
  canUndo,
}: ScoreHistorySectionProps) {
  return (
    <Card className="border-slate-800 bg-slate-900/60 backdrop-blur-xl">
      <CardHeader className="p-3.5 pb-2 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
            <History className="w-4 h-4" />
          </div>
          <div>
            <CardTitle className="text-sm font-bold text-slate-200">
              Nhật Ký Cộng Trừ Điểm
            </CardTitle>
            <p className="text-[11px] text-slate-400">
              Theo dõi chi tiết từng lượt ăn điểm & bắn đền
            </p>
          </div>
        </div>

        {canUndo && (
          <Button
            variant="outline"
            size="sm"
            onClick={onUndo}
            className="h-8 px-2.5 text-xs text-amber-300 border-amber-500/30 bg-amber-950/20 hover:bg-amber-900/40 font-bold"
          >
            <Undo2 className="w-3.5 h-3.5 mr-1" />
            Hoàn tác
          </Button>
        )}
      </CardHeader>

      <CardContent className="p-3.5 pt-1">
        {history.length === 0 ? (
          <div className="p-4 text-center rounded-xl bg-slate-950/40 border border-slate-800/60 text-slate-500 text-xs">
            Chưa có thao tác ghi điểm nào trong ván này.
          </div>
        ) : (
          <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
            {history.slice(0, 30).map((entry, index) => {
              const date = new Date(entry.timestamp);
              const timeStr = `${date.getHours().toString().padStart(2, "0")}:${date
                .getMinutes()
                .toString()
                .padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;

              const isAdd = entry.delta > 0;

              return (
                <div
                  key={entry.id}
                  className={`p-2.5 rounded-xl border flex items-center justify-between transition-colors ${
                    index === 0
                      ? "bg-slate-900/90 border-slate-700 shadow-sm"
                      : "bg-slate-950/40 border-slate-800/80"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black font-mono ${
                        isAdd
                          ? "bg-emerald-950/80 text-emerald-300 border border-emerald-800/60"
                          : "bg-red-950/80 text-red-300 border border-red-800/60"
                      }`}
                    >
                      {isAdd ? `+${entry.delta}` : entry.delta}
                    </span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-100">
                          {entry.playerName}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          ({isAdd ? "Ăn điểm" : "Bị phạt/đền"})
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-slate-500">
                        <Clock className="w-2.5 h-2.5" />
                        <span>{timeStr}</span>
                        {entry.note && <span>• {entry.note}</span>}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-mono">
                    <span className="text-slate-500">{entry.scoreBefore}</span>
                    <ArrowRight className="w-3 h-3 text-slate-600" />
                    <span
                      className={`font-black ${
                        isAdd ? "text-emerald-400" : "text-red-400"
                      }`}
                    >
                      {entry.scoreAfter}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
