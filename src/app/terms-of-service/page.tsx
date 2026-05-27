'use client';

import React from 'react';
import { ReactLenis } from 'lenis/react';
import { FlickeringFooter } from '@/components/ui/flickering-footer';
import { FileText, Shield, Sparkles, Scale } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      <main className="min-h-screen bg-slate-50/50 text-[#1A1D2E] pt-28">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60" />
        
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-[800px] h-[350px] bg-blue-100/40 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 max-w-4xl py-12 relative">
          {/* Header Section */}
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold tracking-wide uppercase">
              <Scale className="w-3.5 h-3.5" />
              Legal Agreement
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
              Terms & Conditions
            </h1>
            <p className="text-slate-500 text-base max-w-xl mx-auto">
              Please read these terms and conditions carefully before using the FactWise platform.
            </p>
            <div className="text-xs text-slate-400 font-medium tracking-wider uppercase pt-2">
              Last Updated: May 2026
            </div>
          </div>

          {/* Document Content Box */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-8 md:p-12 space-y-8 text-[15px] leading-relaxed text-slate-600">
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2.5">
                <span className="h-6 w-1 bg-[#3666ff] rounded-full" />
                Welcome to FactWise!
              </h2>
              <p>
                These terms and conditions outline the rules and regulations for the use of the Fact Wise Tech Website, located at <a href="https://www.factwise.io" className="text-[#3666ff] hover:underline">www.factwise.io</a>.
              </p>
              <p>
                By accessing this website, we assume you accept these terms and conditions. Do not continue to use FactWise if you do not agree to take all the terms and conditions stated on this page.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2.5">
                <span className="h-6 w-1 bg-[#3666ff] rounded-full" />
                Terminology & Definitions
              </h2>
              <p>
                The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: <strong className="text-slate-800">"Client"</strong>, <strong className="text-slate-800">"You"</strong> and <strong className="text-slate-800">"Your"</strong> refers to you, the person log on this website and compliant to the Company’s terms and conditions. <strong className="text-slate-800">"The Company"</strong>, <strong className="text-slate-800">"Ourselves"</strong>, <strong className="text-slate-800">"We"</strong>, <strong className="text-slate-800">"Our"</strong> and <strong className="text-slate-800">"Us"</strong>, refers to our Company. <strong className="text-slate-800">"Party"</strong>, <strong className="text-slate-800">"Parties"</strong>, or <strong className="text-slate-800">"Us"</strong>, refers to both the Client and ourselves. All terms refer to the offer, acceptance, and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services, in accordance with and subject to, prevailing law of United States of America.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2.5">
                <span className="h-6 w-1 bg-[#3666ff] rounded-full" />
                Cookies
              </h2>
              <p>
                We employ the use of cookies. By accessing FactWise, you agreed to use cookies in agreement with the Fact Wise Tech's Privacy Policy.
              </p>
              <p>
                Most interactive websites use cookies to let us retrieve the user’s details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2.5">
                <span className="h-6 w-1 bg-[#3666ff] rounded-full" />
                License & Intellectual Property
              </h2>
              <p>
                Unless otherwise stated, Fact Wise Tech and/or its licensors own the intellectual property rights for all material on FactWise. All intellectual property rights are reserved. You may access this from FactWise for your own personal use subjected to restrictions set in these terms and conditions.
              </p>
              <p className="font-semibold text-slate-800">You must not:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Republish material from FactWise</li>
                <li>Sell, rent or sub-license material from FactWise</li>
                <li>Reproduce, duplicate or copy material from FactWise</li>
                <li>Redistribute content from FactWise</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2.5">
                <span className="h-6 w-1 bg-[#3666ff] rounded-full" />
                User Comments & Contributions
              </h2>
              <p>
                Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. Fact Wise Tech does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of Fact Wise Tech, its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions.
              </p>
              <p>
                To the extent permitted by applicable laws, Fact Wise Tech shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered because of any use of and/or posting of and/or appearance of the Comments on this website.
              </p>
              <p>
                Fact Wise Tech reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.
              </p>
              <p className="font-semibold text-slate-800">You warrant and represent that:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;</li>
                <li>The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party;</li>
                <li>The Comments do not contain any defamatory, libellous, offensive, indecent or otherwise unlawful material which is an invasion of privacy;</li>
                <li>The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.</li>
              </ul>
              <p>
                You hereby grant Fact Wise Tech a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2.5">
                <span className="h-6 w-1 bg-[#3666ff] rounded-full" />
                Hyperlinking to our Content
              </h2>
              <p className="font-semibold text-slate-800">The following organizations may link to our Website without prior written approval:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Government agencies</li>
                <li>Search engines</li>
                <li>News organizations</li>
                <li>Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses; and</li>
                <li>System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.</li>
              </ul>
              <p>
                These organizations may link to our home page, to publications or to other Website information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party’s site.
              </p>
              <p className="font-semibold text-slate-800">We may consider and approve other link requests from the following types of organizations:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>commonly-known consumer and/or business information sources;</li>
                <li>dot.com community sites;</li>
                <li>associations or other groups representing charities;</li>
                <li>online directory distributors;</li>
                <li>internet portals;</li>
                <li>accounting, law and consulting firms; and</li>
                <li>educational institutions and trade associations.</li>
              </ul>
              <p>
                We will approve link requests from these organizations if we decide that: (a) the link would not make us look unfavorably to ourselves or to our accredited businesses; (b) the organization does not have any negative records with us; (c) the benefit to us from the visibility of the hyperlink compensates the absence of Fact Wise Tech; and (d) the link is in the context of general resource information.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2.5">
                <span className="h-6 w-1 bg-[#3666ff] rounded-full" />
                iFrames & Presentation
              </h2>
              <p>
                Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2.5">
                <span className="h-6 w-1 bg-[#3666ff] rounded-full" />
                Content Liability & Responsibility
              </h2>
              <p>
                We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2.5">
                <span className="h-6 w-1 bg-[#3666ff] rounded-full" />
                Reservation of Rights
              </h2>
              <p>
                We reserve the right to request that you remove all links or any particular link to our website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amend these terms and conditions and it’s linking policy at any time. By continuously linking to our website, you agree to be bound to and follow these linking terms and conditions.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2.5">
                <span className="h-6 w-1 bg-[#3666ff] rounded-full" />
                Removal of Links from our Website
              </h2>
              <p>
                If you find any link on our website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links, but we are not obligated to do so or to respond to you directly.
              </p>
              <p>
                We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2.5">
                <span className="h-6 w-1 bg-[#3666ff] rounded-full" />
                Disclaimer of Liability
              </h2>
              <p>
                To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>limit or exclude our or your liability for death or personal injury;</li>
                <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
                <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
                <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
              </ul>
              <p>
                The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.
              </p>
              <p>
                If the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.
              </p>
            </section>
          </div>
        </div>

        <FlickeringFooter />
      </main>
    </ReactLenis>
  );
}
