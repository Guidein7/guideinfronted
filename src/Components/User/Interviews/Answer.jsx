import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { ChevronRight, ChevronUp } from "lucide-react";
import Footer from "../Footer";
import Q from '../../../assets/q.png'
import { useParams } from "react-router-dom";
import axios from "axios";
import { resources } from "../../resources";
import { types } from "../../Admin/ExcelUploads/types";


const Answer = () => {
  const navigate = useNavigate()
  let { role, experience } = useParams();
  const [data, setData] = useState({});
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [activeTab, setActiveTab] = useState("how");
  role = role.replaceAll("-", " ");
  const [loading, setLoading] = useState(true);
  if (!role || !experience) {
    navigate('/interviewqa-hub');
  }

  const getData = () => {
    setLoading(true);
    axios.get(`${resources.APPLICATION_URL}view/data`, {
      params: {
        type: types.INTERVIEW,
      }
    }).then(response => {
      if (response.data.content && typeof response.data.content === "object") {
        let filteredData = filterAndTransform(response.data?.content, role, experience);
        setData(filteredData);
      }
    }).catch(error => {
      console.log(error);
    }).finally(() => setLoading(false))
  };

  useEffect(() => {
    getData();
  }, [role, experience]);

  const handleQuestionClick = (index) => {
    if (activeQuestion === index) {
      setActiveQuestion(null);
      setActiveTab(null);
    } else {
      setActiveQuestion(index);
      setActiveTab("how");
    }
  };


  function filterAndTransform(data, role, experience) {
    for (const key of Object.keys(data)) {
      const matches = key.match(/roles=(.*?), experienceLevel=(.*?)\]/);
      if (!matches) continue;
      const extractedRole = matches[1].trim();
      const extractedExperience = matches[2].trim();
      if (
        extractedRole.toLowerCase() === role.toLowerCase() &&
        (!experience || extractedExperience.toLowerCase() === experience.toLowerCase())
      ) {
        return {
          roles: extractedRole,
          experience: extractedExperience,
          questions: data[key],
        };
      }
    }
    return null;
  }



  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="fixed top-14 z-10 bg-white p-2 w-full shadow-sm ">
          <div className="flex gap-1 items-center text-blue-500 mb-2">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <ChevronRight size={18} />
            <Link to="/interviewqa-hub" className="hover:underline">
              Interview QA
            </Link>
            <ChevronRight size={18} />
            <p className="hover:underline">Q&A</p>
          </div>

          <h1 className="text-lg font-bold mb-4 mt-2">
            Top {experience?.toLowerCase() === "fresher" ? '50+' : '25+'}  {role} Interview Questions
          </h1>
        </div>
        {loading ? (<p className="min-h-screen flex justify-center items-center">Loading Quesions...</p>) : (<>
          {(!data || !data.questions || data.questions.length === 0)  ? (
            <p className="min-h-screen flex justify-center items-center text-gray-600 text-center py-6">
              No questions available for this role and experience.
            </p>
          ):(
          <div className="mt-28 px-4 mb-6">
            <div className="space-y-4 pt-5 md:pt-0">
              {data?.questions?.map((qa, index) => (
                <div key={index} className="rounded-lg border border-gray-300 bg-white relative">
                  <img className="top-0 left-0 absolute w-4 h-4" src={Q} />
                  <button
                    onClick={() => handleQuestionClick(index)}
                    className="w-full text-left p-4 pb-4 font-semibold flex justify-between items-center"
                  >
                    <div>
                      <span className="">{qa.question}</span>
                      <span>{activeQuestion === index && (<span className="text-xs  px-2 pb-1 pt-1 text-white font-bold bg-[#244ad1] m-2 rounded-full">{qa.conceptTag}</span>)}</span>
                    </div>
                    <span>
                      {activeQuestion === index ? <ChevronUp /> : <ChevronRight />}
                    </span>
                  </button>
                  {activeQuestion === index && (
                    <div className="p-3">
                      <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:justify-start">
                        <button
                          onClick={() => setActiveTab("how")}
                          className={`whitespace-nowrap px-2 sm:px-3 py-1.5 text-xs sm:text-sm border border-gray-300 rounded-lg  transition ${activeTab === "how"
                              ? " bg-black text-white font-bold"
                              : ""
                            }`}
                        >
                          How to Answer
                        </button>

                        <button
                          onClick={() => setActiveTab("checks")}
                          className={`whitespace-nowrap px-2 rounded-lg border border-gray-300 sm:px-3 py-1.5 text-xs sm:text-sm  transition ${activeTab === "checks"
                              ? "bg-black text-white font-bold"
                              : ""
                            }`}
                        >
                          Interviewer Checks
                        </button>
                        <button
                          onClick={() => setActiveTab("sample")}
                          className={`whitespace-nowrap border border-gray-300 px-2 sm:px-3 py-1.5 text-xs sm:text-sm rounded-lg transition ${activeTab === "sample"
                              ? "font-bold bg-black text-white"
                              : ""
                            }`}
                        >
                          Best Answer
                        </button>
                      </div>
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
          </div>)}</>)}
      </div>
      <Footer />
    </>
  );
};
export default Answer;
