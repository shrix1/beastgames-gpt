import BeastChat from "@/components/beast-chat";
import Header from "@/components/header";
import MainSidebar from "@/components/main-sidebar";

export default function Home() {
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
