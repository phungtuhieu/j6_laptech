package com.laptech.service;

import java.security.SecureRandom;
import java.util.Date;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.stereotype.Service;

import com.laptech.dao.UserDAO;
import com.laptech.dao.VerificationDAO;
import com.laptech.model.Account;
import com.laptech.model.Verification;

@Service
public class RegistrationService {

    private final EmailSender emailSender;
    private final UserDAO userRepository;

    @Autowired
    public RegistrationService(EmailSender emailSender, UserDAO userRepository) {
        this.emailSender = emailSender;
        this.userRepository = userRepository;
    }

    @Autowired
    VerificationDAO dao;

    public void registerUser(Account user) {
        // Tạo mã xác minh ngẫu nhiên
        String verificationCode = generateVerificationCode();
        System.out.println(verificationCode);

        // Lưu thời gian hiện tại và thời gian hết hạn của mã xác minh
        int codeValiditySeconds = 60; // Hiệu lực của mã (số giây)
        Date now = new Date();
        Date expirationAt = new Date(now.getTime() + codeValiditySeconds * 1000);

        // Lưu thời gian hiện tại và thời gian hết hạn vào Entity Verification
        Verification verification = new Verification();
        verification.setUser(user);
        verification.setCode(verificationCode);
        verification.setCreateAt(now);
        verification.setExpirationAt(expirationAt);
        verification.setStatus(false); // Mã xác minh chưa được xác nhận
        dao.save(verification);

        // Gửi email xác minh
        String emailContent = "LapTech gửi mã xác minh: " + verificationCode;
        emailSender.sendEmail(user.getEmail(), "Verification Code", emailContent);
    }

    private String generateVerificationCode() {

        // Tạo mã xác minh ngẫu nhiên
        int codeLength = 6; // Độ dài mã xác minh

        String validChars = "123456789"; // Các ký tự hợp lệ cho mã

        Random random = new SecureRandom();
        StringBuilder codeBuilder = new StringBuilder();
        for (int i = 0; i < codeLength; i++) {
            int randomIndex = random.nextInt(validChars.length());
            char randomChar = validChars.charAt(randomIndex);
            codeBuilder.append(randomChar);
        }

        return codeBuilder.toString();
    }
}
