package com.laptech.rest.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.laptech.dao.ScreenSizeDAO;
import com.laptech.model.ScreenSize;

@RestController
public class ScreenSizeRestController {
    @Autowired
    ScreenSizeDAO dao;

    @GetMapping("/api/screen-size")
    public ResponseEntity<List<ScreenSize>> getAll(Model model) {
        return ResponseEntity.ok(dao.findAll());
    }

    @GetMapping("/api/screen-size/{id}")
    public ResponseEntity<ScreenSize> getOne(@PathVariable("id") Long id) {
        if (!dao.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(dao.findById(id).get());
    }

    @PostMapping("/api/screen-size")
    public ResponseEntity<ScreenSize> post(@RequestBody ScreenSize screenSize) {
        dao.save(screenSize);
        return ResponseEntity.ok(screenSize);
    }

    @PutMapping("/api/screen-size/{id}")
    public ResponseEntity<ScreenSize> update(@PathVariable("id") Long id, @RequestBody ScreenSize screenSize) {
        if (!dao.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        dao.save(screenSize);
        return ResponseEntity.ok(screenSize);
    }

    @DeleteMapping("/api/screen-size/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable("id") Long id) {
        ScreenSize screenSize = dao.findById(id).get();
        if (screenSize == null) {
            return ResponseEntity.notFound().build();
        }
        if (!screenSize.getProducts().isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).build();
        }
        dao.deleteById(id);
        return ResponseEntity.ok(true);

    }

    @GetMapping("/api/screen-size/search/{keyword}")
    public ResponseEntity<List<ScreenSize>> searchScreenSize(@PathVariable("keyword") String keyword) {
        List<ScreenSize> screenSizes = dao.findBySizeAndPanelType(keyword);
        return ResponseEntity.ok(screenSizes);
    }
}
