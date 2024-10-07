import React from "react";

const PrivacypolicyComp = () => {
  return (
    <div className="mt-20 px-2 md:px-3 lg:px-6 xl:px-8">
      <div className="flex flex-col gap-4 text-slate-800 border-2 border-slate-700 p-5 rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 w-full h-full">
        
        <div className="flex flex-col gap-6">
          <h1 className="font-bold border-b-[1px] border-slate-600 pb-2 font-serif tracking-wide uppercase text-3xl sm:text-5xl text-slate-850">
            Privacy Policy
          </h1>

          <div className="text-lg">
            We value your privacy and are committed to protecting your personal
            information while providing you with a seamless experience on our
            website and during your use of our travel services. This Privacy
            Policy describes how we collect, use, share, and safeguard your
            data.
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="font-semibold text-lg text-slate-850">
            1. Information We Collect
          </h1>

          <div className="font-medium">
            Personal Data :-
            <div className="ml-2">
              We may collect personal details you provide, including:-
            </div>
            <ul className="ml-8 list-decimal">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              {/* <li>Payment information</li> */}
              <li>Travel preferences</li>
            </ul>
          </div>

          <div className="font-medium">
            Non-Personal Data :-
            <div className="ml-2">
              We also collect information about your visit to our Site, such
              as:-
            </div>
            <ul className="ml-8 list-decimal">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Referring website</li>
              <li>Pages accessed and duration of visit</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="font-semibold text-lg text-slate-850">
            2. How We Use Your Information
          </h1>
          <div className="font-medium">
            We use your information for various purposes, including:-
            <ul className="ml-8 list-decimal">
              <li>To process and manage your bookings</li>
              <li>
                To keep you informed about your travel arrangements and updates
              </li>
              <li>To enhance and personalize your experience on our Site</li>
              <li>
                To send you marketing communications and newsletters (you can
                opt-out at any time)
              </li>
              <li>To analyze how our Site is used to improve our services</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="font-semibold text-lg text-slate-850">
            3. Information Sharing
          </h1>
          <div className="font-medium">
            We may share your information with:-
            <ul className="ml-8 list-decimal">
              <li>
                Service Providers: External companies that assist us in
                delivering our services, such as payment processors and travel
                partners.
              </li>
              <li>
                Legal Obligations: Authorities or regulatory agencies when
                required by law or to enforce our rights.
              </li>
              <li>
                Business Transactions: In connection with business changes such
                as mergers, acquisitions, or sales.
              </li>
              <li>
                We do not sell or rent your personal data to other parties.
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="font-semibold text-lg text-slate-850">
            4. Data Protection
          </h1>
          <div className="font-medium">
            We implement industry-standard security measures to safeguard your
            personal information. However, no online system can guarantee
            complete security. We strive to protect your data but cannot assure
            absolute protection.
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="font-semibold text-lg text-slate-850">
            5. Your Rights
          </h1>
          <div className="font-medium">
            You have the following rights concerning your personal information:-
            <ul className="ml-8 list-decimal">
              <li>To access, correct, or request deletion of your data.</li>
              <li>
                To opt-out of receiving promotional emails from us by following
                the unsubscribe instructions provided in those communications.
              </li>
              <li>
                To request limitations on how we use your information in
                specific circumstances.
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="font-semibold text-lg text-slate-850">
            6. Cookies and Tracking
          </h1>
          <div className="font-medium">
            Our Site uses cookies and similar technologies to enhance your
            experience, including:-
            <ul className="ml-8 list-decimal">
              <li>
                Essential Cookies: Necessary for the Site&apos;s functionality.
              </li>
              <li>
                Performance Cookies: To analyze and improve Site performance.
              </li>
              <li>
                Advertising Cookies: To deliver targeted ads and evaluate their
                effectiveness.
              </li>
              <li>
                You can manage your cookie preferences through your browser
                settings.
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="font-semibold text-lg text-slate-850">
            7. External Links
          </h1>
          <div className="font-medium">
            Our Site may contain links to other websites that are not operated
            by us. We are not responsible for the privacy practices or content
            of these third-party sites. We recommend reviewing their privacy
            policies before sharing any personal information.
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="font-semibold text-lg text-slate-850">
            8. Children&apos;s Information
          </h1>
          <div className="font-medium">
            Our Site is not intended for individuals under 16 years of age. We
            do not knowingly collect personal data from children under 16. If we
            become aware of such information, we will take steps to remove it
            from our records.
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="font-semibold text-lg text-slate-850">
            9. Policy Updates
          </h1>
          <div className="font-medium">
            We may revise this Privacy Policy periodically. Any changes will be
            posted on our Site with the updated effective date. We encourage you
            to review this policy regularly to stay informed.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacypolicyComp;
