package com.laptech.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin/brand")
public class BrandCtrl {
    @RequestMapping("/list")
    public String page (Model model) {

        return "admin/brands/brand-list";
    }
    @RequestMapping("/create")
    public String create (Model model) {

        return "admin/brands/brand-form";
    }
    @RequestMapping("/update")
    public String update (Model model) {

        return "admin/brands/brand-form";
    }
}
