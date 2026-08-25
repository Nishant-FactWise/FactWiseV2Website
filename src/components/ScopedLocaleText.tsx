"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { getPathLocale } from "@/lib/i18n";
import { localizeSourceText, repairMojibake } from "@/hooks/useLocalizedText";

type ScopedLocaleTextProps = {
  rootRef: React.RefObject<HTMLElement | null>;
};

const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "TEXTAREA", "INPUT", "SELECT", "OPTION"]);

function shouldSkipNode(node: Node) {
  const parent = node.parentElement;
  if (!parent) return true;
  if (SKIP_TAGS.has(parent.tagName)) return true;
  return Boolean(parent.closest("[data-no-localize='true']"));
}

export default function ScopedLocaleText({ rootRef }: ScopedLocaleTextProps) {
  const pathname = usePathname();
  const locale = getPathLocale(pathname);

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root || locale === "en") return;

    let scheduled = false;
    let refreshScheduled = false;
    let destroyed = false;
    let translating = false;
    const pendingNodes = new Set<Node>();

    const translateNode = (node: Node) => {
      if (shouldSkipNode(node)) return;

      const source = node.textContent ?? "";
      if (!source.trim()) return;

      const translated = localizeSourceText(source, locale);
      const normalizedSource = repairMojibake(source);
      if (translated !== source && translated !== normalizedSource) {
        node.textContent = translated;
      }
    };

    const translateSubtree = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const before = node.textContent;
        translateNode(node);
        return node.textContent !== before;
      }

      if (node.nodeType !== Node.ELEMENT_NODE) return false;
      let changed = false;
      const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
      let textNode = walker.nextNode();
      while (textNode) {
        const before = textNode.textContent;
        translateNode(textNode);
        if (textNode.textContent !== before) changed = true;
        textNode = walker.nextNode();
      }
      return changed;
    };

    const translatePending = () => {
      if (destroyed) return;
      scheduled = false;
      translating = true;
      let changed = false;

      const nodes = pendingNodes.size ? Array.from(pendingNodes) : [root];
      pendingNodes.clear();
      for (const node of nodes) {
        if (root.contains(node)) {
          changed = translateSubtree(node) || changed;
        }
      }

      translating = false;

      if (changed) {
        if (!refreshScheduled) {
          refreshScheduled = true;
          window.setTimeout(() => {
            refreshScheduled = false;
            import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
              if (!destroyed) ScrollTrigger.refresh();
            });
          }, 120);
        }
      }
    };

    const schedule = () => {
      if (scheduled || destroyed) return;
      scheduled = true;

      const runIdle = window.requestIdleCallback ?? ((cb: IdleRequestCallback) => window.setTimeout(() => cb({ didTimeout: false, timeRemaining: () => 0 }), 80));
      runIdle(translatePending, { timeout: 250 });
    };

    const observer = new MutationObserver((mutations) => {
      if (translating) return;
      for (const mutation of mutations) {
        if (mutation.type === "characterData") {
          pendingNodes.add(mutation.target);
          continue;
        }
        mutation.addedNodes.forEach((node) => pendingNodes.add(node));
      }
      schedule();
    });

    pendingNodes.add(root);
    schedule();
    observer.observe(root, { childList: true, characterData: true, subtree: true });

    return () => {
      destroyed = true;
      observer.disconnect();
    };
  }, [locale, rootRef]);

  return null;
}
