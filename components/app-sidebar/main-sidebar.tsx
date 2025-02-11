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
import { RefreshCcw } from "lucide-react";

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
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [blockRefresh, setBlockRefresh] = useState(false);

  useEffect(() => {
    setAllVotes(votes);
    setIsVotedNow(isVoted);
  }, []);

  async function getAllVotes() {
    const res = await fetch("/api/vote", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.error) {
      toast.error(data.error);
    } else {
      setAllVotes(data);
      setBlockRefresh(true);
      setTimeout(() => {
        setBlockRefresh(false);
      }, 10000);
    }
  }

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
      await getAllVotes();
    } else {
      toast.error(data.message);
    }
  }

  async function handleRefreshVotes() {
    setIsRefreshing(true);
    await getAllVotes();
    setIsRefreshing(false);
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
        <div className="flex justify-center items-center mt-1 w-fit  mx-auto flex-col gap-2">
          <div className="flex items-center gap-1.5">
            <div className="text-xs font-mono text-blue-700 bg-blue-200 px-4 py-1 rounded-full flex items-center justify-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-700 rounded-full animate-pulse" />
              Live
            </div>
            <button
              onClick={handleRefreshVotes}
              disabled={isRefreshing || blockRefresh}
              className="text-xs font-mono text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed bg-blue-200 p-1.5 rounded-full flex items-center justify-center gap-2"
            >
              <RefreshCcw
                className={`w-3 h-3 ${isRefreshing ? "animate-spin" : ""}`}
              />
            </button>
          </div>
          <p className="text-sm font-mono text-green-700 px-4 py-1 bg-green-200 rounded-full">
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
