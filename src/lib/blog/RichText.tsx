import Image from "next/image";
import type { JSX } from "react";
import type { RichTextNode } from "./hygraph";

function normalizeHref(href: string | undefined): string {
  if (!href) return "";
  let trimmed = href.trim();
  
  // Normalize known broken links in blog content database
  if (trimmed.includes("supplier-contract-management-procurement-software-solutions")) {
    trimmed = trimmed.replace("supplier-contract-management-procurement-software-solutions", "supplier-contract-management-process-procurement-software-solutions");
  }
  if (trimmed.includes("rfq-or-auction")) {
    trimmed = trimmed.replace("rfq-or-auction", "rfq-and-auction");
  }

  // Fix external broken links (404/403) from SEMrush audit
  if (trimmed.includes("dole.com/en")) trimmed = trimmed.replace("dole.com/en", "dole.com");
  if (trimmed.includes("proactis.com/uk/en")) trimmed = trimmed.replace("proactis.com/uk/en", "proactis.com");
  if (trimmed.includes("rolls-roycemotorcars.com/en")) trimmed = trimmed.replace("rolls-roycemotorcars.com/en", "rolls-roycemotorcars.com");
  if (trimmed.includes("whitbread.co.uk")) trimmed = "https://en.wikipedia.org/wiki/Whitbread"; // 403 workaround
  if (trimmed.includes("baesystems.com/en/home")) trimmed = "https://en.wikipedia.org/wiki/BAE_Systems"; // 403 workaround

  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("/") ||
    trimmed.startsWith("#") ||
    trimmed.startsWith("mailto:") ||
    trimmed.startsWith("tel:")
  ) {
    return trimmed;
  }
  
  // Check if it's an external domain name missing the protocol prefix
  const domainRegex = /^[a-zA-Z0-9][-a-zA-Z0-9.]*\.[a-zA-Z]{2,}(?:\/.*)?$/;
  const commonDomains = ["google.com", "microsoft.com", "ibm.com", "walmart.com", "dell.com", "amazon.com", "ge.com", "unilever.com", "proactis.com", "dole.com", "rolls-royce"];
  const isCommon = commonDomains.some(d => trimmed.toLowerCase().includes(d));
  
  if (domainRegex.test(trimmed) || isCommon) {
    return `https://${trimmed}`;
  }
  
  // If it's a relative path/slug, prefix with root-relative /blog/post/ so it isn't nested relative to the current post URL
  return `/blog/post/${trimmed}`;
}

function renderNodes(nodes: RichTextNode[] | undefined, keyPrefix = "n"): JSX.Element[] {
  if (!nodes) return [];
  return nodes.map((node, i) => renderNode(node, `${keyPrefix}-${i}`));
}

function renderNode(node: RichTextNode, key: string): JSX.Element {
  if (node.text !== undefined) {
    let el: JSX.Element = <>{node.text}</>;
    if (node.bold) el = <strong>{el}</strong>;
    if (node.italic) el = <em>{el}</em>;
    if (node.underline) el = <u>{el}</u>;
    if (node.code) el = <code>{el}</code>;
    return <span key={key}>{el}</span>;
  }

  const children = renderNodes(node.children, key);

  switch (node.type) {
    case "paragraph":
      return (
        <p key={key} className="text-[1.05rem] leading-[1.85] text-slate-700 mb-6">
          {children}
        </p>
      );
    case "heading-one":
      return (
        <h1 key={key} className="text-3xl font-bold text-slate-900 mt-10 mb-4">
          {children}
        </h1>
      );
    case "heading-two":
      return (
        <h2 key={key} className="text-2xl font-bold text-slate-900 mt-10 mb-4">
          {children}
        </h2>
      );
    case "heading-three":
      return (
        <h3 key={key} className="text-xl font-bold text-slate-900 mt-8 mb-3">
          {children}
        </h3>
      );
    case "heading-four":
      return (
        <h4 key={key} className="text-lg font-semibold text-slate-900 mt-6 mb-2">
          {children}
        </h4>
      );
    case "bulleted-list":
      return (
        <ul key={key} className="list-disc pl-6 mb-6 space-y-2 text-[1.05rem] text-slate-700">
          {children}
        </ul>
      );
    case "numbered-list":
      return (
        <ol key={key} className="list-decimal pl-6 mb-6 space-y-2 text-[1.05rem] text-slate-700">
          {children}
        </ol>
      );
    case "list-item":
      return <li key={key}>{children}</li>;
    case "list-item-child":
      return <span key={key}>{children}</span>;
    case "block-quote":
      return (
        <blockquote
          key={key}
          className="border-l-4 border-slate-300 pl-4 italic text-slate-600 my-6"
        >
          {children}
        </blockquote>
      );
    case "link": {
      const normalizedHref = normalizeHref(node.href);
      const isExternal = normalizedHref.startsWith("http") && !normalizedHref.includes("factwise.io");
      return (
        <a
          key={key}
          href={normalizedHref}
          target={node.openInNewTab || isExternal ? "_blank" : undefined}
          rel={node.openInNewTab || isExternal ? "noopener noreferrer" : undefined}
          className="text-blue-600 underline underline-offset-2 hover:text-blue-800"
        >
          {children}
        </a>
      );
    }
    case "image":
      return node.src ? (
        <div key={key} className="relative w-full my-6 rounded-lg overflow-hidden">
          <Image
            src={node.src}
            alt={node.title ?? ""}
            width={1200}
            height={675}
            className="w-full h-auto"
            sizes="(max-width: 800px) 100vw, 800px"
          />
        </div>
      ) : (
        <span key={key} />
      );
    case "table":
      return (
        <table key={key} className="border-collapse border border-slate-300 my-6 w-full">
          {children}
        </table>
      );
    case "table_head":
      return <thead key={key}>{children}</thead>;
    case "table_body":
      return <tbody key={key}>{children}</tbody>;
    case "table_row":
      return <tr key={key}>{children}</tr>;
    case "table_cell":
      return (
        <td key={key} className="border border-slate-300 px-3 py-2">
          {children}
        </td>
      );
    case "table_header_cell":
      return (
        <th key={key} className="border border-slate-300 px-3 py-2 bg-slate-100 text-left">
          {children}
        </th>
      );
    default:
      return <span key={key}>{children}</span>;
  }
}

export function RichText({ content }: { content: { children: RichTextNode[] } }) {
  return <>{renderNodes(content.children)}</>;
}
