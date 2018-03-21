
var title="";
var list = "search"
var pageid = "";

$(document).on("click",".city-button", function(){
    var path = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch="+title;
    title = $(this).val().trim();
    $.ajax({
        url: path,
        data: {
            format: 'json'
        },
        dataType: 'jsonp'
    }).done( function ( data ) {
        console.log(data)
        pageid = data.query.search[0].pageid;
    var parse = "https://en.wikipedia.org/w/api.php?action=parse&pageid="+pageid+"&prop=images";
    $.ajax({
        url:parse,
        data:{
            format:'json'
        },
        dataType:'jsonp'
    }).done(function(response){
        console.log(response)
        var newImage = $("<img>").attr("src",response.images[1])
        $("#description").append(newImages)
    })
    } );
})
