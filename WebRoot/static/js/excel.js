/**
 * Created by Administrator on 2/9/2018.
 */
//定义表格
var hot;
//插入数据
// function insertExpressCount(){
//     var idsdata = hot.getDataAtCol(0);//所有的id
//     for(var i=0;i<idsdata.length;i++){
//         //id=null时,是插入数据,此时的i正好是行号
//         if(idsdata[i]==null){
//             //获得id=null时的所有数据封装进data
//             var rowdata = hot.getDataAtRow(i);
//             //var collength = hot.countCols();
//             var top = hot.colToProp()
//             console.log(top)
//             if(rowdata!=null){
//                 var data={
//                     // top(0):rowdata[1],
//                     // top(1):rowdata[2],
//                     // top(2):rowdata[3],
//                     // top(3):rowdata[4],
//                     // top(4):rowdata[5],
//                     // top(5):rowdata[6],
//                     // top(6):rowdata[7],
//                     // top(7):rowdata[8],
//                     // top(8):rowdata[9]
//                 }
//                 insertlist.push(data);
//             }
//         }
//     }
//     if(insertlist.length!=0){
//         AllData.insertlist = insertlist;
//     }
//
// }
// saveData =function (){
//     //插入的数据的获取
//     insertExpressCount();
//     if(JSON.stringify(AllData) != "{}"&&validresult){
//         $.ajax({
//             url:'globalprocess',
//             type:'post',
//             dataType:'json',
//             contentType:'application/json',
//             data:JSON.stringify(AllData),
//             success:function(rdata){
//                 if(rdata.success){
//                     $.alert({
//                         title: '消息提示',
//                         type: 'blue',
//                         content: '保存成功.',
//                     });
//                     //保存以后重置全局容器
//                     clearContainer();
//                     //销毁
//                     hot.destroy();
//                 }
//                 else {
//                     $.alert({
//                         title: '错误提示',
//                         type: 'red',
//                         content: '保存数据失败.',
//                     });
//
//                 }
//             },
//             error:function () {
//                 $.alert({
//                     title: '错误提示',
//                     type: 'red',
//                     content: '请求失败.',
//                 });
//                 clearContainer();
//             }
//         })
//     }else{
//         if(!validresult){
//             $.alert({
//                 title: '错误提示',
//                 type: 'red',
//                 content: '数据类型错误.',
//             });
//         }else{
//             $.alert({
//                 title: '错误提示',
//                 type: 'red',
//                 content: '没有添加或修改数据.',
//             });
//         }
//     }
// }.
function ajaxCheck() {
    var storage = window.localStorage;
    if (storage!=null){
        for (var i=0, len = storage.length; i < len; i++)
        {
            var key = storage.key(i);
            var value = storage.getItem(key);
            // console.log(key + "=" + value);
            var ccc = JSON.parse(value);
            $.ajax({
                url:"excel/data",    //请求的url地址
                dataType:"json",   //返回格式为json
                async:true,//请求是否异步，默认为异步，这也是ajax重要特性
                data:ccc,    //参数值
                type:"post",   //请求方式
                success:function(req){
                    //请求成功时处理
                    localStorage.removeItem("site");
                },
                error:function(){
                    //请求出错处理
                }
            });
        }
    }
}
// ref = setInterval(function(){
//     ajaxCheck();
// },2000);

window.onbeforeunload = function (event) {
    //show_confirm();// 执行自己的函数

    // console.log(event);
    // if (typeof event == 'undefined') {
    //     event = window.event;
    // }
    // if (event) {
    //     event.returnValue = message;
    // }
    localStorage.setItem("site", "js8.in");
    console.log(localStorage)
    //ajaxCheck();
    return "";
}

var hang= -1;
var lie = -1;
var ddd = '';
//自定义列
var backRenderer = function (instance, td, row, col, prop, value, cellProperties) {
    var $events = $(td).data("events");
    if( $events && $events["dblclick"] ){
        //your code here
    }else{
        $(td).dblclick(function () {
            hang = row;
            lie  = col;
            ddd=value;
            console.log(td)
        })
    }
    if(row==hang && lie ==col && ddd!=value){
        console.log(value);
        var rows=hot.getDataAtRow(row);
        var datah='{';
        for(var i=0;i<rows.length;i++){
            var dapaaa = hot.colToProp(i);
            if(i==rows.length-1){
                datah+='"'+dapaaa+'"'+':'+'"'+rows[i]+'"';
            }else{
                datah+='"'+dapaaa+'"'+':'+'"'+rows[i]+'"'+',';
            }
        }
        datah+='}';
        var ccc = JSON.parse(datah);
        console.log(ccc)
        $.ajax({
            url:"http://www.microsoft.com",    //请求的url地址
            dataType:"json",   //返回格式为json
            async:true,//请求是否异步，默认为异步，这也是ajax重要特性
            data:ccc,    //参数值
            type:"post",   //请求方式
            success:function(req){
                //请求成功时处理

                var value = sessionStorage.getItem("key");
                var site = localStorage.getItem("site");
                sessionStorage.removeItem("key");
                localStorage.removeItem("site");
            },
            error:function(){
                //请求出错处理
                sessionStorage.setItem("key", "value");
                localStorage.setItem("site", "js8.in");
            }
        });

        hang = -1;
        lie = -1;
    }

    Handsontable.renderers.TextRenderer.apply(this, arguments);
    //控制TD的背景颜色
    //td.style.backgroundColor = '#E6E6FA ';
    //修改指定属性字体颜色
    if (prop == 'name') {
        value = value+'';
        if(value.indexOf("原一准") != -1){
            td.style.color = '#DC143C';
        }
    }
    if (prop == 'age'){
//            td.style.color = '#DC143C';
        value = value+'';
        if(value.indexOf("23") != -1){
            td.style.color = '#DC143C';
            //console.log(td)
        }
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
    if (prop == 'status_operation') {

        if(value==1){
            $(td).html("");
            var escaped = Handsontable.helper.stringify(value),a;
            a = document.createElement('span');
            a.className = "label label-info arrowed";
            a.style = 'cursor:pointer;';//鼠标移上去变手型
            a.innerText="已保存";
            td.appendChild(a);
            cellProperties.readOnly = true;
            return;
        }else if(row!=0 && value==0){
            $(td).html("");
//            Handsontable.dom.empty(td);
//            imgdel = document.createElement('IMG');
//            imgdel.src = "dist/pic/del.jpg";
//            imgdel.width = 20;
//            imgdel.name = escaped;
//            imgdel.style = 'cursor:pointer;';//鼠标移上去变手型
            //添加自定义的图片，并给图片的chick添加事件
            value=1;
            var escaped = Handsontable.helper.stringify(value),a;
            a = document.createElement('span');
            a.className = "label label-success arrowed";
            a.style = 'cursor:pointer;';//鼠标移上去变手型
            a.innerText="保存";

            Handsontable.dom.addEvent(a, 'click', function (event) {
                console.log(hot)
                hot.setDataAtCell(row,col,value);
//                hot.alter("remove_row", row);//删除当前行
                var rows=hot.getDataAtRow(row);
                var datah='{';
                for(var i=0;i<rows.length;i++){
                    var dapaaa = hot.colToProp(i);
                    if(i==rows.length-1){
                        datah+='"'+dapaaa+'"'+':'+'"'+rows[i]+'"';
                    }else{
                        datah+='"'+dapaaa+'"'+':'+'"'+rows[i]+'"'+',';
                    }
                }
                datah+='}';
                var ccc = JSON.parse(datah);
                $.post('excel/saveData.do',ccc,function(data){
                    if(data.success=='ok'){
                        alert("保存成功！");
                        a.innerText="已保存";
                        a.className = "label label-info arrowed";
                        nextPage(currentPage);
                    }else{
                        alert("保存失败！");
                        return;
                    }
                },"json");
            });

            td.appendChild(a);

            cellProperties.readOnly = true;
        }
//            td.style.textAlign = 'center';//图片居中对齐
        return td;
    }
};
//获取div
var container = document.getElementById('example')
//自定义
Handsontable.renderers.registerRenderer('backRenderer', backRenderer);
//hot
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
    dropdownMenu: ['filter_by_condition', 'filter_by_value', 'filter_action_bar'],
    //右键菜单展示
    contextMenu:['row_above', 'row_below', '---------', 'remove_row','---------','undo','redo','---------','make_read_only','---------','alignment'],
    cells: function (row, col, prop) {
        var cellProperties = {};
        cellProperties.renderer = "backRenderer";
        return cellProperties;
    }
})



// window.onload=function(){
//     var tbody=document.getElementsByTagName("tbody")[1];
//     console.log(tbody);
//     tbody.ondblclick=function (e) {
//         var ev=e||window.event;
//         var target=ev.target||ev.srcElement;
//         if(target.nodeName=="TD"){
//             var oldv=target.innerHTML;
//             target.innerHTML="";
//             var input=document.createElement("input");
//             input.type="text";
//             input.value=oldv;
//             target.appendChild(input);
//             input.focus();
//             input.onblur=function () {
//                 var newv=this.value;
//                 target.removeChild(input);
//                 target.innerHTML=newv;
//                 if(newv!=oldv){
//                     var id=target.parentNode.getAttribute("attr");
//                     var attr=target.getAttribute("attr");
//
//                     alert(111111112);
//                 }else{
//                     alert(111)
//                 }
//             }
//         }
//     }
// }

