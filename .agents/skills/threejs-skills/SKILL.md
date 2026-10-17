---
name: threejs-skills
description: Kỹ năng đồ họa 3D WebGL với Three.js trong ứng dụng web. Xây dựng cảnh 3D tương tác, hạt ánh sáng, mô hình và cơ chế bắt buộc GPU Lifecycle Guard dọn dẹp bộ nhớ chống quá tải máy.
---

# Three.js 3D WebGL & GPU Lifecycle Guard

## 1. Mục Tiêu & Ứng Dụng
Three.js mang đến chiều sâu không gian và hiệu ứng 3D ấn tượng cho ứng dụng web:
- **3D Interactive Hero:** Nền không gian 3D tương tác theo con trỏ chuột (tinh cầu, hạt ánh sáng, mô hình 3D).
- **Mô phỏng vật thể / Nhân vật / Bàn đấu 3D:** Hiển thị trực quan vật phẩm, bối cảnh, mô hình xoay 360 độ.

## 2. Quy Tắc Bắt Buộc: GPU Lifecycle Guard
Các ứng dụng WebGL nếu không giải phóng tài nguyên khi chuyển trang hoặc unmount component sẽ gây ra rò rỉ bộ nhớ (WebGL context leak), khiến trình duyệt bị giật lag hoặc crash card đồ họa (GPU).
**BẮT BUỘC** thực hiện quy trình giải phóng triệt để:
1. Hủy vòng lặp render: `cancelAnimationFrame(reqId)`.
2. Dọn sạch Renderer: `renderer.dispose()`, `renderer.forceContextLoss()`.
3. Duyệt và dọn sạch toàn bộ Geometry, Material, Texture trong Scene:
   - `geometry.dispose()`
   - `material.dispose()`
   - `texture.dispose()`
4. Gỡ bỏ Canvas DOM element khỏi container.

## 3. Component React Mẫu Đạt Chuẩn GPU Guard:
```tsx
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export function ThreeSceneContainer() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Khởi tạo Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Tạo vật thể mẫu
    const geometry = new THREE.IcosahedronGeometry(2, 1);
    const material = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Ánh sáng
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Vòng lặp render
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      mesh.rotation.x += 0.005;
      mesh.rotation.y += 0.008;
      renderer.render(scene, camera);
    };
    animate();

    // Xử lý thay đổi kích thước màn hình
    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // CLEANUP - GPU LIFECYCLE GUARD
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      // Giải phóng bộ nhớ WebGL
      scene.remove(mesh);
      geometry.dispose();
      material.dispose();

      renderer.dispose();
      renderer.forceContextLoss();
      if (renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full min-h-[300px]" />;
}
```
