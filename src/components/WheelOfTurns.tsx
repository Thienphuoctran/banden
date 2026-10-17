import React, { useRef, useEffect, useState, useCallback } from "react";
import { Player } from "@/types/billiard";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Dices, Trophy, Sparkles, Shuffle } from "lucide-react";

interface WheelOfTurnsProps {
  players: Player[];
  onOrderAssigned: (orderedIds: string[]) => void;
}

export function WheelOfTurns({ players, onOrderAssigned }: WheelOfTurnsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedWinner, setSelectedWinner] = useState<Player | null>(null);
  const currentAngleRef = useRef(0);

  // Vẽ vòng quay trên Canvas 2D
  const drawWheel = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 15;

    ctx.clearRect(0, 0, width, height);

    if (players.length === 0) return;

    const sliceAngle = (2 * Math.PI) / players.length;

    // 1. Vẽ các lát cắt vòng quay
    players.forEach((player, index) => {
      const startAngle = currentAngleRef.current + index * sliceAngle;
      const endAngle = startAngle + sliceAngle;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = player.avatarColor || "#06b6d4";
      ctx.fill();

      // Viền lát cắt
      ctx.strokeStyle = "rgba(15, 23, 42, 0.8)";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Vẽ tên người chơi
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.textAlign = "right";
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 13px system-ui, sans-serif";
      ctx.shadowColor = "rgba(0,0,0,0.8)";
      ctx.shadowBlur = 4;
      ctx.fillText(player.name, radius - 20, 5);
      ctx.restore();
    });

    // 2. Trục tròn trung tâm
    ctx.beginPath();
    ctx.arc(centerX, centerY, 24, 0, 2 * Math.PI);
    ctx.fillStyle = "#0f172a";
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#38bdf8";
    ctx.stroke();

    // Biểu tượng bi bida ở giữa
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 12px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("🎱", centerX, centerY);

    // 3. Kim chỉ (Pointer) ở đỉnh trên
    ctx.beginPath();
    ctx.moveTo(centerX - 12, 10);
    ctx.lineTo(centerX + 12, 10);
    ctx.lineTo(centerX, 28);
    ctx.closePath();
    ctx.fillStyle = "#f59e0b";
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.stroke();
  }, [players]);

  useEffect(() => {
    drawWheel();
  }, [drawWheel]);

  // Hành động quay ngẫu nhiên mượt mà 60fps
  const spinWheel = () => {
    if (isSpinning || players.length === 0) return;
    setIsSpinning(true);
    setSelectedWinner(null);

    const spinDuration = 3500; // 3.5 giây
    const startAngle = currentAngleRef.current;
    // Quay ngẫu nhiên từ 5 đến 8 vòng đầy đủ + một góc ngẫu nhiên
    const extraRounds = (5 + Math.random() * 3) * 2 * Math.PI;
    const targetAngle = startAngle + extraRounds;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / spinDuration, 1);

      // Hàm gia tốc mượt mà cubic ease-out
      const easeOut = 1 - Math.pow(1 - progress, 3);
      currentAngleRef.current = startAngle + (targetAngle - startAngle) * easeOut;

      drawWheel();

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);

        // Tính toán ai đang ở đỉnh kim (Góc 3*PI/2 hay -PI/2)
        const normalizedAngle = (currentAngleRef.current % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
        const sliceAngle = (2 * Math.PI) / players.length;
        
        // Kim chỉ ở góc 270 độ (3 * Math.PI / 2)
        const pointerAngle = (3 * Math.PI) / 2;
        let relativeAngle = (pointerAngle - normalizedAngle) % (2 * Math.PI);
        if (relativeAngle < 0) relativeAngle += 2 * Math.PI;

        const winningIndex = Math.floor(relativeAngle / sliceAngle) % players.length;
        const winner = players[winningIndex];
        setSelectedWinner(winner);

        // Tạo danh sách thứ tự bắt đầu từ người thắng
        const ordered = [
          winner.id,
          ...players.filter((p) => p.id !== winner.id).map((p) => p.id),
        ];
        onOrderAssigned(ordered);
      }
    };

    requestAnimationFrame(animate);
  };

  // Bốc thăm nhanh tất cả thứ tự ngẫu nhiên
  const quickRandomShuffle = () => {
    if (players.length === 0) return;
    const shuffled = [...players].sort(() => Math.random() - 0.5);
    setSelectedWinner(shuffled[0]);
    onOrderAssigned(shuffled.map((p) => p.id));
  };

  return (
    <Card className="border-slate-800 bg-slate-900/60 backdrop-blur-xl">
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-base flex items-center gap-2 text-cyan-300">
            <Dices className="w-4 h-4 text-cyan-400" />
            Vòng Quay Chọn Lượt Cơ
          </CardTitle>
          <p className="text-xs text-slate-400">Xác định ai đánh trước, chia lượt cơ công bằng</p>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={quickRandomShuffle}
          className="text-xs text-slate-400 hover:text-cyan-300"
          title="Bốc thăm ngẫu nhiên toàn bộ"
        >
          <Shuffle className="w-3.5 h-3.5 mr-1" />
          Bốc thăm
        </Button>
      </CardHeader>

      <CardContent className="p-4 pt-2 flex flex-col items-center">
        <div className="relative w-full max-w-[280px] aspect-square flex items-center justify-center">
          <canvas
            ref={canvasRef}
            width={320}
            height={320}
            className="w-full h-full max-w-[280px] drop-shadow-[0_0_15px_rgba(6,182,212,0.15)]"
          />
        </div>

        {selectedWinner && (
          <div className="mt-3 px-4 py-2 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-center animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-center gap-1.5 text-xs text-cyan-300 font-semibold">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>LƯỢT ĐÁNH ĐẦU TIÊN:</span>
            </div>
            <p className="text-base font-black text-white mt-0.5">{selectedWinner.name}</p>
          </div>
        )}

        <div className="w-full mt-4 flex gap-2">
          <Button
            variant="neon"
            size="lg"
            onClick={spinWheel}
            disabled={isSpinning || players.length === 0}
            className="w-full text-sm font-extrabold shadow-cyan-500/20"
          >
            <Sparkles className="w-4 h-4 mr-2 text-amber-300" />
            {isSpinning ? "Đang quay may mắn..." : "QUAY CHỌN LƯỢT ĐÁNH"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
