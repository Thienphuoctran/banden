# Bắn Đền — Nền Tảng Web Tương Tác & Trò Chơi Hiện Đại

Chào mừng bạn đến với dự án **Bắn Đền**, một ứng dụng web kết hợp trò chơi tương tác thời gian thực được thiết kế với chuẩn mực công nghệ cao, giao diện đồ họa hiện đại và hệ sinh thái AI Agent Antigravity.

---

## 🏛️ 1. Điểm Nhấn Kiến Trúc & Công Nghệ
- **Framework & Core:** Next.js 14+ (App Router), React 18/19, TypeScript.
- **Thư Viện Giao Diện:** Shadcn UI component registry (`@/components/ui/`), Tailwind CSS, Lucide Icons.
- **Đồ Họa & Tương Tác:**
  - **Canvas 2D / Three.js 3D Engine:** Hiệu ứng ngắm bắn, hạt nổ vật lý, phối cảnh đền đài tương tác 60fps.
  - **GPU Lifecycle Guard:** Cơ chế giải phóng bộ nhớ WebGL nghiêm ngặt đưa GPU về 0% khi unmount.
  - **GSAP 3:** Nội suy điểm số mượt mà (Score Tween), timeline xuất hiện và dọn dẹp với `gsap.context()`.
- **Thiết Kế:** Spatial Bento Grid, kính mờ Glassmorphism, phong cách Neon & Gold Temple huyền bí.

---

## 🤖 2. Hệ Thống AI Agents & Kỹ Năng Sẵn Sàng
- **Đặc tả AI Agent:** [AGENTS.md](file:///d:/google%20antigravity/Bắn%20đền/AGENTS.md)
- **Quy chuẩn hệ thống:** [GEMINI.md](file:///d:/google%20antigravity/Bắn%20đền/GEMINI.md)
- **Danh mục kết nối Repo:** [REPOS.md](file:///d:/google%20antigravity/Bắn%20đền/REPOS.md)

### Thư Viện Kỹ Năng Lập Trình Web (`.agents/skills/`):
1. **[`shadcn-ui`](file:///d:/google%20antigravity/Bắn%20đền/.agents/skills/shadcn-ui/SKILL.md)**: Quy tắc dùng component chuẩn hóa, cấm viết CSS thô lặp lại.
2. **[`design-dna`](file:///d:/google%20antigravity/Bắn%20đền/.agents/skills/design-dna/SKILL.md)**: Hệ thống thiết kế 3 chiều (Tokens, Bento Grid, Visual Effects).
3. **[`gsap-skills`](file:///d:/google%20antigravity/Bắn%20đền/.agents/skills/gsap-skills/SKILL.md)**: Hoạt ảnh mượt mà, số chạy tween, quản lý vòng đời React.
4. **[`threejs-skills`](file:///d:/google%20antigravity/Bắn%20đền/.agents/skills/threejs-skills/SKILL.md)**: Đồ họa 3D WebGL với Three.js & GPU Lifecycle Guard.
5. **[`canvas-interactive-engine`](file:///d:/google%20antigravity/Bắn%20đền/.agents/skills/canvas-interactive-engine/SKILL.md)**: Động cơ tương tác đồ họa 60fps, cơ chế bắn mục tiêu & hạt nổ.
6. **[`responsive-web-design`](file:///d:/google%20antigravity/Bắn%20đền/.agents/skills/responsive-web-design/SKILL.md)**: Chuẩn Mobile-First, vùng chạm an toàn, tương thích mọi thiết bị.
7. **[`clean-code-standards`](file:///d:/google%20antigravity/Bắn%20đền/.agents/skills/clean-code-standards/SKILL.md)**: Chuẩn code sạch <150 dòng/file, tách logic sang Custom Hooks.

---

## 🚀 3. Sẵn Sàng Thiết Kế Giao Diện
Toàn bộ hạ tầng, thư mục dự án và kỹ năng lập trình web đã được hoàn thiện. Chúng ta có thể bắt đầu ngay vào việc thiết kế cấu trúc màn hình, cơ chế tương tác và trải nghiệm người dùng!
