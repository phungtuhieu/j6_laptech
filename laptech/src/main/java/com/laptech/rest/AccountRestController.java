package com.laptech.rest;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.laptech.dao.FavoriteDAO;
import com.laptech.dao.ProductDAO;
import com.laptech.model.Account;
import com.laptech.model.Favorite;
import com.laptech.model.Product;

@RestController
public class AccountRestController {

    @Autowired
    FavoriteDAO fDao;

    @Autowired
    ProductDAO pDao;

    Account employee1 = new Account();

    public Account a(Account employee) {
        return employee1 = employee;
    }
    
    @GetMapping("/api/account")
    public ResponseEntity<Account> getUser() {
        return ResponseEntity.ok(employee1);
    }

    @GetMapping("/api/favorite/{username}")
    public ResponseEntity<List<Favorite>> favoriteByUser(@PathVariable("username") String username) {
        return ResponseEntity.ok(fDao.findByFavoriteLikeUser(username));

    }

    @PostMapping("/api/favoriteAdd")
    public ResponseEntity<Favorite> add(@RequestBody Favorite favorite) {
        fDao.save(favorite);
        return ResponseEntity.ok(favorite);

    }

    @GetMapping("/api/productOne/{id}")
    public ResponseEntity<Optional<Product>> productOne(@PathVariable("id") Long id) {
        return ResponseEntity.ok(pDao.findById(id));
    }

    @DeleteMapping("/api/favorite/{favoriteId}")
    public ResponseEntity<Boolean> deleteFavoriteId(@PathVariable("favoriteId") Long favoriteId) {
        fDao.deleteById(favoriteId);
        return ResponseEntity.ok(true);

    }

}