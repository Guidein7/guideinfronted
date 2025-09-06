import React, { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Footer";
import { resources } from "../../resources";
import axios from "axios";
import { types } from "../../Admin/ExcelUploads/types";
import { useSearchParams } from "react-router-dom";

const InterviewQA = () => {
  const [experience, setExperience] = useState("");
  const [domain, setDomain] = useState("");
  const [search, setSearch] = useState("");

  const experiences = ["Fresher", "1-3 years", "3-5 years", "5+ years"];
  const domains = ["Java", "Python", "React", "Node.js", "Power BI", "Cybersecurity"];

  const navigate = useNavigate();

  // ✅ Sample Data (will be replaced by backend later)
  // const datas = [
  //   {
  //     imgSrc:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCvDF4q5sNTSx-xgpX3yfUk8XpLNngeDJ1WQ&s",
  //     course: "Java",
  //     exp: "Fresher",
  //     domain: "Java",
  //     details: [
  //       {
  //         question: "What is Java?",
  //         howToAnswer: "Explain it as a high-level, object-oriented programming language.Java is a high-level, general-purpose, memory-safe, object-oriented programming language. It is intended to let programmers write once, run anywhere, meaning that compiled Java code can run on all platforms that support Java without the need to recompile",
  //         checks: "Checks if you know Java basics.Java is a high-level, general-purpose, memory-safe, object-oriented programming language. It is intended to let programmers write once, run anywhere, meaning that compiled Java code can run on all platforms that support Java without the need to recompile",
  //         sampleAnswer:
  //           "Java is a high-level, class-based, object-oriented programming language used for building platform-independent applications.Java is a high-level, general-purpose, memory-safe, object-oriented programming language. It is intended to let programmers write once, run anywhere, meaning that compiled Java code can run on all platforms that support Java without the need to recompile"
  //       },
  //       {
  //         question: "What is JVM?",
  //         howToAnswer: "Describe JVM as the runtime environment for Java bytecode.",
  //         checks: "Your knowledge of Java architecture.",
  //         sampleAnswer:
  //           "JVM stands for Java Virtual Machine. It executes Java bytecode and makes Java platform-independent."
  //       }
  //     ]
  //   },
  //   {
  //     imgSrc:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCvDF4q5sNTSx-xgpX3yfUk8XpLNngeDJ1WQ&s",
  //     course: "Java",
  //     exp: "1-3 years",
  //     domain: "Java",
  //     details: [
  //       {
  //         question: "Explain Collections Framework in Java.",
  //         howToAnswer: "Mention List, Set, Map, and their usage.",
  //         checks: "Practical coding experience with data structures.",
  //         sampleAnswer:
  //           "Java Collections Framework provides interfaces and classes like List, Set, and Map to store and manipulate groups of objects efficiently."
  //       },
  //       {
  //         question: "What is Multithreading in Java?",
  //         howToAnswer: "Talk about concurrent execution of tasks.",
  //         checks: "Knowledge of concurrency and synchronization.",
  //         sampleAnswer:
  //           "Multithreading allows concurrent execution of two or more threads. It improves performance but requires synchronization to avoid issues."
  //       }
  //     ]
  //   },
  //   {
  //     imgSrc:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCvDF4q5sNTSx-xgpX3yfUk8XpLNngeDJ1WQ&s",
  //     course: "Python",
  //     exp: "Fresher",
  //     domain: "Python",
  //     details: [
  //       {
  //         question: "What is Python?",
  //         howToAnswer: "Mention interpreted, high-level, general-purpose.",
  //         checks: "Basic understanding of Python.",
  //         sampleAnswer:
  //           "Python is an interpreted, high-level programming language known for readability and wide use in AI, web development, and automation."
  //       },
  //       {
  //         question: "What are Python data types?",
  //         howToAnswer: "List str, int, float, list, dict, tuple, set.",
  //         checks: "Your understanding of core Python data types.",
  //         sampleAnswer:
  //           "Python supports various data types such as int, float, string, list, tuple, set, and dictionary."
  //       }
  //     ]
  //   },
  //   {
  //     imgSrc:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCvDF4q5sNTSx-xgpX3yfUk8XpLNngeDJ1WQ&s",
  //     course: "Python",
  //     exp: "1-3 years",
  //     domain: "Python",
  //     details: [
  //       {
  //         question: "What is Python's GIL?",
  //         howToAnswer: "Explain it as a mechanism that allows only one thread at a time.",
  //         checks: "Knowledge of concurrency in Python.",
  //         sampleAnswer:
  //           "The Global Interpreter Lock (GIL) ensures only one thread executes Python bytecode at a time, simplifying memory management but limiting multithreading."
  //       },
  //       {
  //         question: "What are decorators in Python?",
  //         howToAnswer: "Talk about higher-order functions modifying behavior.",
  //         checks: "Knowledge of functional programming in Python.",
  //         sampleAnswer:
  //           "Decorators are functions that modify other functions or classes. Example: @staticmethod or @login_required."
  //       }
  //     ]
  //   },
  //   {
  //     imgSrc:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCvDF4q5sNTSx-xgpX3yfUk8XpLNngeDJ1WQ&s",
  //     course: "React",
  //     exp: "Fresher",
  //     domain: "React",
  //     details: [
  //       {
  //         question: "What is React?",
  //         howToAnswer: "Explain it as a JavaScript library for building UIs.",
  //         checks: "Basic React understanding.",
  //         sampleAnswer:
  //           "React is a JavaScript library for building fast, interactive user interfaces using a component-based architecture."
  //       },
  //       {
  //         question: "What are components?",
  //         howToAnswer: "Explain as building blocks of React UI.",
  //         checks: "Component-based architecture knowledge.",
  //         sampleAnswer:
  //           "Components are reusable building blocks in React. They can be class-based or functional."
  //       }
  //     ]
  //   },
  //   {
  //     imgSrc:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCvDF4q5sNTSx-xgpX3yfUk8XpLNngeDJ1WQ&s",
  //     course: "React",
  //     exp: "1-3 years",
  //     domain: "React",
  //     details: [
  //       {
  //         question: "What are React Hooks?",
  //         howToAnswer: "Mention useState, useEffect, and their usage.",
  //         checks: "Intermediate React knowledge.",
  //         sampleAnswer:
  //           "Hooks like useState and useEffect allow using state and lifecycle methods in functional components."
  //       },
  //       {
  //         question: "What is Context API?",
  //         howToAnswer: "Explain as a way to avoid prop drilling.",
  //         checks: "State management knowledge.",
  //         sampleAnswer:
  //           "Context API allows sharing data across components without passing props manually at every level."
  //       }
  //     ]
  //   }
  // ];
    const [searchParams, setSearchParams] = useSearchParams();

  const [datas,setdatas] = useState([]);
    const courseCategory = searchParams.get("courseCategory") || "";
    const courseDuration = searchParams.get("courseDuration") || "";
    const page = parseInt(searchParams.get("page")) || 0;

    const [totalPages, setTotalPages] = useState(1);

  // Filter logic
  const getData = () => {
      const params = new URLSearchParams({
            type: types.INTERVIEW,
            page: page.toString(),
            size: "5"
        });

        if (courseCategory && courseCategory.trim() !== "") {
            params.append("courseCategory", courseCategory);
        }
        if (courseDuration && courseDuration.trim() !== "") {
            params.append("courseDuration", courseDuration);
        }
   axios.get(`${resources.APPLICATION_URL}view/data?${params}`)
            .then(response => {
                if (Array.isArray(response.data.content)) {
                    setdatas(response.data.content);
                    // setTotalPages(response.data.totalPages || 1);
                    // setTotalElements(response.data.totalElements || 0);
                } else {
                    setdatas([]);
                    // setTotalPages(1);
                    // setTotalElements(0);
                }
            })
            .catch(error => {
                console.log(error);
                // errorMessage('Failed to fetch data');
                setdatas([]);
                // setTotalPages(1);
                // setTotalElements(0);
            })
            .finally(() => {
                // setLoading(false);
            });
    };
    useEffect(() => {
      getData()
    },[])
  const filteredResults = datas.filter((item) => {
    return (
      (experience ? item.exp === experience : true) &&
      (domain ? item.domain === domain : true) &&
      (search ? item.course.toLowerCase().includes(search.toLowerCase()) : true)
    );
  });

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="fixed z-10 bg-white p-2 w-full shadow-sm">
          <div>
            <div className="flex gap-1 items-center text-blue-500 mb-2">
              <Link to="/" className="hover:underline">Home</Link>
              <ChevronRight size={18} />
              <Link to="" className="hover:underline">Interview QAA</Link>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 mt-6 ">
              Interview QAA
            </h1>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg mt-2 p-4 md:w-[60%] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

              <input
                type="text"
                placeholder="Search courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className=" w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {/* Experience Dropdown */}
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full hidden md:block px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="" className="">Select Experience</option>
                {experiences.map((exp, idx) => (
                  <option key={idx} value={exp}>
                    {exp}
                  </option>
                ))}
              </select>

              {/* Domain Dropdown */}
              <select
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full hidden md:block px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value=""  className="py-3 px-2">Select Domain</option>
                {domains.map((dom, idx) => (
                  <option key={idx} value={dom}  className="py-3 px-2">
                    {dom}
                  </option>
                ))}
              </select>

              {/* Search Bar */}



              <div className="flex gap-2 md:hidden">
                 <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Experience</option>
                {experiences.map((exp, idx) => (
                  <option key={idx} value={exp}>
                    {exp}
                  </option>
                ))}
              </select>

              {/* Domain Dropdown */}
              <select
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Domain</option>
                {domains.map((dom, idx) => (
                  <option key={idx} value={dom}>
                    {dom}
                  </option>
                ))}
              </select>
              </div>
              
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="max-w-6xl mx-auto pt-48 px-4 ">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 gap-y-2">
            {(filteredResults.length > 0 ? filteredResults : datas).map((data, index) => (
              <div
                key={index}
                onClick={() => navigate("/answer", { state: { data } })}
                className="cursor-pointer flex flex-col gap-2 items-center bg-white shadow- p-4 rounded-lg hover:shadow-lg transition"
              >
                <div className="w-[73.6px] h-[73.6px] flex justify-center items-center rounded-lg">
                  <img src={data.imgSrc} alt={data.course} className="w-12 h-12" />
                </div>
                <span className="font-bold">{data.roles}</span>
                <p className="text-sm text-gray-500">{data.experience} | {data.domain}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default InterviewQA;
