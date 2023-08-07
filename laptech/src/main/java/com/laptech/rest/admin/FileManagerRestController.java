package com.laptech.rest.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.laptech.service.FileManagerService;

@RestController
@RequestMapping("/api/files")
public class FileManagerRestController {
	   @Autowired
	    FileManagerService fileService;

	    @GetMapping("{folder}/{file}")
	    public byte[] download(@PathVariable("folder") String folder, @PathVariable("file") String file){
	        return fileService.read(folder, file);
	    }
	    @PostMapping("{folder}")
	    public List<String> upload(@PathVariable("folder") String folder,@RequestPart("files") MultipartFile[] files){
	        return fileService.save(folder, files);
	    }
	    @DeleteMapping("{folder}/{file}")
	    public void delete(@PathVariable("folder") String folder,@PathVariable("file") String file){
	        fileService.delete(folder, file);
	    }
	    @GetMapping("{folder}")
	    public List<String> list(@PathVariable("folder") String folder){
	        return fileService.list(folder);
	    }
}
