package com.laptech.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.laptech.rest.AccountRestController;

@Controller
@RequestMapping("/account")
public class AccountController {


    @Autowired
    AccountRestController a;

    @RequestMapping("/login")
    public String index(Model model) {
        return "layout/login";
    }

    

    @RequestMapping("/logout")
    public String errorSuccess(Model model) {
        a.a(null);
        return "redirect:/account/login";
    }

    @RequestMapping("/login/error")
    public String error(Model model){
        
        model.addAttribute("massage", "Sai thông tin đăng nhập");

        return "layout/login" ;
    }

    @RequestMapping("/access/denied-errorPage")
    public String denied(Model model){
        model.addAttribute("massage", "Bạn không có quyền truy cập");
        return "layout/errorPage" ;
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
