---
name: gsap-skills
description: Kỹ năng điều phối hoạt ảnh chuyển động mượt mà (GSAP 3, Timelines, Tweens, Number Counter, Stagger, dọn dẹp bộ nhớ với gsap.context() trong React).
---

# GSAP Animation & Motion Skills for Modern Web

## 1. Mục Tiêu & Ứng Dụng
GSAP (GreenSock Animation Platform) là thư viện tiêu chuẩn để xử lý các hiệu ứng chuyển động phức tạp với độ mượt mà cao (60-120fps):
- **Nội suy số liệu (Number Counter/Score Tween):** Hiển thị điểm số, tiền tệ, số lượt tương tác chạy tăng dần mượt mà.
- **Hoạt ảnh xuất hiện so le (Staggered Entrance):** Các thẻ card, danh sách vật phẩm hoặc menu xuất hiện lần lượt với độ trễ vi mô.
- **Dòng thời gian (Timelines):** Xâu chuỗi nhiều hoạt ảnh liên hoàn (ví dụ: màn mở đầu, thông báo chiến thắng, thanh năng lượng dâng cao).

## 2. Quản Lý Vòng Đời Bắt Buộc Trong React (`gsap.context()`)
Để tránh rò rỉ bộ nhớ (memory leak) và xung đột khi React re-render trong Strict Mode:
**BẮT BUỘC** bọc mọi logic GSAP bên trong `gsap.context()` và dọn dẹp với `ctx.revert()` trong cleanup function của `useEffect` hoặc `useLayoutEffect`.

### Code mẫu chuẩn mực:
```tsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface AnimatedStatProps {
  value: number;
  label: string;
}

export function AnimatedStatCard({ value, label }: AnimatedStatProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const prevValue = useRef(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hiệu ứng nhịp nảy cho cả thẻ
      gsap.fromTo(
        containerRef.current,
        { scale: 0.95, opacity: 0.8 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" }
      );

      // 2. Nội suy điểm số chạy từ giá trị cũ sang mới
      const counter = { val: prevValue.current };
      gsap.to(counter, {
        val: value,
        duration: 0.8,
        ease: "power3.out",
        onUpdate: () => {
          if (numberRef.current) {
            numberRef.current.textContent = Math.round(counter.val).toLocaleString();
          }
        },
      });

      prevValue.current = value;
    }, containerRef);

    // DỌN DẸP TOÀN BỘ TWEEN KHI UNMOUNT HOẶC RE-RENDER
    return () => ctx.revert();
  }, [value]);

  return (
    <div
      ref={containerRef}
      className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md"
    >
      <p className="text-xs text-slate-400 font-medium uppercase">{label}</p>
      <div className="text-2xl font-black text-cyan-400 font-mono mt-1">
        <span ref={numberRef}>{prevValue.current}</span>
      </div>
    </div>
  );
}
```

## 3. Best Practices
- Sử dụng thuộc tính tối ưu GPU: `transform` (`x`, `y`, `scale`, `rotation`) và `opacity`. Tránh animate trực tiếp `top`, `left`, `width`, `height`.
- Không lạm dụng hiệu ứng làm chậm thao tác người dùng; thời lượng lý tưởng cho micro-interaction là `0.2s - 0.4s`, cho hiệu ứng chuyển cảnh là `0.5s - 0.8s`.
