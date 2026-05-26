import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  MapPin,
  Briefcase,
  CheckCircle2,
  ExternalLink,
  ArrowLeft,
} from 'lucide-react';
import { FlickeringFooter } from '@/components/ui/flickering-footer';
import {
  JOBS,
  COMPANY_DESC,
  RECRUITMENT_STEPS,
  COMPENSATION,
  getJobBySlug,
} from '@/lib/careers-jobs';

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return JOBS.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job) return { title: 'Job not found' };

  const title = `${job.title} — Careers at FactWise`;
  const description = `${job.title} (${job.employmentType}) at FactWise, ${job.location}. ${job.desc}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://factwise.io/careers/jobs/${job.slug}`,
      type: 'website',
    },
    twitter: { title, description },
    alternates: { canonical: `https://factwise.io/careers/jobs/${job.slug}` },
  };
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 pb-3 mb-5 border-b border-slate-200">
        {label}
      </h2>
      {children}
    </section>
  );
}

export default async function JobDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const job = getJobBySlug(slug);

  if (!job) {
    notFound();
  }

  const steps = job.recruitmentSteps ?? RECRUITMENT_STEPS;

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-28 md:pt-32 pb-12 md:pb-16 px-6 md:px-14 bg-gradient-to-b from-slate-50 to-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/careers#openings"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[#3666ff] transition-colors mb-8"
          >
            <ArrowLeft className="size-4" />
            All open roles
          </Link>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tighter text-slate-900 mb-4">
            {job.title}
          </h1>

          <p className="text-base md:text-lg text-slate-600 max-w-2xl leading-relaxed mb-6">
            {job.desc}
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-4" /> {job.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Briefcase className="size-4" /> {job.employmentType}
            </span>
          </div>

          <a
            href={job.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#3666ff] hover:bg-[#2a55e0] text-white rounded-full font-semibold text-sm shadow-lg shadow-blue-600/30 transition-colors"
          >
            I&apos;m Interested
            <ExternalLink className="size-4" />
          </a>
        </div>
      </section>

      {/* Body */}
      <section className="py-16 px-6 md:px-14">
        <div className="max-w-4xl mx-auto">
          <Section label="About the role">
            <p className="text-base text-slate-700 leading-relaxed">{job.about}</p>
          </Section>

          <Section label="Company Description">
            {COMPANY_DESC.split('\n\n').map((para, i) => (
              <p
                key={i}
                className="text-base text-slate-600 leading-relaxed mb-3 last:mb-0"
              >
                {para}
              </p>
            ))}
          </Section>

          <Section label="Responsibilities">
            <ul className="flex flex-col gap-3">
              {job.responsibilities.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="size-4 text-[#3666ff] mt-1 flex-shrink-0" />
                  <span className="text-[15px] text-slate-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section label="Qualifications">
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#3666ff] mb-3">
              Must-haves
            </p>
            <ul className="flex flex-col gap-2 mb-6">
              {job.mustHaves.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3666ff] mt-2 flex-shrink-0" />
                  <span className="text-[15px] text-slate-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400 mb-3">
              Nice-to-haves
            </p>
            <ul className="flex flex-col gap-2">
              {job.niceToHaves.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 flex-shrink-0" />
                  <span className="text-[15px] text-slate-600 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section label="Recruitment Process">
            <div className="flex flex-col gap-3">
              {steps.map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4f8bff] to-[#2a6cff] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </div>
                  <span className="text-[15px] text-slate-700">{step}</span>
                </div>
              ))}
            </div>
          </Section>

          <Section label="Compensation">
            <p className="text-base text-slate-600 leading-relaxed">{COMPENSATION}</p>
          </Section>

          {/* Bottom CTA */}
          <div className="mt-16 p-8 md:p-10 rounded-3xl bg-slate-950 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight">
                Ready to apply?
              </h3>
              <p className="text-slate-400">
                Opens our Google application form — takes ~3 minutes.
              </p>
            </div>
            <a
              href={job.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 px-7 py-3.5 bg-white text-slate-950 rounded-full font-bold hover:bg-[#3666ff] hover:text-white transition-colors flex items-center gap-3"
            >
              I&apos;m Interested
              <ExternalLink className="size-4" />
            </a>
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4" />
          </div>
        </div>
      </section>

      <FlickeringFooter />
    </main>
  );
}
