package com.laptech.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;

@Service
public class FileManagerService {

    @Autowired
    ServletContext app;

    private Path getPath(String folder, String filename) {
        File dir = Paths.get(app.getRealPath("/files/"), folder).toFile();
        if (!dir.exists()) {
            dir.mkdirs();
        }
        return Paths.get(dir.getAbsolutePath(), filename);
    }

    public byte[] read(String folder, String filename) {
        Path path = this.getPath(folder, filename);
        try {
            return Files.readAllBytes(path);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public List<String> save(String folder, MultipartFile[] files) {
        List<String> filenames = new ArrayList<>();
        for (MultipartFile file : files) {
            String name = System.currentTimeMillis() + file.getOriginalFilename();
            String filename = Integer.toHexString(name.hashCode()) + name.substring(name.lastIndexOf("."));
            Path path = this.getPath(folder, filename);
            System.out.println("--- Save" + path.toFile().getAbsolutePath());
            try {
                file.transferTo(path);
                filenames.add(filename);
            } catch (IllegalStateException | IOException e) {
                e.printStackTrace();
            }
        }
        return filenames;

    }

    public List<String> list(String folder) {
        List<String> filenames = new ArrayList<>();
        File dir = Paths.get(app.getRealPath("/file/"), folder).toFile();
        System.out.println("--- List" + dir.getAbsolutePath());
        if (dir.exists()) {
            System.out.println("--- if" + dir.getAbsolutePath());
            File[] files = dir.listFiles();
            for (File file : files) {
                filenames.add(file.getName());
            }

        }
        return filenames;
    }

    public void delete(String folder, String filename) {
        Path path = this.getPath(folder, filename);
        path.toFile().delete();
    }

    public String saveImage(String image) {
        return null;
    }
}
