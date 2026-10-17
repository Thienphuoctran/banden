---
name: clean-code-standards
description: Tiêu chuẩn viết code sạch, kiến trúc module <150-200 dòng/file, tách biệt UI và logic với Custom Hooks, TypeScript nghiêm ngặt (Zero any) và tiết kiệm Token cho AI Agent.
---

# Clean Code & Modern Web Development Standards

## 1. Kiến Trúc Modular (<150 - 200 dòng/file)
- **Quy tắc Single Responsibility:** Mỗi file component chỉ đảm nhận một trách nhiệm duy nhất.
- Khi một file vượt quá 150 dòng, bắt buộc tách thành các sub-components hoặc trích xuất logic sang Custom Hook:
  - `src/components/feature/FeatureCard.tsx` (Giao diện hiển thị)
  - `src/components/feature/FeatureModal.tsx` (Hộp thoại tương tác)
  - `src/hooks/useFeatureLogic.ts` (State, validation, side-effects)
  - `src/types/feature.ts` (Interface & types)

## 2. Tiêu Chuẩn TypeScript Nghiêm Ngặt
- **Nghiêm cấm dùng kiểu `any`:** Định nghĩa kiểu dữ liệu rõ ràng cho props, state, API responses.
- Sử dụng Union types và Discriminated Unions cho các trạng thái giao diện:
  ```typescript
  export type GameState =
    | { status: "idle" }
    | { status: "playing"; score: number; combo: number }
    | { status: "game_over"; finalScore: number; reason: string };
  ```

## 3. Tách Biệt State & Hiệu Năng Render
- Không đưa các giá trị thay đổi liên tục (như vị trí chuột, frame timestamp) vào React State nếu không cần trigger re-render toàn bộ DOM -> Sử dụng `useRef`.
- Ghi nhớ các hàm callback truyền qua props bằng `useCallback`, tính toán nặng bằng `useMemo`.

## 4. Token & Quota Economy Cho AI Coding Agent
- Khi chỉnh sửa file, chỉ xuất đúng đoạn mã cần thay đổi (`replace_file_content`), không in lại hàng trăm dòng mã không đổi.
- Không quét hoặc đọc các thư mục rác: `node_modules`, `.next`, `dist`, `build`, `package-lock.json`.
- Tận dụng triệt để thư viện có sẵn (Shadcn UI, Lucide React, Tailwind CSS) thay vì tự viết lại từ đầu.
