---
name: responsive-web-design
description: Kỹ năng thiết kế web đáp ứng (Responsive Web Design), triết lý Mobile-First, tối ưu hóa giao diện di động & màn hình lớn với Tailwind CSS, chuẩn UX cảm ứng và tiếp cận tiện lợi (Accessibility).
---

# Responsive Web Design & Mobile-First Standards

## 1. Triết Lý Mobile-First
- Mọi thành phần giao diện phải được thiết kế và kiểm thử bắt đầu từ màn hình nhỏ (360px - 414px) trước, sau đó mở rộng dần cho Tablet (768px) và Desktop (1024px, 1280px+).
- Cú pháp Tailwind CSS:
  ```tsx
  // Quy tắc: Class mặc định là mobile, sau đó thêm tiền tố md:, lg:
  <div className="flex flex-col gap-3 p-4 md:flex-row md:gap-6 md:p-6 lg:gap-8">
  ```

## 2. Tiêu Chuẩn Kích Thước & Vùng Chạm (Touch Target)
- **Vùng chạm di động (Touch Target):** Các nút bấm (Button), icon hành động và switch phải có kích thước tối thiểu `44x44px` (hoặc `h-11 min-w-[44px]`) để người dùng dễ bấm bằng ngón tay cái mà không bị ấn nhầm.
- **Form Controls:** `input` và `select` phải có font size tối thiểu `16px` (`text-base` trên mobile) để tránh Safari trên iOS tự động zoom in màn hình khi focus.
- **Safe Area Insets:** Hỗ trợ tai thỏ / thanh điều hướng bằng `pb-safe`, `pt-safe` hoặc `env(safe-area-inset-bottom)`.

## 3. Hệ Thống Layout Bento Grid Thích Ứng
- **Mobile (`<768px`):** Xếp chồng 1 cột (`grid-cols-1 gap-4`) giúp cuộn tự nhiên.
- **Tablet (`768px - 1024px`):** 2 cột (`md:grid-cols-2`).
- **Desktop (`>=1024px`):** 3-4 cột đa ô (`lg:grid-cols-3 xl:grid-cols-4`) với các ô trọng tâm chiếm `col-span-2` hoặc `row-span-2`.

## 4. Tối Ưu Tốc Độ & Core Web Vitals
- **Cumulative Layout Shift (CLS):** Luôn khai báo kích thước chiều rộng/cao cụ thể (`aspect-video`, `h-48`, v.v.) hoặc dùng `Skeleton` khi đang tải dữ liệu để tránh giật khung hình.
- **Largest Contentful Paint (LCP):** Ưu tiên hiển thị nội dung trên màn hình đầu tiên (Above-The-Fold), trì hoãn tải các hiệu ứng nền nặng cho đến khi DOM đã sẵn sàng.
