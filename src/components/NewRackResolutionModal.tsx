import React, { useState } from "react";
import { Player } from "@/types/billiard";
import { X, Sparkles, Trophy, AlertCircle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NewRackResolutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  players: Player[];
  currentRackNumber: number;
  onResolve: (roles: {
    won9Id: string;
    lost9Id?: string;
    lost6Id?: string;
    lost3Id?: string;
    won3or6Ids?: string[];
  }) => void;
}

export function NewRackResolutionModal({
  isOpen,
  onClose,
  players,
  currentRackNumber,
  onResolve,
}: NewRackResolutionModalProps) {
  const [won9Id, setWon9Id] = useState<string>(players[0]?.id || "");
  const [lost9Id, setLost9Id] = useState<string>("");
  const [lost6Id, setLost6Id] = useState<string>("");
  const [lost3Id, setLost3Id] = useState<string>("");
  const [won3or6Ids, setWon3or6Ids] = useState<string[]>([]);

  if (!isOpen) return null;

  const toggleWon3or6 = (id: string) => {
    setWon3or6Ids((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleConfirm = () => {
    if (!won9Id) return;
    onResolve({
      won9Id,
      lost9Id: lost9Id || undefined,
      lost6Id: lost6Id || undefined,
      lost3Id: lost3Id || undefined,
      won3or6Ids: won3or6Ids.length > 0 ? won3or6Ids : undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 p-5 shadow-2xl relative max-h-[90vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-slate-100">
              Sắp Xếp Lượt Ván #{currentRackNumber + 1}
            </h3>
            <p className="text-xs text-amber-400/90 font-medium">
              Thứ bậc gỡ gạc theo chuẩn Bắn Đền Hà Nội
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 custom-scrollbar text-xs">
          {/* 1. Cơ thủ ăn bi 9 */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-amber-500/40">
            <label className="block font-bold text-amber-300 mb-1">
              🥇 Vị trí 1 (Phá ván mới): Cơ thủ ăn bi số 9
            </label>
            <select
              value={won9Id}
              onChange={(e) => setWon9Id(e.target.value)}
              className="w-full h-10 px-3 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 font-semibold outline-none focus:border-amber-400"
            >
              {players.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Cơ thủ để mất bi 9 */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
            <label className="block font-bold text-slate-300 mb-1">
              🥈 Vị trí 2: Cơ thủ để mất bi 9 (đánh hỏng cho người sau ăn)
            </label>
            <select
              value={lost9Id}
              onChange={(e) => setLost9Id(e.target.value)}
              className="w-full h-10 px-3 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 font-semibold outline-none focus:border-cyan-400"
            >
              <option value="">-- Không có / Phá chết 9 --</option>
              {players
                .filter((p) => p.id !== won9Id)
                .map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
            </select>
          </div>

          {/* 3. Cơ thủ để mất bi 6 */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
            <label className="block font-bold text-slate-300 mb-1">
              🥉 Vị trí 3: Cơ thủ để mất bi 6
            </label>
            <select
              value={lost6Id}
              onChange={(e) => setLost6Id(e.target.value)}
              className="w-full h-10 px-3 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 font-semibold outline-none focus:border-cyan-400"
            >
              <option value="">-- Không có người mất bi 6 --</option>
              {players
                .filter((p) => p.id !== won9Id && p.id !== lost9Id)
                .map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
            </select>
          </div>

          {/* 4. Cơ thủ để mất bi 3 */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
            <label className="block font-bold text-slate-300 mb-1">
              🏅 Vị trí 4: Cơ thủ để mất bi 3
            </label>
            <select
              value={lost3Id}
              onChange={(e) => setLost3Id(e.target.value)}
              className="w-full h-10 px-3 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 font-semibold outline-none focus:border-cyan-400"
            >
              <option value="">-- Không có người mất bi 3 --</option>
              {players
                .filter(
                  (p) =>
                    p.id !== won9Id && p.id !== lost9Id && p.id !== lost6Id
                )
                .map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
            </select>
          </div>

          {/* 5. Cơ thủ ăn bi 3 hoặc bi 6 (Xếp cuối cùng) */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
            <label className="block font-bold text-slate-300 mb-1.5">
              ⚠️ Vị trí cuối cùng: Các cơ thủ đã ăn bi 3 hoặc bi 6
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {players
                .filter((p) => p.id !== won9Id)
                .map((p) => {
                  const isChecked = won3or6Ids.includes(p.id);
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => toggleWon3or6(p.id)}
                      className={`h-9 px-2.5 rounded-lg border text-xs font-bold flex items-center justify-between transition-colors ${
                        isChecked
                          ? "bg-purple-950/60 border-purple-500 text-purple-300"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800"
                      }`}
                    >
                      <span className="truncate">{p.name}</span>
                      {isChecked && <Check className="w-3.5 h-3.5 text-purple-400" />}
                    </button>
                  );
                })}
            </div>
          </div>
        </div>

        <div className="pt-3 mt-3 border-t border-slate-800 flex gap-2">
          <Button
            variant="ghost"
            onClick={onClose}
            className="flex-1 h-11 text-xs text-slate-400"
          >
            Hủy
          </Button>
          <Button
            variant="neon"
            onClick={handleConfirm}
            className="flex-1 h-11 text-xs font-black"
          >
            <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-300" />
            TẠO HÀNG ĐỢI VÁN #{currentRackNumber + 1}
          </Button>
        </div>
      </div>
    </div>
  );
}
