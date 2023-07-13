package com.laptech.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/cart")
public class CartCtrl {
    @RequestMapping("/list")
    public String page (Model model) {
        return "cart";
    }
}
