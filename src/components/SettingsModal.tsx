import React, { useState } from "react";
import { CircleDollarSign, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPrice: number;
  onPriceChange: (newPrice: number) => void;
}

const COMMON_PRICES = [2000, 3000, 5000, 10000, 20000, 50000];

export function SettingsModal({
  isOpen,
  onClose,
  currentPrice,
  onPriceChange,
}: SettingsModalProps) {
  const [customPrice, setCustomPrice] = useState(currentPrice.toString());

  if (!isOpen) return null;

  const handleSelectPrice = (p: number) => {
    onPriceChange(p);
    setCustomPrice(p.toString());
    onClose();
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(customPrice, 10);
    if (!isNaN(val) && val >= 0) {
      onPriceChange(val);
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
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <CircleDollarSign className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-base text-slate-100">
            Cấu Hình Đơn Giá Bắn Đền
          </h3>
        </div>

        {/* Các mức giá phổ biến */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase">
            Mức đơn giá phổ biến (VNĐ / Điểm)
          </label>
          <div className="grid grid-cols-3 gap-2">
            {COMMON_PRICES.map((price) => (
              <button
                key={price}
                type="button"
                onClick={() => handleSelectPrice(price)}
                className={`h-11 rounded-xl text-xs font-bold font-mono transition-all flex items-center justify-center gap-1 border ${
                  currentPrice === price
                    ? "bg-amber-500/20 border-amber-500 text-amber-300 shadow-sm"
                    : "bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800"
                }`}
              >
                <span>{price.toLocaleString("vi-VN")}đ</span>
                {currentPrice === price && <Check className="w-3 h-3 text-amber-400" />}
              </button>
            ))}
          </div>
        </div>

        {/* Hoặc tự nhập đơn giá */}
        <form onSubmit={handleCustomSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">
              Hoặc nhập đơn giá tự do
            </label>
            <div className="relative">
              <input
                type="number"
                value={customPrice}
                onChange={(e) => setCustomPrice(e.target.value)}
                placeholder="Nhập số tiền..."
                className="w-full h-11 pl-3.5 pr-10 rounded-xl bg-slate-950 border border-slate-700 text-sm font-mono text-slate-100 placeholder-slate-500 outline-none focus:border-amber-400"
              />
              <span className="absolute right-3 top-3 text-xs text-slate-400 font-bold">
                đ
              </span>
            </div>
          </div>

          <Button type="submit" variant="neon" className="w-full h-11 font-bold mt-2">
            Áp dụng đơn giá
          </Button>
        </form>
      </div>
    </div>
  );
}
