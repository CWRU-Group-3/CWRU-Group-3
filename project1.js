var APIKey = "&appid=415a66a0a17d32018d6c3cc274b84af9";



//function that will collect the user input and return the weather details

$("#bttn").click(function (event) {
////prevent from submiting
event.preventDefault();
$("#spicy").empty();
var searchBox = $("#spicy").val().trim();
//adding the city name that the user will type to the queryURL
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchBox + APIKey;
console.log(searchBox);



$.ajax({
    url: queryURL,
    method: "GET"

}).then(function (response) {

    console.log(queryURL);
    console.log(response);
    $(".city").text(response.name + " " + "weather details");
    $(".wind").text("Wind Speed: " + response.wind.speed);
    $(".humidity").text("Humidity: " + response.main.humidity);
    $(".temp").text("Temperature (F) " + response.main.temp);
})

})
