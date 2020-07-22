Từ data message dạng JSON tạo ra file HTML & CSS & JS để coi được trên browser. User có thể đóng gói lại và mở coi ở bất kì máy tính nào (có và không có internet)

## Yêu cầu

- Input là array message (dùng react devtools trên Zalo Web để lấy data mẫu)
- Output là folder `output` chứa html cùng tất cả resource dùng để hiển thị được hoàn thiện file html đó.
- Hỗ trợ đầy đủ các loại message Zalo đang có (text, file, ảnh, sticker (động/tĩnh), danh thiếp, địa điểm, link, folder...)
- UI ở mức tạm ổn, không cần giống hoàn toàn ZaloPC
- Đối với những message có external resource (file, ảnh, sticker,...): dựa vào resource URL để tải resource về lưu local, attach theo folder export
- Bấm vào message file, hình, link sẽ mở tab mới để hiện resource
- Sticker động phải work như bình thường
- Avatar hiện được hình
- Dùng ngôn ngữ là tiếng Việt
- Layout tham khảo Telegram
- Cấu trúc các thư mục output tự định nghĩa

Hỗ trợ những loại message sau:

- Text
- File
- Ảnh
- Sticker (động/tĩnh)
- Danh thiếp
- Địa điểm
- Link
- Folder
- Video
- Voice
- Message đã thu hồi

Không cần hỗ trợ (hiện JSON gốc ở dạng collapsible với những message này):

- Group photo
- Poll
- Reminder

## Làm việc

- Tạo nhánh mới trên repo này và làm việc ngay trên đó.
- Commit thường xuyên.
- Khi làm xong, tạo pull request để supervisor review.
- Độ rõ ràng và chất lượng mỗi commit cũng được dùng làm tiêu chí đánh giá.

## Tham khảo

- Export Chat History của Telegram
- Định nghĩa các loại message trong `constants.js`

## Install & run

- npm i
- node index.js

  Vào thư mục downloads ở local
