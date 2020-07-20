Xây dựng module export message ra html, để có thể xem trực tiếp từ browser. User có thể đóng gói lại và mở coi ở bất kì máy tính nào (có và không có internet)

Yêu cầu cơ bản như sau:
- Input là array message (dùng react devtools trên Zalo Web để lấy data mẫu)
- Hỗ trợ đầy đủ các loại message Zalo đang có (text, file, ảnh, sticker (động/tĩnh), danh thiếp, địa điểm, link...)
- UI ở mức tạm ổn, không cần giống hoàn toàn ZaloPC
- Đối với những message có external resource (file, ảnh, sticker,...): dựa vào resource URL để tải resource về lưu local, attach theo folder export
- Bấm vào message file, hình, link sẽ mở tab mới để hiện resource

Tham khảo tính năng này của Telegram
