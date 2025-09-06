import React from 'react';
import Footer from '../Footer';

const PrivacyPolicy = () => {
  return (
    <>
    <div className="max-w-5xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Privacy Policy</h1>
      <p className="mb-6">
        Guidein ("we", "our", or "us") values the trust placed in us and is committed to protecting the privacy of our users. 
        This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website 
        <a href="https://guidein.org" className="text-blue-600 hover:underline"> www.guidein.org</a> (referred to as the "Website"). 
        By using our Website, you agree to the terms of this Privacy Policy.
      </p>

      {/* Section 1 */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">1. Collection of Information</h2>
        <p>We may collect information from you when you:</p>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>Register or submit a form (such as “Request a Callback”)</li>
          <li>Contact us via email or WhatsApp</li>
          <li>Interact with our website or view our content (e.g., YouTube video links, company career pages)</li>
        </ul>
        <p className="mt-2">Types of data we collect include:</p>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>Name, phone number, and email address</li>
          <li>Information about coaching centers or companies you’re interested in</li>
          <li>Device and browser type, IP address, and user behavior via cookies</li>
        </ul>
      </section>

      {/* Section 2 */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">2. Use of Information</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>Provide you with requested services (e.g., contact coaching centers)</li>
          <li>Recommend relevant content and learning resources</li>
          <li>Improve user experience and website functionality</li>
          <li>Display relevant advertisements via platforms like Google AdSense</li>
          <li>Send updates, newsletters, or notifications (if opted in)</li>
        </ul>
      </section>

      {/* Section 3 */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">3. Sharing of Information</h2>
        <p>We do not sell or rent your personal information to third parties. We may share your information with:</p>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>Coaching centers or service providers only with your consent</li>
          <li>Third-party analytics and ad partners to serve personalized content or ads</li>
          <li>Legal authorities, when required by law or legal process</li>
        </ul>
      </section>

      {/* Section 4 */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">4. Cookies and Tracking Technologies</h2>
        <p>Our Website uses cookies to enhance your experience. Cookies help us understand user preferences and tailor our services accordingly. You can disable cookies through your browser settings.</p>
        <p className="mt-2">
          We also use third-party services like Google Analytics and Google AdSense, which may place cookies and track user behavior for ad personalization.
        </p>
        <p className="mt-2">
          You can opt-out of personalized ads by visiting:{" "}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            https://www.google.com/settings/ads
          </a>
        </p>
      </section>

      {/* Section 5 */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">5. Data Security</h2>
        <p>We implement standard security practices to safeguard your data from unauthorized access, disclosure, or misuse. However, no method of transmission over the Internet is completely secure.</p>
      </section>

      {/* Section 6 */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">6. Links to External Sites</h2>
        <p>Our Website contains links to external websites such as YouTube, company career pages, and course providers. These sites are governed by their own privacy policies. Guidein is not responsible for the privacy practices or content of these third-party websites.</p>
      </section>

      {/* Section 7 */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">7. Children’s Privacy</h2>
        <p>Guidein is not intended for use by children under the age of 13. We do not knowingly collect personal information from children.</p>
      </section>

      {/* Section 8 */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">8. Consent</h2>
        <p>By using our Website, you consent to the collection and use of your information in accordance with this Privacy Policy.</p>
      </section>

      {/* Section 9 */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">9. Changes to This Privacy Policy</h2>
        <p>We may revise this policy from time to time. Changes will be updated on this page with a revised “Last Updated” date. We encourage users to review this page periodically.</p>
      </section>

      {/* Section 10 */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">10. Contact Us</h2>
        <p>If you have any questions or concerns about this Privacy Policy or your data, you may contact us at:</p>
        <ul className="ml-6 mt-2">
          <li>📧 Email: <a href="mailto:support@guidein.org" className="text-blue-600 hover:underline">support@guidein.org</a></li>
          <li>🌐 Website: <a href="https://guidein.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.guidein.org</a></li>
        </ul>
      </section>
    
    </div>
      <Footer/>
    </>
  );
};

export default PrivacyPolicy;
