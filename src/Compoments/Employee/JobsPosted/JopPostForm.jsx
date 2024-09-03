import Select from 'react-select';
function JobPostForm(props) {
    const cities = [
        { value: 'Others', label: 'Others' },
        { value: 'Bangalore', label: 'Bangalore' },
        { value: 'Hyderabad', label: 'Hyderabad' },
        { value: 'Mumbai', label: 'Mumbai' },
        { value: 'Delhi', label: 'Delhi' },
        { value: 'Pune', label: 'Pune' },
        { value: 'Chennai', label: 'Chennai' },
        { value: 'KolKata', label: 'Kolkata' },
        { value: 'Ahmedabad', label: 'Ahmedabad' },
        { value: 'Gurgaon', label: 'Gurgaon' },
        { value: 'Noida', label: 'Noida' },
        { value: 'Jaipur', label: 'Jaipur' },
        { value: 'Chandigarh', label: 'Chandigarh' },
        { value: 'Kochi', label: 'Kochi' },
        { value: 'Indore', label: 'Indore' },
        { value: 'Lucknow', label: 'Lucknow' },
        { value: 'Bhopal', label: 'Bhopal' },
        { value: 'Visakhapatanam', label: 'Visakhapatanam' },
        { value: 'Surat', label: 'Surat' },
        { value: 'Nagpur', label: 'Nagpur' },
        { value: 'Coimbatore', label: 'Coimbatore' },
        { value: 'Bhubaneswar', label: 'Bhubaneswar' },
        { value: 'Patna', label: 'Patna' },
        { value: 'Thiruvananthapuram', label: 'Thiruvananthapuram' },
        { value: 'Vadorara', label: 'Vadorara' },
        { value: 'Guwahati', label: 'Guwahati' },
    
    ]

    const educationOptions = [
        { value: 'High School', label: 'High School' },
        { value: "bachelor's degree", label: "Bachelor's Degree" },
        { value: "Master's Degree", label: "Master's Degree" },
        { value: 'Doctorate', label: 'Doctorate' },
        { value: 'Diploma/Certification', label: 'Diploma/Certification' },
    ];
  const jobTitles = ["Others",
        "Account Executive", "Account Manager", "Accountant", "Administrative Assistant",
        "Advertising Manager", "Aerospace Engineer", "Agile Coach", "Analyst", "Android Developer",
        "Animator", "Applications Developer", "Architect", "Art Director", "Assistant Manager",
        "Assistant Product Manager", "Associate Professor", "Asset Manager", "Audit Manager",
        "Back-End Developer", "Banking Analyst", "Benefits Coordinator", "Bioinformatics Specialist",
        "Biomedical Engineer", "Blockchain Developer", "Brand Manager", "Business Analyst",
        "Business Consultant", "Business Development Manager", "Business Intelligence Analyst",
        "CAD Designer", "CEO (Chief Executive Officer)", "CFO (Chief Financial Officer)",
        "Call Center Manager", "Campaign Manager", "Carpenter", "Case Manager", "Cashier",
        "Chemical Engineer", "Chief Marketing Officer (CMO)", "Chief Operating Officer (COO)",
        "Chief Technology Officer (CTO)", "Claims Adjuster", "Clinical Research Coordinator",
        "Cloud Architect", "Compliance Officer", "Computer Programmer", "Construction Manager",
        "Content Manager", "Content Writer", "Controller", "Copywriter", "Corporate Trainer",
        "Creative Director", "Credit Analyst", "Customer Service Manager", "Cyber Security Analyst",
        "Cytotechnologist", "Database Administrator", "Data Analyst", "Data Engineer", "Data Scientist",
        "Design Engineer", "Designer", "Development Manager", "DevOps Engineer", "Dietitian",
        "Director of Operations", "Director of Sales", "Distribution Manager", "Doctor",
        "Electrical Engineer", "Elementary School Teacher", "Embedded Systems Engineer",
        "Emergency Medical Technician (EMT)", "Employee Relations Specialist", "Email Marketing Manager",
        "Engineer", "Environmental Engineer", "Environmental Scientist", "Epidemiologist",
        "Event Coordinator", "Executive Assistant", "Facilities Manager", "Family Nurse Practitioner",
        "Fashion Designer", "Finance Manager", "Financial Advisor", "Financial Analyst",
        "Financial Planner", "Firefighter", "Fleet Manager", "Food Scientist", "Forensic Scientist",
        "Front-End Developer", "Full Stack Developer", "Fundraiser", "Game Designer",
        "Genetic Counselor", "Geneticist", "Geologist", "Graphic Designer", "Guidance Counselor",
        "Hardware Engineer", "Health and Safety Manager", "Healthcare Administrator",
        "Help Desk Technician", "High School Teacher", "Hospitality Manager", "Hotel Manager",
        "HR Manager", "Human Resources Specialist", "Hydrologist", "Illustrator",
        "Industrial Designer", "Industrial Engineer", "Information Security Analyst",
        "Information Systems Manager", "Information Technology Manager", "Information Technology Specialist",
        "Insurance Agent", "Instructional Designer", "Interior Designer", "Investment Banker",
        "IT Consultant", "IT Manager", "Java Developer", "Journalist", "Junior Accountant",
        "Laboratory Technician", "Landscape Architect", "Lawyer", "Librarian", "Machine Learning Engineer",
        "Maintenance Manager", "Management Consultant", "Manufacturing Engineer", "Marketing Coordinator",
        "Marketing Manager", "Marketing Specialist", "Mathematician", "Mechanical Engineer",
        "Media Planner", "Medical Assistant", "Medical Laboratory Technician", "Medical Technologist",
        "Mental Health Counselor", "Microbiologist", "Mobile Developer", "Mortgage Broker",
        "Music Producer", "Network Administrator", "Network Engineer", "Neuroscientist",
        "Nurse Practitioner", "Nursing Assistant", "Nutritionist", "Occupational Therapist",
        "Office Manager", "Operations Analyst", "Operations Manager", "Pediatrician",
        "Pharmacist", "Pharmacy Technician", "Physical Therapist", "Physician", "Physicist",
        "Portfolio Manager", "Principal", "Product Manager", "Product Owner", "Professor",
        "Project Coordinator", "Project Manager", "Property Manager", "Psychiatrist",
        "Psychologist", "Public Relations Manager", "Public Relations Specialist",
        "Purchasing Manager", "QA Engineer", "QA Manager", "Quality Assurance Analyst",
        "Recruiter", "Registered Nurse", "Research Analyst", "Research Scientist", "Retail Manager",
        "Risk Manager", "Sales Consultant", "Sales Director", "Sales Manager", "Sales Representative",
        "Scrum Master", "Security Analyst", "SEO Specialist", "Social Media Manager",
        "Software Developer", "Software Engineer", "Solutions Architect", "Speech Therapist",
        "Statistician", "Store Manager", "Strategic Planner", "Structural Engineer",
        "Supply Chain Manager", "Surgeon", "Surveyor", "System Administrator", "Systems Analyst",
        "Tax Advisor", "Teacher", "Technical Writer", "Technology Consultant", "Therapist",
        "Training Manager", "Translator", "Treasury Analyst", "UI Developer", "UI/UX Designer",
        "Underwriter", "User Experience Researcher", "Veterinarian", "Video Game Designer",
        "Warehouse Manager", "Web Designer", "Web Developer", "Writer"
    ];
    

    const {formData, setFormData,handleFormSubmit,errors,setErrors,
        isEditing,setIsEditing,toggleForm,hadleEdit,isTouched,
        setIsToiched,jobTitleRef,otherJobTitleRef,companyNameRef,
        jobLocationRef,customCityRef,jobTypeRef,workModeRef,jobDescriptionLinkRef,
        educationLevelRef,experienceRequiredRef} = props;
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [id]: value
        }));
        if (errors[id]) {
            setErrors((prevErrors) => ({ ...prevErrors, [id]: '' }));
        }
    };

    const handleCityChange = (selectedOptions) => {
        const selectedCities = selectedOptions ? selectedOptions.map(option => option.value) : [];
        let updatedJobLocation = selectedCities.filter(city => city !== 'Others').join(', ');

        if (selectedCities.includes('Others')) {
            updatedJobLocation += updatedJobLocation ? ', ' : '';
            updatedJobLocation += 'Others';
        }

        setFormData(prevFormData => ({
            ...prevFormData,
            jobLocation: updatedJobLocation
        }));

        if (errors.jobLocation) {
            setErrors((prevErrors) => ({ ...prevErrors, jobLocation: '' }));
        }
    };

    const handleJobTitleChange = (selectedOption) => {
        if (selectedOption.value === 'Others') {
            setFormData(prevFormData => ({ ...prevFormData, jobTitle: 'Others', otherJobTitle: '' }));
        } else {
            setFormData(prevFormData => ({ ...prevFormData, jobTitle: selectedOption.value, otherJobTitle: '' }));
        }

        if (errors.jobTitle) {
            setErrors((prevErrors) => ({ ...prevErrors, jobTitle: '' }));
        }

    };

    const handleSelectedOptions = (options) => {
        const selectedValues = options.map((option) => option.value);
        setFormData((prevFormData) => ({
          ...prevFormData,
          educationLevel: selectedValues.join(', '),
        }));
        if (errors.educationLevel) {
            setErrors((prevErrors) => ({ ...prevErrors, educationLevel: '' }));
        }
      };

      const cancel = () => {
        toggleForm();
        setIsEditing(false);
        setErrors({});
    }

    return(
        <form onSubmit={handleFormSubmit} noValidate>
        <div className='mb-4' ref={jobTitleRef}>
            <label htmlFor="jobTitle">Job Title<span className='text-red-500'>*</span></label>
            <Select
                id="jobTitle"
                options={jobTitles.map(title => ({ value: title, label: title }))}
                onChange={handleJobTitleChange}
                value={{ value: formData.jobTitle, label: formData.jobTitle }}
                required
            />
            {isTouched.jobTitle && errors.jobTitle && <span style={{ color: 'red' }}>{errors.jobTitle}</span>}
        </div>

        {formData.jobTitle === 'Others' && (
            <div className='mb-4' ref={otherJobTitleRef}>
                <label htmlFor="otherJobTitle">Please Specify<span className='text-red-500'>*</span></label>
                <input
                    type="text"
                    id="otherJobTitle"
                    placeholder="Enter  job title"
                    value={formData.otherJobTitle}
                    onChange={handleChange}
                    className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3'
                    required
                />
                {isTouched.otherJobTitle && errors.otherJobTitle && <span style={{ color: 'red' }}>{errors.otherJobTitle}</span>}
            </div>
        )}

        <div className='mb-4' ref={companyNameRef}>
            <label htmlFor='companyName' className='block text-sm font-medium text-gray-700'>
                Company Name<span className='text-red-500'>*</span>
            </label>
            <input
                type='text'
                id='companyName'
                value={formData.companyName}
                onChange={handleChange}
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3'
                required
            />
            {isTouched.companyName && errors.companyName && <span style={{ color: 'red' }}>{errors.companyName}</span>}

        </div>
        <div className='mb-4' ref={jobLocationRef}>
            <label htmlFor='jobLocation' className='block text-sm font-medium text-gray-700'>
                Job Location<span className='text-red-500'>*</span>
            </label>
            <Select
                isMulti
                id='jobLocation'
                options={cities}
                value={cities.filter(city => formData.jobLocation.split(', ').includes(city.value))}
                onChange={handleCityChange}
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3'
                required
            />
            {isTouched.jobLocation && errors.jobLocation && <span style={{ color: 'red' }}>{errors.jobLocation}</span>}

            {formData.jobLocation.includes('Others') && (
                <div className='mt-4' ref={customCityRef}>
                    <label htmlFor='customCity' className='block text-sm font-medium text-gray-700'>
                        Please Specify the City<span className='text-red-500'>*</span>
                    </label>
                    <input
                        type='text'
                        id='customCity'
                        placeholder='Enter city names, separated by commas'
                        value={formData.customCity}
                        onChange={handleChange}
                        className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3'
                        required
                    />
                    {isTouched.customCity && errors.customCity && <span style={{ color: 'red' }}>{errors.customCity}</span>}

                </div>
            )}
        </div>
        <div className='mb-4' ref={jobTypeRef}>
            <label htmlFor='jobType' className='block text-sm font-medium text-gray-700'>
                Job Type<span className='text-red-500'>*</span>
            </label>
            <select
                id='jobType'
                value={formData.jobType}
                onChange={handleChange}
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3'
                required
            >
                <option value=''>Select</option>
                <option value='Full-time'>Full-time</option>
                <option value='Part-time'>Part-time</option>
                <option value='Contract'>Contract</option>
                <option value='Internship'>Internship</option>
                <option value='Freelance'>Freelance</option>
                <option value='Remote'>Remote</option>
                <option value='Consultant'>Consultant</option>
                <option value='Apprenticeship'>Apprenticeship</option>
            </select>
            {isTouched.jobType && errors.jobType && <span style={{ color: 'red' }}>{errors.jobType}</span>}

        </div>
        <div className='mb-4' ref={workModeRef}>
            <label htmlFor='workMode' className='block text-sm font-medium text-gray-700'>
                Work Mode<span className='text-red-500'>*</span>
            </label>
            <select
                id='workMode'
                value={formData.workMode}
                onChange={handleChange}
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3'
                required
            >
                <option value=''>Select</option>
                <option value='hybrid'>Hybrid</option>
                <option value='onsite'>Onsite</option>
                <option value='remote'>Remote</option>
            </select>
            {isTouched.workMode && errors.workMode && <span style={{ color: 'red' }}>{errors.workMode}</span>}

        </div>
        <div className='mb-4' ref={jobDescriptionLinkRef}>
            <label htmlFor='jobDescriptionLink' className='block text-sm font-medium text-gray-700'>
                Job Description Link<span className='text-red-500'>*</span>
            </label>
            <input
                type='text'
                id='jobDescriptionLink'
                value={formData.jobDescriptionLink}
                onChange={handleChange}
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3'
                required
            />
            {isTouched.jobDescriptionLink && errors.jobDescriptionLink && <span style={{ color: 'red' }}>{errors.jobDescriptionLink}</span>}

        </div>
        <h2 className='text-xl font-semibold mb-4'>Requirements</h2>
        <div className='mb-4' ref={educationLevelRef}>
            <label htmlFor='educationLevel' className='block text-sm font-medium text-gray-700'>
                Education Level<span className='text-red-500'>*</span>
            </label>
            <Select
                id="educationLevel"
                options={educationOptions}
                value={educationOptions.filter((option) =>
            formData.educationLevel.split(', ').includes(option.value)
                )}
                onChange={handleSelectedOptions}
                isMulti
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                required
            />
            {isTouched.educationLevel && errors.educationLevel && <span style={{ color: 'red' }}>{errors.educationLevel}</span>}

        </div>
        <div className='mb-4' ref={experienceRequiredRef}>
            <label htmlFor='experienceRequired' className='block text-sm font-medium text-gray-700'>
                Experience Required<span className='text-red-500'>*</span>
            </label>
            <select
                id='experienceRequired'
                value={formData.experienceRequired}
                onChange={handleChange}
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3'
                required
            >
                <option value=''>Select</option>
                <option value='0-1 years'>0-1 years</option>
                <option value='1+ years'>1+ years</option>
                <option value='2+ years'>2+ years</option>
                <option value='3+ years'>3+ years</option>
                <option value='4+ years'>4+ years</option>
                <option value='5+ years'>5+ years</option>
                <option value='6+ years'>6+ years</option>
                <option value='7+ years'>7+ years</option>
                <option value='8+ years'>8+ years</option>
                <option value='9+ years'>9+ years</option>
                <option value='10+ years'>10+ years</option>
                <option value='11+ years'>11+ years</option>
                <option value='12+ years'>12+ years</option>
                
            </select>
            {isTouched.experienceRequired && errors.experienceRequired && <span style={{ color: 'red' }}>{errors.experienceRequired}</span>}

        </div>
        <div className='flex justify-end'>
            <button
                type='button'
                onClick={cancel}
                className='text-white bg-red-700 hover:bg-red-800 px-4 py-2 rounded-md shadow-md mr-2'
            >
                Cancel
            </button>
            <button
                type='submit'
                className='text-white bg-green-700 hover:bg-green-800 px-4 py-2 rounded-md shadow-md'
            >
                {isEditing ? 'Update Job' : 'Post Job'}
            </button>
        </div>
    </form> 
    )

}
export default JobPostForm;
