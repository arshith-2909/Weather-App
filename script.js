async function getWeather() {
    const apiKey = "6d6b56a598fe438b87e180549252812"; // <-- WeatherAPI.com key
    const city = document.getElementById("cityInput").value.trim();

    if (!city) {
        document.getElementById("error").innerHTML = "Please enter a city name!";
        return;
    }

    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        if (data.error) {
            document.getElementById("error").innerHTML = data.error.message;
            document.getElementById("weatherBox").style.display = "none";
            return;
        }

        document.getElementById("error").innerHTML = "";
        document.getElementById("weatherBox").style.display = "block";

        document.getElementById("cityName").innerHTML = data.location.name + ", " + data.location.country;
        document.getElementById("temperature").innerHTML = data.current.temp_c + "°C";
        document.getElementById("weatherDesc").innerHTML = data.current.condition.text;
        document.getElementById("humidity").innerHTML = data.current.humidity + "%";
        document.getElementById("wind").innerHTML = data.current.wind_kph + " km/h";
        document.getElementById("weatherIcon").src = "https:" + data.current.condition.icon;

    } catch (err) {
        console.log(err);
        document.getElementById("error").innerHTML = "Network error!";
    }
}
