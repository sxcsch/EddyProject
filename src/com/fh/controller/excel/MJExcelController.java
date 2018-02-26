package com.fh.controller.excel;

import com.alibaba.druid.support.json.JSONUtils;
import com.fh.controller.base.BaseController;
import com.fh.util.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

/**
 * Created by Administrator on 2/24/2018.
 */
@Controller
@RequestMapping("/excel")
public class MJExcelController extends BaseController {

    @RequestMapping("/mjUpload")
    public ModelAndView uploadFile(ModelAndView mv){
        mv.setViewName("excel/uploadexcel");
       return mv;
    }
    /**
     * 从EXCEL导入到数据库
     */
    @RequestMapping(value="/readExcel")
    public ModelAndView readExcel(@RequestParam(value="excel",required=false) MultipartFile file) throws Exception{
        ModelAndView mv = this.getModelAndView();
        PageData pd = new PageData();
        List<PageData> listPd = null;
        if (null != file && !file.isEmpty()) {
            String filePath = PathUtil.getClasspath() + Const.FILEPATHFILE;								//文件上传路径
            String fileName =  FileUpload.fileUp(file, filePath, "userexcel");							//执行上传

            listPd = (List)ObjectExcelRead.readExcel(filePath, fileName, 0, 0, 0);	//执行读EXCEL操作,读出的数据导入List 2:从第3行开始；0:从第A列开始；0:第0个sheet
            /**
             * var0 :编号
             * var1 :姓名
             * var2 :手机
             * var3 :邮箱
             * var4 :备注
             */
//            for(int i=0;i<listPd.size();i++){
//                pd.put("NUMBER", listPd.get(i).getString("var0"));							//编号已存在就跳过
//                pd.put("NUMBER", listPd.get(i).getString("var1"));							//编号已存在就跳过
//                pd.put("PHONE", listPd.get(i).getString("var2"));							//手机号
//            }
			/*存入数据库操作======================================*/

            mv.addObject("msg","success");
        }

        mv.setViewName("excel/MJExcel");
        mv.addObject("pds", JSONUtils.toJSONString(listPd));
        return mv;
    }

}
