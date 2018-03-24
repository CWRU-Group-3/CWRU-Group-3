
var title="";
var list = "search"
var pageid = "";
var deleteText = function(string, target){
    while(string.includes(target)){
        string =  string.replace(target,"")
    }
    return string;
}
var textGrab = function(index,pageid){
    if(index==-1){
       
        $.ajax({
            url: "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=colombes",
            data: {
                format: 'json'
            },
            dataType: 'jsonp'
        }).then(function(response){
            var newContent = $("<div>")
            
            newContent.text(response.query.pages[pageid].extract)
            
            $("#description").empty().append(newContent);
        })
    }
    $.ajax({
        url: "https://en.wikipedia.org/w/api.php?action=parse&pageid="+pageid+"&section="+index+"&prop=text",
        data: {
            format: 'json'
        },
        dataType: 'jsonp'
    }).then(function(response){
        var newContent = $("<div>")
        var wikitext = response.parse.text["*"] 
        wikitext = deleteText(wikitext,"[")
        wikitext = deleteText(wikitext, "edit")
        wikitext = deleteText(wikitext, "]")
        newContent.html(wikitext)
        
        $("#description").empty().append(newContent);
    })
}
var picGrab = function(title, pageid){
    var query = "https://en.wikipedia.org/w/api.php?action=query&titles="+title+"&prop=pageimages";
    $.ajax({
        url: query,
        data: {
            format: 'json'
        },
        dataType: 'jsonp'
    }).then(function(response){
        var pixel = response.query.pages[pageid].thumbnail.width;
        pixel = pixel+"px";
        var src = response.query.pages[pageid].thumbnail.source;
        src = src.replace(pixel,"275px")
        var newImage = $("<img>").attr("src", src).attr("alt", src.replace("275px","270px"));
        $("#Matts-div").empty().append(newImage)
    })
}
var getIndex = function(response){
    var index = -1;
    var arr = response.parse.sections 
    for(var i =0; i<arr.length; i++){
        var head = response.parse.sections[i].line
        if(head=="Monuments and attractions" || head=="Tourism and attractions"){
            
            index = i+1;
            console.log("section heading check works")
            return index;
        }
    }
    for(var i=0; i<arr.length; i++){
        var head = response.parse.sections[i].line
        if(head=="Culture"|| head=="Landmarks"){
            index = i+1;
            return index;
        }
    }
    return index;
}
$(document).on("click",".city-button", function(){
    title = $(this).attr("value").trim();
    var path = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch="+title;
    
    console.log(title)
    $.ajax({
        url: path,
        data: {
            format: 'json'
        },
        dataType: 'jsonp'
    }).done( function ( data ) {
        console.log(data)
        pageid = data.query.search[0].pageid;
    
    var parse = "https://en.wikipedia.org/w/api.php?action=parse&pageid="+pageid+"&prop=sections"
    
    
    $.ajax({
        url:parse,
        data:{
            format:'json'
        },
        dataType:'jsonp'
    }).done(function(response){
        console.log(response)
        var index = getIndex(response);
       
        console.log(index)
        textGrab(index,pageid)
        picGrab(title, pageid)
        
    })
    

} );
})
