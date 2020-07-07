var methods={
    ajax:function(url,data,callback){
        var request=new XMLHttpRequest();
        //4.准备发送请求的数据：url
        var method="POST";
        //5.调用xmlhttprequest对象的open方法
        request.open(method,url);
        request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        //6.调用xmlhttprequest对象的send方法,get请求参数为null
        request.send(data);
        //request.send("name='aaa'");
        //7.为xmlhttprequest对象添加onreadystatechange响应函数
        request.onreadystatechange=function(){
           //8.决断响应是否完成：xmlhttprequest对象的readystate属性值为4
            if(request.readyState==4){
               //9.再决断响应是否可用：xmlhttprequest对象status属性值为200
                if(request.status==200){
                   //10.打印响应结果：responseText
                   callback&&callback(request.responseText);
                }
            }
        }
    }
}
export default methods;