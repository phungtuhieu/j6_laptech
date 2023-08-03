package com.laptech.rest.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.laptech.dao.StorageDAO;
import com.laptech.model.Storage;

@CrossOrigin("*")
@RestController
public class StorageRestController {
    @Autowired
    StorageDAO dao;

    @GetMapping("/api/storage")
    public ResponseEntity<List<Storage>> getAll(Model model) {
        return ResponseEntity.ok(dao.findAll());
    }

    @GetMapping("/api/storage/{id}")
    public ResponseEntity<Storage> getOne(@PathVariable("id") Long id) {
        if (!dao.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(dao.findById(id).get());
    }

    @PostMapping("/api/storage")
    public ResponseEntity<Storage> post(@RequestBody Storage storage) {
        dao.save(storage);
        return ResponseEntity.ok(storage);
    }

    @PutMapping("/api/storage/{id}")
    public ResponseEntity<Storage> update(@PathVariable("id") Long id, @RequestBody Storage storage) {
        if (!dao.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        dao.save(storage);
        return ResponseEntity.ok(storage);
    }

    @DeleteMapping("/api/storage/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable("id") Long id) {
        Storage storage = dao.findById(id).get();
        if (storage == null) {
            return ResponseEntity.notFound().build();
        }
        if (!storage.getProducts().isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).build();
        }
        dao.deleteById(id);
        return ResponseEntity.ok(true);

    }

    @GetMapping("/api/storage/search/{keyword}")
    public ResponseEntity<List<Storage>> searchCPU(@PathVariable("keyword") String keyword) {
        List<Storage> storage = dao.findByKeywordInTypeOrCapacity(keyword);
        return ResponseEntity.ok(storage);
    }
}
