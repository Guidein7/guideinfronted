'use client';

import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-6 sm:p-8 lg:p-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 text-center">
          Terms and Conditions
        </h1>
     

        <section className="mb-8">
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            Welcome to GuideIn (“we”, “our”, “us”). These Terms and Conditions (“Terms”) govern your
            access to and use of{' '}
            <a
              href="https://guidein.org"
              className="text-blue-600 hover:text-blue-800 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://guidein.org
            </a>{' '}
            (the “Website”). By using our Website, you agree to comply with and be bound by these
            Terms. If you do not agree, please discontinue using the Website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
            1. Use of the Website
          </h2>
          <ul className="list-disc list-inside text-base sm:text-lg text-gray-700 leading-relaxed space-y-2">
            <li>GuideIn provides career-related resources for informational purposes only.</li>
            <li>You may not use the Website for any unlawful, harmful, or fraudulent activity.</li>
            <li>Users are responsible for ensuring their actions comply with applicable laws.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
            2. Content and External Links
          </h2>
          <ul className="list-disc list-inside text-base sm:text-lg text-gray-700 leading-relaxed space-y-2">
            <li>
              Our Website includes links to third-party websites (e.g., company career pages, YouTube
              videos, coaching centers, certification platforms).
            </li>
            <li>GuideIn does not own, control, or endorse these external websites.</li>
            <li>
              We are not responsible for any content, services, or practices of third-party sites.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
            3. Intellectual Property
          </h2>
          <ul className="list-disc list-inside text-base sm:text-lg text-gray-700 leading-relaxed space-y-2">
            <li>
              All content, logos, designs, and materials on GuideIn are the property of GuideIn unless
              otherwise stated.
            </li>
            <li>You may not copy, modify, or distribute any content without prior written consent.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">4. Disclaimer</h2>
          <ul className="list-disc list-inside text-base sm:text-lg text-gray-700 leading-relaxed space-y-2">
            <li>The information on GuideIn is provided “as is” without warranties of any kind.</li>
            <li>
              We do not guarantee the accuracy, completeness, or reliability of the information.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
            5. Limitation of Liability
          </h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            GuideIn shall not be liable for any direct, indirect, or consequential damages arising from
            the use of this Website or reliance on its content.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
            6. Modifications to Terms
          </h2>
          <ul className="list-disc list-inside text-base sm:text-lg text-gray-700 leading-relaxed space-y-2">
            <li>
              GuideIn reserves the right to update or modify these Terms at any time without prior
              notice.
            </li>
            <li>Continued use of the Website means you accept the updated Terms.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">7. Contact Us</h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            For any questions about these Terms, please contact us at:
          </p>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mt-2">
            Email:{' '}
            <a
              href="mailto:support@guidein.org"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              support@guidein.org
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;