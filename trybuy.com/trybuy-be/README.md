## Video 1 - 30
[Tổng hợp bài học từ 1 - 30 của NestJS Backend](https://www.youtube.com/playlist?list=PLw0w5s5b9NK7HkcQUBIxjcHPB2DS4UKDg)

<h1 align="center">TRYBUY</h1>

<br />

<p align="center"><strong>TRYBUY</strong> là một nền tảng mạng xã hội đánh giá sản phẩm ngách, được xây dựng <strong>bởi lập trình viên, dành cho lập trình viên</strong>. Nền tảng được phát triển trên <strong>NestJS</strong> cho backend và <strong>React (Vite)</strong> cho frontend, cung cấp một không gian đáng tin cậy để chia sẻ, khám phá và thảo luận về các sản phẩm công nghệ. TRYBUY giải quyết vấn đề nhiễu thông tin bằng cách cung cấp các bài đánh giá sâu sắc, có cấu trúc và được xác thực bởi cộng đồng chuyên môn.</p>

<hr />

<p align="center">
    <strong><a href="https://trybuy.com/">Khám phá TRYBUY</a></strong>
</p>

<hr />

<hr />

<strong>
    <p align="center">
        Tham gia thảo luận, đặt câu hỏi, và đóng góp ý tưởng tại cộng đồng <strong><a href='https://youtu.be/hcz1-Srwh6k'>Discord</a></strong> của chúng tôi!
    </p>
</strong>

<hr />

<details open>
<summary>Tính Năng Nổi Bật (Features)</summary>

<br/>

- **Mã nguồn mở & Tự lưu trữ (Self-hosted):** Toàn quyền kiểm soát dữ liệu và hạ tầng của bạn.
- **Xác thực an toàn:** Hỗ trợ đăng ký/đăng nhập bằng Email/Password (với OTP) và các nền tảng xã hội như GitHub.
- **Hệ thống phân quyền (RBAC):** Phân chia rõ ràng vai trò giữa Thành viên, Moderator và Admin.
- **Quản lý nội dung chuyên nghiệp:**
    - Tạo bài đánh giá có cấu trúc: Rating, thông tin mua hàng (ngày, nơi mua, giá), tình trạng hỏng hóc...
    - **Hệ thống kiểm duyệt:** Mọi bài đánh giá đều cần được Admin phê duyệt trước khi hiển thị, đảm bảo chất lượng nội dung.
- **Tương tác cộng đồng mạnh mẽ:**
    - Bình luận và trả lời đa cấp (giữ giao diện 1 cấp).
    - Hệ thống Upvote/Downvote cho cả bài đánh giá và bình luận.
    - Đánh dấu bình luận của chủ bài viết (OP).
    - Lưu lại (Bookmark) các bài viết yêu thích.
- **Tìm kiếm thông minh với Elasticsearch:**
    - Tìm kiếm Full-text mạnh mẽ, tự nhiên trên tiêu đề và nội dung.
    - Lọc sản phẩm theo nhiều tiêu chí (facet search): danh mục, thương hiệu, khoảng giá, rating...
- **API Documentation tự động:** Sử dụng **Swagger (OpenAPI)** tích hợp sẵn trong NestJS để tạo tài liệu API rõ ràng, tương tác.
- **Nền tảng cho tương lai:**
    - **Hệ thống đấu giá:** Kiến trúc sẵn sàng để mở rộng tính năng đấu giá các sản phẩm công nghệ đã qua sử dụng.
    - Gợi ý sản phẩm thông minh dựa trên hành vi người dùng.
- **Thông báo đa kênh:** Gửi thông báo qua Email (sử dụng AWS SES) và trên nền tảng.
- **Tối ưu cho Lập trình viên:** Hỗ trợ định dạng Markdown trong các bài viết và bình luận, cho phép chèn code block.

</details>

<details>
<summary>Kiến Trúc Kỹ Thuật (Tech Stack)</summary>

<br>

- **Frontend:** **React (Vite) + TypeScript** - Nhanh, mạnh mẽ và an toàn kiểu dữ liệu.
- **Backend:** **NestJS + TypeScript** - Kiến trúc backend module hóa, có cấu trúc và khả năng mở rộng cao.
- **Database:**
    - **MySQL:** Lưu trữ dữ liệu quan hệ (Users, Products, Reviews...).
    - **Redis:** Caching, quản lý phiên và OTP.
    - **Elasticsearch:** Cung cấp khả năng tìm kiếm và phân tích nâng cao.
- **Gateway:** **Nginx** - Đóng vai trò Reverse Proxy, Load Balancer và phục vụ file tĩnh.
- **Deployment:** **Docker & Docker Compose** để đóng gói và điều phối toàn bộ ứng dụng.
- **Process Manager:** **PM2** để quản lý và đảm bảo ứng dụng backend luôn hoạt động ổn định.

</details>

<details>
<summary>Tài Liệu API (REST API)</summary>
<br>
Tài liệu API được tự động tạo bởi Swagger và có thể truy cập tại: http://localhost:3000/api (với port mặc định của backend là 3000).

## Authentication

```bash
# Gửi OTP để đăng ký
curl -X POST "http://localhost:3000/auth/send-otp" -H "Content-Type: application/json" --data '{"email":"user@example.com"}'

# Đăng ký
curl -X POST "http://localhost:3000/auth/register" -H "Content-Type: application/json" --data '{"username":"newuser", "email":"user@example.com", "password":"...", "otp":"..."}'

# Đăng nhập
curl -X POST "http://localhost:3000/auth/login" -H "Content-Type: application/json" --data '{"username":"newuser", "password":"..."}'
```

## User
```bash
# Lấy thông tin cá nhân (yêu cầu token)
curl -X GET "http://localhost:3000/users/me" -H "Authorization: Bearer YOUR_JWT_TOKEN"
```
</details>