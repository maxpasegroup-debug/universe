"use client";

import { TextareaHTMLAttributes } from "react";

export default function TextArea({
  className = "",
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={[
        "w-full min-h-[140px] resize-y rounded-xl border border-gold-300/30 bg-white/5 px-4 py-3",
        "text-white placeholder:text-white/40",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-300/40",
        className,
      ].join(" ")}
      {...props}
    />
  );
}

