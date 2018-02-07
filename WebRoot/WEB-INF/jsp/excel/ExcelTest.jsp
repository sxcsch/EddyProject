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
<button class="btn btn-mini btn-primary" onclick="clickStr()">点击导入</button>
<div id="codeStr"></div>    
<div id="example"></div>  
<script> 
var da
	 $.ajax({
		type: "post",
		url: '<%=basePath%>excel/data.do',
		data: {},
		dataType:'json',
		//beforeSend: validateData,
		cache: false,
		success: function(data){
            da = data.data;
		}
	  });
var hot

setTimeout(function () {
    console.log(da);
    var backRenderer = function (instance, td, row, col, prop, value, cellProperties) {
        Handsontable.renderers.TextRenderer.apply(this, arguments);
        //控制TD的背景颜色
        td.style.backgroundColor = '#E6E6FA ';
        //修改指定属性字体颜色
        if (prop == 'name') {


//            console.log(cellProperties)
//            console.log(col)
//            console.log(row)
            if(value.indexOf("张三") != -1){
                td.style.color = '#DC143C';
                //console.log(td)
            }
//            console.log(instance)
            //如果要添加其他样式，可以用以下写法
            //td.style = 'font-weight: bold;';
        }
        if (prop == 'age'){
            td.style.color = '#DC143C';
        }
        if (prop == 'del') {
            //添加自定义的图片，并给图片的chick添加事件
            var escaped = Handsontable.helper.stringify(value),imgdel;

            imgdel = document.createElement('IMG');
            imgdel.src = "dist/pic/del.jpg";
            imgdel.width = 20;
            imgdel.name = escaped;
            imgdel.style = 'cursor:pointer;';//鼠标移上去变手型
            Handsontable.dom.addEvent(imgdel, 'click', function (event) {
                hot.alter("remove_row", row);//删除当前行
            });

            Handsontable.dom.empty(td);
            td.appendChild(imgdel);
            td.style.textAlign = 'center';//图片居中对齐
            return td;
        }
    };

    var container = document.getElementById('example')
    Handsontable.renderers.registerRenderer('backRenderer', backRenderer);
    hot = new Handsontable(container, {
        data: da,
        rowHeaders:true,
        colHeaders:true,
        filters: true,
        columnSorting: true,
        sortIndicator: true,
        autoColumnSize: true,
        manualColumnResize: true,
        undo: true,
        redo: true,
        wordWrap: true,
        copyable: true,
        mergeCells: false,
        manualRowResize: true,
        manualRowMove: true,
        manualColumnMove: false,
        renderAllRows: true,
        allowInsertRow: true,
        allowInsertColumn: false,
        fixedColumnsLeft: 1,
//        columns: [ {
//            data: 'del',
//            type: 'text'
//        }, {
//            data: 'riqi',
//            type: 'date',
//            dateFormat: 'YYYY-MM-DD'
//        },{
//            data: 'address',
//            type: 'text'
//        },{
//            data: 'goods',
//            type: 'text'
//        },{
//            data: 'price',
//            type: 'numeric'
//        },{
//            data: 'sales',
//            type: 'numeric'
//        }],
        dropdownMenu: ['filter_by_condition', 'filter_by_value', 'filter_action_bar'],
        //右键菜单展示
        contextMenu:['row_above', 'row_below', '---------', 'remove_row','---------','undo','redo','---------','make_read_only','---------','alignment'],
        cells: function (row, col, prop) {
            var cellProperties = {};
            cellProperties.renderer = "backRenderer";
            return cellProperties;
        }
    })
},'1000s')

$(top.hangge());
function clickStr(){
    var url='<%=basePath%>excel/importData.do';
    console.log(hot.getData())

//    var arr
//    hot.getData().forEach(function(v,k){
//        arr[k] = JSON.stringify(v);
//       //alert(k);
//    });
console.log(arr)
//    for (var i=0;i<dat.length;i++){
//        arr[i]=JSON.stringify(dat[i]);
//    }
    $.ajax({
        type: "post",
        url: url,
        data: {"data":arr},
        dataType:'json',
        //beforeSend: validateData,
        cache: false,
        success: function(data){
            //console.log(data);
        }
    });

}

</script>  
<!-- 引入 -->
<script type="text/javascript">window.jQuery || document.write("<script src='static/js/jquery-1.9.1.min.js'>\x3C/script>");</script>
<script src="static/js/bootstrap.min.js"></script>
<script src="static/js/ace-elements.min.js"></script>
<script src="static/js/ace.min.js"></script>
<!-- 引入 -->
<script type="text/javascript">

</script>
</body>  
</html>  