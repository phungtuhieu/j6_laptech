package com.laptech.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class IndexAdminController {
    @RequestMapping("/index")
    public String index(Model model) {
    	return "admin/index-admin";
    }
}
