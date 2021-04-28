
window.onload = function()
{
    var div = document.createElement("div");
    div.id = "body";
    

    var tr_ary = {
        "name":{
            "name":"留言者暱稱",
            "text":function(){return TextCr("text",{"id":"1000012"});}},
        "content":{
            "name":"留言內容",
            "text":function(){return TextCr("textarea",{"id":"1000013"});}},
        "submit":{
            "name":"",
            "text":function(){
                return TextCr("button",{"value":"送出留言"},Submit) 
            }
        }
    }

    var table = document.createElement("table");
    var tmp = document.createDocumentFragment();
    
    
    for(var k in tr_ary)
    {
        var tr = document.createElement("tr");
        
        var td = document.createElement("td");
        td.innerHTML = tr_ary[k].name;
        tr.appendChild(td);

        var td = document.createElement("td");
        td.appendChild( tr_ary[k].text() );
        tr.appendChild(td);
        
        tmp.appendChild(tr);
    }
    table.appendChild(tmp);

    div.appendChild(table);

    RagicGet("https://ap5.ragic.com/shen103227/forms/3/?api",function(_data){
        var table = document.createElement("table");    


        for(var k in _data)
        {
            var _val = _data[k];

            var tr = document.createElement("tr");

            for(var idx in _val)
            {
                if(idx.indexOf("_")==0) continue;

                
                var td = document.createElement("td");
                td.innerHTML = _val[idx].replaceAll("\n","<BR>");
                tr.appendChild(td);
    
                tmp.appendChild(tr);

            }

        }
        table.appendChild(tmp);

        div.appendChild( document.createElement("hr") );
        div.appendChild(table);
    });
    
    document.body.appendChild(div);
}

function TextCr(type,attr,event)
{
    var obj;
    
    if(type=="textarea")
    obj = document.createElement("textarea");
    else
    obj = document.createElement("input");
    
    obj.type = type;

    for(var k in attr)
        obj.setAttribute(k,attr[k]);

    if(event!=undefined)
    {
        obj.addEventListener("click",event);
    }

    return obj;
}


function Submit()
{
    var obj = this;
    var form;
    var search = obj;


    while(form==undefined)
    {
        search = search.parentElement;

        if(search.nodeName=="TABLE")
        {
            form = search;
        }
    }

    var list = form.querySelectorAll("input,textarea");
    var post = "";

    for(var i=0;i<list.length;i++)
    {
        if(list[i].type=="button") continue;
        post += list[i].id + "=" + list[i].value + "&";
    }

    RagicPost("https://ap5.ragic.com/shen103227/forms/3/?api",post);
    alert("留言已送出");
    location.reload();
}

function RagicGet(url,func)
{
    var response;
    var xml = new XMLHttpRequest();
    xml.open("GET",url);

    xml.onreadystatechange = function(e)
    {
        if(xml.readyState==4)
        {
            response = JSON.parse(xml.response);
            
            func( response );
        }
    }

    xml.send();
}


function RagicPost(url,post)
{
    var response;

    var xml = new XMLHttpRequest();
    xml.open("POST",url);
    xml.setRequestHeader("Content-type","application/x-www-form-urlencoded;");

    xml.onreadystatechange = function(e)
    {
        if(xml.readyState==4)
        {
            response = JSON.parse(xml.response);
            console.log(response);
        }
    }

    xml.send(post);
}



function RagicTest()
{
    var post_url = "https://ap5.ragic.com/shen103227/forms/1/?api";
    var post_data = "1000006=API網址&1000007=API標題";
    


    var xml = new XMLHttpRequest();
    xml.open("POST",post_url);
    xml.setRequestHeader("Content-type","application/x-www-form-urlencoded;");

    xml.onreadystatechange = function(e)
    {
        console.log(e);
        console.log(xml);
    }

    xml.send(post_data);

}