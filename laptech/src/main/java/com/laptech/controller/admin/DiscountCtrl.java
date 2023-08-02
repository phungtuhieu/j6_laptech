package com.laptech.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin/discount")
public class DiscountCtrl {
    @RequestMapping("/list")
    public String page (Model model) {

        return "admin/discounts/discount-list";
    }
    @RequestMapping("/create")
    public String create (Model model) {

        return "admin/discounts/discount-form";
    }
    @RequestMapping("/update")
    public String update (Model model) {

        return "admin/discounts/discount-form";
    }
}
