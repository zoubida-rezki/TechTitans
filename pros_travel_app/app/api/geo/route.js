
const { Client } = require('@googlemaps/google-maps-services-js');
const axios = require('axios');

const googleMapsClient = new Client({axiosInstance: axios});
const apiKey = process.env.GOOGLE_MAPS_API_KEY; // Replace with your actual API key

async function getNearbyPlaces(locationOrAddress, radius, type) {
  // Step 1: Geocode the location or address
  const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(locationOrAddress)}&key=${apiKey}`;

  try {
    const geocodingResponse = await axios.get(geocodingUrl);
    const geocodingResults = geocodingResponse.data.results;

    if (geocodingResults.length > 0) {
      const location = geocodingResults[0].geometry.location;

      // Step 2: Get nearby places based on the geocoded location
      const placesResponse = await googleMapsClient.placesNearby({
        params: {
          location: `${location.lat},${location.lng}`,
          radius: radius,
          type: type,
          key: apiKey,
        },
      });

      const places = placesResponse.data.results;

      // Accumulate the print statements into one string
      let StringArr = [];
      places.forEach(place => {
      let resultString = '';
        resultString += `${place.name} ,\n`;
        resultString += `${place.vicinity}\n`;
        // resultString += `Place Location: ${JSON.stringify(place.geometry.location)}\n`;
        // resultString += '---\n';
        //console.log(resultString)
        StringArr.push(resultString)
      });


      return StringArr;

    } else {
      return ['Geocode was not successful.'];
    }

  } catch (error) {
    return [`Error making the geocoding request: ${error.message}`];
  }
}

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"

export async function POST(req){
    const {locationOrAddress, radius, type} = await req.json();
    const nearbyPlaces = await getNearbyPlaces(locationOrAddress, radius, type);
    return NextResponse.json({
      success: true,
      data: nearbyPlaces
    });
}


// Example usage
//const locationOrAddress = 'France, paris'; // Replace with your desired location or address
//const radius = 500;
//const type = 'restaurant';

//console.log(getNearbyPlaces(locationOrAddress, radius , type));

