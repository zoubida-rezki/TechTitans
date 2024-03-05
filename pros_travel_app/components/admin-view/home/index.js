import { useState } from 'react';

const InputWithText = ({ labelText, placeholder, value, onChange }) => {
  return (
    <div className="flex flex-col mb-4">
      <label className="mr-2">{labelText}</label>
      <input
        className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-400"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

const getNearbyPlaces = async (locationOrAddress, radius, type) => {
  const options = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      locationOrAddress, radius, type
    })
  }
  const res = await fetch('/api/geo', options);
  const { data }= await res.json();

  return data;
}



const figureoutlocation = async (myPrompt) => {
  const options = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      myPrompt
    })
  }
  const res = await fetch('/api/OpenAI2', options);
  const { data }= await res.json();

  return data;
}

const figureoutflightdetail = async (myPrompt) => {
  const options = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      myPrompt
    })
  }
  try {
    const res = await fetch('/api/openAI', options);
    const { data } = await res.json();
    
    
      return data;
    
  } catch (error) {
    return "There was an error with your request. If you didnt, please include Date in your request for both departure and return. If it is one way trip, please specifiy in your request that it is one way, and only include departing date";
  }
}

export default function AdminHomeView({ formData, setFormData }) {

  // const [flights, setFlights] = useState([]);
  // const [flights2, setFlights2] = useState([]);

  // const addFlight = () => {
  //   setFlights([...flights, {
  //     currentLocation: '',
  //     destination: '',
  //     date: '',
  //     time: '',
  //     cost: ''
  //   }]);
  // };

  const otherFunction = async (inputString) => {
   const data = await figureoutlocation(inputString ); //"I want to take a flight from alger to paris when is the earliest one ?")
  //  console.log(data)
      if (data) {
        const nearbyPlaces = await getNearbyPlaces(data, 10, 'Hotel');
        return nearbyPlaces;
      } else {
        const nearbyPlaces = "N/A , Wrong Value enterd"//await getNearbyPlaces('France, paris', 2, 'restaurant');
        return nearbyPlaces;
      }
  };
  const otherFunction2 = async (inputString) => {
   const bookingdata = await figureoutflightdetail(inputString);
   console.log('Booking Data: ', bookingdata);
       if (bookingdata) {
         return bookingdata
       } else {
         const b = "N/A , Wrong Value enterd"//await getb('France, paris', 2, 'restaurant');
         return b;
       }
   };

  const [inputValue, setInputValue] = useState('');
  const [submittedValue, setSubmittedValue] = useState([]);
  const [submittedValue2, setSubmittedValue2] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    const lettersArray = await otherFunction(inputValue);
    const lettersdictionary2 = await otherFunction2(inputValue);
  
    setFormData({
      ...formData,
      additionalDetails: lettersArray
    });
  
    setSubmittedValue(lettersArray);
    setSubmittedValue2(lettersdictionary2);
    setInputValue('');
  };

  return (
    <div>
    <div className="max-w-screen-xl mt-1 mb-5 px-8 xl:px-16 mx-auto flex justify-center items-center ">
      <form className="mt-8 text-center">
        <div className="mb-4 font-bold text-[26px] mb-10 ">
          <InputWithText
            labelText="Please add as many following details as possible: Current location, Destination, Tickets you will need, The time you plan to travel, The date you plan to travel, and do you need a ticket returning?"
            placeholder="Please add flight information:"
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>
        <button
          onClick= {handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          Send
        </button>
        
        {submittedValue && (
  <div className="mt-4 text-gray-700">
    <div className="border border-gray-400 px-4 py-2 flex flex-col items-center mt-10">{submittedValue2}</div>

{submittedValue.map((letter, index) => {
  // console.log(letter, index);
  let [l1, l2] = letter.split(",");  // Use let to declare variables and square brackets for array destructuring
  return (
    <td className="border border-gray-400 px-4 py-2 flex flex-col items-center mt-10" key={index}>
      <p className="font-bold">{l1}</p>
      <p>{l2}</p>
    </td>
  );
})}


  </div>
)}
      </form>
      </div>
      
    </div>
  );
}
