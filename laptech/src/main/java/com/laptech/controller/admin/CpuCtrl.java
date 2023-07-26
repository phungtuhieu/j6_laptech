package com.laptech.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin/cpu")
public class CpuCtrl {
    @RequestMapping("/list")
    public String index(Model model) {
        return "admin/cpu/cpu-list";
    }
    @RequestMapping("/create")
    public String create(Model model) {
        return "admin/cpu/cpu-form";
    }
    @RequestMapping("/update")
    public String update(Model model) {
        return "admin/cpu/cpu-form";
    }
}
