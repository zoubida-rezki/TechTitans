"use client";

import {  useRef } from "react";
import AnimationWrapper from "../animation-wrapper";
import { motion, useScroll } from "framer-motion";
import { useRouter } from "next/navigation";



export default function ClientProjectView({ data }) {
  const containerRef = useRef(null);
  const { scrollXProgress } = useScroll({ container: containerRef });
  const router = useRouter()

  return (
    <div
      className="max-w-screen-xl mt-44 mb-6 sm:mt-14 sm:mb-14 px-6 sm:px-8 lg:px-16 mx-auto"
      id="project"
    >
      <AnimationWrapper className={"py-6 sm:py-16"}>
        <div className="flex flex-col justify-center items-center row-start-2 sm:row-start-1">
          <h1 className="leading-[70px] mt-8 mb-4 text-3xl lg:text-4xl xl:text-5xl font-medium">
            {"My Projects".split(" ").map((item, index) => (
              <span
              key={index}
                className={`${index === 1 ? "text-gray-main" : "text-[#000]"}`}
              >
                {item}{" "}
              </span>
            ))}
          </h1>
          {/* <svg id="progress" width={100} height={100} viewBox="0 0 100 100"> */}
            {/* <circle
              cx={"50"}
              cy={"50"}
              r="30"
              pathLength={"1"}
              className="stroke-[#000]"
            />
            <motion.circle
              cx={"50"}
              cy={"50"}
              r="30"
              pathLength={"1"}
              className="stroke-green-main"
              style={{ pathLength: scrollXProgress }}
            /> */}
          {/* </svg> */}
        </div>
      </AnimationWrapper>
      <AnimationWrapper>
        <ul className="project-wrapper flex flex-wrap justify-center" ref={containerRef}>
          {data && data.length
            ? data.map((item, index) => (
                <li
                  className="w-2/3 flex ml-5 mr-5 items-stretch cursor-pointer mb-6"
                  key={index}
                >
                  <div className="border-2 w-full relative justify-center text-center border-blue-main transition-all rounded-lg flex flex-col">
                    <div className="flex p-4 flex-col justify-center xl:flex-row w-full items-stretch xl:items-center">
                      <div className="flex order-2 xl:order-1">
                        <div className="flex flex-col ">
                          <h3 className="text-3xl text-black-600 mb-10 capitalize font-extrabold">
                            {item.name}
                          </h3>
                          {/* <p className="text-sm mt-2 text-black-500 capitalize font-bold">
                            {item.createdAt.split("T")[0]}
                          </p> */}
                          {/* <div className="mb-16 mt-2">
                            {item?.technologies.split(",").map((techItem) => (
                              <div className="w-full flex items-left" key={index}> */}
                                {/* <button className="whitespace-nowrap text-ellipsis overflow-hidden justify-center py-3 w-[120px]  px-6 border-[2px] border-blue-main bg-[#fff] text-[#000] font-semibold rounded-lg text-xs tracking-widest hover:shadow-blue-main transition-all outline-none">
                                  {techItem}
                                </button> */}
                                {/* <p className="mb-6">*</p>
                                <p>{techItem}</p>
                                <br></br> */}

                                {/* {item.technologies} */}
                              {/* </div>
                            ))}
                          </div> */}
                          <div className="mb-16 mt-2">
                                {item?.technologies.split(",").map((techItem, index) => (
                                  <div className="w-full flex items-left" key={index}>
                                    <p className="mb-6">&#8226;</p>
                                    <p className="ml-2">{techItem.trim()}</p>
                                  </div>
                                ))}
                              </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute w-full mt-4 mb-4 bottom-0 justify-center flex gap-2">
                      
                      {/* <button onClick={()=>router.push(item.github)} className="p-2 text-white-500 font-semibold text-[14px] tracking-widest bg-blue-main transition-all outline-none rounded">
                        Github
                      </button> */}
                      {item.website !== "NAN" && (
                        <button onClick={()=>router.push(item.website)} className="p-2 text-white-500 font-semibold text-[14px] tracking-widest bg-blue-main transition-all outline-none rounded">
                        Website
                      </button>
                      )}
                         <button
                        onClick={() => router.push(item.github)}
                        className="p-2 text-white-500 font-semibold text-[14px] tracking-widest bg-blue-main transition-all outline-none rounded"
                      >
                        Github
                      </button>
                    </div>
                  </div>
                </li>
              ))
            : null}
        </ul>
      </AnimationWrapper>
    </div>
  );
}