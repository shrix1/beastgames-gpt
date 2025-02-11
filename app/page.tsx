import BeastChat from "@/components/beast-chat";
import Header from "@/components/header";
import MainSidebar from "@/components/app-sidebar/main-sidebar";
import { cookies } from "next/headers";
import SpoilerAlert from "@/components/spoiler-alert";

export default async function Home() {
  const cookieStore = await cookies();
  const isWatched = cookieStore.get("is_watched_beastgames");

  if (!isWatched) {
    return <SpoilerAlert />;
  }

  return (
    <section className="w-full h-screen">
      <div className="flex h-full">
        <MainSidebar />
        <div className="flex-1">
          <Header />
          <BeastChat />
        </div>
      </div>
    </section>
  );
}
