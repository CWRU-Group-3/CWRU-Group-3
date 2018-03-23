
var title="";
var list = "search"
var pageid = "";

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
    $.ajax({
        url:query,
        data:{
            format:'json'
        },
        dataType:'jsonp'
    }).done(function(response){
        console.log(response)
        var string = "response.query.pages."+pageid+".thumbnail.source"
        
        var newImage = $("<img>").attr("src", response.query.pages[pageid].thumbnail.source);
        $("#description").append(newImage)
    })
    } );
})
