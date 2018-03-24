
var title="";
var list = "search"
var pageid = "";
var textGrab = function(index,pageid){
    $.ajax({
        url: "https://en.wikipedia.org/w/api.php?action=parse&pageid="+pageid+"&section="+index+"&prop=text",
        data: {
            format: 'json'
        },
        dataType: 'jsonp'
    }).then(function(response){
        var newContent = $("<div>")
        newContent.html(response.parse.text["*"])
        $("#description").append(newContent);
    })
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
    var query = "https://en.wikipedia.org/w/api.php?action=query&titles="+title+"&prop=pageimages";
    var parse = "https://en.wikipedia.org/w/api.php?action=parse&pageid="+pageid+"&prop=sections"
    
    
    $.ajax({
        url:parse,
        data:{
            format:'json'
        },
        dataType:'jsonp'
    }).done(function(response){
        console.log(response)
        
        var index = -1;
        var arr = response.parse.sections
        for(var i =0; i<arr.length; i++){
            if(response.parse.sections[i].line=="Monuments and attractions"){
                
                index = i+1;
                console.log("section heading check works")
            }
        }
        console.log(index)
        textGrab(index,pageid)
        //var newImage = $("<img>").attr("src", response.query.pages[pageid].thumbnail.source).attr("style","width: 200px; height: 200px");
        //$("#Matts-div").append(newImage)
        
    })
    

} );
})
