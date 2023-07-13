package com.laptech.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin/statistics")
public class StatisticsCtrl {
    @RequestMapping("/revenue")
    public String revenue(Model model) {
        return "admin/statistics/revenue";
    }
    @RequestMapping("/favorite")
    public String favorite(Model model) {
        return "admin/statistics/favorite";
    }
    @RequestMapping("/order-sold")
    public String orderSold(Model model) {
        return "admin/statistics/order-sold";
    }
    @RequestMapping("/product-sold")
    public String productSold(Model model) {
        return "admin/statistics/product-sold";
    }
}
