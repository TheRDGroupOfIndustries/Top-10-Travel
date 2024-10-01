import React from "react";

const TermsAndConditionsComp = () => {
  return (
    <div className="mt-20 px-2 md:px-3 lg:px-6 xl:px-8">
      <div className="bg-mainColor/30 flex flex-col gap-4 text-slate-800 p-5 rounded-2xl backdrop-blur-sm w-full h-full">
        <div className="flex flex-col gap-3">
          <h1 className="font-bold uppercase text-3xl text-slate-850">
            Terms & Conditions
          </h1>
          <div className="text-lg">
            Welcome to Travel Top 10 Services private Limited (with Brand Name
            website https://www.traveltop10.in/). Please carefully review these
            Terms of Use before using our site. By accessing or using our
            Website, you agree to be bound by the following terms and
            conditions.
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="font-semibold text-lg text-slate-850">
            1. Agreement to Terms
          </h1>
          <div className="font-medium">
            By using our Website, you agree to adhere to these Terms of Use and
            any additional terms that may apply to specific sections of the
            site. If you do not agree with these terms, please refrain from
            using the Website.
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-semibold text-lg text-slate-850">
            2. Modifications to Terms
          </h1>
          <div className="font-medium">
            We may update these Terms of Use at any time. Changes become
            effective as soon as they are posted on the Website. Continued use
            of the Website after changes have been made constitutes acceptance
            of the new terms.
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="font-semibold text-lg text-slate-850">
            3. User Responsibilities
          </h1>
          <div className="flex">
            <div className="font-semibold">Eligibility:&nbsp;</div>
            <div>
              You must be at least 18 years old to access and use our Website.
            </div>
          </div>
          <div className="flex">
            <div className="font-semibold">Account Security:&nbsp;</div>
            <div>
              You are responsible for keeping your account credentials
              confidential and must notify us immediately if you suspect
              unauthorized access.
            </div>
          </div>
          <div className="flex">
            <div className="font-semibold">Accuracy:&nbsp;</div>
            <div>
              You agree to provide accurate, up-to-date information when
              creating an account or making a reservation.
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="font-semibold text-lg text-slate-850">
            4. Intellectual Property
          </h1>
          <div className="flex">
            <div className="font-semibold">Ownership:&nbsp;</div>
            <div>
              All materials, trademarks, and logos on the Website are owned by
              us or licensed to us and are protected by intellectual property
              laws.
            </div>
          </div>
          <div className="flex">
            <div className="font-semibold">Usage Restrictions:&nbsp;</div>
            <div>
              You may not copy, modify, distribute, or use any content from the
              Website without obtaining our prior written permission.
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="font-semibold text-lg text-slate-850">
            5. User Conduct
          </h1>
          <div className="flex">
            <div className="font-semibold">Prohibited Actions:&nbsp;</div>
            <div>
              You agree not to engage in any activities that may damage the
              Website or its users, such as hacking, spamming, or distributing
              malicious software.
            </div>
          </div>
          <div className="flex">
            <div className="font-semibold">Content Submissions:&nbsp;</div>
            <div>
              Any content you post on the Website must be lawful,
              non-infringing, and respectful of others.
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="font-semibold text-lg text-slate-850">
            6. Liability Limitations
          </h1>
          <div className="flex">
            <div className="font-semibold">Disclaimer:&nbsp;</div>
            <div>
              The Website is provided on an “as-is” and “as-available” basis. We
              do not guarantee the accuracy or completeness of the Website’s
              content.
            </div>
          </div>
          <div className="flex">
            <div className="font-semibold">Limitations:&nbsp;</div>
            <div>
              We are not liable for any indirect, incidental, or consequential
              damages resulting from your use of the Website or any associated
              services.
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="font-semibold text-lg text-slate-850">
            7. Governing Law
          </h1>
          <div>
            These Terms of Use are governed by the laws of Telangana
            Jurisdiction. Any disputes arising from these terms will be handled
            in the courts of Telangana.
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsComp;
