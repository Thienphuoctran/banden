import React, { useState } from "react";
import { UserPlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AddPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPlayer: (name: string) => void;
}

export function AddPlayerModal({ isOpen, onClose, onAddPlayer }: AddPlayerModalProps) {
  const [name, setName] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAddPlayer(name.trim());
      setName("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-700 p-5 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <UserPlus className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-base text-slate-100">Thêm Cơ Thủ Mới</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">
              Tên / Biệt danh cơ thủ
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ví dụ: Anh Tuấn Lỗ, Hùng Còi..."
              autoFocus
              className="w-full h-11 px-3.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-slate-100 placeholder-slate-500 outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          <div className="flex gap-2 pt-1">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="flex-1 h-11 text-slate-400"
            >
              Hủy
            </Button>
            <Button
              type="submit"
              variant="neon"
              disabled={!name.trim()}
              className="flex-1 h-11 font-bold"
            >
              Thêm ngay
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
