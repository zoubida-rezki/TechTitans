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

export default function Signup({ formData, setFormData, handleLogin}) {
  return (
    
    // <div>Login</div>
    <div className="w-full">
      <div className="bg-[#ffffff] shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <FormControls
          controls={controls}
          formData={formData}
          setFormData={setFormData}
        />
        <button
          onClick={handleLogin}
          className="mt-[10px] border border-green-600 p-4 font-bold text-[16px]"
        >
          Login
        </button>
        <h1 className="mt-[10px] font-bold text-[26px]">not a user ?</h1>

      </div>
    </div>
  );
}