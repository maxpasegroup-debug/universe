"use client";

import { useEffect, useState } from "react";
import GoldButton from "@/components/ui/GoldButton";
import { env } from "@/lib/env";
import { logAnalytics } from "@/lib/analytics";

export default function TalkPage() {
  const [sent, setSent] = useState(false);

  useEffect(() => {
    void logAnalytics("dashboard_talk_view");
  }, []);

  return (
    <div className="space-y-6">
      <div className="text-3xl md:text-4xl font-extrabold leading-tight bg-gold-linear bg-clip-text text-transparent">
        Talk to Expert
      </div>
      <p className="text-[#B8B8B8] max-w-2xl mx-auto text-center">
        Connect directly with the owner to get guidance and support.
      </p>

      <div className="flex items-center justify-center pt-2">
        <a
          href={env.WHATSAPP_LINK}
          target="_blank"
          rel="noreferrer"
          onClick={() => setSent(true)}
        >
          <GoldButton
            className="px-10 py-5 text-lg w-[320px] max-w-[90vw]"
            glow
          >
            {sent ? "OPENING..." : "CHAT ON WHATSAPP"}
          </GoldButton>
        </a>
      </div>

      <div className="text-[#B8B8B8] text-sm text-center">
        If your message is urgent, include your mobile number and the opportunity you are referring to.
      </div>
    </div>
  );
}

