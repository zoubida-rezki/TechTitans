"use client";

import FormControls from "../form-controls";

const controls = [
  {
    name: "name",
    placeholder: "Project Name",
    type: "text",
    label: "Project Name",
  },
  {
    name: "technologies",
    placeholder: "Enter Technologies",
    type: "text",
    label: "Enter Technologies",
  },
  { 
    name: "website",
    placeholder: "Website",
    type: "text",
    label: "Website",
  },
  {
    name: "github",
    placeholder: "Github",
    type: "text",
    label: "github",
  },
];

export default function AdminProjectView({formData,setFormData,handleSaveData,data}){
    return( 
    <div className="w-full">
        <div className="bg-[#ffffff] shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-10">
          {
          data && data.length
            ? data.map((item,index) => (
                <div key={index} className="flex flex-col gap-4 border p-4 border-green-600">
                  <p>{item.name}</p>
                  <p>{item.technologies}</p>
                  <p>{item.website}</p>
                  <p>{item.github}</p>
                </div>
              )
              )
            : null}
            {console.log(data, "help me")}
        </div>
            <FormControls 
            controls={controls}
            formData={formData}
            setFormData={setFormData}
            />
            <button onClick={()=>handleSaveData('project')} className="mt-[10px] border border-green-600 p-4 font-bold text-[16-px]">Add Info</button>
        </div>
        <div className="flex justify-center items-center h-200">
            <div className="w-4/5 p-4 bg-gray-200">
                <div className="grid grid-cols-4 gap-5">
                    <div className="bg-gray-300 p-2">From</div>
                    <div className="bg-gray-300 p-2">To</div>
                    <div className="bg-gray-300 p-2">Cost</div>
                    <div className="bg-gray-300 p-2">Time and Date</div>
                    <div className="bg-gray-100 p-2">Houston, Texas</div>
                    <div className="bg-gray-100 p-2">Paris, France</div>
                    <div className="bg-gray-100 p-2">$40</div>
                    <div className="bg-gray-100 p-2">11:30 1/25</div>
                    <div className="bg-gray-100 p-2">Houston, Texas</div>
                    <div className="bg-gray-100 p-2">Paris, France</div>
                    <div className="bg-gray-100 p-2">$45</div>
                    <div className="bg-gray-100 p-2">11:30 1/26</div>
                </div>
            </div>
        </div>
    </div>
    );
}