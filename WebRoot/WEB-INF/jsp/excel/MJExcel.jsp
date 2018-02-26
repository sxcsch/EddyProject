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
<div class="container-fluid" id="main-container">

    <div class="row-fluid" id="example"></div>

    </form>
</div>
<script>
var da = ${pds};
console.log(da)
</script>
<!-- 引入 -->
<script src="static/js/myjs/excelMJ.js"></script>
<!-- 引入 -->
<script type="text/javascript">window.jQuery || document.write("<script src='static/js/jquery-1.9.1.min.js'>\x3C/script>");</script>
<script src="static/js/bootstrap.min.js"></script>
<script src="static/js/ace-elements.min.js"></script>
<script src="static/js/ace.min.js"></script>
</body>  
</html>  