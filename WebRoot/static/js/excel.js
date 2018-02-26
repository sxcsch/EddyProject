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
// }

//自定义列
var backRenderer = function (instance, td, row, col, prop, value, cellProperties) {

    Handsontable.renderers.TextRenderer.apply(this, arguments);
    //控制TD的背景颜色
    td.style.backgroundColor = '#E6E6FA ';
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
