// "use client";

// // import { useEffect, useState } from "react";
// // import AnimationWrapper from "../animation-wrapper";
// // import { addData } from "@/services";
// // import React from 'react';
// import gmailLogo from '';  // Replace with the actual path or URL
// import linkedinLogo from './LinkedinLogo.png';  // Replace with the actual path or URL
// import githubLogo from './github.png';

// const controls = [
//   {
//     name: "name",
//     placeholder: "Enter your name",
//     type: "text",
//     label: "Name",
//   },
//   {
//     name: "email",
//     placeholder: "Enter your email",
//     type: "email",
//     label: "Email",
//   },
//   {
//     name: "message",
//     placeholder: "Enter your message",
//     type: "text",
//     label: "Message",
//   },
// ];

// const initialFormData = {
//   name: "",
//   email: "",
//   message: "",
// };

// import React from 'react';

// export default function ClientContactView() {
//   const gmailLink = "mailto:zoubidaziroki@gmail.com";  // Replace with your Gmail email
//     const linkedinLink = "https://www.linkedin.com/in/zoubida-rezki-539872230/";  // Replace with your LinkedIn profile URL
//     const github = "https://github.com/zoubida-rezki";
//     return (
//       <div id="contact">
//         <div className="container">
//             <div className="contact-center">
//               <h1 className="sub-title">Contact me </h1>
//               {/* <p>Email</p> */}
//                 <a href={gmailLink} target="_blank" rel="noopener noreferrer">
//                 <img src={gmailLogo} alt="Gmail Logo" className="social-logo" />
//                 </a>
//                 <a href={linkedinLink} target="_blank" rel="noopener noreferrer">
//                 <img src={linkedinLogo} alt="LinkedIn Logo" className="social-logo" />
//                 </a>
//                 <a href={github} target="_blank" rel="noopener noreferrer">
//                 <img src={githubLogo} alt="Github Logo" className="social-logo" style={{borderRadius: '15px'}} />
//                 </a>
//             </div>
//         </div>
//         <div className="copyright">
//           <p>@ made by zoubida rezki </p>
//         </div>
//       </div>
//     );
// }
// //   const linkedinUrl = 'https://www.linkedin.com/in/zoubida-rezki-539872230';
// //   const githubUrl = 'https://github.com/zoubida-rezki';
// //   const email = 'zoubidaziroki@gmail.com';

// //   const openEmailForm = () => {
// //     const emailFormUrl = `mailto:${email}`;
// //     window.open(emailFormUrl, '_blank');
// //   };

// //   return (
// //     <div>
// //       <img src="linkedin_logo_url" alt="LinkedIn Logo" />
// //       <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
// //         LinkedIn
// //       </a>

// //       <img src="github_logo_url" alt="GitHub Logo" />
// //       <a href={githubUrl} target="_blank" rel="noopener noreferrer">
// //         GitHub
// //       </a>

// //       <button onClick={openEmailForm}>Send Email</button>
// //     </div>
// //   );
// // }


// // export default function ClientContactView() {
// //   return<h1>hello</h1>
// // }
// //   const [formData, setFormData] = useState(initialFormData);
// //   const [showSuccessMessage, setShowSuccessMessage] = useState(false);

// //   async function handleSendMessage() {
// //     const res = await addData("contact", formData);
// //     console.log(res,'contact-res');

// //     if(res && res.success) {
// //         setFormData(initialFormData)
// //         setShowSuccessMessage(true)
// //     }
// //   }

// //   useEffect(()=>{
// //     if(showSuccessMessage) {
// //         setTimeout(()=>{
// //            setShowSuccessMessage(false)
// //         },1500)
// //     }

// //   },[showSuccessMessage])

// //   const isValidForm = () => {
// //     return formData &&
// //       formData.name !== "" &&
// //       formData.email !== "" &&
// //       formData.message !== ""
// //       ? true
// //       : false;
// //   };

// //   console.log(isValidForm(), 'isValidForm()');

// //   return (
// //     <div
// //       className="max-w-screen-xl mt-24 mb-6 sm:mt-14 sm:mb-14 px-6 sm:px-8 lg:px-16 mx-auto"
// //       id="contact"
// //     >
// //       <AnimationWrapper className={"py-6"}>
// //         <div className="flex flex-col justify-center items-center row-start-2 sm:row-start-1">
// //           <h1 className="leading-[70px] mb-4 text-3xl lg:text-4xl xl:text-5xl font-medium">
// //             {"Contact Me".split(" ").map((item, index) => (
// //               <span
// //                 className={`${index === 1 ? "text-green-main" : "text-[#000]"}`}
// //               >
// //                 {item}{" "}
// //               </span>
// //             ))}
// //           </h1>
// //         </div>
// //       </AnimationWrapper>
// //       <div className="text-gray-500 relative">
// //         <div className="container px-5">
// //           <div className="w-full">
// //             <div className="flex flex-wrap -m-2">
// //               {controls.map((controlItem) =>
// //                 controlItem.name === "message" ? (
// //                   <div className="p-2 w-full">
// //                     <div className="relative">
// //                       <label className="text-sm text-[#000]">
// //                         {controlItem.label}
// //                       </label>
// //                       <textarea
// //                         id={controlItem.name}
// //                         name={controlItem.name}
// //                         value={formData[controlItem.name]}
// //                         onChange={(e) =>
// //                           setFormData({
// //                             ...formData,
// //                             [controlItem.name]: e.target.value,
// //                           })
// //                         }
// //                         className="w-full border-green-main border-[2px] bg-[#ffffff] rounded  h-32 text-base outline-none text-[#000000] py-1 px-3 resize-none leading-6"
// //                       ></textarea>
// //                     </div>
// //                   </div>
// //                 ) : (
// //                   <div className="p-2 w-full">
// //                     <div className="relative">
// //                       <label className="text-sm text-[#000]">
// //                         {controlItem.label}
// //                       </label>
// //                       <input
// //                         id={controlItem.name}
// //                         name={controlItem.name}
// //                         value={formData[controlItem.name]}
// //                         onChange={(e) =>
// //                           setFormData({
// //                             ...formData,
// //                             [controlItem.name]: e.target.value,
// //                           })
// //                         }
// //                         className="w-full border-green-main border-[2px] bg-[#ffffff] rounded  text-base outline-none text-[#000000] py-1 px-3 leading-6"
// //                       />
// //                     </div>
// //                   </div>
// //                 )
// //               )}
// //               {
// //                 showSuccessMessage && <p className="text-[14px] font-bold my-[8px]">Your message is successfully delivered !</p>
// //               }
// //               <div className="p-2 w-full">
// //                 <button
// //                 disabled={!isValidForm()}
// //                   onClick={handleSendMessage}
// //                   className="disabled:opacity-50 py-3 lg:py-4 px-12 lg:px-16 text-white-500 font-semibold rounded-lg text-2xl tracking-widest bg-green-main outline-none"
// //                 >
// //                   Send Message
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

{/*  */}
import React from 'react';
import AnimationWrapper from '../animation-wrapper';

const gmailLink = 'mailto:zoubidaziroki@gmail.com';
const linkedinLink = 'https://www.linkedin.com/in/zoubida-rezki-539872230/';
const github = 'https://github.com/zoubida-rezki';

export default function ClientContactView() {
  return (
    <div
      className="max-w-screen-xl mt-24 sm:mt-14 sm:mb-14 px-6 sm:px-8 lg:px-16 mx-auto"
      id="contact"
    >
    <div id="contact" className="py-8 mt-44 text-center">
      <div className="container">
        {/* <h1 className="sub-title mb-2">Contact me</h1> */}
        <AnimationWrapper className={"py-6"}>
        <div className="flex flex-col justify-center items-center row-start-2 sm:row-start-1">
        <h1 className="leading-[70px] mb-4 text-3xl lg:text-4xl xl:text-5xl font-medium">
            {"Contact Me".split(" ").map((item, index) => (
              <span
              key={index}
                className={`${index === 1 ? "text-gray-main" : "text-[#000]"}`}
              >
                {item}{" "}
              </span>
            ))}
          </h1>
        </div>
      </AnimationWrapper>
        <div className="contact-center flex items-center justify-center space-x-2">
          <a href={gmailLink} target="_blank" rel="noopener noreferrer" className="inline-block">
            <img src="/Gmail.png" alt="Gmail Logo" className="social-logo h-20 w-20" />
          </a>
          <a href={linkedinLink} target="_blank" rel="noopener noreferrer" className="inline-block">
            <img src="/LinkedinLogo.png" alt="LinkedIn Logo" className="social-logo h-20 w-20" />
          </a>
          <a href={github} target="_blank" rel="noopener noreferrer" className="inline-block">
            <img src="/github.png" alt="Github Logo" className="social-logo h-20 w-20 rounded" />
          </a>
        </div>
      </div>
      <div className="copyright mt-24">
        {/* <p>@ made by zoubida rezki </p> */}
      </div>
    </div>
    </div>
  );
}

// import React from 'react';

// // const gmailLink = 'mailto:zoubidaziroki@gmail.com?subject=Subject%20Text&body=Body%20Text';

// // const linkedinLink = 'https://www.linkedin.com/in/zoubida-rezki-539872230/';
// // const github = 'https://github.com/zoubida-rezki';

// export default function ClientContactView() {
// const gmailLink = 'mailto:zoubidaziroki@gmail.com?subject=Subject%20Text&body=Body%20Text';

// const linkedinLink = 'https://www.linkedin.com/in/zoubida-rezki-539872230/';
// const github = 'https://github.com/zoubida-rezki';
//   const openGmailForm = () => {
//     window.open(gmailLink, '_blank');
//   };

//   return (
//     <div id="contact" className="py-8 text-center">
//       <div className="container">
//         <h1 className="sub-title mb-2">Contact me</h1>
//         <div className="contact-center flex items-center justify-center space-x-2">
//           <a href="#" onClick={openGmailForm} className="inline-block">
//             <img src="/Gmail.png" alt="Gmail Logo" className="social-logo h-4 w-4" />
//           </a>
//           <a href={linkedinLink} target="_blank" rel="noopener noreferrer" className="inline-block">
//             <img src="/LinkedinLogo.png" alt="LinkedIn Logo" className="social-logo h-4 w-4" />
//           </a>
//           <a href={github} target="_blank" rel="noopener noreferrer" className="inline-block">
//             <img src="/github.png" alt="Github Logo" className="social-logo h-4 w-4 rounded" />
//           </a>
//         </div>
//       </div>
//       <div className="copyright mt-4">
//         <p>@ made by zoubida rezki </p>
//       </div>
//     </div>
//   );
// }

// Import the useClient hook from 'next/react'


// import React from 'react';

// const gmailLink = 'mailto:zoubidaziroki@gmail.com?subject=Subject%20Text&body=Body%20Text';
// const linkedinLink = 'https://www.linkedin.com/in/zoubida-rezki-539872230/';
// const github = 'https://github.com/zoubida-rezki';

// const openGmailForm = () => {
//   window.open(gmailLink, '_blank');
// };

// const ClientContactView = () => {
//   if (typeof window !== 'undefined') {
//     // If running on the client side, attach event listener
//     const gmailIcon = document.getElementById('gmail-icon');
//     if (gmailIcon) {
//       gmailIcon.addEventListener('click', openGmailForm);
//     }

//     // Remove event listener when the component unmounts
//     return () => {
//       if (gmailIcon) {
//         gmailIcon.removeEventListener('click', openGmailForm);
//       }
//     };
//   }

//   return (
//     <div id="contact" className="py-8 text-center">
//       <div className="container">
//         <h1 className="sub-title mb-2">Contact me</h1>
//         <div className="contact-center flex items-center justify-center space-x-2">
//           <a id="gmail-icon" href="#" className="inline-block">
//             <img src="/Gmail.png" alt="Gmail Logo" className="social-logo h-4 w-4" />
//           </a>
//           <a href={linkedinLink} target="_blank" rel="noopener noreferrer" className="inline-block">
//             <img src="/LinkedinLogo.png" alt="LinkedIn Logo" className="social-logo h-4 w-4" />
//           </a>
//           <a href={github} target="_blank" rel="noopener noreferrer" className="inline-block">
//             <img src="/github.png" alt="Github Logo" className="social-logo h-4 w-4 rounded" />
//           </a>
//         </div>
//       </div>
//       <div className="copyright mt-4">
//         <p>@ made by zoubida rezki </p>
//       </div>
//     </div>
//   );
// };

// export default ClientContactView;

