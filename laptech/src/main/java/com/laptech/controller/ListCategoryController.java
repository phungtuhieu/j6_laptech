package com.laptech.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ListCategoryController {

        @RequestMapping("/ListCategory/{name}")
        public String index(@PathVariable("name") String name, Model model) {
            model.addAttribute("name", name); 
            System.out.println(name);
            return "layout/list_categories";
        }

        @RequestMapping("/ListCategory")
        public String index1( Model model) {
            return "layout/list_categories";
        }




}