package com.laptech.rest.admin;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.laptech.dao.CartDAO;
import com.laptech.dao.DiscountPriceDAO;
import com.laptech.dao.PriceDAO;
import com.laptech.dao.ProductDAO;
import com.laptech.dao.ProductImagesDAO;
import com.laptech.dao.UserDAO;
import com.laptech.model.Account;
import com.laptech.model.Cart;
import com.laptech.model.DiscountPrice;
import com.laptech.model.Price;
import com.laptech.model.Product;
import com.laptech.model.ProductImages;

@RestController
@RequestMapping("/api/cart")
public class CartRestController {
    @Autowired
    ProductDAO daoProd;

    @Autowired
    ProductImagesDAO daoProdImg;

    @Autowired
    UserDAO daoUser;

    @Autowired
    PriceDAO priceDao;

    @Autowired
    CartDAO cartDao;

    @Autowired
    DiscountPriceDAO disPriceDao;
    @GetMapping("/user/{username}")
    public ResponseEntity<List<Cart>> getList(@PathVariable("username") String username) {
        if(!daoUser.existsById(username)) {
            return ResponseEntity.notFound().build();
        } 
        Account account = daoUser.findById(username).get();
        List<Cart> list = cartDao.findByUser(account);
        for (Cart cart : list) {
            System.out.println(cart.getQuantity());  
        }
        return ResponseEntity.ok(list) ;
    }
    @DeleteMapping("/user/{username}")
    public ResponseEntity<List<Cart>> deleteAllCart(@PathVariable("username") String username) {
        if(!daoUser.existsById(username)) {
            return ResponseEntity.notFound().build();
        } 
        cartDao.deleteAll();
        return ResponseEntity.ok().build() ;
    }

    @GetMapping ("/price/{idProd}")
    public ResponseEntity<Price> getPriceForCart(@PathVariable("idProd") Long id) {
        if(!daoProd.existsById(id)) {
            ResponseEntity.notFound().build() ;
        } 
        Product prod = daoProd.findById(id).get();
        Price price = priceDao.findByProductAndDateNowBetween(prod);
        if(price == null) {
            return  ResponseEntity.notFound().build() ;
        } 
        System.out.println("Giá : "+price.getPrice());
        DiscountPrice disPrice = disPriceDao.findByDiscountAndPriceByNowDate(price);
        if(disPrice != null) {
            price.setPrice( price.getPrice() - ((price.getPrice() * disPrice.getDiscount().getPercentage()) / 100));
        }
        return ResponseEntity.ok(price) ;
    }
    @PostMapping("/save")
    public ResponseEntity<Cart> create(@RequestBody Cart cart) {
        return ResponseEntity.ok(cartDao.save(cart)) ;
    }
    @PutMapping("{id}")
    public ResponseEntity<Cart> update(@PathVariable("id") Long id,@RequestBody Cart cart) {
        if(!cartDao.existsById(id)) {
            return ResponseEntity.notFound().build();
           
        }
        return ResponseEntity.ok(cartDao.save(cart)) ;
    }

    @GetMapping("/img/product/{idProd}")
    public ResponseEntity<ProductImages> getImgProd(@PathVariable("idProd") Long idProd) {
        if(!daoProd.existsById(idProd)) {
            return ResponseEntity.notFound().build();
        }
        Boolean isMain = true;
        ProductImages pimg = daoProdImg.findByProductIdAndMain(idProd, isMain);
        if(pimg == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(pimg) ;
    }
  
    @GetMapping("{id}")
    public ResponseEntity<Cart> update(@PathVariable("id") Long id) {
        if(!cartDao.existsById(id)) {
             System.out.println("ssss");
            return ResponseEntity.notFound().build();
           
        }
        // System.out.println(cart.getProduct().getName());
        return ResponseEntity.ok(cartDao.findById(id).get()) ;
    }
    @DeleteMapping("{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
        if(!cartDao.existsById(id)) {
             System.out.println("ssss");
            return ResponseEntity.notFound().build();
           
        }
       cartDao.deleteById(id);
        return ResponseEntity.ok().build() ;
    }
   
}
