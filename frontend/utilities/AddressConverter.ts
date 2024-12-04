import { Coordinates } from "@/types/Coordinates";

// API fetch function that gets lat/lng from an address
export async function getCoordinatesFromAddress(address: string): Promise<Coordinates | null> {
    const apiKey = process.env.GOOGLE_API_KEY;
    console.log(apiKey);

    if (!apiKey) {
        throw new Error('API key not found in environment variables');
    }

    const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            address
        )}&key=${apiKey}`
    );

    const data = await response.json();

    if (data.status === 'OK') {
        const location = data.results[0].geometry.location;
        return {
            latitude: location.lat,
            longitude: location.lng,
        };
    } else {
        console.error('Geocoding API error:', data.status);
        return null;
    }
}
