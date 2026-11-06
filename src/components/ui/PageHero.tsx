import { cn } from '@/lib/format';

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export default function PageHero({ eyebrow, title, description, children, className }: PageHeroProps) {
  return (
    <section className={cn('relative overflow-hidden border-b border-gray-100 bg-gradient-to-br from-ruby-50 via-white to-orange-50', className)}>
      <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-ruby-100/60 blur-3xl" />
      <div className="absolute -bottom-24 left-10 h-56 w-56 rounded-full bg-amber-100/60 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {eyebrow && (
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-ruby-600">{eyebrow}</p>
        )}
        <h1 className="max-w-3xl text-3xl font-extrabold tracking-tight text-charcoal-900 sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description && <p className="mt-4 max-w-2xl text-sm leading-7 text-charcoal-600 sm:text-base">{description}</p>}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}
