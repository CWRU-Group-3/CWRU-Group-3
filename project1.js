var APIKey = "&appid=415a66a0a17d32018d6c3cc274b84af9";
        
//function that will collect the user input and return the weather details

$("#search-button").click(function (event) {
////prevent from submiting
    event.preventDefault();
    $("#country-input").empty();
    var searchBox = $("#country-input").val().trim();
    //adding the city name that the user will type to the queryURL
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+searchBox+APIKey;
  console.log(searchBox);


    
    $.ajax({
    url: queryURL,
    method: "GET"

}).then(function (response) {

    console.log(queryURL);
    console.log(response);
    $("#_weather").text(response.name + " " + "weather details");
    $("#_windt").text("Wind Speed: " + response.wind.speed);
    $("#_humidity").text("Humidity: " + response.main.humidity);
    $("#_temperature").text("Temperature (F) " + response.main.temp);
    })
   
})