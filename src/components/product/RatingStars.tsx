import { StarIcon } from '@heroicons/react/24/solid';
import { cn } from '@/lib/format';

interface RatingStarsProps {
  rating: number;
  count?: number;
  size?: 'sm' | 'md';
  showValue?: boolean;
  className?: string;
}

export default function RatingStars({ rating, count, size = 'sm', showValue = false, className }: RatingStarsProps) {
  const rounded = Math.round(rating);
  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <div className="flex items-center gap-0.5" aria-label={`${rating.toFixed(1)} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, index) => (
          <StarIcon
            key={index}
            className={cn(
              index < rounded ? 'text-amber-400' : 'text-gray-200',
              size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'
            )}
          />
        ))}
      </div>
      {showValue && <span className="text-xs font-semibold text-charcoal-700">{rating.toFixed(1)}</span>}
      {count != null && <span className="text-xs text-charcoal-400">({count})</span>}
    </div>
  );
}
