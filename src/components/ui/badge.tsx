import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "neon"
    | "gold"
    | "temple";
}

function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-ring";

  const variants = {
    default:
      "border-transparent bg-slate-800 text-slate-100 hover:bg-slate-700",
    secondary:
      "border-slate-700 bg-slate-900/80 text-slate-300",
    destructive:
      "border-red-500/30 bg-red-500/10 text-red-400 font-bold",
    outline:
      "border-slate-700 text-slate-200",
    neon:
      "border-cyan-500/40 bg-cyan-500/10 text-cyan-300 font-bold shadow-sm shadow-cyan-500/20",
    gold:
      "border-amber-500/40 bg-amber-500/10 text-amber-300 font-bold shadow-sm shadow-amber-500/20",
    temple:
      "border-emerald-500/40 bg-emerald-500/10 text-emerald-300 font-bold shadow-sm shadow-emerald-500/20",
  };

  return (
    <div className={cn(baseStyles, variants[variant], className)} {...props} />
  );
}

export { Badge };
