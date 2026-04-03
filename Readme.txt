Hướng dẫn Khởi chạy: Smart Attendance System

1. GIỚI THIỆU DỰ ÁN
Smart Attendance System là ứng dụng điểm danh sinh viên Serverless, hoạt động dựa trên cấu trúc phân tích hình ảnh Máy học (Machine Learning) tích hợp thẳng vào trình duyệt web (100% Client-Side sử dụng Mô hình BlazeFace & TensorFlow.js).
Sinh viên thực hiện: Nguyễn Việt Nghĩa (MSSV: 52400024)

2. YÊU CẦU HỆ THỐNG
- Hệ điều hành: Windows 11 / macOS / Linux
- Trình duyệt: Google Chrome (phiên bản v100+) / Microsoft Edge (Đạt chuẩn API hỗ trợ WebGL)
- Môi trường: Node.js (từ phiên bản v18.0.0 trở lên)
- Trình quản lý gói (Package Manager): cài đặt sẵn npm hoặc pnpm
- Phần cứng: Webcam tích hợp hoặc thiết bị Webcam gắn ngoài (độ phân giải tối thiểu 720p).

3. CÁCH CÀI ĐẶT VÀ CHẠY KIỂM THỬ (TESTING)
Dự án này là ứng dụng nền Web (phối hợp React + Vite), quản lý cấu trúc thư viện độc quyền qua tệp package.json (Lưu ý: Kiến trúc dự án thuộc Môn Lập trình Web, đây không phải ứng dụng giao diện di động Flutter nên hệ thống không bao gồm và không sử dụng tệp pubspec.yaml).

Nếu cài từ github thì cần chạy lệnh sau (bỏ qua nếu đã có src rồi, link github: https://github.com/vietngia249/midterm_web.git):
```bash
git clone https://github.com/vietngia249/midterm_web.git
```

Note: bỏ qua bước này nếu đã có src rồi
Bước 1: Mở Terminal / Command Prompt và di chuyển vào thư mục frontend:
```bash
cd frontend
```

Bước 2: Tải xuống và cài đặt tất cả thư viện phụ thuộc (Dependencies):
```bash
pnpm install
# (Vui lòng sử dụng lệnh "npm install" nếu cấu hình máy tính của bạn không có sẵn core pnpm)
```

Bước 3: Khởi động máy chủ phát triển (Development Server):
```bash
pnpm run dev
# (Hoặc sử dụng lệnh "npm run dev")
```

Bước 4: Hướng dẫn kiểm thử chức năng trên trình duyệt:
- Mở trình duyệt Web và truy cập URL nội bộ: http://localhost:5173
- Bấm Cho phép (Allow) để trình duyệt cấp quyền lấy luồng Video từ thiết bị Webcam của bạn.
- Chờ vài giây để quy trình nạp dữ liệu Mô hình dự đoán AI BlazeFace kích hoạt thành công (Trạng thái mạng lưới WebGL sẽ được hiển thị).
- Cố định khuôn mặt vào tầm quét khung hình, bạn sẽ thấy Khung viền giới hạn (Bounding Box) màu xanh lá cây lập tức xuất hiện bám sát quỹ đạo.
- Điền họ tên của bạn vào ô trống và nhấn bấm "Check In" để hệ thống ghi dữ kiện điểm danh vào luồng bộ nhớ LocalStorage.
- Quan sát danh sách cập nhật trực tiếp kế bên, nhấn phím "Export CSV" nhằm mục đích tải tệp tin báo cáo sinh viên toàn vẹn định dạng utf-8 về máy để kiểm chứng độ chính xác.

4. CẤU TRÚC THƯ MỤC CỐT LÕI (DIRECTORY STRUCTURE)
- /src/App.jsx: Các phân đoạn tổng quản điều phối giao diện chính của toàn hệ thống.
- /src/hooks/useFaceDetection.js: Logic vòng lặp chạy suy luận thuật toán học máy TensorFlow.js (Inference) và mã hóa kết quả vẽ lại Bounding Boxes trên Canvas.
- /package.json: Danh sách liệt kê tất cả trình cài đặt các phụ thuộc của dự án môi trường Runtime Node.js.

Note: đây là link video demo dự phòng
https://youtu.be/VPeXPW0pxRI