package com.API.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.API.model.Order;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class MailService {
	@Autowired
    private JavaMailSender javaMailSender;


    @Async
    public void sendSimpleEmail(String to, String subject, String text) {
        try {
            // Tạo MimeMessage để gửi email
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, false, "UTF-8");

            // Đặt thông tin gửi mail
            messageHelper.setFrom("your-email@gmail.com");
            messageHelper.setTo(to);
            messageHelper.setSubject(subject);
            
            // Gửi email dưới dạng HTML
            String htmlContent = "<html><body>" +
                                 "<div style='background-color: #4CAF50; color: white; padding: 10px; text-align: center; font-size: 24px;'>Mã xác thực</div>" +
                                 "<p style='font-size: 18px;'>Mã xác thực bắt buộc để truy cập tài liệu: <strong>" + text + "</strong></p>" +
                                 "<p style='font-size: 16px;'>Không chia sẻ email này. Để bảo mật thông tin, vui lòng không chia sẻ email cho người khác.</p>" +
                                 "<p style='font-size: 16px;'>Thắc mắc về tài liệu? Mọi thắc mắc sẽ được liên hệ trực tiếp với người gửi.</p>" +
                                 "</body></html>";
            
            messageHelper.setText(htmlContent, true); // true để email là dạng HTML
            
            // Gửi email
            javaMailSender.send(mimeMessage);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
    
    @Async
    public void sendEmailNotRecive(String to, String subject, Order o) {
        try {
            // Tạo MimeMessage để gửi email
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, false, "UTF-8");

            // Đặt thông tin gửi mail
            messageHelper.setFrom("your-email@gmail.com");
            messageHelper.setTo(to);
            messageHelper.setSubject(subject);

            // Gửi email dưới dạng HTML với định dạng tương tự ảnh
            String htmlContent = "<html>" +
                    "<body style='font-family: Arial, sans-serif; margin: 0; padding: 0;'>" +
                    "   <div style='max-width: 600px; margin: 0 auto; border: 1px solid #ddd;'>" +
                    "       <div style='background-color: #4CAF50; color: white; padding: 15px; text-align: center; font-size: 20px;'>" +
                    "           THÔNG BÁO ĐƠN HÀNG" +
                    "       </div>" +
                    "       <div style='padding: 20px; text-align: center;'>" +
                    "           <p style='font-size: 18px;'>Đơn hàng của bạn <strong>#"+o.getId()+"</strong> đã chuyển sang trạng thái:</p>" +
                    "           <p style='font-size: 32px; color: #333; margin: 15px 0;'><strong>KHÔNG NHẬN ĐƯỢC HÀNG</strong></p>" +
//                    "           <p style='font-size: 16px;'>Khách hàng: <strong>"+o.getAccountId().getHoVaTen()+"</strong></p>" +
//                    "           <p style='font-size: 16px;'>Số điện thoại: <strong>"+o.getAccountId().getSoDienThoai()+"</strong></p>" +
                    "           <p style='font-size: 14px; color: #777;'>Vui lòng liên hệ với Model World để xử lý vấn đề này.</p>" +
                    "       </div>" +
                    "       <div style='background-color: #f1f1f1; color: #555; padding: 10px; text-align: center; font-size: 12px;'>" +
                    "           <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</p>" +
                    "           <p>Đây là email tự động, vui lòng không phản hồi lại email này.</p>" +
                    "       </div>" +
                    "   </div>" +
                    "</body>" +
                    "</html>";
            messageHelper.setText(htmlContent, true);
            javaMailSender.send(mimeMessage);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
    
    @Async
    public void sendEmailCancel(String to, String subject, Order o) {
        try {
            // Tạo MimeMessage để gửi email
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, false, "UTF-8");

            // Đặt thông tin gửi mail
            messageHelper.setFrom("your-email@gmail.com");
            messageHelper.setTo(to);
            messageHelper.setSubject(subject);

            // Gửi email dưới dạng HTML với định dạng tương tự ảnh
            String htmlContent = "<html>" +
                    "<body style='font-family: Arial, sans-serif; margin: 0; padding: 0;'>" +
                    "   <div style='max-width: 600px; margin: 0 auto; border: 1px solid #ddd;'>" +
                    "       <div style='background-color: #4CAF50; color: white; padding: 15px; text-align: center; font-size: 20px;'>" +
                    "           THÔNG BÁO ĐƠN HÀNG" +
                    "       </div>" +
                    "       <div style='padding: 20px; text-align: center;'>" +
                    "           <p style='font-size: 18px;'>Đơn hàng của bạn <strong>#"+o.getId()+"</strong> đã chuyển sang trạng thái:</p>" +
                    "           <p style='font-size: 32px; color: #333; margin: 15px 0;'><strong>HỦY ĐƠN</strong></p>" +
//                    "           <p style='font-size: 16px;'>Khách hàng: <strong>"+o.getAccountId().getHoVaTen()+"</strong></p>" +
//                    "           <p style='font-size: 16px;'>Số điện thoại: <strong>"+o.getAccountId().getSoDienThoai()+"</strong></p>" +
                    "           <p style='font-size: 14px; color: #777;'>Vui lòng liên hệ với Model World để xử lý vấn đề này.</p>" +
                    "       </div>" +
                    "       <div style='background-color: #f1f1f1; color: #555; padding: 10px; text-align: center; font-size: 12px;'>" +
                    "           <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</p>" +
                    "           <p>Đây là email tự động, vui lòng không phản hồi lại email này.</p>" +
                    "       </div>" +
                    "   </div>" +
                    "</body>" +
                    "</html>";
            messageHelper.setText(htmlContent, true);
            javaMailSender.send(mimeMessage);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    // Gửi email với file đính kèm
    public void sendEmailWithAttachment(String to, String subject, String text, String filePath) {
        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            messageHelper.setFrom("your-email@gmail.com");
            messageHelper.setTo(to);
            messageHelper.setSubject(subject);
            messageHelper.setText(text);

            // Thêm file đính kèm
            messageHelper.addAttachment("Attachment", new java.io.File(filePath));

            javaMailSender.send(mimeMessage);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}
