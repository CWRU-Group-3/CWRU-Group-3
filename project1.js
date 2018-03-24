var APIKey = "&appid=415a66a0a17d32018d6c3cc274b84af9";

//function that will collect the user input and return the weather details

$("#search-button").click(function (event) {
    ////prevent from submiting
    event.preventDefault();
    $("#country-input").empty();
    var searchBox = $("#country-input").val().trim();
    //adding the city name that the user will type to the queryURL
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + searchBox + APIKey;
    console.log(searchBox);
    //new buttons



    //class: ".city-button"



    $.ajax({
        url: queryURL,
        method: "GET"

    }).then(function (response) {
        var byCity = $(".city-button").val();
        console.log(queryURL);
        console.log(response);
        var tempFa=response.main.temp;
tempFa=1.8*(tempFa-273) +32;
tempFa=tempFa.toFixed(2);
        $("#_weather").text(response.name + " " + "weather details");
        $("#_clouds").text("description: " + response.weather[0].description);
        $("#_temperature").text("Temperature (F) " + tempFa);
        $("#_humidity").text("Humidity: " + response.main.humidity);
        $("#_wind").text("Wind Speed: " + response.wind.speed);
        

    })
})

$("body").on("click", ".city-button", function () {
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + $(this).val() + APIKey;
    $.ajax({
        url: queryURL,
        method: "GET"

    }).then(function (response) {
        var byCity = $(".city-button").val();
        console.log(queryURL);
        console.log(response);
        var tempFa=response.main.temp;
tempFa=1.8*(tempFa-273) +32;
tempFa=tempFa.toFixed(2);
        $("#_weather").text(response.name + " " + "weather details");
        $("#_clouds").text("description: " + response.weather[0].description);
        $("#_temperature").text("Temperature (F) " + tempFa);
        $("#_humidity").text("Humidity: " + response.main.humidity);
        $("#_wind").text("Wind Speed: " + response.wind.speed);
    });
})