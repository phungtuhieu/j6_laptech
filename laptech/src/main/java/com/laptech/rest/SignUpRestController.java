package com.laptech.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.laptech.dao.UserDAO;
import com.laptech.dao.VerificationDAO;
import com.laptech.model.Account;
import com.laptech.model.Verification;
import com.laptech.service.RegistrationService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin("*")
@RestController
public class SignUpRestController {

    @Autowired
    UserDAO dao;

    @Autowired
    VerificationDAO vdao;
    @Autowired
    RegistrationService registrationService;

    @GetMapping("/api/account/sign-up")
    public ResponseEntity<List<Account>> getAll(Model model) {
        return ResponseEntity.ok(dao.findAll());
    }

    @PostMapping("/api/account/sign-up")
    public ResponseEntity<?> signup(@RequestBody Account user) {
        if (dao.existsById(user.getUsername())) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
        Account savedUser = dao.save(user);
        registrationService.registerUser(savedUser);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

    @GetMapping("/api/verification/{username}")
    public ResponseEntity<Verification> checkEmailExists11(@PathVariable String username) {
        Verification verification = vdao.findVerificationByUser(username);
        return ResponseEntity.ok(verification);
    }

    @GetMapping("/api/account/check-email/{email}")
    public ResponseEntity<Account> checkEmailExists(@PathVariable String email) {
        Account emailExists = dao.findByEmail(email);
        return ResponseEntity.ok(emailExists);
    }

    // @GetMapping("/api/account/check-username/{username}")
    // public ResponseEntity<Boolean> checkUsernameExists(@PathVariable String
    // username) {
    // boolean usernameExists = dao.existsByUsername(username);
    // return ResponseEntity.ok(usernameExists);
    // }
}
