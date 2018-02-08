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
    <!-- 引入 -->
    <script type="text/javascript">window.jQuery || document.write("<script src='static/js/jquery-1.9.1.min.js'>\x3C/script>");</script>
    <script src="static/js/bootstrap.min.js"></script>
    <script src="static/js/ace-elements.min.js"></script>
    <script src="static/js/ace.min.js"></script>
   <script data-jsfiddle="common" src="dist/jquery-1.7.2.min.js"></script>
   <script src="dist/handsontable.full.js"></script>
   <link rel="stylesheet" media="screen" href="dist/handsontable.full.css">
</head>  
<body>
<div class="container-fluid" id="main-container">
    <form id="Form" action="excel/test.do" method="post" name="Form" id="Form">
    <table>
        <tr>
            <td>
                <span class="input-icon">
                    <input autocomplete="off" id="nav-search-input" type="text" name="name" value="${pd.name}" placeholder="这里输入姓名" />
                    <i id="nav-search-icon" class="icon-search"></i>
                </span>
            </td>
            <td style="vertical-align:top;"><button class="btn btn-mini btn-light" onclick="search();"  title="检索"><i id="nav-search-icon" class="icon-search"></i></button></td>
        </tr>
    </table>
    <!-- 检索  -->

    <div class="row-fluid" id="example"></div>
    <div class="pagination" style="float: left;padding-top: 0px;margin-top: 10px;">${page.pageStr}</div>

    </form>
</div>
<script>
var da = ${pds};
var hot;
//检索
function search(){
    top.jzts();
    $("#Form").submit();
}

//    console.log(da);
    var backRenderer = function (instance, td, row, col, prop, value, cellProperties) {
        Handsontable.renderers.TextRenderer.apply(this, arguments);
        //控制TD的背景颜色
        td.style.backgroundColor = '#E6E6FA ';
        //修改指定属性字体颜色
        if (prop == 'name') {
//            if(value.indexOf("张三") != -1){q
//                td.style.color = '#DC143C';
//                //console.log(td)
//            }
//            console.log(instance)
            //如果要添加其他样式，可以用以下写法
            //td.style = 'font-weight: bold;';
        }
        if (prop == 'age'){
//            td.style.color = '#DC143C';
        }
        if(prop == 'status_car'){
            if(value==0){
                $(td).html("无车");
            }else if(value==1){
                $(td).html("有车");
            }
        }
        if(prop == 'status_home'){
            if(value==0){
                $(td).html("无房");
            }else if(value==1){
                $(td).html("有房");
            }
        }
        if(prop == 'status_bachelordom'){
            if(value==0){
                $(td).html("单身汪");
            }else if(value==1){
                $(td).html("恩爱汪");
            }
        }
        if (prop == 'operation') {
            if(row!=0){
            //添加自定义的图片，并给图片的chick添加事件
            var escaped = Handsontable.helper.stringify(value),a;
            a = document.createElement('span');
            a.className = "label label-success arrowed";
            a.innerText="保存";
//            console.log(a)
//            imgdel = document.createElement('IMG');
//            imgdel.src = "dist/pic/del.jpg";
//            imgdel.width = 20;
//            imgdel.name = escaped;
//            imgdel.style = 'cursor:pointer;';//鼠标移上去变手型
            Handsontable.dom.addEvent(a, 'click', function (event) {
//                hot.alter("remove_row", row);//删除当前行
                var rows=hot.getDataAtRow(row);
                console.log(event);
                alert("保存成功");
            });
//            Handsontable.dom.empty(td);
            td.appendChild(a);

                cellProperties.readOnly = true;
            }
//            td.style.textAlign = 'center';//图片居中对齐
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
        //滚动条左列两条不动
        fixedColumnsLeft: 2,
        search: true,
//        columns: [ {
//            data: 'id',
//            readOnly: true
//        }, {
//            data: 'riqi',
//            type: 'date',
//            dateFormat: 'YYYY-MM-DD'
//        },{
//            data: 'name',
//            type: 'text'
//        },{
//            data: 'age',
//            type: 'text',
//            validator:/^[0-9]*$/
//        },{
//            data: 'money',
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