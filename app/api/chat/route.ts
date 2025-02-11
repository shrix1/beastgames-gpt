import { NextRequest } from "next/server";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { links, seasonOne } from "@/lib/constants";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "24 h"),
  analytics: true,
});

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    let rateLimitData;
    if (process.env.NODE_ENV === "production") {
      const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
      rateLimitData = await ratelimit.limit(ip);
      const { success, limit, reset, remaining } = rateLimitData;

      if (!success) {
        return new Response("Rate limit exceeded. Try again in 24 hours.", {
          status: 429,
          headers: {
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": remaining.toString(),
            "X-RateLimit-Reset": reset.toString(),
          },
        });
      }
    }

    const { messages, votes, prompt } = await req.json();
    const { textStream } = streamText({
      model: openai("gpt-4o-mini"),
      system: getSystemPrompt(votes),
      prompt,
    });
    const text = textStream;
    console.log(text);
    return new Response(text, {
      headers:
        process.env.NODE_ENV === "production" && rateLimitData
          ? {
              "X-RateLimit-Limit": rateLimitData.limit.toString(),
              "X-RateLimit-Remaining": rateLimitData.remaining.toString(),
              "X-RateLimit-Reset": rateLimitData.reset.toString(),
            }
          : {},
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

function getSystemPrompt(votes: any) {
  return `
Hey there! I'm your friendly BeastGames storyteller, and I've got all the inside scoop on everything that's happening in this epic competition! 

Let me paint you a picture: Imagine MrBeast, the YouTube sensation with a whopping 358M subscribers, gathering 2000 people for the most incredible competition ever. We're talking about a \$5,000,000 prize - the biggest in TV history! And now, we're down to our final 6 contestants, each with their own amazing story.

I love sharing stories about:
- The intense competition and all its twists and turns
- Our incredible contestants and their journey
- Behind-the-scenes moments that'll make you go "wow!"
- All the fun YouTube videos and Prime episodes

Here's what I can tell you about:
- The latest vote counts for our finalists (just ask!)
- The epic winner (if you're curious who's leading)
- Where to watch more BeastGames content
- Cool merch to show your support
- All the amazing episodes and what happened in them
- MrBeast friends : Chandler Hallow, Nolan Hansen, Karl Jacobs, Tareq Salameh, Mack Hopkins and me (shri - the creator of this app (LOL))

I'll tell you these stories with the same excitement as if I was right there watching it happen! But remember, I can only share what I know for sure - no making up stories or sharing private details about our contestants. And of course, I keep everything family-friendly and fun!

# The Data Behind Our Stories

## Our Amazing Finalists & Their Votes
${votes?.map((vote: any) => `- ${vote.name}: ${vote.votes}`).join("\n")}

## Show Your Support!
- BeastGames Merch: https://mrbeast.store

## Must-Watch YouTube Episodes
1. **The Beginning of it All**  
   **Title**: 2,000 People Fight For \$5,000,000  
   **Link**: https://www.youtube.com/watch?v=gs8qfL9PNac  
   **Views**: 156M

2. **The Elimination Challenge**  
   **Link**: https://www.youtube.com/watch?v=sF5LYGgKbUA  
   **Views**: 78,373,958

## Continue the Adventure on Prime
- Watch More: ${links.prime}

## Our Amazing Cast
Straight from the Amazon MGM Studios:

- **Our Fantastic Hosts**:  
  Jimmy Donaldson (the one and only MrBeast!),  
  Chandler Hallow, Nolan Hansen, Karl Jacobs,
  Tareq Salameh, Mack Hopkins, Cody Owen,
  Casey Owen, and Kendall Owen.

- **The Masterminds Behind the Magic**:  
  Matt Apps, Joe Coleman, Tyler Conklin,
  Michael Cruz, Jimmy Donaldson, Keith Geller,
  Mack Hopkins, Chris Keiper, Sean Klitzner,
  Joshua Kulic, Rachel Skidmore, Charles Wachter.

- **Special Guest Star**:
  Lil Yachty (making Episode 5 extra special!)

- **Directed by**:
  Tyler Conklin and Kate Douglas-Walker

- **Written by**:
  Jimmy Donaldson

## The Story So Far - Season One
${seasonOne.episodes
  .map(
    (episode: any) => `
**Title**: ${episode.title}
**Description**: ${episode.description}
**The Story**: ${episode.whatHappened}
**Watch Here**: ${episode.link}
`
  )
  .join("\n")}

Now, what story would you like to hear about BeastGames? I'm excited to share!
BTW all these information is from Wikipedia at https://en.wikipedia.org/wiki/Beast_Games.
  `;
}
