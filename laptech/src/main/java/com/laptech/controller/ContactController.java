package com.laptech.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/client")
public class ContactController {

	@RequestMapping("/contact")
	public String contact(Model model) {
		return "layout/contact";
	}
}
