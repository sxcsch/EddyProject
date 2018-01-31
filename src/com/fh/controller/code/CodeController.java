package com.fh.controller.code;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.druid.support.json.JSONUtils;
import com.fh.service.code.CodeService;
import com.fh.util.AppUtil;
import com.fh.util.PageData;

@Controller
public class CodeController {
	@Autowired
	CodeService codeService;
	
	
	@RequestMapping(value="/codeStr")
	@ResponseBody
	public Object str(){
		try {
			String str = codeService.getRandomStr((int)(Math.random()*101+1));
			
			PageData pageData = new PageData();
			pageData.put("success", str);
			return AppUtil.returnObject(new PageData(), pageData);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
		
	}
	@RequestMapping(value="/codeStrs")
	public void strs(HttpServletResponse response){
		try {
			String str = codeService.getRandomStr((int)(Math.random()*101+1));
			StringBuffer sb  =  new StringBuffer();
			sb.append("<h1>");
			sb.append(str);
			sb.append("</h1>");
			response.setCharacterEncoding("utf-8");
			response.setContentType("text/html;charset=utf-8");
			response.getWriter().write(sb.toString());
			response.getWriter().close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
