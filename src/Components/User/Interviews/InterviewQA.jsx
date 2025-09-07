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
  const [experiences, setExperiences] = useState([]);
  const [domains, setDomains] = useState([]);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [datas, setdatas] = useState([]);
  const domainParam = searchParams.get("search") || "";   // actually domain
  const roleParam = searchParams.get("domain") || "";     // actually role
  const exp = searchParams.get("experience") || "";
  const page = parseInt(searchParams.get("page")) || 0;
  const [totalPages, setTotalPages] = useState(1);


  const getDropdown = () => {
    axios.get(`${resources.APPLICATION_URL}drop-down?type=${types.INTERVIEW}`)
      .then(response => {

        if (Array.isArray(response.data?.experience)) {
          setExperiences(response.data?.experience)
        }
        if (Array.isArray(response.data?.roles)) {
          setDomains(response.data.roles);
        }

      })
      .catch(error => {
        console.log('Dropdown error:', error);
      });
  };

  useEffect(() => {
    getDropdown()
  }, [])



  const getData = () => {
    const params = new URLSearchParams({
      type: types.INTERVIEW,
    });

    if (roleParam && roleParam.trim() !== "") {
      params.append("role", roleParam); // correct
    }
    if (exp && exp.trim() !== "") {
      params.append("experience", exp);
    }
    if (domainParam && domainParam.trim() !== "") {
      params.append("domain", domainParam); // correct
    }

    axios.get(`${resources.APPLICATION_URL}view/data?${params}`)
      .then(response => {
        if (response.data.content && typeof response.data.content === "object") {
          const transformed = Object.entries(response.data.content).map(([key, value]) => {
            const roleMatch = key.match(/roles=(.*?),/);
            const expMatch = key.match(/experienceLevel=(.*?)]/);

            return {
              roles: roleMatch ? roleMatch[1] : "N/A",
              experience: expMatch ? expMatch[1] : "N/A",
              questions: value,
            };
          });
          setdatas(transformed);
        } else {
          setdatas([]);
        }
      })
      .catch(error => {
        console.log(error);
        setdatas([]);
      });
  };

  useEffect(() => {
    getData()
  }, [roleParam, exp, domainParam])


  const handleExperienceChange = (e) => {
    const value = e.target.value;
    setExperience(value);

    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set("experience", value);
    else newParams.delete("experience");

    setSearchParams(newParams);
  };

  // For search (domain actually)
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set("search", value);   // backend treats this as domain
    else newParams.delete("search");

    setSearchParams(newParams);
  };

  // For domain dropdown (actually role)
  const handleDomainChange = (e) => {
    const value = e.target.value;
    setDomain(value);

    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set("domain", value);   // backend treats this as role
    else newParams.delete("domain");

    setSearchParams(newParams);
  };


  function getInitials(str) {
    if (!str)
      return
    return str
      .trim()
      .split(/\s+/)
      .map(word => word[0] || "")
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }



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


          <div className="bg-white rounded-lg mt-2 p-4 md:w-[60%] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

              <input
                type="text"
                placeholder="Search courses..."
                value={domainParam}
                onChange={handleSearchChange}
                className=" w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {/* Experience Dropdown */}
              <select
                value={exp}
                onChange={handleExperienceChange}
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
                value={roleParam}
                onChange={handleDomainChange}
                className="w-full hidden md:block px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="" className="py-3 px-2">Select Domain</option>
                {domains.map((dom, idx) => (
                  <option key={idx} value={dom} className="py-3 px-2">
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
        <div className="max-w-6xl mx-auto pt-60 md:pt-48 px-4 ">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 gap-y-2">
            {datas.map((data, index) => (
              <div
                key={index}
                onClick={() => navigate('/answer', { state: data })}
                className="cursor-pointer flex flex-col gap-2 items-center bg-white  px-1  py-5 border  border-blue-200 rounded-lg hover:shadow-lg"
              >
                <div className="w-[50.6px] h-[50.6px] bg-blue-500 rounded-full flex justify-center items-center">
                  <span className="font-semibold text-white">{getInitials(data?.roles)}</span>
                </div>
                <span className="font-bold text-black text-center break-words whitespace-normal">
                  {data.roles}
                </span>                <p className="text-sm ">{data.experience}</p>
                <p className="text-xs ">{data.questions.length} Questions</p>
              </div>
            ))}
          </div>

        </div>
      </div >

      <Footer />
    </>
  );
};

export default InterviewQA;
