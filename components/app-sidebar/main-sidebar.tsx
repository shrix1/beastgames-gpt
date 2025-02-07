"use client";

import React from "react";
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

const MainSidebar = () => {
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
            <FinalSixCard person={person} key={person.id} />
          ))}
        </section>
        <div className="flex justify-center items-center mt-1">
          <p className="text-sm font-mono">Total Votes: 100</p>
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
