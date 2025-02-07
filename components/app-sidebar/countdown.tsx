"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { links } from "@/lib/constants";

const FinalEpisodeCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Set exact UTC time for global consistency
    const finalDate = new Date("2024-02-13T01:00:00.000Z"); // 8 PM EST on Feb 13th in UTC

    const timer = setInterval(() => {
      const now = new Date();
      const difference = finalDate.getTime() - now.getTime();

      if (difference < 0) {
        clearInterval(timer);
        setIsFinished(true);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (isFinished) {
    return (
      <div className="flex flex-col items-center gap-3 mt-4 p-4 border rounded-lg mx-3">
        <p className="text-xl font-medium text-center">Final Episode is Out!</p>
        <Link
          href={links.prime}
          className="text-blue-500 hover:text-blue-700 underline font-medium"
        >
          Watch Now on Prime Video
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2 mt-1 p-4 border-2 rounded-lg mx-3 shadow-lg bg-white">
      <p className="text-xl font-medium">Final Episode Countdown</p>
      <p className="text-sm text-muted-foreground text-center">
        (8 PM EST / 5 PM PST / 1 AM GMT)
      </p>
      <div className="flex gap-4 font-mono text-lg">
        <div className="flex flex-col items-center">
          <span className="font-bold">{timeLeft.days}</span>
          <span className="text-xs text-muted-foreground">days</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold">{timeLeft.hours}</span>
          <span className="text-xs text-muted-foreground">hours</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold">{timeLeft.minutes}</span>
          <span className="text-xs text-muted-foreground">mins</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold">{timeLeft.seconds}</span>
          <span className="text-xs text-muted-foreground">secs</span>
        </div>
      </div>
    </div>
  );
};

export default FinalEpisodeCountdown;
