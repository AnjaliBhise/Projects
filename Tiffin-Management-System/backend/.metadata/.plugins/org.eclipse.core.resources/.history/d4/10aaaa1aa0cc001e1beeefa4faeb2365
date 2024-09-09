package com.app.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Value("${spring.mail.username}")
    private String fromEmail;

    private final JavaMailSender javaMailSender;

    public EmailService(JavaMailSender javaMailSender)
    {
        this.javaMailSender = javaMailSender;
    }

    public void sendOTPEmail(String toEmail, String otp) 
    {
        MimeMessage message = javaMailSender.createMimeMessage();

        try {
         MimeMessageHelper helper = new MimeMessageHelper(message,true);
            helper.setFrom(fromEmail);
            helper.setTo(toEmail);
            helper.setSubject("OTP for Password Reset");
            helper.setText("Your OTP for password reset is: " + otp);

            javaMailSender.send(message);
            System.out.println("Email sent successfully.");

        } catch (MessagingException e) {
            e.printStackTrace();
            // Handle the exception or log the error
        }
    }
}
