package com.laptech.rest.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.laptech.dao.ProductDAO;
import com.laptech.dao.ProductImagesDAO;
import com.laptech.model.Product;
import com.laptech.model.ProductImages;
import com.laptech.service.FileManagerService;

@RestController
@RequestMapping("/api/product")
public class ProductRestController {
    @Autowired
    ProductDAO dao;

    @Autowired
    ProductImagesDAO pImgDao;

    @Autowired
    FileManagerService fileService;

    @GetMapping
    public ResponseEntity<List<Product>> getAll(Model model){
        return ResponseEntity.ok( dao.findAll());
    }

    @GetMapping("{id}")
    public ResponseEntity<Product> getOne(@PathVariable("id") Long id){
       if(!dao.existsById(id)){
            return ResponseEntity.badRequest().build();
       }
        return ResponseEntity.ok(dao.findById(id).get());
    }
 

    @PostMapping
    public ResponseEntity<Product> post(@RequestBody Product product){
       Product prod = dao.save(product);
       return ResponseEntity.ok(prod);
    }

    @PutMapping("{id}")
    public ResponseEntity<Product> update(@PathVariable("id") Long id, @RequestBody Product product){
        if(!dao.existsById(product.getId())){
             return ResponseEntity.notFound().build();
        }
       Product prod = dao.save(product);
       return ResponseEntity.ok(prod);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id){
        if(!dao.existsById(id)){
             return ResponseEntity.notFound().build();
        }
        dao.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // @GetMapping("/files/{folder}/{file}")
    // public byte[] download(@PathVariable("folder") String folder, @PathVariable("file") String file){
    //     return fileService.read(folder, file);
    // }
    @PostMapping("/files/{folder}")
    public List<String> upload(@PathVariable("folder") String folder,@RequestPart("files") MultipartFile[] files) {
        return fileService.save(folder, files);
    }
    @PostMapping("/files/{folder}/save")
    public ResponseEntity<List<ProductImages>> saveImg(@PathVariable("folder") String folder,@RequestBody  List<ProductImages> prodImages) {
        for (ProductImages pImg : prodImages) {
            pImgDao.save(pImg);
        }
        return ResponseEntity.ok(prodImages)  ;
    }

    @GetMapping("/files/{folder}")
    public List<String> list(@PathVariable("folder") String folder){
        return fileService.list(folder);
    }
    @DeleteMapping("/files/{folder}/{file}")
    public void delete(@PathVariable("folder") String folder,@PathVariable("file") String file){
         fileService.delete(folder, file);
    }
    
}
