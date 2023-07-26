package com.laptech.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin/storage")
public class StorageCtrl {
     @RequestMapping("/list")
    public String index(Model model) {
        return "admin/storage/storage-list";
    }
    @RequestMapping("/create")
    public String create(Model model) {
        return "admin/storage/storage-form";
    }
    @RequestMapping("/update")
    public String update(Model model) {
        return "admin/storage/storage-form";
    }
}
