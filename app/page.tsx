import ChatUI from "@/components/chat-ui";
import Header from "@/components/header";
import MainSidebar from "@/components/app-sidebar/main-sidebar";
import { cookies } from "next/headers";
import SpoilerAlert from "@/components/spoiler-alert";

function getUrl() {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }
  return "https://beastgames-gpt.vercel.app";
}

export default async function Home() {
  const cookieStore = await cookies();
  const isWatched = cookieStore.get("is_watched_beastgames");
  const isVoted = cookieStore.get("voted");

  // async function getAllVotes() {
  //   const res = await fetch(`${getUrl()}/api/vote`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   const data = await res.json();
  //   if (data.error) {
  //     console.error("Failed to fetch votes");
  //     return [];
  //   }
  //   return data;
  // }

  // const votes = (await getAllVotes()) || [];

  if (!isWatched?.value) {
    return <SpoilerAlert />;
  }

  return (
    <section className="w-full h-screen">
      <div className="flex h-full">
        <MainSidebar isVoted={isVoted?.value ? true : false} votes={[]} />
        <div className="flex-1">
          <Header />
          <ChatUI votes={[]} />
        </div>
      </div>
    </section>
  );
}
