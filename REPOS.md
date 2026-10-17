# Danh Mục Các Kho Mã Nguồn & Dự Án Antigravity Đã Kết Nối (REPOS & PROJECTS)

Tài liệu này tổng hợp các kho mã nguồn, dự án và tài nguyên đã có trên hệ thống máy tính để các AI Agent trong dự án **Bắn Đền Web App** dễ dàng tra cứu, kế thừa và áp dụng:

---

## 1. Dự Án Hiện Tại
- **Đường dẫn:** `d:\google antigravity\Bắn đền`
- **Mục tiêu:** Ứng dụng Web & Game Tương Tác Bắn Đền đồ họa thời gian thực, giao diện hiện đại, tối ưu di động và máy tính.
- **Kiến trúc cốt lõi:**
  - **Framework:** Next.js / React, TypeScript.
  - **Styling & Theme:** Tailwind CSS, Glassmorphism, CSS Variables, Bento Grid.
  - **Component Library:** Shadcn UI, Lucide Icons, Radix Primitives.
  - **Visuals & Motion:** Canvas 2D Engine, Three.js WebGL, GSAP Animations.
  - **Đội ngũ AI & Kỹ năng:** Hệ thống Agent trong `.agents/agents/` và kỹ năng trong `.agents/skills/`.

---

## 2. Dự Án Kế Thừa: App Đá Bóng
- **Đường dẫn:** `d:\google antigravity\App đá bóng`
- **Tài nguyên kế thừa:**
  - Cấu trúc chuẩn hóa của Next.js + Tailwind CSS + Shadcn UI (`components.json`, `tailwind.config.ts`, `globals.css`).
  - Kỹ thuật vẽ đồ họa trên Canvas 2D và định vị tọa độ tương tác (X%, Y%).
  - Các hiệu ứng Tween tỷ số, điểm số với GSAP (`ScoreboardTween`, `gsap.context()`).
  - Hệ thống Mock Data và lưu trữ LocalStorage client-side mượt mà.

---

## 3. Dự Án Kế Thừa: MOS Master Studio
- **Đường dẫn:** `d:\google antigravity\mos-master-studio`
- **Tài nguyên kế thừa:**
  - **Three.js GPU Lifecycle Guard:** Kỹ thuật render WebGL dọn dẹp bộ nhớ tuyệt đối khi unmount, đưa GPU về 0%.
  - **Spatial Bento Grid & Glassmorphism:** Thiết kế đa ô lưới đẳng cấp từ `design-dna`.
  - **Quy trình 4-Agent Loop**: `[ARCHITECT] -> [CODER] -> [REVIEWER] -> [TESTER]`.
  - **Quy chuẩn Token Economy**: Viết code modular (<150 dòng/file), cấm đọc thư mục rác.

---

## 4. Dự Án Kế Thừa: ANhthe Studio
- **Đường dẫn:** `d:\google antigravity\ANhthe`
- **Tài nguyên kế thừa:**
  - Kỹ thuật điều khiển Canvas 2D độ nét cao (Retina DPI scaling, Mouse & Touch events).
  - Tối ưu hóa Client-side state, Responsive UI thân thiện trên điện thoại di động (Mobile-First).
  - Hiệu ứng ăn mừng (Canvas Confetti / Particle fireworks).

---

## 5. Hệ Sinh Thái Toàn Cục (Global Agency Agents & Plugins)
- **Đường dẫn Plugin:** `C:\Users\phuoc\.gemini\config\plugins\agency-agents`
- **Thư viện Skill toàn cục:** `C:\Users\phuoc\.agents\skills`
  - `shadcn`: Quy tắc sử dụng component registry, cấm code CSS thủ công lặp lại.
  - `design-dna`: Hệ thống 3 chiều (Design System, Design Style, Visual Effects).
  - `gsap-core`: Chuẩn mực viết tween và điều phối hoạt ảnh mượt mà.
