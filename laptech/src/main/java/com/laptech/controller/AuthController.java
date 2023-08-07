package com.laptech.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

// import com.poly.demo.Service.UserService;


@Controller
public class AuthController {

    @RequestMapping("/auth/login/form")
    public String login() {
        return "html_so6/auth/login" ;
    }

    @RequestMapping("/auth/login/success")
    public String success(Model model){
        model.addAttribute("massage", "Đăng nhập thành công");
        return "html_so6/auth/login" ;
    }

    @RequestMapping("/auth/login/error")
    public String error(Model model){
        model.addAttribute("massage", "Sai thông tin đăng nhập");
        return "html_so6/auth/login" ;
    }

    @RequestMapping("/auth/logoff/success")
    public String errorSuccess(Model model){
        model.addAttribute("massage", "Đăng xuất thành công");
        return "forward:/auth/login/form" ;
    }

    @RequestMapping("/auth/access/denied")
    public String denied(Model model){
        model.addAttribute("massage", "Bạn không có quyền truy cập");
        return "html_so6/auth/login" ;
    }

    //danh nhap mang xa hoi demo 7.6
    // @Autowired
    // UserService userService;

    // @RequestMapping("/oauth2/login/success")
    // public String success(OAuth2AuthenticationToken oauth2){
    //      userService.loginFormOauth2(oauth2);
    //     return "forward:/auth/login/success";

    // }
    



    
    
}
