const BASE_URL = "https://hanscode20.github.io/restaurant-api/db.json";

export const getRestaurants = async () => {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    return data.restaurants;
}