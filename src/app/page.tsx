"use client";

import React, { useState } from "react";
import { useBilliardGame } from "@/hooks/useBilliardGame";
import { HeaderBar } from "@/components/HeaderBar";
import { RandomTurnOrder } from "@/components/RandomTurnOrder";
import { ScoreboardList } from "@/components/ScoreboardList";
import { QuickControlsBar } from "@/components/QuickControlsBar";
import { AddPlayerModal } from "@/components/AddPlayerModal";
import { SettlementModal } from "@/components/SettlementModal";
import { SettingsModal } from "@/components/SettingsModal";
import { HistoryDrawerModal } from "@/components/HistoryDrawerModal";
import { Trophy, Flame, Users, Clock } from "lucide-react";

export default function BilliardApp() {
  const {
    players,
    settings,
    history,
    addPlayer,
    removePlayer,
    modifyScore,
    undo,
    randomizeTurnOrders,
    setPricePerPoint,
    resetScores,
  } = useBilliardGame();

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAddPlayerOpen, setIsAddPlayerOpen] = useState(false);
  const [isSettlementOpen, setIsSettlementOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState(false);

  // Cơ thủ đang dẫn đầu
  const leader = [...players].sort((a, b) => b.score - a.score)[0];
  const totalMoneyCirculating = players
    .filter((p) => p.score > 0)
    .reduce((sum, p) => sum + p.score * settings.pricePerPoint, 0);

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
    try {
      if (!isFullscreen) {
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen().catch(() => {});
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen().catch(() => {});
        }
      }
    } catch (e) {}
  };

  return (
    <div
      className={`min-h-screen bg-[#070b12] text-slate-100 flex flex-col selection:bg-cyan-500/20 transition-all ${
        isFullscreen ? "pb-20" : "pb-28"
      }`}
    >
      {/* Header Bar */}
      <HeaderBar
        tableName={settings.tableName}
        pricePerPoint={settings.pricePerPoint}
        historyCount={history.length}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenHistory={() => setIsHistoryDrawerOpen(true)}
        onResetScores={resetScores}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-2xl w-full mx-auto p-3 space-y-3">
        {/* Banner Tổng Quan Nhanh (Ẩn khi bật toàn màn hình để tập trung vào bảng điểm) */}
        {!isFullscreen && (
          <div className="grid grid-cols-3 gap-2 animate-in fade-in duration-200">
            <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md flex flex-col justify-between">
              <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-semibold">
                <Users className="w-3.5 h-3.5 text-cyan-400" />
                <span>CƠ THỦ</span>
              </div>
              <div className="text-xl md:text-2xl font-black font-mono text-slate-200 mt-1">
                {players.length} <span className="text-xs font-normal text-slate-500">người</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md flex flex-col justify-between">
              <div className="flex items-center gap-1.5 text-amber-400 text-[11px] font-semibold">
                <Trophy className="w-3.5 h-3.5" />
                <span>DẪN ĐẦU</span>
              </div>
              <div className="text-xs md:text-sm font-bold text-amber-300 truncate mt-1">
                {leader && leader.score > 0 ? (
                  <>
                    {leader.name} <span className="font-mono text-xs">({leader.score}đ)</span>
                  </>
                ) : (
                  <span className="text-slate-500 text-xs">Chưa có</span>
                )}
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md flex flex-col justify-between">
              <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-semibold">
                <Flame className="w-3.5 h-3.5" />
                <span>TIỀN ĐỀN</span>
              </div>
              <div className="text-xs md:text-sm font-black font-mono text-emerald-400 truncate mt-1">
                {totalMoneyCirculating.toLocaleString("vi-VN")}đ
              </div>
            </div>
          </div>
        )}

        {/* Khối Bốc Thăm Ngẫu Nhiên Thứ Tự Lượt Đánh (Ẩn trong chế độ toàn màn hình) */}
        {!isFullscreen && (
          <RandomTurnOrder
            players={players}
            onOrderAssigned={randomizeTurnOrders}
          />
        )}

        {/* Bảng điểm chi tiết từng cơ thủ */}
        <section>
          <div className="flex items-center justify-between mb-2 px-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <span>BẢNG ĐIỂM BÀN ĐẤU</span>
              <span className="text-[10px] text-cyan-400 font-mono">
                ({settings.pricePerPoint.toLocaleString("vi-VN")}đ/điểm)
              </span>
            </h2>
            <span className="text-[11px] text-slate-500">
              Chạm nút - / + một tay
            </span>
          </div>

          <ScoreboardList
            players={players}
            pricePerPoint={settings.pricePerPoint}
            onModifyScore={modifyScore}
            onRemovePlayer={removePlayer}
          />
        </section>
      </main>

      {/* Nút nổi biểu tượng đồng hồ 🕒 xem nhanh lịch sử */}
      <button
        onClick={() => setIsHistoryDrawerOpen(true)}
        className="fixed right-4 bottom-24 w-11 h-11 rounded-full bg-slate-900 border border-cyan-500/50 text-cyan-400 flex items-center justify-center shadow-lg shadow-black/50 z-30 active:scale-95 transition-all"
        title="Xem nhật ký điểm số"
      >
        <Clock className="w-5 h-5" />
        {history.length > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-cyan-500 text-[9px] font-black text-slate-950">
            {history.length > 9 ? "9+" : history.length}
          </span>
        )}
      </button>

      {/* Thanh điều khiển 1 tay ở đáy màn hình */}
      <QuickControlsBar
        canUndo={history.length > 0}
        lastAction={history[0]}
        onUndo={undo}
        onOpenAddPlayer={() => setIsAddPlayerOpen(true)}
        onOpenSettlement={() => setIsSettlementOpen(true)}
        onToggleWheel={() => randomizeTurnOrders()}
        isWheelOpen={false}
      />

      {/* Modals */}
      <HistoryDrawerModal
        isOpen={isHistoryDrawerOpen}
        onClose={() => setIsHistoryDrawerOpen(false)}
        history={history}
      />

      <AddPlayerModal
        isOpen={isAddPlayerOpen}
        onClose={() => setIsAddPlayerOpen(false)}
        onAddPlayer={addPlayer}
      />

      <SettlementModal
        isOpen={isSettlementOpen}
        onClose={() => setIsSettlementOpen(false)}
        players={players}
        pricePerPoint={settings.pricePerPoint}
        onResetScores={resetScores}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        currentPrice={settings.pricePerPoint}
        onPriceChange={setPricePerPoint}
      />
    </div>
  );
}
