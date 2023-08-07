package com.laptech.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/client")
public class ProfileController {
	@RequestMapping("/profile")
    public String index(Model model) {
        return "layout/profile"; 
    }
}
