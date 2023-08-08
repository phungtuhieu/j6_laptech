package com.laptech.rest;


import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.laptech.dao.FavoriteDAO;
import com.laptech.model.Account;
import com.laptech.model.Favorite;

@RestController
public class AccountRestController {

    @Autowired
    FavoriteDAO fDao;

    Account employee1 = new Account();

    public Account a(Account employee) {
        return employee1 = employee;
    }

    @GetMapping("/api/account")
    public ResponseEntity<Account> getUser() {
        return ResponseEntity.ok(employee1);
    }

    

   @GetMapping("/api/favorite/{username}")
    public ResponseEntity<List<Favorite>> delete(@PathVariable("username") String username){
           return ResponseEntity.ok(fDao.findByFavoriteLikeUser(username));
       
    }
   

}