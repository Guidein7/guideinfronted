import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { ChevronRight, ChevronUp } from "lucide-react";
import Footer from "../Footer";

const Answer = () => {
  const location = useLocation();
  const data = location.state || {}; // comes from navigate("/answer", { state: { data } })

  console.log(data)
  // ✅ Fallback if no data
  const displayData =
    data || {
      roles: "N/A",
      experience: "N/A",
      questions: [],
    };

  // ✅ By default open the first question and "How to Answer"
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [activeTab, setActiveTab] = useState("how");

  const handleQuestionClick = (index) => {
    if (activeQuestion === index) {
      setActiveQuestion(null);
      setActiveTab(null);
    } else {
      setActiveQuestion(index);
      setActiveTab("how");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="fixed top-14 z-10 bg-white p-2 w-full shadow-sm ">
          <div className="flex gap-1 items-center text-blue-500 mb-2">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <ChevronRight size={18} />
            <Link to="/interviewqa-hub" className="hover:underline">
              Interview QAA
            </Link>
            <ChevronRight size={18} />
            <p className="hover:underline">Q&A</p>
          </div>

          <h1 className="text-2xl font-bold mb-4 mt-2">
            {displayData.roles} ({displayData.experience})
          </h1>
        </div>

        {/* Questions & Answers */}
        <div className="mt-28 px-4 ">
          <div className="space-y-4 pt-5 md:pt-0"> 
            {displayData.questions?.map((qa, index) => (
              <div key={index} className="rounded-lg shadow-lg bg-white">
                {/* Question */}
                <button
                  onClick={() => handleQuestionClick(index)}
                  className="w-full text-left p-4 pb-4 font-semibold flex justify-between items-center"
                >                  
                 <div>
                  <span className="">{qa.question}</span>
                  <span>{activeQuestion === index && (<span className="text-xs text-gray-500 px-2 pb-1 pt-1 font-bold bg-blue-200 m-2 rounded-full">{qa.difficulty}</span>)}</span>
                 </div>
                  <span>
                    {activeQuestion === index ? <ChevronUp /> : <ChevronRight />}
                  </span>
                </button>
                {/* <span>{activeQuestion === index && (<span className="text-xs text-gray-500 px-2 pb-1 font-bold bg-blue-100 my-2">{qa.difficulty}</span>)}</span> */}

                {/* Answer Section */}
                {activeQuestion === index && (
                  <div className="p-3">
                    <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:justify-start">                            
                       <button
                        onClick={() => setActiveTab("how")}
                        className={`whitespace-nowrap px-2 sm:px-3 py-1.5 text-xs sm:text-sm rounded-full transition ${
                          activeTab === "how"
                            ? "bg-gray-300 text-black font-bold"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        How to Answer
                      </button>
               
                      <button
                        onClick={() => setActiveTab("checks")}
                        className={`whitespace-nowrap px-2 sm:px-3 py-1.5 text-xs sm:text-sm rounded-full transition ${
                          activeTab === "checks"
                            ? "bg-gray-300 text-black font-bold"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                       Interviewer Checks
                      </button>
                      <button
                        onClick={() => setActiveTab("sample")}
                        className={`whitespace-nowrap px-2 sm:px-3 py-1.5 text-xs sm:text-sm rounded-full transition ${
                          activeTab === "sample"
                            ? "bg-gray-300 text-black font-bold"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        Best Answer
                      </button>
                    </div>

                    {/* Show only selected tab */}
                    {activeTab === "how" && (
                      <div>
                        <h3 className="font-bold mb-2">How to Answer</h3>
                        <p className="text-gray-700 whitespace-pre-line">{qa.howToAnswer}</p>
                      </div>
                    )}
                    {activeTab === "checks" && (
                      <div>
                        <h3 className="font-bold mb-2">
                          What Interviewer Checks
                        </h3>
                        <p className="text-gray-700 whitespace-pre-line">{qa.whatInterviewerChecks}</p>
                      </div>
                    )}
                    {activeTab === "sample" && (
                      <div>
                        <h3 className="font-bold mb-2">Best Answer</h3>
                        <p className="text-gray-700 whitespace-pre-line">{qa.bestAnswer}</p>
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
