# 💖 Website Chúc Mừng Sinh Nhật Người Yêu (Khánh Vy)

Một website chúc mừng sinh nhật được thiết kế vô cùng **hiện đại, lãng mạn và giàu cảm xúc**. Được xây dựng dựa trên phong cách thiết kế **Liquid Romance & Glowing Nostalgia** với các chuyển động mượt mà, tối ưu hóa trải nghiệm trên cả điện thoại di động và máy tính.

---

## 🎨 Phong Cách Thiết Kế & Trải Nghiệm (UI/UX)
- **Tông màu chủ đạo**: Hồng phấn pastel ngọt ngào, trắng ngà ấm áp, kết hợp với các điểm nhấn tím Lavender nhạt sắc sảo tôn lên vẻ đẹp kiêu sa, lãng mạn.
- **Font chữ pairing cực đẹp**: 
  - Tiêu đề (Heading): *Playfair Display* (Serif cổ điển đầy sang trọng).
  - Nội dung (Body): *Poppins* (Sans-serif hiện đại, thanh thoát và dễ đọc).
- **Tương tác chuyển động (Framer Motion)**:
  - **Loading Screen**: Nhịp tim đập 3D kèm hiệu ứng lan tỏa, đếm tiến trình phần trăm suspense tăng dần.
  - **Hero Particle**: Canvas hearts rơi lửng lơ trên nền gradient mềm mại.
  - **Hiệu ứng chuột (Mouse Trail)**: Các hạt trái tim stardust màu hồng phấn lấp lánh bay theo con trỏ chuột và khói bốc lên nhẹ khi di chuyển.
  - **Thiệp 3D (Love Letter)**: Tấm thiệp mở bằng hiệu ứng lật thực tế 3D, mở ra lời chúc gõ chữ (typing effect) từng dòng cực kỳ chân thực.
  - **Sách kỷ niệm (Memory Book)**: Các tấm ảnh Polaroid lật trang mượt mà dựa trên góc xoay spine 3D, hỗ trợ kéo vuốt (swipe) trực quan trên điện thoại.
  - **Dòng chảy thời gian (Love Story)**: Stardust timeline kết nối các mốc kỷ niệm ấm áp, sáng bừng lên khi cuộn trang.
  - **Final Fireworks**: Màn pháo hoa nở rộ với mật độ cao sử dụng thuật toán Canvas-Confetti, mang đến cao trào cảm xúc khó quên.

---

## 🛠️ Công Nghệ Sử Dụng
- **Core**: Next.js 15 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 (Cấu trúc HSL và hiệu ứng glow hiện đại)
- **Animation**: Framer Motion
- **Confetti**: Canvas-Confetti & Lucide React Icons

---

## 📁 Cấu Trúc Thư Mục Dự Án
```text
/
├── public/                 # Các tệp tĩnh (ảnh, favicon)
├── src/
│   ├── app/                # Next.js App Router (Layouts & Global Styles)
│   │   ├── layout.tsx      # Quản lý Fonts, Metadata và SEO
│   │   ├── page.tsx        # Trang chủ lắp ráp các Section & Hiệu ứng chuột
│   │   └── globals.css     # Định nghĩa Tailwind v4, scrollbars và cursor
│   ├── components/         # Các thành phần giao diện lãng mạn
│   │   ├── AudioProvider.tsx  # Quản lý nhạc nền, autoplay, visualizer
│   │   ├── LoadingScreen.tsx  # Màn hình chờ nhịp tim pulsing
│   │   ├── Hero.tsx           # Banner trái tim rơi tự do & nút Kích hoạt âm thanh
│   │   ├── MusicPlayer.tsx    # Widget nhạc floating + visualizer nhảy theo điệu
│   │   ├── LoveLetter.tsx     # Tấm thiệp 3D gõ chữ lời chúc tiếng Việt
│   │   ├── MemoryBook.tsx     # Album Polaroid lật trang mượt mà
│   │   ├── LoveTimeline.tsx   # Dòng thời gian tình yêu lấp lánh
│   │   ├── Wishes.tsx         # Không gian trôi nổi các câu chúc ngọt ngào
│   │   └── FinalSection.tsx   # Pháo hoa bùng nổ kết thúc trọn vẹn
│   └── data/
│       └── birthdayData.json  # Dữ liệu nội dung, lời chúc, ảnh Polaroid dạng JSON
├── package.json            # Quản lý phiên bản dependencies
└── tsconfig.json           # Cấu hình TypeScript nghiêm ngặt
```

---

## ✍️ Hướng Dẫn Thay Đổi Nội Dung Độc Quyền
Toàn bộ chữ, ảnh, mốc lịch sử, lời chúc của website đã được cấu trúc hóa toàn bộ vào file dữ liệu JSON duy nhất tại:
👉 `src/data/birthdayData.json`

Bạn chỉ cần mở tệp này ra và chỉnh sửa các giá trị:
1. **girlFriendName**: Tên của cô ấy (Ví dụ: `"Khánh Vy"`).
2. **birthDate**: Ngày sinh nhật của cô ấy (Ví dụ: `"21/05"`).
3. **loveLetter.letterLines**: Từng dòng bức thư tình dài sâu sắc bằng tiếng Việt của bạn.
4. **album**: Mảng 8 tấm ảnh Polaroid của hai bạn. Thay đổi giá trị `photoUrl` bằng link ảnh thật (hoặc upload ảnh vào thư mục `public/` rồi điền `/photo1.jpg`) và viết `caption` cho mỗi bức ảnh.
5. **timeline**: Điền các mốc thời gian kỷ niệm thực tế của hai bạn kèm tiêu đề và mô tả cảm xúc chi tiết.
6. **wishes**: Thêm/sửa các câu chúc ngắn ngọt ngào lửng lơ trong gió.

---

## 🚀 Hướng Dẫn Chạy Dưới Local
Yêu cầu máy tính của bạn đã cài đặt **Node.js** (Phiên bản 18 trở lên).

1. **Cài đặt các dependencies**:
   ```bash
   npm install
   ```

2. **Chạy server phát triển (Development server)**:
   ```bash
   npm run dev
   ```

3. **Mở trình duyệt truy cập**:
   Địa chỉ: [http://localhost:3000](http://localhost:3000) để chiêm ngưỡng tác phẩm nghệ thuật tình yêu.

4. **Kiểm tra bản build tối ưu**:
   ```bash
   npm run build
   ```

---

## ☁️ Hướng Dẫn Deploy Lên Vercel (Miễn Phí)
Vercel là nền tảng tối ưu nhất cho Next.js, giúp trang web của bạn chạy siêu tốc, bảo mật HTTPS miễn phí và hoàn tất chỉ trong 2 phút!

### Cách 1: Deploy Trực Tiếp Qua Vercel CLI (Nhanh nhất từ Terminal)
1. **Cài đặt Vercel CLI trên máy**:
   ```bash
   npm install -g vercel
   ```
2. **Đăng nhập vào tài khoản Vercel**:
   ```bash
   vercel login
   ```
3. **Tiến hành Deploy**:
   Chạy lệnh sau tại thư mục gốc của dự án:
   ```bash
   vercel
   ```
   - Chọn `Yes` để liên kết dự án.
   - Nhấn `Enter` để chọn thiết lập mặc định.
   Trình duyệt sẽ hiển thị trang web đã được build và cho bạn link preview.
4. **Deploy production chính thức**:
   ```bash
   vercel --prod
   ```
   Bạn sẽ nhận được một địa chỉ web rút gọn dạng `.vercel.app` tuyệt đẹp để gửi tặng cô ấy ngay lập tức!

### Cách 2: Deploy Qua GitHub (Tự động cập nhật khi đổi dữ liệu)
1. Tạo một Repository mới trên GitHub (Ví dụ: `happy-birthday-my-love`).
2. Commit toàn bộ code của bạn lên Git Repository đó.
3. Truy cập vào trang quản trị [Vercel Dashboard](https://vercel.com/dashboard) và đăng nhập bằng tài khoản GitHub.
4. Nhấn nút **"Add New..."** -> chọn **"Project"**.
5. Nhập repository `happy-birthday-my-love` bạn vừa tạo từ danh sách GitHub.
6. Giữ nguyên mọi cấu hình mặc định (Next.js sẽ tự động được nhận diện) và nhấn **"Deploy"**.
7. Vercel sẽ tự động build trang web và cấp cho bạn một domain HTTPS miễn phí. Mỗi khi bạn sửa file `birthdayData.json` trên GitHub, trang web sẽ tự động cập nhật phiên bản mới sau 30 giây!
