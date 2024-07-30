import React from 'react';
import NavBar from './NavBar';
import JSFooter from './JSFooter';

const JReferralFAQ = () => {
  const faqs = [
    {
      question: "How do I request a referral?",
      answer: "When you find a job that is suitable to you, click on the 'Request Referral' button, fill in the required information, and submit your request."
    },
    {
      question: "How do I know if my referral request has been accepted?",
      answer: "Go to the 'Jobs applied' option to track the status of your requests. You will also receive SMS notifications about any updates."
    },
    {
      question: "Can I request multiple referrals at once?",
      answer: "Yes, you can request referrals for multiple job openings, but ensure you have referral credits and meet the requirements for each job."
    },
    {
      question: "Is my job selection guaranteed after getting a referral?",
      answer: "No, referrals are only to increase your chances of getting noticed by the employer. Shortlisting for interviews and selection is not guaranteed."
    },
    {
      question: "Within how many days will I get referred by an employee?",
      answer: "If the employee does not refer you within 5 days, your referral credits will be added back to your account."
    },
  ];

  return (
    <div>
        <NavBar/>
    <div className="max-w-4xl mx-auto lg:ml-[20%] pt-20 lg:pt-5">
      <h1 className="text-2xl lg:text-3xl  font-bold mb-6 pl-5">Frequently Asked Questions</h1>
      {faqs.map((faq, index) => (
        <div key={index} className="mb-4 p-4 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">{faq.question}</h2>
          <p>{faq.answer}</p>
        </div>
      ))}
    </div>
    <JSFooter/>
    </div>
  );
};

export default JReferralFAQ;
