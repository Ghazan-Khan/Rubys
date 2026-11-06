import Link from 'next/link';
import PageHero from '@/components/ui/PageHero';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export interface PolicySection {
  title: string;
  paragraphs?: string[];
  list?: string[];
}

interface PolicyPageProps {
  eyebrow: string;
  title: string;
  description: string;
  lastUpdated: string;
  sections: PolicySection[];
  footerNote?: string;
}

export default function PolicyPage({
  eyebrow,
  title,
  description,
  lastUpdated,
  sections,
  footerNote,
}: PolicyPageProps) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={description} />
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: title }]} />

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-[11px] font-medium uppercase tracking-wider text-charcoal-400">
            Last updated: {lastUpdated}
          </p>

          <div className="prose-ruby mt-4">
            {sections.map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                {section.paragraphs?.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
                {section.list && (
                  <ul>
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {footerNote && (
            <p className="mt-8 rounded-xl bg-gray-50 px-4 py-3 text-xs leading-5 text-charcoal-500">
              {footerNote}
            </p>
          )}
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 rounded-2xl bg-ruby-50 p-5 text-center sm:flex-row sm:text-left">
          <div>
            <h2 className="text-sm font-bold text-ruby-900">Still have questions?</h2>
            <p className="mt-0.5 text-xs text-ruby-800/80">Our Peshawar-based team is happy to help.</p>
          </div>
          <Link href="/contact-us" className="rounded-lg bg-white px-4 py-2 text-xs font-semibold text-ruby-700 shadow-sm hover:bg-ruby-100">
            Contact support
          </Link>
        </div>
      </div>
    </>
  );
}
