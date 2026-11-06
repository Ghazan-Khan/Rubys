import { cn } from '@/lib/format';

const PALETTES: Record<string, string> = {
  'Fashion & Clothing': 'from-rose-100 via-pink-50 to-red-100',
  Electronics: 'from-sky-100 via-cyan-50 to-blue-100',
  'Home & Living': 'from-amber-100 via-orange-50 to-yellow-100',
  'Beauty & Health': 'from-fuchsia-100 via-pink-50 to-rose-100',
  'Sports & Fitness': 'from-emerald-100 via-teal-50 to-green-100',
  'Books & Stationery': 'from-violet-100 via-indigo-50 to-purple-100',
};

const ACCENTS: Record<string, string> = {
  'Fashion & Clothing': 'bg-rose-200/50',
  Electronics: 'bg-sky-200/50',
  'Home & Living': 'bg-amber-200/50',
  'Beauty & Health': 'bg-fuchsia-200/50',
  'Sports & Fitness': 'bg-emerald-200/50',
  'Books & Stationery': 'bg-violet-200/50',
};

interface ProductArtworkProps {
  emoji?: string | null;
  name: string;
  categoryName?: string | null;
  className?: string;
  emojiClassName?: string;
  compact?: boolean;
}

export default function ProductArtwork({
  emoji,
  name,
  categoryName,
  className,
  emojiClassName,
  compact = false,
}: ProductArtworkProps) {
  const palette = (categoryName && PALETTES[categoryName]) || 'from-gray-100 via-gray-50 to-gray-200';
  const accent = (categoryName && ACCENTS[categoryName]) || 'bg-gray-200/60';

  return (
    <div
      role="img"
      aria-label={name}
      className={cn(
        'relative flex items-center justify-center overflow-hidden bg-gradient-to-br',
        palette,
        className
      )}
    >
      <div className={cn('absolute -right-6 -top-8 h-28 w-28 rounded-full blur-2xl', accent)} />
      <div className={cn('absolute -bottom-10 -left-8 h-32 w-32 rounded-full blur-2xl', accent)} />
      <div className="absolute inset-4 rounded-[2rem] border border-white/60" />
      <div className="absolute left-5 top-5 h-2 w-2 rounded-full bg-white/80" />
      <div className="absolute bottom-7 right-7 h-3 w-3 rounded-full bg-white/70" />
      <span
        className={cn(
          'relative select-none drop-shadow-sm transition-transform duration-300 group-hover:scale-110',
          compact ? 'text-5xl' : 'text-7xl sm:text-8xl',
          emojiClassName
        )}
      >
        {emoji || '🛍️'}
      </span>
      {!compact && (
        <span className="absolute bottom-5 left-0 right-0 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-charcoal-500/70">
          {categoryName || "Ruby's Select"}
        </span>
      )}
    </div>
  );
}
