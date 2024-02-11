"use client"
import AdminHomeView from "@/components/admin-view/home";
import Login from "@/components/admin-view/login";
// import AdminProjectView from "@/components/admin-view/project";
// import Signup from "@/components/admin-view/signUp";
import { addData, getData, login, updateData } from "@/services";
import { useEffect, useState } from "react";
const initialHomeFormData = {
    heading: '',
    summary: ''
}
// const initialProjectFormData = {
//     name: '',
//     technologies: '',
//     website: '',
//     github: ''
// }
const initialLoginFormData ={
username:"",
password:"",
}
export default function AdminView() {
    const [currentSelectedTab, setCurrentSelectedTab] = useState('home');
    const [homeViewFormData, setHomeViewFormData] = useState(initialHomeFormData);
    // const [projectViewFormData, setProjectViewFormData] = useState(initialProjectFormData);
    const [allData, setAllData] = useState({})
    const [update, setUpdate] = useState(false);
    const [authUser, setAuthUser] = useState(false)
    const [loginFormData, setLoginFormData] =useState(initialLoginFormData)
    const menuItems = [
        {
            id: "home",
            label: "home",
            component: <AdminHomeView formData={homeViewFormData} setFormData={setHomeViewFormData} handleSaveData={handleSaveData} />,
        },
        // {
        //     id: "project",
        //     label: "project",
        //     component: <AdminProjectView formData={projectViewFormData} setFormData={setProjectViewFormData} handleSaveData={handleSaveData} 
        //     data={allData?.project} />, 
        // },
    ];
    async function extractAllDatas() {
        const response = await getData(currentSelectedTab);

        if (
            currentSelectedTab === "home" &&
            response &&
            response.data &&
            response.data.length
        ) {
            setHomeViewFormData(response && response.data[0]);
            setUpdate(true);
        }

        if (response?.success) {
            setAllData({
                ...allData,
                [currentSelectedTab]: response && response.data,
            });
        }
    }
    const currentTime = new Date();
    console.log(currentTime);
    async function handleSaveData() {
        const dataMap = {
            home: homeViewFormData
            // ,
            // project: projectViewFormData
        }

        const response = update ? await updateData(
            currentSelectedTab,
            dataMap[currentSelectedTab]
        ) :
            await addData(
                currentSelectedTab,
                dataMap[currentSelectedTab]
            );

        console.log(response, 'response');

        if (response.success) {
            resetFormDatas();
            extractAllDatas();
        }
    }
    useEffect(() => {
        extractAllDatas();
    }, [currentSelectedTab]);
    function resetFormDatas() {
        setHomeViewFormData(initialHomeFormData)
        // setProjectViewFormData(initialProjectFormData)
    }
    console.log(allData, homeViewFormData, "homeViewFormData");
  useEffect(() => {
    setAuthUser(JSON.parse(sessionStorage.getItem("authUser")));
  }, []);
    async function handleLogin() {
        const res = await login(loginFormData);
    
        console.log(res, "login");
    
        if (res?.success) {
          setAuthUser(true);
          sessionStorage.setItem("authUser", JSON.stringify(true));
        }
      }
      if (!authUser) {
        return (
          <Login
            formData={loginFormData}
            handleLogin={handleLogin}
            setFormData={setLoginFormData}
          />
        );
      }
    return (
        <div className="border-b border-gray-200">
            <nav className="bg-gray-800 p-4" >
                <div className="container mx-auto flex justify-between items-center">
                    {
                            menuItems.map(item => (
                                <button
                                    key={item.id}
                                    type="button"
                                    className="p-4 font-bold text-xl text-black"
                                    onClick={() => {
                                        setCurrentSelectedTab(item.id);
                                        resetFormDatas();
                                        setUpdate(false)
                                    }}
                                >
                                    {item.label}

                                </button>
                            ))
                        }
                    <button
                        onClick={() => {
                            setAuthUser(false);
                            sessionStorage.removeItem("authUser");
                        }}
                        className="p-4 font-bold text-xl text-black"
                        >
                        Logout
                    </button>
                </div>
            </nav>
            <div className="mt-10 p-10">
                {
                    menuItems.map(item => item.id === currentSelectedTab && item.component)
                }
            </div>
        </div>
    );
} 