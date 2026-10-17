# Bắn Đền Web App — Antigravity Agent Ecosystem

Dự án này là nền tảng **Web Ứng Dụng & Trò Chơi Tương Tác Bắn Đền**, tích hợp đồ họa tương tác Canvas 2D/3D hiện đại, giao diện chuẩn hóa với Shadcn UI, chuyển động mượt mà bằng GSAP và thiết kế Mobile-First.

---

## 1. Hệ thống AI Agents Chuyên Sâu (trong `.agents/agents/`)
1. **[01-orchestrator.md](file:///d:/google%20antigravity/Bắn%20đền/.agents/agents/01-orchestrator.md)**: Tổng Đạo Diễn Dự Án (Spec-First, chia pha và điều phối tiến độ)
2. **[02-backend-architect.md](file:///d:/google%20antigravity/Bắn%20đền/.agents/agents/02-backend-architect.md)**: Kỹ sư Kiến Trúc API & State Management
3. **[03-frontend-ui.md](file:///d:/google%20antigravity/Bắn%20đền/.agents/agents/03-frontend-ui.md)**: Chuyên gia Frontend & UI/UX (shadcn/ui Master, Mobile-First, Bento Grid)
4. **[04-game-canvas-engine.md](file:///d:/google%20antigravity/Bắn%20đền/.agents/agents/04-game-canvas-engine.md)**: Chuyên gia Tương Tác Đồ Họa & Canvas 2D/3D Engine
5. **[06-code-reviewer.md](file:///d:/google%20antigravity/Bắn%20đền/.agents/agents/06-code-reviewer.md)**: Chuyên gia Soi Mã & Rà soát Lỗi logic (<150 dòng/file, Clean Code)
6. **[07-qa-tester.md](file:///d:/google%20antigravity/Bắn%20đền/.agents/agents/07-qa-tester.md)**: Kỹ sư Kiểm thử Giao diện & Trải nghiệm Người dùng

---

## 2. Hệ thống Kỹ Năng / Web Skills (trong `.agents/skills/`)
- **[`shadcn-ui`](file:///d:/google%20antigravity/Bắn%20đền/.agents/skills/shadcn-ui/SKILL.md)**: Bộ component UI chuẩn hóa (Button, Card, Badge, Dialog, Tabs, Input, Slider, Sheet). Cấm code CSS thô lặp lại.
- **[`design-dna`](file:///d:/google%20antigravity/Bắn%20đền/.agents/skills/design-dna/SKILL.md)**: Hệ thống giao diện 3 chiều (Design Tokens, Spatial Bento Grid, kính mờ Glassmorphism, hiệu ứng thị giác).
- **[`gsap-skills`](file:///d:/google%20antigravity/Bắn%20đền/.agents/skills/gsap-skills/SKILL.md)**: Điều phối hoạt ảnh mượt mà, nội suy điểm số (number tween), timeline liên hoàn và quản lý vòng đời với `gsap.context()`.
- **[`threejs-skills`](file:///d:/google%20antigravity/Bắn%20đền/.agents/skills/threejs-skills/SKILL.md)**: Đồ họa 3D WebGL với Three.js, hạt ánh sáng, mô hình và cơ chế bắt buộc GPU Lifecycle Guard giải phóng bộ nhớ.
- **[`canvas-interactive-engine`](file:///d:/google%20antigravity/Bắn%20đền/.agents/skills/canvas-interactive-engine/SKILL.md)**: Động cơ tương tác Canvas 2D, vòng lặp 60fps, xử lý nhắm bắn, va chạm và hệ thống hạt nổ (particle physics).
- **[`responsive-web-design`](file:///d:/google%20antigravity/Bắn%20đền/.agents/skills/responsive-web-design/SKILL.md)**: Quy chuẩn Mobile-First, vùng chạm cảm ứng an toàn, bố cục Bento Grid tự co giãn theo màn hình.
- **[`clean-code-standards`](file:///d:/google%20antigravity/Bắn%20đền/.agents/skills/clean-code-standards/SKILL.md)**: Tiêu chuẩn viết code sạch, module hóa <150 dòng/file, tách logic sang Custom Hooks, TypeScript nghiêm ngặt.

---

## 3. Quy trình Thực thi Chuẩn (4-Agent Loop)
Mỗi tính năng mới bắt buộc đi qua 4 trạm:
`[ARCHITECT]` (Khóa Spec tiêu chuẩn) ➔ `[CODER]` (Viết code modular với Shadcn & Tailwind) ➔ `[REVIEWER]` (Rà soát logic & tối ưu re-render) ➔ `[TESTER]` (Kiểm thử tải giao diện và tương tác).

---

## 4. Tài Liệu Kế Thừa Liên Quan
- Danh mục Repo kế thừa: [REPOS.md](file:///d:/google%20antigravity/Bắn%20đền/REPOS.md)
- Nguyên tắc chỉ đạo AI: [GEMINI.md](file:///d:/google%20antigravity/Bắn%20đền/GEMINI.md)
