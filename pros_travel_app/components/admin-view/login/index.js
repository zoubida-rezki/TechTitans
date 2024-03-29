"use client";

import FormControls from "../form-controls";

const controls = [
  {
    name: "username",
    placeholder: "Enter User name",
    type: "text",
    label: "Enter User name",
  },
  {
    name: "password",
    placeholder: "Enter Password",
    type: "password",
    label: "Enter Password",
  },
];

export default function Login({ formData, setFormData, handleLogin}) {
  return (
    
    // <div>Login</div>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-80">
      <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        <FormControls
          controls={controls}
          formData={formData}
          setFormData={setFormData}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white rounded py-2 transition duration-300 hover:bg-blue-600"
        >
          Login
        </button>
        <h1 className="mt-[10px] font-bold text-[26px]">not a user ?</h1>
        {/* <button
        href='/TechTitans/pros_travel_app/components/admin-view/signUp/index.js'
          className="w-full bg-blue-500 text-white rounded py-2 transition duration-300 hover:bg-blue-600"
        >
          Register
        </button> */}

      </div>
    </div>
  );
}