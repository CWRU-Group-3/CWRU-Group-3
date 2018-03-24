
var countriesArr = [];

function search() {
  clearDiv();
  clearSearch();
  var countrySearch = $("#country-input").val().trim();

  // const validate1 = simplyValid({
  //  schema: 'noNumbers'
  // });
  // const validate2 = simplyValid({
   // schema: 'noSpecials'
  //});
 // console.log(validate1)
  //var validation1 = validate1(countrySearch).isValid;
  //var validation2 = validate2(countrySearch).isValid;

  //if (validation1 === false || validation2 === false){
    //alert('Please enter a valid country with no numbers or special characters')
    //return
  //}


  var queryUrl = "http://api.geonames.org/searchJSON?q=" + countrySearch + "&maxRows=20&cities10000&continentCode=EU&fclName=city&username=ldillon16";
  //console.log("QI: " + queryUrl)

  $.ajax({
    url: queryUrl,
    method: "GET"
  }).then(function (response) {
    //console.log(response.geonames)
    for (i = 0; i < response.geonames.length; i++) {
      var name = response.geonames[i].name;
      //console.log("CITY NAME " + name)
      if ((response.geonames[i].fclName === "city, village,...")
        && (response.geonames[i].countryName = countrySearch)) {
        countriesArr.push(name)
        // console.log("CA" + countriesArr)
      }
    }

    for (j = 0; j < 3; j++) {

      var newButton = $("<button>").attr("value", countriesArr[j]).text(countriesArr[j]);
      newButton.attr("class", "city");
      newButton.addClass("city-button");
      $("#button-container").append(newButton);
    }
    // if (response.geonames[i].countryName != countrySearch) {
    //   alert("please type a country")
    // }

  })
}
function clearDiv() {
  $("#button-container").empty();
}

function clearSearch() {
  $("#country-input").empty();
  countriesArr = [];
}


// $(document).on("click", "#search-button", clearDiv);

$(document).on("click", "#search-button", function () {
  search();
  clearSearch();
});

