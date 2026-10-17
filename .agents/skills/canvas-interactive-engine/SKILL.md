---
name: canvas-interactive-engine
description: Kỹ năng xây dựng động cơ tương tác đồ họa Canvas 2D mượt mà cho web (Game vòng lặp 60fps, cơ chế bắn mục tiêu/tương tác, hạt vật lý particles, retina DPI scaling và điều khiển chuột/cảm ứng).
---

# Canvas 2D Interactive & Game Engine Guidelines

## 1. Mục Tiêu & Ứng Dụng
Động cơ Canvas 2D trong React/Next.js phục vụ các tính năng tương tác tốc độ cao, mini game, sa bàn, hiệu ứng bắn mục tiêu và mô phỏng thị giác mà DOM thông thường không đáp ứng đủ hiệu năng:
- **Tương tác thời gian thực:** Bắn mục tiêu, quỹ đạo đạn, va chạm vật lý, tính điểm tức thì.
- **Hiệu ứng hạt (Particle Systems):** Bụi sao, tia lửa nổ, vệt sáng đạn, sóng xung kích (shockwaves).

## 2. Tiêu Chuẩn Hiển Thị Sắc Nét (Retina High-DPI Scaling)
Màn hình Retina/di động có `window.devicePixelRatio >= 2`. Nếu không nhân tỷ lệ, đồ họa canvas sẽ bị mờ:
```typescript
export function setupHighDpiCanvas(canvas: HTMLCanvasElement, width: number, height: number) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.scale(dpr, dpr);
  }
  return { ctx, dpr };
}
```

## 3. Vòng Lặp Trò Chơi Chuẩn (Game Loop Pattern)
Luôn tách biệt **Update (Cập nhật logic/vật lý)** và **Draw (Vẽ đồ họa)**:
```tsx
import React, { useEffect, useRef } from "react";

export function InteractiveCanvasGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let lastTime = performance.now();

    // Vòng lặp chính 60fps
    const loop = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      // 1. UPDATE: Tính toán tọa độ, va chạm, phân rã hạt
      // updateEntities(dt);

      // 2. DRAW: Xóa frame cũ và vẽ frame mới
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // drawEntities(ctx);

      animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame(loop);

    // CLEANUP: Hủy vòng lặp khi component unmount
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full rounded-2xl touch-none cursor-crosshair"
    />
  );
}
```

## 4. Tối Ưu Hóa & Quản Lý Bộ Nhớ
- **Tránh tạo object mới trong vòng lặp `loop()`:** Tái sử dụng các mảng hạt (Object Pooling) để tránh Garbage Collector gây giật khung hình (frame drop).
- **Hỗ trợ cả Chuột (Mouse) và Chạm (Touch):** Sử dụng `PointerEvent` (`onPointerDown`, `onPointerMove`, `onPointerUp`) kết hợp `touch-action: none` trong CSS.
