import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";
import Footer from "../Footer";
import axios from "axios";
import { resources } from "../../resources";
import { types } from "../../Admin/ExcelUploads/types";
import Q from "../../../assets/q.png";

// hook to detect screen size
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [query]);

  return matches;
};

const Answer = () => {
  const navigate = useNavigate();
  let { role, experience } = useParams();
  const [data, setData] = useState(null);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [activeTab, setActiveTab] = useState("how");
  const [loading, setLoading] = useState(true);

  // detect if device is desktop (≥768px)
  const isDesktop = useMediaQuery("(min-width: 768px)");

  role = (role || "").replaceAll("-", " ");
  if (!role || !experience) navigate("/interviewqa-hub");

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${resources.APPLICATION_URL}view/data`, {
          params: { type: types.INTERVIEW },
        });
        if (res.data?.content && typeof res.data.content === "object") {
          const filtered = filterAndTransform(res.data.content, role, experience);
          setData(filtered);
        } else {
          setData(null);
        }
      } catch (e) {
        console.log(e);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [role, experience]);

  function filterAndTransform(content, role, experience) {
    for (const key of Object.keys(content)) {
      const m = key.match(/roles=(.*?), experienceLevel=(.*?)\]/);
      if (!m) continue;
      const extractedRole = m[1].trim();
      const extractedExperience = m[2].trim();
      if (
        extractedRole.toLowerCase() === role.toLowerCase() &&
        (!experience || extractedExperience.toLowerCase() === experience.toLowerCase())
      ) {
        return {
          roles: extractedRole,
          experience: extractedExperience,
          questions: content[key],
        };
      }
    }
    return null;
  }

  const handlePrev = () => {
    setActiveQuestion((prev) => (prev > 0 ? prev - 1 : (data?.questions?.length || 1) - 1));
    setActiveTab("how");
  };

  const handleNext = () => {
    setActiveQuestion((prev) =>
      prev < (data?.questions?.length || 1) - 1 ? prev + 1 : 0
    );
    setActiveTab("how");
  };

  // ------------------------------
  // MOBILE VIEW
  // ------------------------------
  const renderMobile = () => (
    <div className="mt-28 px-4 mb-6">
      <div className="space-y-4 pt-5 md:pt-0">
        {data?.questions?.map((qa, index) => (
          <div key={index} className="rounded-lg border border-gray-300 bg-white relative">
            <img className="top-0 left-0 absolute w-4 h-4" src={Q} alt="Q" />
            <button
              onClick={() => setActiveQuestion(activeQuestion === index ? null : index)}
              className="w-full text-left p-4 font-semibold flex justify-between items-center"
            >
              <div>
                <span>{qa.question}</span>
                {activeQuestion === index && (
                  <span className="text-xs px-2 py-1 ml-2 text-white font-bold bg-[#244ad1] rounded-full">
                    {qa.conceptTag}
                  </span>
                )}
              </div>
              {activeQuestion === index ? <ChevronUp /> : <ChevronRight />}
            </button>
            {activeQuestion === index && (
              <div className="p-3">
                {/* Tabs */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {["how", "checks", "sample"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-1 text-xs border rounded-lg ${activeTab === tab ? "bg-black text-white font-bold" : ""
                        }`}
                    >
                      {tab === "how"
                        ? "How to Answer"
                        : tab === "checks"
                          ? "Interviewer Checks"
                          : "Best Answer"}
                    </button>
                  ))}
                </div>
                {/* Tab Content */}
                {activeTab === "how" && (
                  <div>
                    <h3 className="font-bold mb-2">How to Answer</h3>
                    <p className="text-gray-700 whitespace-pre-line">{qa.howToAnswer}</p>
                  </div>
                )}
                {activeTab === "checks" && (
                  <div>
                    <h3 className="font-bold mb-2">What Interviewer Checks</h3>
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
  );

  // ------------------------------
  // DESKTOP VIEW
  // ------------------------------
  const renderDesktop = () => {
    const headerHeight = 64;
    return (
      <main className="grid md:grid-cols-[25rem_1fr] gap-6 px-4 mt-3">
        {/* Sidebar */}
        <aside
          className="hidden md:block bg-white  border border-gray-200 rounded-lg mt-20  mb-5"
          style={{
            position: "sticky",
            // top: headerHeight,
            height: `75vh`,
            overflowY: "auto",
          }}
        >
          <div className="p-4">
            {loading ? (
              <p className="text-sm text-gray-500">Loading…</p>
            ) : !data?.questions?.length ? (
              <p className="text-sm text-gray-500">No questions.</p>
            ) : (
              <div className=" divide-y divide-gray-200">
                {data.questions.map((qa, idx) => {
                  const short =
                    qa.question.length > 60 ? qa.question.slice(0, 60) + "…" : qa.question;
                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        setActiveQuestion(idx);
                        setActiveTab("how");
                      }}
                      className={`relative cursor-pointer p-3 ${activeQuestion === idx ? "bg-blue-50" : "hover:bg-gray-50"
                        }`}
                    >
                      <img src={Q} alt="Q" className="absolute top-2 left-2 w-4 h-4" />
                      <span className="text-sm leading-snug block pl-6">{short}</span>
                    </div>
                  );
                })}
              </div>

            )}
          </div>
        </aside>

        {/* Main Section */}
        <section className="rounded-lg bg-white border border-gray-200 p-8 mt-20 h-[75vh] ">
          <h2 className="text-lg font-semibold mb-2">
            {data?.questions?.[activeQuestion]?.question}
          </h2>
          {data?.questions?.[activeQuestion]?.conceptTag && (
            <span className="inline-block text-xs px-2 py-1 text-white font-bold bg-[#244ad1] rounded-full mb-4">
              {data.questions[activeQuestion].conceptTag}
            </span>
          )}

          {/* Tabs */}
          <div className="flex gap-5 mb-4 pb-2">
            {["how", "checks", "sample"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 text-sm rounded-md ${activeTab === tab
                  ? "bg-black text-white font-bold"
                  : "bg-gray-100"
                  }`}
              >
                {tab === "how"
                  ? "How to Answer"
                  : tab === "checks"
                    ? "Interviewer Checks"
                    : "Best Answer"}
              </button>
            ))}
          </div>


          {/* Tab content */}
          <div className="pb-4 h-[60%] overflow-y-auto">
            {activeTab === "how" && (
              <div>
                <h3 className="font-bold mb-2">How to Answer</h3>
                <pre className="bg-gray-100 p-3 rounded-md text-sm text-gray-800 whitespace-pre-wrap font-mono">
                  {data.questions[activeQuestion].howToAnswer}
                </pre>
              </div>
            )}
            {activeTab === "checks" && (
              <div>
                <h3 className="font-bold mb-2">What Interviewer Checks</h3>
                <pre className="bg-gray-100 p-3 rounded-md text-sm text-gray-800 whitespace-pre-wrap font-mono">
                  {data.questions[activeQuestion].whatInterviewerChecks}
                </pre>
              </div>
            )}
            {activeTab === "sample" && (
              <div>
                <h3 className="font-bold mb-2">Best Answer</h3>
                <pre className="bg-gray-100 p-3 rounded-md text-sm text-gray-800 whitespace-pre-wrap font-mono">
                  {data.questions[activeQuestion].bestAnswer}
                </pre>
              </div>
            )}
          </div>


          {/* Navigation Buttons */}
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={handlePrev}
              className="flex  items-center cursor-pointer"
            >
              <ChevronLeft /> <span>Previous Question</span>
            </button>
            <button
              onClick={handleNext}
              className="flex  items-center cursor-pointer"            >
              <span>Next Question</span> <ChevronRight/>
            </button>
          </div>

        </section>
      </main>
    );
  };


  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="fixed top-14 z-10 bg-white p-2 w-full ">
          <div className="flex gap-1 items-center text-blue-500 mb-2">
            <Link to="/" className="hover:underline">Home</Link>
            <ChevronRight size={18} />
            <Link to="/interviewqa-hub" className="hover:underline">Interview QA</Link>
            <ChevronRight size={18} />
            <span>Q&A</span>
          </div>
          <h1 className="text-lg font-bold mb-2">
            Top {experience?.toLowerCase() === "fresher" ? "50+" : "25+"} {role} Interview Questions
          </h1>
        </header>

        {/* Content */}
        {loading ? (
          <p className="min-h-screen flex justify-center items-center">Loading Questions…</p>
        ) : !data?.questions?.length ? (
          <p className="min-h-screen flex justify-center items-center text-gray-600">
            No questions available for this role and experience.
          </p>
        ) : isDesktop ? (
          renderDesktop()
        ) : (
          renderMobile()
        )}
      </div>
      <Footer />
    </>
  );
};

export default Answer;
