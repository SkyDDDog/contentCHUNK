package com.noop.util;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.io.IOException;
import java.io.StringReader;

/**
 * XML to document
 *
 * @author 天狗
 * @version 1.0
 * @since 2024/5/18 9:11
 */
public class ElementUtil {
    private Element root = null;
    /**
     * 根据xml格式的字符串建document
     * @param sMsg  xml格式的字符串
     * @throws ParserConfigurationException
     * @throws IOException
     * @throws SAXException
     */
    public ElementUtil(String sMsg) throws ParserConfigurationException, IOException, SAXException {
        DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
        DocumentBuilder db = dbf.newDocumentBuilder();
        StringReader sr = new StringReader(sMsg);
        InputSource is = new InputSource(sr);
        Document document = db.parse(is);
        root = document.getDocumentElement();
    }

    /**
     * 根据tagName获取内容
     * @param tagName   标签名
     * @return
     */
    public String get(String tagName){
        NodeList nodeList=root.getElementsByTagName(tagName);
        if(nodeList.getLength()<=0){
            return null;
        }
        return root.getElementsByTagName(tagName).item(0).getTextContent();
    }

}
