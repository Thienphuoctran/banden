# Master System Guidelines for Bắn Đền Web Project

## 1. Trigger /pipeline (4-Agent Loop)
Khi người dùng yêu cầu làm một tính năng mới hoặc prompt bắt đầu bằng `/pipeline`: Chạy khép kín 4 bước:
1. **[ARCHITECT]**: Khóa Spec & Hợp đồng dữ liệu (TypeScript interfaces, Input/Output, State schema).
2. **[CODER]**: Viết code modular (<150-200 dòng/file), bắt buộc dùng `shadcn/ui` tại `@/components/ui/`.
3. **[REVIEWER]**: Soi lỗi logic, kiểm tra memory leak, dọn dẹp GPU / canvas loop, rà soát hiệu năng render trên mobile.
4. **[TESTER]**: Kiểm thử tương tác nhắm/bắn, click, đổi tab và luồng người dùng trên các màn hình.

## 2. Token & Quota Economy
- Chỉ chỉnh sửa đúng đoạn code cần sửa (`replace_file_content`), tuyệt đối không in lại toàn bộ file dài.
- Khi làm Web: Bắt buộc dùng component của `shadcn/ui` (`src/components/ui/`) để giảm thiểu code CSS viết tay.
- Cấm đọc các thư mục/file nặng: `node_modules`, `.git`, `.next`, `dist`, `build`, `package-lock.json`.

## 3. Kiến Trúc Cốt Lõi Dự Án
- **Framework**: Next.js 14+ / React 18-19, TypeScript, Tailwind CSS, Shadcn UI, Lucide React.
- **Visuals & Motion**:
  - Interactive Canvas 2D / Three.js 3D (Đồ họa đền đài, mục tiêu, vòng ngắm, hiệu ứng hạt nổ).
  - GSAP (Tween điểm số, hoạt ảnh thanh năng lượng, combo streak, popup phần thưởng).
  - Glassmorphism & Spatial Bento Grid (Giao diện điều khiển, bảng thành tích, tùy chọn nâng cấp).
- **Phân Hệ Nghiệp Vụ Chính**:
  1. **Game/Interactive Stage**: Khu vực trung tâm hiển thị cảnh đền và mục tiêu ngắm bắn với vòng lặp 60fps.
  2. **Control & Upgrades Dashboard**: Bảng điều khiển nâng cấp vũ khí, chọn chế độ chơi, tốc độ và lực bắn.
  3. **Score & Combo Tracker**: Hệ thống tính điểm liên hoàn (combo streak), bảng thành tích kỷ lục cá nhân.
  4. **Settings & Audio Engine**: Tùy chỉnh âm thanh hiệu ứng (SFX), nhạc nền, chế độ hiển thị đồ họa cao/thấp.

## 4. Danh Mục Tài Liệu Trọng Yếu
- [REPOS.md](file:///d:/google%20antigravity/Bắn%20đền/REPOS.md): Các kho mã nguồn kế thừa (`mos-master-studio`, `App đá bóng`, `ANhthe`).
- [AGENTS.md](file:///d:/google%20antigravity/Bắn%20đền/AGENTS.md): Đội ngũ chuyên gia AI chuyên sâu.
- Các skill trong `.agents/skills/`: `shadcn-ui`, `design-dna`, `gsap-skills`, `threejs-skills`, `canvas-interactive-engine`, `responsive-web-design`, `clean-code-standards`.
