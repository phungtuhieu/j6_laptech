package com.laptech.controller.admin;

import java.util.Optional;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/admin/product")
public class ProductCtrl {
    @RequestMapping("/list")
    public String page(Model model) {
        return "admin/products/product-list";
    }
    @RequestMapping("/create")
    public String create(Model model) {
        return "admin/products/product-form";
    }
    @RequestMapping("/update")
    public String update(Model model) {
        return "admin/products/product-form";
    }
}
