import {
  Sparkles,
  BookOpen,
  Target,
  Globe,
  Users,
  BarChart3,
  Heart,
  Clock,
  ShieldCheck,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  book: BookOpen,
  target: Target,
  globe: Globe,
  users: Users,
  chart: BarChart3,
  heart: Heart,
  clock: Clock,
  shield: ShieldCheck,
  message: MessageCircle,
};

export function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const Icon = iconMap[name] ?? Sparkles;
  return <Icon className={className} aria-hidden="true" />;
}

/*
 * Lucide carries no TikTok glyph, so this is drawn to match the rest of the
 * set: 24px box, currentColor fill, same visual weight as the stroked icons
 * around it.
 */
export function TikTok({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 1 1-1.84-2.48V9.78a5.67 5.67 0 1 0 4.93 5.62V8.99a7.27 7.27 0 0 0 4.27 1.38V7.28a4.25 4.25 0 0 1-3.21-1.46Z" />
    </svg>
  );
}
