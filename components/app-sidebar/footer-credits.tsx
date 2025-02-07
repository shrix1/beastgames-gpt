import { links } from "@/lib/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function FooterCredits() {
  function CreditLink({
    href,
    children,
    className,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) {
    return (
      <Link
        href={href}
        className={cn("underline underline-offset-2", className)}
      >
        {children}
      </Link>
    );
  }
  return (
    <p className="text-center text-sm">
      Built by{" "}
      <CreditLink href={links.github} className="font-medium">
        Shri
      </CreditLink>{" "}
      with <br />
      <span className="text-xs">
        NextJS, AI SDK, Shadcn, Tailwind, Supabase, Upstash, and hosted on
        Vercel
      </span>
    </p>
  );
}
