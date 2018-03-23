
var pageToken = {};
$(document).ready(function () {
  $('.popup').hide()
  $('.overlayBg').hide()
  $('#searchButton').click(function () {
    searchYoutube();
  })
  $('.overlayBg').click(function () {
    $('.popup').hide()
    $('.overlayBg').hide()
  })
  $('#mckenzies-div').on('click', '.thumbnail', function () {
    $('.popup').show()
    $('.overlayBg').show();
    $(window).scrollTop(0)
    $('.popup iframe').attr('src', 'https://www.youtube.com/embed/' + $(this).attr('videoID'));
    console.log("Video ID: " + videoID)
  })
})

var $main = $("body");

$main.on('click', '.city', function () {
  var searchValue = $(this).val() + " tour of city";
  searchYoutube(searchValue)
  console.log("button worked")
})



function searchYoutube(searchValue) {
  $.ajax({
      url: 'https://www.googleapis.com/youtube/v3/search'
      , dataType: 'json'
      , type: 'GET'
      , data: {
          key: 'AIzaSyD2YO20Z5jX1c6NDI2VP2fhErSPIKT7kpY'
          , q: searchValue
          , part: 'snippet'
          , maxResults: 1
          , pageToken: pageToken.current
      }
  }).done(function (data) {
      pageToken.nextPage = data.nextPageToken;
      pageToken.prevPage = data.prevPageToken;
      console.log(pageToken)
      
      $.each(data['items'], function (index, value) {
          $("#mckenzies-div").empty();
          var title = $("<h4>");
          title.text(value.snippet.title);

          var img = $("<img>");
          img.attr("class","thumbnail");
          img.attr("src", value.snippet.thumbnails.medium.url)
          img.attr("videoID",value.id.videoId)
          console.log(value)
          console.log(value.id.videoId)

          $("#mckenzies-div").append(title);
          $("#mckenzies-div").append(img);

      })
      
  })
}
