---
name: design-dna
description: Kiến trúc Design DNA 3 chiều (Design System Tokens, Design Style Aesthetics, Visual Effects). Bố cục Spatial Bento Grid, kính mờ Glassmorphism, phối màu hiện đại và trải nghiệm thị giác cao cấp cho ứng dụng web.
---

# Web Design DNA & Aesthetic Guidelines

Quy chuẩn thiết kế giao diện web hiện đại theo mô hình 3 chiều:

## 1. Dimension 1: Design System (Tokens & Hệ Thống Đo Lường)
- **Bảng màu (Color Palette):**
  - Nền tối cao cấp: Dark Slate/Navy (`#090d16`, `#0f172a`, `#1e293b`).
  - Màu nhấn (Accent / Brand): Neon Cyan (`#06b6d4`, `#22d3ee`), Emerald Green (`#10b981`), hoặc Electric Violet (`#8b5cf6`).
  - Trạng thái: Thành công (`#22c55e`), Cảnh báo (`#f59e0b`), Nguy hiểm/Lỗi (`#ef4444`).
- **Typography:**
  - Tiêu đề: Font Sans-serif hiện đại (Inter, Plus Jakarta Sans, Outfit) với trọng số Bold/Extrabold (700-800).
  - Thống kê & Số liệu: Font Monospace hoặc Black weight để hiển thị điểm số, thời gian, thông số.
  - Văn bản nội dung: Text Slate-300 / Gray-400 cho độ tương phản dịu mắt, dễ đọc.
- **Radius & Spacing:**
  - Bo góc card chính: `rounded-2xl` hoặc `rounded-3xl` tạo cảm giác mềm mại, hiện đại.
  - Bo góc nút bấm & input: `rounded-xl` hoặc `rounded-lg`.
  - Spacing: Quy chuẩn hệ 4px/8px (p-4, p-6, gap-4, gap-6).

## 2. Dimension 2: Design Style (Phong Cách & Ngôn Ngữ Trực Quan)
- **Spatial Bento Grid:**
  - Bố cục dạng ô lưới Bento Grid phân cấp thông tin rõ ràng: Ô chính nổi bật (Hero/Status), các ô vệ tinh hiển thị thông số chi tiết, điều khiển nhanh hoặc danh sách hoạt động.
- **Glassmorphism (Kính Mờ Hiện Đại):**
  - Sử dụng nền bán trong suốt kết hợp làm mờ: `bg-slate-900/60 backdrop-blur-xl border border-white/10`.
  - Đổ bóng tinh tế (Soft Glow): `shadow-lg shadow-cyan-500/5` hoặc viền ánh sáng tinh tế.
- **Micro-Interactions (Tương Tác Vi Mô):**
  - Hover states: Nâng nhẹ (`hover:-translate-y-0.5`), đổi màu viền (`hover:border-cyan-500/40`), chuyển đổi mượt mà `transition-all duration-300`.

## 3. Dimension 3: Visual Effects (Hiệu Ứng Thị Giác & Chuyển Động)
- **Interactive Canvas / WebGL:**
  - Tích hợp Canvas 2D / Three.js 3D ở Hero background hoặc khu vực tương tác chính để tăng tính cuốn hút.
- **GSAP & Framer Motion:**
  - Hoạt ảnh xuất hiện so le (`stagger`), đếm số mượt mà khi tăng điểm/chỉ số, hiệu ứng mở modal tự nhiên.
- **Canvas Confetti & Particle Sparks:**
  - Kích hoạt hiệu ứng chúc mừng (confetti / tia sáng) khi hoàn thành mục tiêu, chiến thắng hoặc mở khóa tính năng.
