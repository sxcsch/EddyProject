<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html> 
<html lang="en"> 
<head>  
  <meta charset='utf-8'>  
  <base href="<%=basePath%>">
  <title> Handsontable</title>  
  <!-- jsp文件头和头部 -->
  <%@ include file="../system/admin/top.jsp"%> 
  <script data-jsfiddle="common" src="dist/jquery-1.7.2.min.js"></script>  
  <script src="dist/handsontable.full.js"></script>  
  <link rel="stylesheet" media="screen" href="dist/handsontable.full.css">  
</head>  
<body>
<button class="btn btn-mini btn-primary" onclick="clickStr()">点击毒鸡汤</button>
<div id="codeStr"></div>    
<div id="example"></div>  
<script> 

	 $.ajax({
		type: "post",
		url: '<%=basePath%>excel/data.do',
		data: {},
		dataType:'json',
		//beforeSend: validateData,
		cache: false,
		success: function(data){
			 $("#example").handsontable({
				    data: data.data,
					rowHeaders:true,
				    colHeaders:true,
				    startRows: 10,
			        startCols: 6,
			        //右键菜单展示
			        contextMenu:true,
			        //自适应列大小
			        autoColumnSize:true
			  }) 	
		}
	});


	
</script>  
<!-- 引入 -->
<script type="text/javascript">window.jQuery || document.write("<script src='static/js/jquery-1.9.1.min.js'>\x3C/script>");</script>
<script src="static/js/bootstrap.min.js"></script>
<script src="static/js/ace-elements.min.js"></script>
<script src="static/js/ace.min.js"></script>
<!-- 引入 -->
<script type="text/javascript">
$(top.hangge());
function clickStr(){
	var url='<%=basePath%>/codeStr.do';
	
	$.ajax({
		type: "GET",
		url: url,
    	data: {},
		dataType:'json',
		//beforeSend: validateData,
		cache: false,
		success: function(data){
			$("#codeStr").html(data.success);
		}
	});

}
</script>
</body>  
</html>  