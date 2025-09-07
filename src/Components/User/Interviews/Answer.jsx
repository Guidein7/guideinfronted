// // Answer.jsx
// import React, { useState } from "react";
// import { useLocation, Link } from "react-router-dom";
// import { ChevronRight } from "lucide-react";
// import Footer from "../Footer";

// // ✅ Temporary Sample Data
// const sampleData = {
//   course: "Java",
//   exp: "Fresher",
//   domain: "Backend",
//   details: [
//     {
//       question: "What is Java?",
//       howToAnswer:
//         "Explain that Java is an OOP language, platform-independent, and widely used.",
//       checks: "Checks if you understand the basics and purpose of Java.",
//       sampleAnswer:
//         "Java is an object-oriented programming language that is platform-independent because of the JVM. It is used for web, desktop, and mobile applications.",
//     },
//     {
//       question: "What is JVM?",
//       howToAnswer:
//         "Mention its role in executing bytecode and making Java platform-independent.",
//       checks: "Looks for knowledge of runtime and execution flow.",
//       sampleAnswer:
//         "The JVM, or Java Virtual Machine, converts compiled Java bytecode into machine code so it can run on any operating system.",
//     },
//   ],
// };

// const Answer = () => {
//   // const { state } = useLocation();
//   const location = useLocation();

//   const  data  = location.state || {};
//   console.log("========>",data);
//   const displayData = data || sampleData;

//   // ✅ By default open the first question and show "How to Answer"
//   const [activeQuestion, setActiveQuestion] = useState(0);
//   const [activeTab, setActiveTab] = useState("how");

//   const handleQuestionClick = (index) => {
//     if (activeQuestion === index) {
//       // collapse if clicked again
//       setActiveQuestion(null);
//       setActiveTab(null);
//     } else {
//       // open new question and default to "How to Answer"
//       setActiveQuestion(index);
//       setActiveTab("how");
//     }
//   };

//   return (
   
//     <div className="min-h-screen bg-gray-50 p-6">
//       {/* Header */}
//       <div className="fixed z-10 bg-white p-2 w-full shadow-sm">
//         <div>
//           <div className="flex gap-1 items-center text-blue-500 mb-2">
//             <Link to="/" className="hover:underline">
//               Home
//             </Link>
//             <ChevronRight size={18} />
//             <Link to="/interviewqa" className="hover:underline">
//               Interview QAA
//             </Link>
//             <ChevronRight size={18} />
//             <p to="" className="hover:underline">
//               Q&A
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Questions & Answers */}
//       <div className="mt-16">
//         <h1 className="text-2xl font-bold mb-6">
//           {displayData.course} ({displayData.exp})
//         </h1>

//         <div className="mb-3 space-y-4">
//           {displayData.map((qa, index) => (
//             <div key={index} className="rounded-lg shadow-lg bg-white">
//               {/* Question */}
//               <button
//                 onClick={() => handleQuestionClick(index)}
//                 className="w-full text-left p-4 font-semibold flex justify-between items-center"
//               >
//                 {qa.question}
//                 <span>{activeQuestion === index ? ">" : "v"}</span>
//               </button>

//               {/* Answer Section with Buttons */}
//               {activeQuestion === index && (
//                 <div className="p-4">
//                   <div className="flex flex-row gap-2 sm:gap-4 mb-4 w-full">
//                     <button
//                       onClick={() => setActiveTab("how")}
//                       className={`flex-1 px-3 py-2 text-sm rounded-full transition ${
//                         activeTab === "how"
//                           ? "bg-blue-500 text-white"
//                           : "bg-gray-200 text-gray-800"
//                       }`}
//                     >
//                       How to Answer
//                     </button>
//                     <button
//                       onClick={() => setActiveTab("checks")}
//                       className={`flex-1 px-3 py-2 text-sm rounded-full transition ${
//                         activeTab === "checks"
//                           ? "bg-blue-500 text-white"
//                           : "bg-gray-200 text-gray-800"
//                       }`}
//                     >
//                       What Interviewer Checks
//                     </button>
//                     <button
//                       onClick={() => setActiveTab("sample")}
//                       className={`flex-1 px-3 py-2 text-sm rounded-full transition ${
//                         activeTab === "sample"
//                           ? "bg-blue-500 text-white"
//                           : "bg-gray-200 text-gray-800"
//                       }`}
//                     >
//                       Sample Answer
//                     </button>
//                   </div>

//                   {/* Show only selected tab */}
//                   {activeTab === "how" && (
//                     <div>
//                       <h3 className="font-bold mb-2">How to Answer</h3>
//                       <p className="text-gray-700">{qa.howToAnswer}</p>
//                     </div>
//                   )}
//                   {activeTab === "checks" && (
//                     <div>
//                       <h3 className="font-bold mb-2">What Interviewer Checks</h3>
//                       <p className="text-gray-700">{qa.checks}</p>
//                     </div>
//                   )}
//                   {activeTab === "sample" && (
//                     <div>
//                       <h3 className="font-bold mb-2">Sample Answer</h3>
//                       <p className="text-gray-700">{qa.sampleAnswer}</p>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
      
//     </div>
   
//   );
// };

// export default Answer;


import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Footer from "../Footer";

const Answer = () => {
  const location = useLocation();
  const data = location.state || {}; // comes from navigate("/answer", { state: { data } })
  console.log("========>", data);

  // If no data (direct URL access), fallback
  const displayData = data || { roles: "N/A", experience: "N/A", questions: [] };

  // ✅ By default open the first question and show "How to Answer"
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [activeTab, setActiveTab] = useState("how");

  const handleQuestionClick = (index) => {
    if (activeQuestion === index) {
      // collapse if clicked again
      setActiveQuestion(null);
      setActiveTab(null);
    } else {
      // open new question and default to "How to Answer"
      setActiveQuestion(index);
      setActiveTab("how");
    }
  };

  return (
    <>
    <div className="min-h-screen bg-gray-50 ">
      {/* Header */}
      <div className="fixed top-14 z-10 bg-white p-2 w-full ">
        <div>
          <div className="flex gap-1 items-center text-blue-500 mb-2">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <ChevronRight size={18} />
            <Link to="/interviewqa" className="hover:underline">
              Interview QAA
            </Link>
            <ChevronRight size={18} />
            <p className="hover:underline">Q&A</p>
          </div>
        </div>
         <h1 className="text-2xl font-bold mb-6 mt-6">
          {displayData.roles} ({displayData.experience})
        </h1>
      </div>

      {/* Questions & Answers */}
      <div className="mt-16">
       

        <div className="mb-3 space-y-4">
          {displayData.questions?.map((qa, index) => (
            <div key={index} className="rounded-lg shadow-lg bg-white">
              {/* Question */}
              <button
                onClick={() => handleQuestionClick(index)}
                className="w-full text-left p-4 font-semibold flex justify-between items-center"
              >
                {qa.question}
                <span>{activeQuestion === index ? ">" : "v"}</span>
              </button>

              {/* Answer Section with Buttons */}
              {activeQuestion === index && (
                <div className="p-4">
                  <div className="flex flex-row gap-2 sm:gap-4 mb-4 w-full">
                    <button
                      onClick={() => setActiveTab("how")}
                      className={`flex-1 px-3 py-2 text-sm rounded-full transition ${
                        activeTab === "how"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      How to Answer
                    </button>
                    <button
                      onClick={() => setActiveTab("checks")}
                      className={`flex-1 px-3 py-2 text-sm rounded-full transition ${
                        activeTab === "checks"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      What Interviewer Checks
                    </button>
                    <button
                      onClick={() => setActiveTab("sample")}
                      className={`flex-1 px-3 py-2 text-sm rounded-full transition ${
                        activeTab === "sample"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      Sample Answer
                    </button>
                  </div>

                  {/* Show only selected tab */}
                  {activeTab === "how" && (
                    <div>
                      <h3 className="font-bold mb-2">How to Answer</h3>
                      <p className="text-gray-700">{qa.howToAnswer}</p>
                    </div>
                  )}
                  {activeTab === "checks" && (
                    <div>
                      <h3 className="font-bold mb-2">What Interviewer Checks</h3>
                      <p className="text-gray-700">{qa.whatInterviewerChecks}</p>
                    </div>
                  )}
                  {activeTab === "sample" && (
                    <div>
                      <h3 className="font-bold mb-2">Sample Answer</h3>
                      <p className="text-gray-700">{qa.bestAnswer}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
    </div>
    <Footer />
    </>
  );
};

export default Answer;

