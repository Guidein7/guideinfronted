import React from 'react';
import SideBar from './SideBar';
import Footer from './Footer';

const EFAQ = () => {
  const faqs = [
    {
      question: "How do I refer a candidate?",
      answer: "Once you find a suitable candidate, click on the 'Refer' button, download their resume, and follow your company’s referral process. Then, upload the referral proof in the 'Submit Referral Proof' section."
    },
    {
      question: "What proof is required for a referral?",
      answer: "You can upload HR email confirmations, screenshots from your company's referral portal showing candidate is referred, or any document that validates your referral. Ensure the proof is genuine, as all referrals will be validated by our internal team."
    },
    {
      question: "How much will I earn for a successful referral?",
      answer: "You will earn ₹200 for every successful referral, irrespective of the candidate's selection status but only upon referral proof is validated."
    },
    {
      question: "Is there a deadline to refer a candidate after receiving a referral request?",
      answer: "Yes, you must refer the candidate within 5 days of receiving the referral request. If you are not able to refer within 5 days referral request will be deleted from your account."
    },
    {
      question: "How can I withdraw my earnings?",
      answer: "In the 'Wallet' section, you can withdraw your earnings at any time. You are allowed one withdrawal per day, and the amount will be transferred only to UPI IDs."
    },
  ];

  return (
    <div className=''>
        <SideBar/>
    <div className="max-w-4xl mx-auto pt-20 lg:pt-5 lg:ml-[20%]">
      <h1 className="text-xl lg:text-3xl font-bold pl-5  mb-6">Frequently Asked Questions</h1>
      {faqs.map((faq, index) => (
        <div key={index} className="mb-4 p-4 border rounded-lg shadow-sm">
          <h2 className="lg:text-xl font-semibold mb-2">{faq.question}</h2>
          <p>{faq.answer}</p>
        </div>
      ))}
    </div>
    <Footer/>
    </div>
  );
};

export default EFAQ;
