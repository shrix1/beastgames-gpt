import getRatelimit from "@/lib/redis";
import supabase from "@/lib/supabase";

const ratelimit = getRatelimit(1, "72 h");

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
  try {
    let rateLimitData;
    if (process.env.NODE_ENV === "production") {
      rateLimitData = await ratelimit.limit(ip);
      const { success, limit, reset, remaining } = rateLimitData;

      if (!success) {
        return Response.json(
          {
            isVoted: true,
            message: "You can only vote once",
          },
          {
            status: 429,
            headers: {
              "X-RateLimit-Limit": limit.toString(),
              "X-RateLimit-Remaining": remaining.toString(),
              "X-RateLimit-Reset": reset.toString(),
            },
          }
        );
      }
    }

    const body = await req.json();
    const { personId } = body;
    const { data, error } = await supabase.from("votes").insert({
      person_id: personId,
      ip_address: ip,
    });

    if (error) {
      return Response.json(
        {
          isVoted: false,
          message: "Internal Server Error",
        },
        { status: 500 }
      );
    }

    return Response.json({
      isVoted: true,
      message: `Voted successfully to ${personId}`,
    });
  } catch (error) {
    console.error("Error:", error);
    return Response.json(
      {
        isVoted: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const { data, error } = await supabase.from("votes").select("person_id");
  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
  return Response.json(data);
}
