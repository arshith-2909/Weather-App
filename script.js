async function getWeather() {
    const apiKey = "6d6b56a598fe438b87e180549252812";
    const city = document.getElementById("cityInput").value.trim(); // avoid spaces

    if (!city) {
        document.getElementById("error").innerHTML = "Please enter a city name!";
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try{
        const response = await fetch(url);
        const data = await response.json();
        console.log(data); // <--- VERY IMPORTANT

        // If error from API
        if (data.cod != 200) {
            document.getElementById("error").innerHTML = data.message;
            document.getElementById("weatherBox").style.display = "none";
            return;
        }

        // On success
        document.getElementById("error").innerHTML = "";
        document.getElementById("weatherBox").style.display = "block";

        document.getElementById("cityName").innerHTML = data.name;
        document.getElementById("temperature").innerHTML = data.main.temp + "°C";
        document.getElementById("weatherDesc").innerHTML = data.weather[0].description;
        document.getElementById("humidity").innerHTML = data.main.humidity + "%";
        document.getElementById("wind").innerHTML = data.wind.speed + " km/h";

        const icon = data.weather[0].icon;
        document.getElementById("weatherIcon").src =
        `https://openweathermap.org/img/wn/${icon}@2x.png`;

    }catch(err){
        console.log(err);
        document.getElementById("error").innerHTML = "Network Error!";
    }
}
