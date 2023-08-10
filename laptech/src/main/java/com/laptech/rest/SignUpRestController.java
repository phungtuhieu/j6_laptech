package com.laptech.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.laptech.dao.UserDAO;
import com.laptech.model.Account;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin("*")
@RestController
public class SignUpRestController {

    @Autowired
    UserDAO dao;

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
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

}
