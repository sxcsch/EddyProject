package com.fh.controller.code;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
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
	public Object str(HttpServletRequest request,HttpServletResponse response){
		try {
			String str = codeService.getRandomStr((int)(Math.random()*101+1));
			String callback = request.getParameter("back");
			PageData pageData = new PageData();
			response.setHeader("Access-Control-Allow-Origin", "*");
			response.setHeader("Access-Control-Allow-Methods","GET,POST");
			pageData.put("back", callback + "(" + str + ")");
			return AppUtil.returnObject(new PageData(), pageData);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
		
	}
	@RequestMapping(value="/codeStrs")
	public void strs(HttpServletResponse response, HttpServletRequest request){
		try {
			String str = codeService.getRandomStr((int)(Math.random()*101+1));
			StringBuffer sb  =  new StringBuffer();
			sb.append("<h1>");
			sb.append(str);
			sb.append("</h1>");
			response.setCharacterEncoding("utf-8");
			response.setHeader("Access-Control-Allow-Origin", "*");
			response.setHeader("Access-Control-Allow-Methods","GET,POST");
			response.setContentType("text/html;charset=utf-8");
			String result = sb.toString();
			//前端传过来的回调函数名称
			String callback = request.getParameter("back");
			//用回调函数名称包裹返回数据，这样，返回数据就作为回调函数的参数传回去了
			result = callback + "(" + result + ")";
			response.getWriter().write(result);
			response.getWriter().close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
