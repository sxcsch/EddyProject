package com.fh.entity;

import java.io.InputStream;
import java.io.Serializable;

/**
 * Created by Administrator on 2/7/2018.
 */
public class UploadedExcel implements Serializable {
    /**
     * @fields serialVersionUID
     */

    private static final long serialVersionUID = -3489921145346054819L;
    private String name;
    private String mime;
    private long length;
    private byte[] data;
    private InputStream stream;

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMime() {
        return mime;
    }

    public void setMime(String mime) {
        this.mime = mime;
    }

    public long getLength() {
        return length;
    }

    public void setLength(long length) {
        this.length = length;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    public InputStream getStream() {
        return stream;
    }

    public void setStream(InputStream stream) {
        this.stream = stream;
    }
}
