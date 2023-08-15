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

@CrossOrigin("*")
@RestController
public class ProfileRestController {

    @Autowired
    UserDAO dao;

    @GetMapping("/api/profile")
    public ResponseEntity<List<Account>> getAll(Model model) {
        return ResponseEntity.ok(dao.findAll());
    }

    @GetMapping("/api/profile/{username}")
    public ResponseEntity<Account> getOne(@PathVariable("username") String username) {
        if (!dao.existsById(username)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(dao.findById(username).get());
    }

    @PostMapping("/api/profile")
    public ResponseEntity<Account> post(@RequestBody Account user) {
        dao.save(user);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/api/profile/{username}")
    public ResponseEntity<Account> update(@PathVariable("username") String username, @RequestBody Account user) {
        if (!dao.existsById(username)) {
            return ResponseEntity.notFound().build();
        }
        dao.save(user);
        return ResponseEntity.ok(user);
    }
}
