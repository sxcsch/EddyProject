package com.fh.controller.excel;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.druid.support.json.JSONUtils;
import com.fh.controller.base.BaseController;
import com.fh.entity.TestData;
import com.fh.util.AppUtil;
import com.fh.util.PageData;
import com.mysql.fabric.xmlrpc.base.Array;

@Controller
@RequestMapping("/excel")
public class ExcelController extends BaseController{
	@RequestMapping("/test")
	public ModelAndView excelTest(ModelAndView mv){
		mv.setViewName("excel/ExcelTest");
		//mv.addObject("pd", data());
		return mv;
	}
	
	@RequestMapping(value="/data")
	@ResponseBody
	public Object str(){
		return AppUtil.returnObject(new PageData(),data());
	}
	
	
	public PageData data(){
		PageData pageData = new PageData();
		PageData[] heard = new PageData[20];
		for (int i = 0; i < 20; i++) {
			PageData pd = new PageData();
			if(i==0){
				pd.put("ms", "卖进状态");
				pd.put("zx", "执行状态");
				pd.put("pass", "系统编号");
				pd.put("kd", "开档计划");
				pd.put("age", "督导编号");
				pd.put("name", "督导姓名");
				pd.put("ms1", "卖进状态");
				pd.put("zx1", "执行状态");
				pd.put("pass1", "系统编号");
				pd.put("kd1", "开档计划");
				pd.put("age1", "督导编号");
				pd.put("name1", "督导姓名");
				pd.put("ms11", "卖进状态");
				pd.put("zx11", "执行状态");
				pd.put("pass11", "系统编号");
				pd.put("kd11", "开档计划");
				pd.put("age11", "督导编号");
				pd.put("name11", "督导姓名");
				pd.put("ms2", "卖进状态");
				pd.put("zx2", "执行状态");
				pd.put("pass2", "系统编号");
				pd.put("kd2", "开档计划");
				pd.put("age2", "督导编号");
				pd.put("name2", "督导姓名");
				pd.put("ms22", "卖进状态");
				pd.put("zx22", "执行状态");
				pd.put("pass22", "系统编号");
				pd.put("kd22", "开档计划");
				pd.put("age22", "督导编号");
				pd.put("name22", "督导姓名");
				pd.put("ms3", "卖进状态");
				pd.put("zx3", "执行状态");
				pd.put("pass3", "系统编号");
				pd.put("kd3", "开档计划");
				pd.put("age3", "督导编号");
				pd.put("name3", "督导姓名");
				pd.put("ms33", "卖进状态");
				pd.put("zx33", "执行状态");
				pd.put("pass33", "系统编号");
				pd.put("kd33", "开档计划");
				pd.put("age33", "督导编号");
				pd.put("name33", "督导姓名");
				pd.put("del", "del");

			}else
			if (i%2!=0) {
				pd.put("ms", "卖进成功");
				pd.put("zx", "执行成功");
				pd.put("pass", "0000"+i);
				pd.put("kd", "开档成功");
				pd.put("age", "9999"+i);
				pd.put("name", "张三");
				pd.put("ms1", "卖进成功");
				pd.put("zx1", "执行成功");
				pd.put("pass1", "0000"+i);
				pd.put("kd1", "开档成功");
				pd.put("age1", "9999"+i);
				pd.put("name1", "张三");
				pd.put("ms11", "卖进成功");
				pd.put("zx11", "执行成功");
				pd.put("pass11", "0000"+i);
				pd.put("kd11", "开档成功");
				pd.put("age11", "9999"+i);
				pd.put("name11", "张三");
				pd.put("ms2", "卖进成功");
				pd.put("zx2", "执行成功");
				pd.put("pass2", "0000"+i);
				pd.put("kd2", "开档成功");
				pd.put("age2", "9999"+i);
				pd.put("name2", "张三");
				pd.put("ms22", "卖进成功");
				pd.put("zx22", "执行成功");
				pd.put("pass22", "0000"+i);
				pd.put("kd22", "开档成功");
				pd.put("age22", "9999"+i);
				pd.put("name22", "张三");
				pd.put("ms3", "卖进成功");
				pd.put("zx3", "执行成功");
				pd.put("pass3", "0000"+i);
				pd.put("kd3", "开档成功");
				pd.put("age3", "9999"+i);
				pd.put("name3", "张三");
				pd.put("ms33", "卖进成功");
				pd.put("zx33", "执行成功");
				pd.put("pass33", "0000"+i);
				pd.put("kd33", "开档成功");
				pd.put("age33", "9999"+i);
				pd.put("name33", "张三");
			}else{
				pd.put("ms", "卖进中");
				pd.put("zx", "执行失败");
				pd.put("pass", "0000"+i);
				pd.put("kd", "开档成功");
				pd.put("age", "9999"+i);
				pd.put("name", "王五");
				pd.put("ms1", "卖进中");
				pd.put("zx1", "执行失败");
				pd.put("pass1", "0000"+i);
				pd.put("kd1", "开档成功");
				pd.put("age1", "9999"+i);
				pd.put("name1", "王五");
				pd.put("ms11", "卖进中");
				pd.put("zx11", "执行失败");
				pd.put("pass11", "0000"+i);
				pd.put("kd11", "开档成功");
				pd.put("age11", "9999"+i);
				pd.put("name11", "王五");
				pd.put("ms2", "卖进中");
				pd.put("zx2", "执行失败");
				pd.put("pass2", "0000"+i);
				pd.put("kd2", "开档成功");
				pd.put("age2", "9999"+i);
				pd.put("name2", "王五");
				pd.put("ms22", "卖进中");
				pd.put("zx22", "执行失败");
				pd.put("pass22", "0000"+i);
				pd.put("kd22", "开档成功");
				pd.put("age22", "9999"+i);
				pd.put("name22", "王五");
				pd.put("ms3", "卖进中");
				pd.put("zx3", "执行失败");
				pd.put("pass3", "0000"+i);
				pd.put("kd3", "开档成功");
				pd.put("age3", "9999"+i);
				pd.put("name3", "王五");
				pd.put("ms33", "卖进中");
				pd.put("zx33", "执行失败");
				pd.put("pass33", "0000"+i);
				pd.put("kd33", "开档成功");
				pd.put("age33", "9999"+i);
				pd.put("name33", "王五");
			}
			heard[i]=pd;
		}
		
		
		pageData.put("data",heard);
		
		return pageData;
		
	}
	
	public PageData getEntity(){
		PageData pageData = new PageData();
		ArrayList<TestData> arrayList = new ArrayList<TestData>();
		TestData[] heard = new TestData[100];
		for (int i = 0; i < 100; i++) {
			TestData testData = new TestData();
			if(i==0){
				testData.setDunum("督导编号");
				testData.setKd("开档计划");
				testData.setMstatus("卖进状态");
				testData.setName("督导姓名");
				testData.setSysnum("系统编号");
				testData.setZstatus("执行状态");
			}else
			if (i%2!=0) {
				testData.setDunum("9999"+i);
				testData.setKd("开档成功");
				testData.setMstatus("卖进成功");
				testData.setName("张三");
				testData.setSysnum("0000"+i);
				testData.setZstatus("执行成功");
			}else{
				testData.setDunum("9999"+i);
				testData.setKd("开档中");
				testData.setMstatus("卖进中");
				testData.setName("王五");
				testData.setSysnum("0000"+i);
				testData.setZstatus("执行成功");
			}
			heard[i]=testData;
			arrayList.add(testData);
		}
		pageData.put("data",arrayList);
		
		return pageData;
	}
}
