"use client";

import React, { useEffect, useState } from "react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from "../ui/sidebar";
import FooterCredits from "./footer-credits";
import { finalSix } from "@/lib/constants";
import FinalSixCard from "./final-six-card";
import FinalEpisodeCountdown from "./countdown";
import { toast } from "sonner";

export type Vote = {
  person_id: number;
};

const MainSidebar = ({
  isVoted,
  votes,
}: {
  isVoted: boolean;
  votes: Vote[];
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [allVotes, setAllVotes] = useState<Vote[]>([]);
  const [isVotedNow, setIsVotedNow] = useState(false);

  useEffect(() => {
    setAllVotes(votes);
    setIsVotedNow(isVoted);
  }, []);

  async function handleVote(personId: string) {
    setIsLoading(true);
    const response = await fetch("/api/vote", {
      method: "POST",
      body: JSON.stringify({ personId }),
    });
    setIsLoading(false);
    const data = await response.json();
    if (data.isVoted) {
      document.cookie = `voted=true; path=/; max-age=${60 * 60 * 24 * 30}`;
      toast.success(data.message);
      setIsVotedNow(true);
      const res = await fetch("/api/vote", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const allVotes: Vote[] = await res.json();
      setAllVotes(allVotes);
    } else {
      toast.error(data.message);
    }
  }

  const totalVotes = allVotes.length || 100;

  return (
    <Sidebar>
      <SidebarHeader className="text-2xl font-bold text-center mt-2">
        Final 6 Peoples
        <p className="text-sm font-medium text-muted-foreground -mt-1">
          Who do you think will win? Click to vote
        </p>
      </SidebarHeader>
      <SidebarContent className="flex flex-col mt-2">
        <section className="grid grid-cols-2 gap-2 px-3">
          {finalSix.map((person) => (
            <FinalSixCard
              person={person}
              key={person.id}
              isVoted={isVotedNow}
              votes={allVotes}
              isLoading={isLoading}
              handleVote={handleVote}
            />
          ))}
        </section>
        <div className="flex justify-center items-center mt-1 bg-green-200 w-fit rounded-full mx-auto px-4 py-1">
          <p className="text-sm font-mono text-green-700">
            Total Votes: <span className="font-bold">{totalVotes}</span>
          </p>
        </div>
        <FinalEpisodeCountdown />
      </SidebarContent>
      <SidebarFooter className="border-t px-2 py-3">
        <FooterCredits />
      </SidebarFooter>
    </Sidebar>
  );
};

export default MainSidebar;
