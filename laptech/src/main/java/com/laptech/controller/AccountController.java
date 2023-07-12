package com.laptech.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class AccountController {

    @RequestMapping("/login")
        public String index(Model model) {
            return "layout/login";
        }
    @RequestMapping("/forgot-password")
        public String forgotPassword(Model model) {
            return "layout/forgot-password";
        }

    @RequestMapping("/sign-up")
        public String signUp(Model model) {
            return "layout/sign-up";
        }
      
    @RequestMapping("/change-password")
        public String changePassword(Model model) {
            return "layout/change-password";
        }
        
    @RequestMapping("/confirm-password")
        public String confirmPassword(Model model) {
            return "layout/confirm-password";
        }
}
