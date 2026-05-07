export async function getWeather(lat: number, lon: number) {
    const url =
        `https://api.open-meteo.com/v1/forecast` +
        `?latitude=${lat}` +
        `&longitude=${lon}` +
        `&current_weather=true`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            console.error("Failed to fetch weather data");
            
            return null;
        }

        const data = await response.json();

        return data.current_weather;
    } catch (err) {
        console.error("Weather API error:", err);

        return null;
    }
}