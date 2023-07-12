package com.laptech.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class IndexController {
        @RequestMapping("/index")
        public String index(Model model) {
            return "/index";
        }
        @GetMapping("/about")
        public String gioithieu(Model model) {
        	return "layout/gioithieu"; // phần giới thiệu
        }
}
