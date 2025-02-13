"use client";

import React, { useEffect, useState } from "react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from "../ui/sidebar";
import FooterCredits from "./footer-credits";
import { finalSix, seasonOne } from "@/lib/constants";
import FinalSixCard from "./final-six-card";
import FinalEpisodeCountdown from "./countdown";
import { toast } from "sonner";
import { RefreshCcw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
        Season 1 Beast Games
        <p className="text-sm font-medium text-muted-foreground -mt-1"></p>
      </SidebarHeader>
      <SidebarContent className="flex flex-col mt-2">
        <section className="grid grid-cols-1 gap-2 px-3">
          {/* {finalSix.map((person) => {
            return (
              <FinalSixCard
                person={person}
                key={person.id}
                isVoted={isVotedNow}
                votes={allVotes}
                handleVote={handleVote}
                isLoading={isLoading}
              />
            );
          })} */}
          <div className="bg-gradient-to-r from-blue-200 to-blue-400 p-4 rounded-lg text-center">
            <h3 className="text-lg font-bold mb-2">🏆 Winner 🏆 </h3>
            <div className="relative w-40 h-40 mx-auto mb-2">
              <Image
                src="/finalsix/831.png"
                alt="Jeff"
                fill
                className="object-cover rounded-full border-4 border-blue-500"
              />
            </div>
            <p className="text-xl font-bold">Jeff (#831)</p>
            <p className="text-gray-700 font-mono font-bold mt-1">
              Won $10,000,000
            </p>
          </div>

          <p className="text-sm text-gray-700 text-center">
            Jeff going to use the money to find cure for this child's rare
            disease.
          </p>
        </section>
        <section className="mt-6 px-3">
          <h3 className="font-semibold mb-2 text-center">All Episodes</h3>
          <div className="flex flex-col gap-2">
            {seasonOne.episodes.map((episode) => (
              <Link
                key={episode.title}
                href={episode.link}
                className="text-sm p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                target="_blank"
              >
                {episode.title}
              </Link>
            ))}
          </div>
        </section>
        {/* <div className="flex justify-center items-center mt-1 w-fit  mx-auto flex-col gap-2">
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
        </div> */}

        {/* <FinalEpisodeCountdown /> */}
      </SidebarContent>
      <SidebarFooter className="border-t px-2 py-3">
        <FooterCredits />
      </SidebarFooter>
    </Sidebar>
  );
};

export default MainSidebar;
