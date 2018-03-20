var path = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=Canada";
var title="";
var list = "search"
var pageid = "";
$.ajax({
    url: path,
    data: {
        format: 'json'
    },
    dataType: 'jsonp'
}).done( function ( data ) {
    console.log(data)
    pageid = data.query.search[0].pageid;
var parse = "https://en.wikipedia.org/w/api.php?action=parse&pageid="+pageid;
$.ajax({
    url:parse,
    data:{
        format:'json'
    },
    dataType:'jsonp'
}).done(function(response){
    console.log(response)
})
} );
