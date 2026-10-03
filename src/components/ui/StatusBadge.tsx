import type { ProjectStatus } from '../../data/profile'
import { cn } from '../../lib/cn'

const tones: Record<ProjectStatus, string> = {
  Réalisé: 'bg-success-soft text-success',
  Académique: 'bg-accent-soft text-accent-text',
  'En cours': 'bg-warning-soft text-warning',
}

/** 24px mono uppercase badge with a 6px dot: Réalisé = success, Académique = accent, En cours = warning. */
export function StatusBadge({ status, className }: { status: ProjectStatus; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex h-6 items-center gap-1.5 rounded-full px-2.5 font-mono text-xs font-medium uppercase tracking-[0.08em]',
        tones[status],
        className,
      )}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-current" />
      {status}
    </span>
  )
}
