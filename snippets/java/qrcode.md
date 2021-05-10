---

---

## 解析二维码

```java
package com.nine.demo.barcode;

import com.google.zxing.*;
import com.google.zxing.client.j2se.BufferedImageLuminanceSource;
import com.google.zxing.common.HybridBinarizer;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;

@Component
@Slf4j
public class QrCodeUtil {

    /**
     * 获取文件(顺带创建文件夹，如果需要的话)
     *
     * @param filePath 文件path
     * @return 文件对象
     * @date 2019/9/10 10:48
     */
    private static File getFile(String filePath) {
        File file = new File(filePath);
        if (!file.getParentFile().exists()) {
            boolean result = file.getParentFile().mkdirs();
            log.info(" create directory {} {}", file.getParent(), result);
        }
        return file;
    }

    /**
     * 识别二维码内容信息
     *
     * @param file 二维码图片文件
     *
     * @return 二维码内容
     * @throws NotFoundException NotFoundException
     * @throws IOException       IOException
     * @date 2019/9/10 1:59
     */
    public static String decodeQrCode(File file) throws NotFoundException, IOException {
        BufferedImage image;
        image = ImageIO.read(file);
        if (image == null) {
            return null;
        }
        String data = decodeQrCode(image);
        log.info(" Qr code from [{}] data is -> {}", file.getAbsolutePath(), data);
        return data;
    }

    /**
     * 识别二维码内容信息
     *
     * @param is 二维码图片文件流
     *
     * @return 二维码内容
     * @throws NotFoundException NotFoundException
     * @throws IOException       IOException
     * @date 2019/9/10 1:59
     */
    public static String decodeQrCode(InputStream is) throws NotFoundException, IOException {
        BufferedImage image;
        image = ImageIO.read(is);
        if (image == null) {
            return null;
        }
        String data = decodeQrCode(image);
        log.info(" Qr code from InputStream data is -> {}", data);
        return data;
    }

    /**
     * 识别二维码内容信息
     *
     * @param image 二维码图片信息BufferedImage
     *
     * @return 二维码内容
     * @throws NotFoundException NotFoundException
     * @date 2019/9/10 1:59
     */
    private static String decodeQrCode(BufferedImage image) throws NotFoundException {
        BufferedImageLuminanceSource source = new BufferedImageLuminanceSource(image);
        BinaryBitmap bitmap = new BinaryBitmap(new HybridBinarizer(source));
        Result result;
        HashMap<DecodeHintType, Object> hints = new HashMap<>(4);
        hints.put(DecodeHintType.CHARACTER_SET, "utf-8");
        result = new MultiFormatReader().decode(bitmap, hints);
        return result.getText();
    }
}

```