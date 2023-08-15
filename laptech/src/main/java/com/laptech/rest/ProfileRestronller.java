package com.laptech.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.laptech.dao.UserDAO;
import com.laptech.model.Account;
import com.laptech.service.FileManagerService;

@CrossOrigin("*")
@RestController
public class ProfileRestronller {

    @Autowired
    UserDAO dao;

    @GetMapping("/api/profile")
    public ResponseEntity<List<Account>> getAll() {
        List<Account> users = dao.findAll();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/api/profile/{username}")
    public ResponseEntity<Account> getOne(@PathVariable("username") String username) {
        Account user = dao.findById(username).orElse(null);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user);
    }

    @PostMapping("/api/profile")
    public ResponseEntity<Account> post(@RequestBody Account user) {
        dao.save(user);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/api/profile/{username}")
    public ResponseEntity<Account> update(@PathVariable("username") String username, @RequestBody Account user) {
        Account existingUser = dao.findById(username).orElse(null);
        if (existingUser == null) {
            return ResponseEntity.notFound().build();
        }
        existingUser.setFullname(user.getFullname());
        existingUser.setEmail(user.getEmail());
        existingUser.setPhone(user.getPhone());
        existingUser.setAddress(user.getAddress());
        dao.save(existingUser);
        return ResponseEntity.ok(existingUser);
    }
}
