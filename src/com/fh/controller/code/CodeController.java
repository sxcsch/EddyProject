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
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
		
	}
}
