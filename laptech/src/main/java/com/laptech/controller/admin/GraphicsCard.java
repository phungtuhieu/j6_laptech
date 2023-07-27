package com.laptech.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin/graphics-card")
public class GraphicsCard {
    @RequestMapping("/list")
    public String index(Model model) {
        return "admin/graphics-card/graphics-card-list";
    }
    @RequestMapping("/create")
    public String create(Model model) {
        return "admin/graphics-card/graphics-card-form";
    }
    @RequestMapping("/update")
    public String update(Model model) {
        return "admin/graphics-card/graphics-card-form";
    }
}
