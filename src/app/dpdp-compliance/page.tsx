'use client';

import React from 'react';
import { ReactLenis } from 'lenis/react';
import { FlickeringFooter } from '@/components/ui/flickering-footer';
import { ShieldCheck } from 'lucide-react';

export default function DPDPCompliancePage() {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      <main className="min-h-screen bg-slate-50/50 text-[#1A1D2E] pt-28">
        {/* Grid background */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-[800px] h-[350px] bg-blue-100/40 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 max-w-4xl py-12 relative">
          {/* Header */}
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold tracking-wide uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              Legal · Compliance
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] pb-1.5 bg-gradient-to-r from-slate-900 via-slate-800 to-[#3666ff] bg-clip-text text-transparent">
              DPDP Compliance Statement
            </h1>
            <p className="text-slate-500 text-base max-w-xl mx-auto">
              FactWise Technologies Private Limited — Digital Personal Data Protection Act 2023
            </p>
            <div className="flex flex-wrap justify-center gap-6 pt-2 text-sm text-slate-400">
              <span><strong className="text-slate-600">Last updated:</strong> 1 January 2026</span>
              <span><strong className="text-slate-600">Version:</strong> 1.0</span>
              <span><strong className="text-slate-600">Contact:</strong> privacy@factwise.io</span>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-8 md:p-12 space-y-10 text-[15px] leading-relaxed text-slate-600">

            {/* 1 */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2.5">
                <span className="h-6 w-1 bg-[#3666ff] rounded-full" />
                1. Overview
              </h2>
              <p>
                India's <strong className="text-slate-800">Digital Personal Data Protection Act 2023</strong> ("DPDP Act") came into force on 11 August 2023. It is India's first comprehensive personal data protection law and establishes a framework for the processing of digital personal data, the rights of data principals, and the obligations of data fiduciaries and data processors.
              </p>
              <p>
                FactWise Technologies Private Limited ("FactWise", "we", "us") operates a source-to-pay procurement platform used by manufacturing and enterprise companies across India. We are committed to full compliance with the DPDP Act — both as a <strong className="text-slate-800">Data Fiduciary</strong> (for data we control) and as a <strong className="text-slate-800">Data Processor</strong> (for data we process on behalf of our customers).
              </p>
              <p>
                This statement should be read alongside our{' '}
                <a href="/privacy-policy" className="text-[#3666ff] hover:underline">Privacy Policy</a>,{' '}
                <a href="/terms-of-service" className="text-[#3666ff] hover:underline">Terms of Service</a>, and{' '}
                <a href="/cookie-policy" className="text-[#3666ff] hover:underline">Cookie Policy</a>.
              </p>
            </section>

            {/* 2 */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2.5">
                <span className="h-6 w-1 bg-[#3666ff] rounded-full" />
                2. Roles Under the DPDP Act
              </h2>

              <h3 className="text-base font-semibold text-slate-800">2.1 FactWise as Data Fiduciary</h3>
              <p>FactWise is a Data Fiduciary for personal data it determines the purpose and means of processing, including:</p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>Personal data of its own employees</li>
                <li>Personal data of account holders, billing contacts, and admin users of the Platform</li>
                <li>Personal data of website visitors to factwise.io</li>
                <li>Any personal data processed for FactWise's own business purposes (marketing, fraud prevention, platform improvement)</li>
              </ul>
              <p>As a Data Fiduciary, FactWise determines the purpose and means of processing this data and is directly responsible for compliance.</p>

              <h3 className="text-base font-semibold text-slate-800">2.2 FactWise as Data Processor</h3>
              <p>FactWise is a Data Processor for personal data that its customers (buyers, procurement teams, finance departments) control, including:</p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>Vendor and supplier personal data uploaded by customer organisations</li>
                <li>Procurement data entered by customer employees (requisitioners, approvers, finance users)</li>
                <li>Any other personal data where the customer determines the purpose and means of processing</li>
              </ul>
              <p>As a Data Processor, FactWise processes this data only on the instructions of the customer (Data Fiduciary) and in accordance with the applicable Data Processing Agreement.</p>

              <h3 className="text-base font-semibold text-slate-800">2.3 Significant Data Fiduciary Readiness</h3>
              <p>
                The DPDP Act empowers the Central Government to designate certain Data Fiduciaries as <strong className="text-slate-800">Significant Data Fiduciaries (SDFs)</strong> based on volume, sensitivity, or risk of data processed. FactWise monitors developments in SDF designation and maintains readiness to comply with additional obligations — including Data Protection Officer appointment, Data Protection Impact Assessments, algorithmic audits, and data localisation restrictions — if designated.
              </p>
            </section>

            {/* 3 */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2.5">
                <span className="h-6 w-1 bg-[#3666ff] rounded-full" />
                3. Lawful Basis for Processing
              </h2>
              <p>The DPDP Act requires that personal data be processed on a lawful basis. FactWise relies on the following bases:</p>

              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="text-left px-4 py-3 font-semibold text-slate-700">Processing Activity</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-700">Data Subjects</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-700">Lawful Basis</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      ['Account creation and management', 'Account holders', 'Contract — necessary to provide the Platform'],
                      ['Billing and invoicing', 'Billing contacts', 'Contract; Legal obligation (tax law)'],
                      ['Vendor/supplier data processed for customers', 'Vendors, suppliers', 'Legitimate use (on instruction of customer Data Fiduciary)'],
                      ['Procurement analytics (anonymised)', 'All users', 'Legitimate use'],
                      ['Security and fraud prevention', 'All users', 'Legitimate use'],
                      ['Marketing to prospective customers', 'Leads and prospects', 'Consent'],
                      ['Responding to support queries', 'Users', 'Contract / Legitimate use'],
                      ['Legal compliance and regulatory reporting', 'As applicable', 'Legal obligation'],
                    ].map(([activity, subjects, basis], i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                        <td className="px-4 py-3 text-slate-700">{activity}</td>
                        <td className="px-4 py-3 text-slate-500">{subjects}</td>
                        <td className="px-4 py-3 text-slate-500">{basis}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="text-base font-semibold text-slate-800">3.1 Consent Management</h3>
              <p>Where consent is the lawful basis, FactWise ensures that consent is:</p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li><strong className="text-slate-700">Free</strong> — not bundled with unrelated conditions; no detriment for refusal of non-essential processing</li>
                <li><strong className="text-slate-700">Specific</strong> — obtained for a defined and clearly stated purpose</li>
                <li><strong className="text-slate-700">Informed</strong> — accompanied by a clear notice explaining the data, purpose, and data principal's rights</li>
                <li><strong className="text-slate-700">Unambiguous</strong> — obtained through an affirmative action (not pre-ticked boxes, silence, or inaction)</li>
              </ul>
              <p>Consent records are maintained (timestamp, purpose, version of notice) and can be produced on request.</p>

              <h3 className="text-base font-semibold text-slate-800">3.2 Notice Requirement (Section 5, DPDP Act)</h3>
              <p>Before or at the time of collecting personal data, FactWise provides a notice in clear and plain language specifying:</p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>The personal data being collected</li>
                <li>The purpose for which it is being processed</li>
                <li>How data principals can exercise their rights</li>
                <li>How to raise a grievance</li>
              </ul>
            </section>

            {/* 4 */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2.5">
                <span className="h-6 w-1 bg-[#3666ff] rounded-full" />
                4. Data Principal Rights
              </h2>
              <p>The DPDP Act grants the following rights to data principals (individuals whose personal data is processed). Contact <a href="mailto:privacy@factwise.io" className="text-[#3666ff] hover:underline">privacy@factwise.io</a> to exercise any right. FactWise responds within <strong className="text-slate-800">30 days</strong>.</p>

              <div className="space-y-6">
                {[
                  {
                    title: '4.1 Right to Information (Section 11)',
                    desc: 'Data principals have the right to know whether their personal data is being processed, a summary of data held, and the identities of all Data Processors and recipients.',
                    how: 'Email privacy@factwise.io. For vendor/supplier data managed by a customer organisation, contact that customer directly — FactWise will assist in forwarding requests.',
                  },
                  {
                    title: '4.2 Right to Correction and Erasure (Section 12)',
                    desc: 'Data principals have the right to correct inaccurate or incomplete personal data, and to request erasure of data no longer necessary for the purpose for which it was collected.',
                    how: 'Platform account holders may update data in Settings. All others: email privacy@factwise.io. Where erasure is declined due to a legal retention obligation, FactWise will provide written reasons.',
                  },
                  {
                    title: '4.3 Right to Nominate (Section 14)',
                    desc: 'Data principals may nominate another individual to exercise DPDP Act rights on their behalf in the event of their death or incapacity.',
                    how: 'Email privacy@factwise.io with the nominee\'s details and a signed declaration.',
                  },
                  {
                    title: '4.4 Right to Grievance Redressal (Section 13)',
                    desc: 'Data principals may raise formal grievances about FactWise\'s data processing. Every grievance will be acknowledged within 72 hours and substantively resolved within 30 days.',
                    how: 'Email privacy@factwise.io. If unresolved satisfactorily, data principals may approach the Data Protection Board of India once operational.',
                  },
                ].map(({ title, desc, how }) => (
                  <div key={title} className="rounded-xl border border-slate-200 p-5 space-y-2">
                    <h3 className="font-semibold text-slate-800 text-base">{title}</h3>
                    <p>{desc}</p>
                    <p className="text-sm text-slate-500"><strong className="text-slate-600">How to exercise:</strong> {how}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 5 */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2.5">
                <span className="h-6 w-1 bg-[#3666ff] rounded-full" />
                5. Data Fiduciary Obligations
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  ['Purpose Limitation (Section 6)', 'Personal data is processed only for the purposes for which it was collected. FactWise does not use procurement data submitted by a customer for any other purpose without a valid lawful basis.'],
                  ['Data Minimisation', 'FactWise processes only the personal data necessary for stated procurement workflows. The platform is architected to minimise collection — only what is operationally required is stored.'],
                  ['Accuracy', 'FactWise takes reasonable steps to ensure accuracy. Users may correct their own data through platform settings. Accuracy of vendor/supplier data entered by customers is the customer\'s responsibility.'],
                  ['Storage Limitation', 'Personal data is retained only for the period necessary. Automated deletion is enforced for data past its retention period. Full retention schedule is published in the Privacy Policy.'],
                  ['Security Safeguards', 'AES-256 encryption at rest, TLS 1.3 in transit, SOC 2 Type II certification, role-based access controls, annual penetration testing, and an immutable audit log.'],
                  ['Accountability', 'FactWise maintains records of data categories processed, processing purposes, processor engagements, consent records, rights requests, and security incidents.'],
                ].map(([title, desc]) => (
                  <div key={title as string} className="rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-1.5">
                    <div className="font-semibold text-slate-800 text-sm flex items-center gap-2">
                      <span className="h-4 w-0.5 bg-[#3666ff] rounded-full" />
                      {title}
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 6 */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2.5">
                <span className="h-6 w-1 bg-[#3666ff] rounded-full" />
                6. Cross-Border Data Transfers
              </h2>
              <p>The DPDP Act permits cross-border transfers of personal data to countries notified by the Central Government. Until a formal whitelist is published:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-slate-700">Default:</strong> All personal data of Indian data principals is processed and stored in India (AWS ap-south-1, Mumbai). No default cross-border transfer occurs.</li>
                <li><strong className="text-slate-700">Sub-processors outside India:</strong> Where FactWise uses sub-processors located outside India (e.g. error monitoring tools), only the minimum necessary technical data is transferred, and such sub-processors are bound by data processing agreements with equivalent protections.</li>
              </ul>
              <p>FactWise will update this section as cross-border transfer rules are notified under the DPDP Act.</p>
            </section>

            {/* 7 */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2.5">
                <span className="h-6 w-1 bg-[#3666ff] rounded-full" />
                7. Processing of Children's Data
              </h2>
              <p>The DPDP Act imposes strict obligations on processing personal data of children (under 18 years). FactWise:</p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>Does not knowingly collect or process personal data of children</li>
                <li>Does not target the FactWise platform at children</li>
                <li>The platform is designed exclusively for enterprise procurement users</li>
                <li>If FactWise becomes aware that a child's data has been processed, it will immediately delete that data and notify the relevant customer</li>
              </ul>
            </section>

            {/* 8 */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2.5">
                <span className="h-6 w-1 bg-[#3666ff] rounded-full" />
                8. Data Processor Obligations
              </h2>
              <p>When FactWise acts as a Data Processor for enterprise customers, it:</p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>Processes personal data only on documented instructions from the customer</li>
                <li>Ensures all FactWise personnel with access to customer data are bound by confidentiality obligations</li>
                <li>Implements appropriate technical and organisational security measures</li>
                <li>Does not engage sub-processors without the customer's prior consent</li>
                <li>Assists the customer to fulfil data principal rights requests</li>
                <li>Deletes or returns all personal data on termination of the customer relationship (within 90 days)</li>
                <li>Notifies the customer of any security incident affecting the customer's personal data within 72 hours</li>
              </ul>
            </section>

            {/* 9 */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2.5">
                <span className="h-6 w-1 bg-[#3666ff] rounded-full" />
                9. Grievance Redressal
              </h2>
              <p>FactWise has designated a data protection contact for grievance redressal under Section 13 of the DPDP Act.</p>

              <div className="rounded-xl bg-blue-50 border border-blue-100 p-5 space-y-1">
                <div className="font-semibold text-slate-800">Data Protection Contact</div>
                <a href="mailto:privacy@factwise.io" className="text-[#3666ff] hover:underline font-medium">privacy@factwise.io</a>
              </div>

              <p>Grievance process:</p>
              <ol className="list-decimal pl-6 space-y-1.5">
                <li>Submit your grievance by email to privacy@factwise.io</li>
                <li>Include your name, contact details, description of the grievance, and the resolution you are seeking</li>
                <li>FactWise will <strong className="text-slate-700">acknowledge within 72 hours</strong></li>
                <li>FactWise will provide a substantive response within <strong className="text-slate-700">30 days</strong></li>
                <li>If unresolved, FactWise will escalate internally and revert within a further 14 days</li>
                <li>If still unresolved, you may approach the <strong className="text-slate-700">Data Protection Board of India</strong> once operational</li>
              </ol>
              <p>FactWise is committed to resolving all data protection grievances fairly, promptly, and at no cost to the data principal.</p>
            </section>

            {/* 10 */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2.5">
                <span className="h-6 w-1 bg-[#3666ff] rounded-full" />
                10. Updates to This Statement
              </h2>
              <p>This Compliance Statement will be updated as:</p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>The DPDP Act's implementing rules are notified by the Central Government</li>
                <li>The Data Protection Board of India becomes operational and issues guidance</li>
                <li>FactWise's practices change</li>
              </ul>
              <p>Significant updates will be communicated by email to account administrators.</p>
            </section>

            {/* 11 — Related docs */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2.5">
                <span className="h-6 w-1 bg-[#3666ff] rounded-full" />
                11. Related Documents
              </h2>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="text-left px-4 py-3 font-semibold text-slate-700">Document</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-700">Location</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      ['Privacy Policy', '/privacy-policy'],
                      ['Terms of Service', '/terms-of-service'],
                      ['Cookie Policy', '/cookie-policy'],
                    ].map(([doc, href]) => (
                      <tr key={doc}>
                        <td className="px-4 py-3 text-slate-700 font-medium">{doc}</td>
                        <td className="px-4 py-3">
                          <a href={href} className="text-[#3666ff] hover:underline">factwise.io{href}</a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Footer note */}
            <div className="border-t border-slate-100 pt-8 text-sm text-slate-400 space-y-1">
              <p>
                FactWise Technologies Private Limited is committed to the letter and spirit of India's Digital Personal Data Protection Act 2023. This statement reflects our practices as of 1 January 2026 and will be updated as the regulatory framework develops.
              </p>
              <p>For all DPDP-related enquiries: <a href="mailto:privacy@factwise.io" className="text-[#3666ff] hover:underline">privacy@factwise.io</a></p>
            </div>

          </div>
        </div>

        <FlickeringFooter />
      </main>
    </ReactLenis>
  );
}
