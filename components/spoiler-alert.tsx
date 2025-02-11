"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { links } from "@/lib/constants";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Separator } from "./ui/separator";

const SpoilerAlert = () => {
  const router = useRouter();
  const [input, setInput] = useState("");
  const pharse = "I WATCHED IT";

  const handleSubmit = () => {
    if (input === pharse) {
      document.cookie = "is_watched_beastgames_dialog=true";
      router.push("/");
    } else {
      toast.error(`Please type '${pharse}' to continue`);
    }
  };

  return (
    <section className="w-full h-screen flex justify-center items-center">
      <Card className="max-w-2xl border p-2 rounded-xl shadow-2xl shadow-blue-200">
        <div className="border rounded-lg shadow-md shadow-pink-100">
          <CardHeader>
            <CardTitle className="text-black justify-center text-3xl font-bold flex items-center gap-2">
              Welcome to{" "}
              <Image
                src="/beast.jpeg"
                alt="BeastGamesGPT"
                width={42}
                height={42}
              />{" "}
              BeastGamesGPT
            </CardTitle>
            <CardDescription className="text-black text-center mt-1">
              BeastGamesGPT is an ChatBot that helps you explore and learn about
              the BeastGames reality show.{" "}
              <span className="text-blue-500">
                (Show information from{" "}
                <Link
                  href={links.wikipedia}
                  className="underline underline-offset-2"
                >
                  Wikipedia
                </Link>
                )
              </span>
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 rounded-lg">
            <div className="flex flex-col items-center gap-4">
              <p className="text-black text-center">
                If you watched the show, Type{" "}
                <span className="font-bold text-blue-400 uppercase">
                  i watched it
                </span>{" "}
                to use the chatbot.
              </p>
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  type="text"
                  placeholder={pharse}
                  value={input}
                  className="bg-white text-black font-mono rounded-md p-2"
                  onChange={(e) => setInput(e.target.value)}
                />
                <Button
                  type="submit"
                  disabled={input !== pharse}
                  className="bg-blue-500 text-white"
                >
                  Let me in
                </Button>
              </form>
            </div>

            <Separator />
            <p className="text-center">
              (or) <br /> Please watch the show and try this BeastGamesGPT
              <br />
              (BeastGamesGPT doesn't want to spoil anything)
            </p>
            <div className="bg-gray-700 rounded-lg p-4">
              <Image
                src="/beastgames.png"
                alt="BeastGames"
                width={300}
                height={300}
                className="mx-auto"
              />

              <p className="text-white text-center mt-7">
                BeastGames is an epic reality competition show where 2,000
                contestants face intense challenges competing for the largest
                cash prize in TV history - $5,000,000. Watch as MrBeast puts
                contestants through grueling tests of endurance, skill and
                strategy on Amazon Prime.
              </p>
            </div>
          </CardContent>

          <CardFooter className="flex justify-center">
            <Link href={links.prime}>
              <Button
                className="flex items-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-200 gap-2 shadow-xl shadow-black/20 text-xl h-16 text-white"
                size="lg"
              >
                Watch Now on{" "}
                <Image src="/prime.png" alt="Prime" width={50} height={50} />
              </Button>
            </Link>
          </CardFooter>
        </div>
      </Card>
    </section>
  );
};

export default SpoilerAlert;
