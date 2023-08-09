package com.laptech.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin/order")
public class OrderCtrl {
    @RequestMapping("/pending/list")
    public String orderPending(Model model) {
        return "/admin/orders/pending";
    }
    @RequestMapping("/shipped/list")
    public String orderShipped(Model model) {
        return "/admin/orders/shipped";
    }
    @RequestMapping("/shipping/list")
    public String orderShipping(Model model) {
        return "/admin/orders/shipping";
    }
    @RequestMapping("/canceled/list")
    public String orderCanceled(Model model) {
        return "/admin/orders/canceled";
    }
    @RequestMapping("/order-details")
    public String orderDetails(Model model) {
        return "/admin/orders/order-details";
    }
}
