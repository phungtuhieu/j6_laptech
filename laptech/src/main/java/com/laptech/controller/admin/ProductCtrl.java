package com.laptech.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class ProductCtrl {
    @RequestMapping("/products")
    public String page(Model model) {
        return "admin/product-list";
    }
    @RequestMapping("/products/create")
    public String create(Model model) {
        return "admin/product-create";
    }
}
