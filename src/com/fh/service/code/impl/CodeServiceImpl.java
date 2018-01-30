package com.fh.service.code.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.fh.dao.DaoSupport;
import com.fh.service.code.CodeService;
import com.fh.util.PageData;
@Service
public class CodeServiceImpl implements CodeService {

	@Resource(name = "daoSupport")
	private DaoSupport dao;
	@Override
	public String getRandomStr(int i) {
		/*
		* 通过id获取数据
		*/
		PageData pd = new PageData();
		pd.put("id", i);
		try {
			return (String)dao.findForObject("CodeMapper.findById", pd);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

}
