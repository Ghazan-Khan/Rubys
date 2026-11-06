import { ORDER_STATUS_FLOW, ORDER_STATUS_META } from '@/lib/constants';
import { formatDateTime } from '@/lib/format';
import type { Order } from '@/types';
import { cn } from '@/lib/format';

export default function OrderTimeline({ order }: { order: Order }) {
  const isStopped = ['cancelled', 'returned', 'refunded'].includes(order.status);
  const currentIndex = ORDER_STATUS_FLOW.indexOf(order.status);

  const timestamps: Partial<Record<string, string | null>> = {
    pending: order.createdAt,
    dispatched: order.dispatchedAt,
    delivered: order.deliveredAt,
    cancelled: order.cancelledAt,
  };

  if (isStopped) {
    const meta = ORDER_STATUS_META[order.status];
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-lg" aria-hidden="true">{meta.icon}</span>
          <h2 className="text-sm font-bold text-charcoal-900">{meta.label}</h2>
        </div>
        <p className="mt-1.5 text-xs leading-5 text-charcoal-500">{meta.description}</p>
        <p className="mt-2 text-[11px] text-charcoal-400">
          Last updated {formatDateTime(order.updatedAt)}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <h2 className="text-sm font-bold text-charcoal-900">Order progress</h2>
      <ol className="mt-4 space-y-4">
        {ORDER_STATUS_FLOW.map((status, index) => {
          const meta = ORDER_STATUS_META[status];
          const complete = index <= currentIndex;
          const active = index === currentIndex;
          return (
            <li key={status} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span
                  className={cn(
                    'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold',
                    complete ? 'bg-ruby-600 text-white' : 'bg-gray-100 text-charcoal-400'
                  )}
                >
                  {complete ? '✓' : index + 1}
                </span>
                {index < ORDER_STATUS_FLOW.length - 1 && (
                  <span className={cn('mt-1 w-px flex-1', index < currentIndex ? 'bg-ruby-300' : 'bg-gray-200')} />
                )}
              </div>
              <div className="pb-1">
                <p className={cn('text-xs font-semibold', active ? 'text-ruby-700' : complete ? 'text-charcoal-800' : 'text-charcoal-400')}>
                  {meta.label}
                </p>
                <p className="mt-0.5 text-[11px] leading-4 text-charcoal-400">{meta.description}</p>
                {timestamps[status] && (
                  <p className="mt-0.5 text-[10px] text-charcoal-400">{formatDateTime(timestamps[status])}</p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
