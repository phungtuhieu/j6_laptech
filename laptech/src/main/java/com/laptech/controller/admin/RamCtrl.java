package com.laptech.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin/ram")
public class RamCtrl {
    @RequestMapping("/list")
    public String index(Model model) {
        return "admin/ram/ram-list";
    }
    @RequestMapping("/create")
    public String create(Model model) {
        return "admin/ram/ram-form";
    }
    @RequestMapping("/update")
    public String update(Model model) {
        return "admin/ram/ram-form";
    }
}
