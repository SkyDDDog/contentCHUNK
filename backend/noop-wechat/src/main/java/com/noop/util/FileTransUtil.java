package com.noop.util;

import org.springframework.web.multipart.MultipartFile;

import java.io.*;

/**
 * MultipartFile转File工具类
 *
 * @author 天狗
 * @version 1.0
 * @since 2024/5/18 16:59
 */
public class FileTransUtil {

    public static File multipartFileToFile(MultipartFile multipartFile) {
        InputStream inputStream = null;
        FileOutputStream outputStream = null;
        String path = "/tmp/img/" + multipartFile.getOriginalFilename();
//        System.out.println("path = " + path);
        File file = new File(path);
        try {
            // 获取文件输入流
            inputStream = multipartFile.getInputStream();
            if (!file.exists()) {
                file.createNewFile();
            }
            // 创建输出流
            outputStream = new FileOutputStream(file);
            byte[] bytes = new byte[1024];
            int len;
            // 写入到创建的临时文件
            while ((len = inputStream.read(bytes)) > 0) {
                outputStream.write(bytes, 0, len);
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {
            // 关流
            try {
                if (outputStream != null) {
                    outputStream.close();
                }
                if (inputStream != null) {
                    inputStream.close();
                }
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
        return file;
    }

    public static void inputStreamToFile(InputStream ins, File file) {
        try {
            OutputStream os = new FileOutputStream(file);
            int bytesRead = 0;
            byte[] buffer = new byte[8192];
            while ((bytesRead = ins.read(buffer, 0, 8192)) != -1) {
                os.write(buffer, 0, bytesRead);
            }
            os.close();
            ins.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
