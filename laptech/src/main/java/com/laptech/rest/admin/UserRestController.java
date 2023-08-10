package com.laptech.rest.admin;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
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
public class UserRestController {

    @Autowired
    UserDAO dao;

    @Autowired
    FileManagerService fileService;

    @GetMapping("/api/user")
    public ResponseEntity<List<Account>> getAll(Model model) {
        return ResponseEntity.ok(dao.findAll());
    }

    @GetMapping("/api/user/{username}")
    public ResponseEntity<Account> getOne(@PathVariable("username") String username) {
        if (!dao.existsById(username)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(dao.findById(username).get());
    }

    @PostMapping("/api/user")
    public ResponseEntity<Account> post(@RequestBody Account user) {
        dao.save(user);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/api/user/{username}")
    public ResponseEntity<Account> update(@PathVariable("username") String username, @RequestBody Account user) {
        if (!dao.existsById(username)) {
            return ResponseEntity.notFound().build();
        }
        dao.save(user);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/api/user/{username}")
    public ResponseEntity<Boolean> delete(@PathVariable("username") String username) {
        Account user = dao.findById(username).get();
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        if (!user.getFullname().isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).build();
        }
        dao.deleteById(username);
        return ResponseEntity.ok(true);

    }
    // @GetMapping("/api/user/search/{name}")
    // public ResponseEntity<List<User>> search(@PathVariable("name") String
    // name){
    // return ResponseEntity.ok(dao.findByNameLike(name));
    // }

    @GetMapping("/api/user/search/{keyword}")
    public ResponseEntity<List<Account>> searchUsers(@PathVariable("keyword") String keyword) {
        List<Account> user = dao.findByFullnameOrUsernameLike(keyword);
        return ResponseEntity.ok(user);
    }

}
