package com.laptech.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin/screen-size")
public class ScreenSizeCtrl {
    @RequestMapping("/list")
    public String index(Model model) {
        return "admin/screen-size/screen-size-list";
    }
    @RequestMapping("/create")
    public String create(Model model) {
        return "admin/screen-size/screen-size-form";
    }
    @RequestMapping("/update")
    public String update(Model model) {
        return "admin/screen-size/screen-size-form";
    }
}
