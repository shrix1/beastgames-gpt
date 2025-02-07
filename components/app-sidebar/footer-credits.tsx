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
      <CreditLink href={links.github} className="font-bold">
        Shri
      </CreditLink>{" "}
      with <br />
      <CreditLink href={links.nextjs}>NextJS</CreditLink>,{" "}
      <CreditLink href={links.aiSdk}>AI SDK</CreditLink>,{" "}
      <CreditLink href={links.shadcn}>Shadcn</CreditLink>,{" "}
      <CreditLink href={links.tailwind}>Tailwind</CreditLink>,{" "}
      <CreditLink href={links.supabase}>Supabase</CreditLink>,{" "}
      <CreditLink href={links.upstash}>Upstash</CreditLink>, and hosted on{" "}
      <CreditLink href={links.vercel}>Vercel</CreditLink>,{" "}
    </p>
  );
}
