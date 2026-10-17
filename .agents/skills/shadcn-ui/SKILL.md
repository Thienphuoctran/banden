---
name: shadcn-ui
description: Chuyên gia và quy chuẩn thư viện thành phần shadcn/ui. Tối ưu token, sử dụng component registry chuẩn, không viết code CSS thủ công lặp lại.
---

# shadcn/ui Official Guidelines for AI Coding Agents

## 1. Nguyên Tắc Cốt Lõi: Tuyệt đối không code UI từ đầu
Khi xây dựng bất kỳ thành phần giao diện nào (buttons, cards, dialogs, progress bars, tables, tabs, inputs, dropdowns, sheets, badges):
- **BẮT BUỘC** sử dụng các component chuẩn hóa của `shadcn/ui` trong thư mục `@/components/ui/`.
- Các component cốt lõi sẵn dùng:
  - `button`, `card`, `dialog`, `progress`, `table`, `tabs`, `input`, `badge`, `avatar`, `alert`, `skeleton`, `slider`, `switch`, `sheet`, `tooltip`.

## 2. Chiến Lược Tiết Kiệm Token & Quota
- Không xuất hàng trăm dòng mã Tailwind CSS cho các thành phần đã có sẵn trong shadcn/ui.
- Chỉ cần import và tái sử dụng:
  ```tsx
  import { Button } from "@/components/ui/button";
  import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
  import { Badge } from "@/components/ui/badge";
  ```
- Tập trung mã nguồn vào logic nghiệp vụ, tính toán tương tác và trải nghiệm người dùng.

## 3. Quy Chuẩn Tùy Biến
- Tùy biến biến thể (variants) thông qua `cva` (class-variance-authority) trong component hoặc truyền class tùy chỉnh qua prop `className={cn("...", className)}`.
- Đảm bảo tính nhất quán của theme (Dark/Light mode, màu chủ đạo, viền, border radius).
