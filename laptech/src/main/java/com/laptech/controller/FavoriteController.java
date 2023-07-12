package com.laptech.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class FavoriteController {
        @RequestMapping("/favorite")
        public String index(Model model) {
            return "layout/favorite";
        }
}
