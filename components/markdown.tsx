"use client";

import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeMinifyWhitespace from "rehype-minify-whitespace";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

const components = (onCommand?: (props: any) => void) => ({
  table: ({ ...props }: any) => (
    <table
      className="my-4 w-full border-collapse border border-primary/30"
      {...props}
    />
  ),
  th: ({ ...props }: any) => (
    <th
      className="border border-primary/30 bg-white p-3 text-xs font-medium"
      {...props}
    />
  ),
  td: ({ children, ...props }: any) => (
    <td
      className="border border-primary/30 bg-white/[0.3] p-3 text-xs"
      {...props}
    >
      {children}
    </td>
  ),
  a: ({ children, ...props }: any) => (
    <a className="text-primary underline" target="_blank" {...props}>
      {children}
    </a>
  ),
  strong: ({ children, ...props }: any) => (
    <strong className="mt-1 inline-block font-bold" {...props}>
      {children}
    </strong>
  ),
  p: ({ children, ...props }: any) => (
    <p className="inline-block text-sm" {...props}>
      {children}
    </p>
  ),
  h3: ({ children, ...props }: any) => (
    <h3 className="mb-2 text-base font-medium leading-7" {...props}>
      {children}
    </h3>
  ),
  ol: ({ children, ...props }: any) => (
    <ol className="flex list-none flex-col gap-1" {...props}>
      {React.Children.map(children, (child, index) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { index: index + 1 } as any)
          : child
      )}
    </ol>
  ),
  ul: ({ children, ...props }: any) => (
    <ul className="list-none" {...props}>
      {children}
    </ul>
  ),
  li: ({ children, index, ...props }: any) => {
    const ordered = typeof index === "number";
    return (
      <li className="flex items-start " {...props}>
        <span
          className={`mr-2 mt-2 min-w-[1.5em] text-right  ${
            ordered ? "text-sm" : ""
          } `}
        >
          {ordered ? `${index}.` : "\u2022"}
        </span>
        <span className="mt-1 text-sm">{children}</span>
      </li>
    );
  },
});

type MarkdownProps = {
  children: string;
  onCommand?: (props: any) => void;
};

export const Markdown: React.FC<MarkdownProps> = ({ children }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeMinifyWhitespace]}
      components={components()}
    >
      {children}
    </ReactMarkdown>
  );
};
