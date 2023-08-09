package com.laptech.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.laptech.dao.UserDAO;
import com.laptech.model.User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin("*")
@RestController
public class SignUpRestController {

    @Autowired
    UserDAO dao;

    @GetMapping("/api/sign-up")
    public ResponseEntity<List<User>> getAll(Model model) {
        return ResponseEntity.ok(dao.findAll());
    }

    @PostMapping("/api/sign-up")
    public ResponseEntity<User> signup(@RequestBody User user) {
        if (!dao.existsById(user.getUsername())) {
            return ResponseEntity.notFound().build();
        }
        dao.save(user);
        return ResponseEntity.ok(dao.findById(user.getUsername()).get());
    }

}
