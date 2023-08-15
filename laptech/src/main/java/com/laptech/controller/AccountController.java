package com.laptech.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.laptech.model.Account;
import com.laptech.rest.AccountRestController;
import com.laptech.service.UserService;

@Controller
@RequestMapping("/account")
public class AccountController {

    @Autowired
    HttpSession session;

    @Autowired
    AccountRestController a;

    @RequestMapping("/login")
    public String index(Model model) {
        return "layout/login";
    }

    @RequestMapping("/login/success")
    public String success(Model model) {
        Account account = (Account) session.getAttribute("account");
        if (account != null) {
            if (account.getAdmin() == true) {
                return "admin/index";
            }
        }
        return "client/index";
    }


     @Autowired
    UserService userService;
    @RequestMapping("/oauth2/login/success")
    public String success(OAuth2AuthenticationToken oauth2){
         userService.loginFormOauth2(oauth2);
         return "redirect:/client/index";
    }

    @RequestMapping("/logout")
    public String errorSuccess(Model model) {
        a.a(null);
        session.removeAttribute("account");
        return "redirect:/account/login";
    }

    @RequestMapping("/login/error")
    public String error(Model model) {

        model.addAttribute("message", "Sai thông tin đăng nhập");

        return "layout/login";
    }

    @RequestMapping("/access/denied-errorPage")
    public String denied(Model model) {
        return "layout/errorPage";
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
