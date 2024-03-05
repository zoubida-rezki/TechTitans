const axios = require('axios');
var Amadeus = require("amadeus");
import { NextResponse } from 'next/server';


const callOpenAIBig = async (myPrompt) => {
var answer;

function convertDateFormat(dateString) {
    const [month, day, year] = dateString.split(' ');
    return `${year}-${month}-${day}`;
}

const flightDetails = [];
const conversation = [{
        'role': 'system',
        'content': ' You are a travel agent, someone will tell you that they want fly from one location to another. You will determine the location they will fly from and land in. If they do not give specific airport, but give a city  choose the most popular airport in that city, if they give state or country choose the most popular airport in the capitol city. Put the airport code for the 2 locations. If they do not specify this return a blank json. If they do not give if its return flight or not, assume its return flight. if they say its one way set the return date to N/a If they do give the location try to determine depart date, and the return date coming back if its a return flight. If its a one way flight then just find the depart date and set return flight time as N/A. if they give the time for the departure and not when they want to return and its a return flight based on previous rules, set the return date 7 days after the arrival date. try to determine if there are extra adults, children, or infants, if not send adult to 1 and children and infant to 0, set baggage to 0 if not specified or put the number. If they do not give depart and return times put the depart time 7 days from todays date, and the return time 14 days after todays date.if they ask for cheapest flight between a certain interval then set depart date to the first date in interval and return date to the last date in interval. then make the varibale Interval equal to true intsead of false. I also want you to make a array of all the variables they did not enter but only do this if they at minimum put start and end location but do not include interval in this list. if a travel request is one way but it asks for a interval set interval to true but still put the last value of interval into return date.'
    },
    {
        'role': 'user',
        'content': 'I want to fly from Houston to Paris one way? todays date is 02 10 2024'
    },
    {
        'role': 'assistant',
        'content': 'StartingLocation : IAH, EndingLocation : CDG, DateofDeparture 02 17 2024: , DateofReturn : 02 24 2024, Baggage : 0, FlightReturn : Yes, NumberOfAdult : 1, NumberOfChilder : 0, NumberOfToddler : 0, Interval : False, NotIncluded : DateofDeparture DateofReturn Baggage NumberOfAdult NumberOfChilder NumberOfToddler.'
    },
    {
        'role': 'user',
        'content': 'I want to go from Tampa to India with one carryone and i want it to be a return flight. I will leave on march 12 and return after 2 weeks.'
    },
    {
        'role': 'assistant',
        'content': 'StartingLocation : TPA, EndingLocation : DEL, DateofDeparture : 03 12 2024, DateofReturn : 03 26 2024, Baggage : 0, FlightReturn : Yes, NumberOfAdult : 1, NumberOfChilder : 0, NumberOfToddler : 0, Interval : False, NotIncluded : NumberOfAdult NumberOfChilder NumberOfToddler.'
    },
    {
        'role': 'user',
        'content': 'I want to go somewhere tropical?'
    },
    {
        'role': 'assistant',
        'content': 'N/A'
    },
    {
        'role': 'user',
        'content': ''
    },
    {
        'role': 'assistant',
        'content': 'N/A'
    },
    {
        'role': 'user',
        'content': 'I wanna go to France'
    },
    {
        'role': 'assistant',
        'content': 'N/A'
    },
    {
        'role': 'user',
        'content': 'I fly from to japan'
    },
    {
        'role': 'assistant',
        'content': 'N/A'
    },
    {
        'role': 'user',
        'content': 'I fly from tampa to japan one way'
    },
    {
        'role': 'assistant',
        'content': 'StartingLocation : TPA, EndingLocation : HND, DateofDeparture : 02 18 2024, DateofReturn : n/a, Baggage : 0, FlightReturn : No, NumberOfAdult : 1, NumberOfChilder : 0, NumberOfToddler : 0, Interval : False, NotIncluded : DateofDeparture DateofReturn Baggage NumberOfAdult NumberOfChilder NumberOfToddler.'
    },
    {
        'role': 'user',
        'content': 'japan to korea with 1 extra adult and 1 toddler'
    },
    {
        'role': 'assistant',
        'content': 'StartingLocation : HND, EndingLocation : ICN, DateofDeparture : 02 17 2024, DateofReturn : 02 24 2024, Baggage : 0, FlightReturn : Yes, NumberOfAdult : 1, NumberOfChilder : 0, NumberOfToddler : 1, Interval : False, NotIncluded : .'
    },
    {
        'role': 'user',
        'content': 'Find me the lowest price flight option between Atlanta and New York between the dates of November 11th and 19th'
    },
    {
        'role': 'assistant',
        'content': 'StartingLocation : ATL, EndingLocation : JFK, DateofDeparture : 02 11 2024, DateofReturn : 02 19 2024, Baggage : 0, FlightReturn : Yes, NumberOfAdult : 1, NumberOfChilder : 0, NumberOfToddler : 0, Interval : True, NotIncluded : Baggage NumberOfAdult NumberOfChilder NumberOfToddler.'
    }
];


const question = myPrompt;

const apiUrl = 'https://api.openai.com/v1/chat/completions';
const apiKey = process.env.OPEN_AI;

const callOpenAI = async () => {
    const responseFlight = await axios.post(apiUrl, {
        model: 'gpt-3.5-turbo',
        max_tokens: 100,
        temperature: 0.0,
        messages: conversation.concat({
            role: 'user',
            content: question
        })
    }, {
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        }
    })

    if (responseFlight.data.choices && responseFlight.data.choices.length > 0) {

        answer = JSON.stringify(responseFlight.data.choices[0].message.content, null, 2);
        // Convert the response content to JSON 
        //console.log(answer);
    } else {
        console.log("No response received from the model.");
    }
}

await callOpenAI();
// airplane api starts here ---------------------------------------------------------------------


// Split the string into key-value pairs
const pairs = answer.split(', ').map(pair => pair.split(' : '));

// Construct an object from the key-value pairs
const jsonObject = Object.fromEntries(pairs.map(([key, value]) => [key.replace(/"/g, '').replace(/ /g, ''), value]));

// Convert the object to a JSON string
const jsonString = JSON.stringify(jsonObject);

// Parse the JSON string to create a JSON object
answer = JSON.parse(jsonString);

//console.log(answer);
var amadeus = new Amadeus({
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret
});

const departureDate = convertDateFormat(answer.DateofDeparture);
if (answer.FlightReturn === "No") {


    const response = await amadeus.shopping.flightOffersSearch.get({
        originLocationCode: answer.StartingLocation,
        destinationLocationCode: answer.EndingLocation,
        departureDate: departureDate,
        adults: answer.NumberOfAdult,
        children: answer.NumberOfChilder,
        infants: answer.NumberOfToddler
    });

    let filteredFlights = response.data.filter(flight => {
        // Check if the flight is one-way
        return flight.oneWay === true;
    })

    if (response.data[0].price.grandTotal) {
        flightDetails.push("cost for Flight: " + response.data[0].price.grandTotal);
    }
    for (var i = 0; i < response.data[0].itineraries[0].segments.length; i++) {

        if (i != 0){
            flightDetails.push("You have an extra Flight: ");}
        flightDetails.push("next flight on your trip is from : " + response.data[0].itineraries[0].segments[i].departure.iataCode + " to " + response.data[0].itineraries[0].segments[i].arrival.iataCode);
        flightDetails.push("departing flight number: ");
        flightDetails.push(response.data[0].itineraries[0].segments[i].carrierCode + " " + response.data[0].itineraries[0].segments[i].number);
        flightDetails.push("Time of departure ");
        flightDetails.push(response.data[0].itineraries[0].segments[i].departure.at);
    }

    const flightDetailsString = flightDetails.join('  ');

} else {

    const returndate = convertDateFormat(answer.DateofReturn);
    const response = await amadeus.shopping.flightOffersSearch.get({
        originLocationCode: answer.StartingLocation,
        destinationLocationCode: answer.EndingLocation,
        departureDate: departureDate,
        returnDate: returndate,
        adults: answer.NumberOfAdult,
        children: answer.NumberOfChilder,
        infants: answer.NumberOfToddler
    })

    if (response.data[0].price.grandTotal) {
        flightDetails.push("cost for Flight: " + response.data[0].price.grandTotal);

    }

    for (var i = 0; i < response.data[0].itineraries[0].segments.length; i++) {
        if (i != 0) {
            flightDetails.push("You have an extra Flight: ");
        }
        flightDetails.push("next flight on your trip is from : " + response.data[0].itineraries[0].segments[i].departure.iataCode + " to " + response.data[0].itineraries[0].segments[i].arrival.iataCode);
        flightDetails.push("departing flight number: ");
        flightDetails.push(response.data[0].itineraries[0].segments[i].carrierCode + " " + response.data[0].itineraries[0].segments[i].number);
        flightDetails.push("Time of departure ");
        flightDetails.push(response.data[0].itineraries[0].segments[i].departure.at);
    }
    flightDetails.push('The following is your return details');

    for (var i = 0; i < response.data[0].itineraries[1].segments.length; i++) {
        if (i != 0) {
            flightDetails.push("You have an extra Flight: ");}
            flightDetails.push("Next flight on your trip is from : " + response.data[0].itineraries[0].segments[i].departure.iataCode + " to " + response.data[0].itineraries[0].segments[i].arrival.iataCode);
            flightDetails.push("returning flight number : ");
            flightDetails.push(response.data[0].itineraries[1].segments[i].carrierCode + " " + response.data[0].itineraries[1].segments[i].number);
            flightDetails.push("Time of departure ");
            flightDetails.push(response.data[0].itineraries[1].segments[i].departure.at);
        
        const flightDetailsString = flightDetails.join('  ');
    }

    var conversation1 = [{
            'role': 'system',
            'content': ' You are a travel agaent who has to quikcly tell their clients about their flights. you are giving flight information. Put it into a complete sentnce. do not include year and time it will fly. Keep short'
        },
        {
            'role': 'user',
            'content': 'You have an extra Flight:   next flight on your trip is from : MUC to MIA  departing flight number:   LH 460  Time of departure   2024-02-15T11:35:00  The following is your return details  Next flight on your trip is from : BKK to MUC  returning flight number :   LX 65  Time of departure   2024-02-28T19:55:00  You have an extra Flight:   Next flight on your trip is from : MUC to MIA  returning flight number :   LX 180  Time of departure   2024-02-29T18:00:00, BKK, MIA, Baggage NumberOfAdult NumberOfChilder NumberOfToddler.'
        },
        {
            'role': 'assistant',
            'content': 'Hello, your flight will cost 1091.50 USD. Your first flight will be from BKK to MUC on 02-14 , on flight LH 773. Then, fly from MUC to MIA on 02-15, on flight LH 460. For Return travel from BKK to MUC on 02-28 on flight Lx 65 departing at 02-29. Then fly from MUC to MIA on flight LX 180 at 02-29. Please include carrying baggage, Number of Adults, Children, Toddlers for more accuracy'
        },
        {
            'role': 'user',
            'content': 'cost for Flight: 756.68  next flight on your trip is from : CDG to PEK  departing flight number:   CA 934  Time of departure   2024-02-17T19:30:00  You have an extra Flight:   next flight on your trip is from : PEK to HND  departing flight number:   CA 181  Time of departure   2024-02-19T08:20:00  The following is your return details  Next flight on your trip is from : CDG to PEK  returning flight number :   CA 182  Time of departure   2024-02-24T14:00:00  You have an extra Flight:   Next flight on your trip is from : PEK to HND  returning flight number :   CA 933  Time of departure   2024-02-25T13:30:00, CDG, HND, Baggage NumberOfAdult NumberOfChilder NumberOfToddler'
        },
        {
            'role': 'assistant',
            'content': 'Hello, your flight will cost 756.68 USD. First departure from CDG to PEK on 02-17, on flight CA 934. Next, fly from PEK to HND on 02-19, on flight CA 181. For return, fly from CDG to PEK on 02-24 returning on flight CA 182. Then fly from PEK to HND on flight CA 933 which will leave 02-25. Please include Baggage, number of adults, children, infants for more accuracy'
        }

    ];


    var question1 = flightDetails + "      " + answer.StartingLocation + " " + answer.EndingLocation + "  " + answer.NotIncluded;

    const responseUser = await axios.post(apiUrl, {
        model: 'gpt-3.5-turbo',
        max_tokens: 400,
        temperature: 0.0,
        messages: conversation1.concat({
            role: 'user',
            content: question1
        })
    }, {
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        }
    })

    if (responseUser.data.choices && responseUser.data.choices.length > 0) {
        const answer = responseUser.data.choices[0].message.content;
        return answer;
    } else {
        console.log("put correct information");
    }
}

return answer;
}

export async function POST(req) {
    const { myPrompt } = await req.json();

    const answer = await callOpenAIBig(myPrompt);

    return NextResponse.json({
        success: true,
        data: answer,
    });
}


// airplane api ends here ---------------------------------------------------------------------
