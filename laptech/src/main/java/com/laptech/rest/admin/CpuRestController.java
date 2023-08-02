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

import com.laptech.dao.CPUDAO;
import com.laptech.model.CPU;
import com.laptech.model.User;

@CrossOrigin("*")
@RestController
public class CpuRestController {
    @Autowired
    CPUDAO dao;

    @GetMapping("/api/cpu")
    public ResponseEntity<List<CPU>> getAll(Model model) {
        return ResponseEntity.ok(dao.findAll());
    }

    @GetMapping("/api/cpu/{id}")
    public ResponseEntity<CPU> getOne(@PathVariable("id") Long id) {
        if (!dao.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(dao.findById(id).get());
    }

    @PostMapping("/api/cpu")
    public ResponseEntity<CPU> post(@RequestBody CPU cpu) {
        dao.save(cpu);
        return ResponseEntity.ok(cpu);
    }

    @PutMapping("/api/cpu/{id}")
    public ResponseEntity<CPU> update(@PathVariable("id") Long id, @RequestBody CPU cpu) {
        if (!dao.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        dao.save(cpu);
        return ResponseEntity.ok(cpu);
    }

    @DeleteMapping("/api/cpu/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable("id") Long id) {
        CPU cpu = dao.findById(id).get();
        if (cpu == null) {
            return ResponseEntity.notFound().build();
        }
        if (!cpu.getProducts().isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).build();
        }
        dao.deleteById(id);
        return ResponseEntity.ok(true);

    }

    @GetMapping("/api/cpu/search/{keyword}")
    public ResponseEntity<List<CPU>> searchCPU(@PathVariable("keyword") String keyword) {
        List<CPU> cpu = dao.findByKeywordInNameOrSocket(keyword);
        return ResponseEntity.ok(cpu);
    }

}
