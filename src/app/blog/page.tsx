"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Search, ChevronRight, ChevronDown } from "lucide-react";
import { FlickeringFooter } from "@/components/ui/flickering-footer";
import { ShimmerButton } from "@/components/ui/ShimmerButton";
import { CATEGORIES, ALL_POSTS, type Post, type Cat } from "./data";
import { motion } from "framer-motion";

const BASE = "/blog/post/";

/* ─── Unsplash cover images mapped by category slug ─────────────── */
const CAT_COVERS: Record<string, string[]> = {
  "best-practices": [
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=75",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=75",
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&q=75",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=75",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=75",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=75",
  ],
  "solutions": [
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=75",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=75",
    "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=600&q=75",
    "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&q=75",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=75",
    "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&q=75",
  ],
  "impact": [
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=75",
    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=75",
    "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&q=75",
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=75",
    "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=600&q=75",
    "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&q=75",
  ],
  "leadership": [
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=75",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=75",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=75",
    "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=600&q=75",
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=75",
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=75",
  ],
  "supplier-management": [
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=75",
    "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&q=75",
    "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=75",
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=75",
    "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&q=75",
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&q=75",
  ],
  "basic-101": [
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=75",
    "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=600&q=75",
    "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&q=75",
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=75",
    "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=600&q=75",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=75",
  ],
  "smb": [
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=75",
    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=75",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=75",
    "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&q=75",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=75",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=75",
  ],
  "manufacturing": [
    "https://images.unsplash.com/photo-1581093458791-9d42e3c7e117?w=600&q=75",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=75",
    "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=75",
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=75",
    "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&q=75",
    "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&q=75",
  ],
  "future": [
    "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&q=75",
    "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=75",
    "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=75",
    "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&q=75",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=75",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=75",
  ],
};

function getCover(catSlug: string, idx: number) {
  const arr = CAT_COVERS[catSlug] ?? CAT_COVERS["best-practices"];
  return arr[idx % arr.length];
}

/* ─── Per-slug unique images (topic-relevant) ────────────────────── */
const SLUG_IMG: Record<string, string> = {
  // Best Practices
  "best-practices-procurement-teams":                    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=75",
  "procurement-category-manager-transform-procurement":  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=75",
  "increase-efficiency-procurement-teams":               "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=75",
  "vendor-management-integrated-view":                   "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&q=75",
  "best-metrics-to-evaluate-procurement-teams":          "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=600&q=75",
  "benefits-sourcing-multiple-factories":                "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=75",
  "contract-manufacturing-best-practices-ensure-success":"https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&q=75",
  "skills-successful-procurement-manager-mfg-co":        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=75",
  "skills-succeed-procurement-smb":                      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=75",
  "procurement-professional-deliver-positive-impact-new-team": "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=75",
  "career-paths-ambitious-procurement-professionals":    "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&q=75",
  "attributes-junior-procurement-exec":                  "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=75",
  "attributes-successful-chief-procurement-officers":    "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&q=75",
  "cpo-top-of-mind-concerns":                            "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=75",
  "outsourcing-vs-insourcing-procurement-functions":     "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=75",
  "understanding-roles-procurement-drive-business-success": "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&q=75",
  // Tools & Solutions
  "major-procurement-platforms-comparative-guide":       "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=75",
  "smb-obstacles-implementing-procurement-tech":         "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=75",
  "factors-impacting-procurement-solutions-customization-costs": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=75",
  "measuring-roi-procurement-platforms":                 "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=75",
  "procurement-tool-impacts-studies-stories":            "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=75",
  "procurement-tools-key-features-smb-adoption":         "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&q=75",
  "factors-consider-choosing-procurement-platform":      "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=600&q=75",
  "balance-between-variety-simplicity-procurement-solutions": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=75",
  "costs-timelines-for-implementing-procurement-solutions": "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=600&q=75",
  "technologies-manufacturers-transform-procurement":    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=75",
  "contract-manufacturing-definitive-guide":             "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&q=75",
  "create-winwin-outcomes-contract-manufacturing":       "https://images.unsplash.com/photo-1581093458791-9d42e3c7e117?w=600&q=75",
  "dpo-powerful-tool":                                   "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&q=75",
  "benefits-challenges-eprocurement":                    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=75",
  "selection-criteria-procurement-software-guide":       "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=600&q=75",
  "automation-revolutionize-procurement":                "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=75",
  "procurement-performance-management-system-guide":     "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=75",
  "data-visualization-procurement":                      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=75",
  "procurement-performance-kpi-measurement-framework":   "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=75",
  "procurement-performance-management-system-steps":     "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=75",
  "benefits-gamification-procurement":                   "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=75",
  "ai-transform-procurement-software":                   "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=75",
  "mobile-procurement-solutions-benefits-limitations-in-modern-supply-chains": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=75",
  // Impact
  "sustainable-cost-reduction-via-procurement":          "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=75",
  "procurement-impact-finance-organizations":            "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=75",
  "procurement-impact-scm":                              "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=75",
  "procurement-improve-cost-management":                 "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&q=75",
  "procurement-enhance-risk-management":                 "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=600&q=75",
  "sustainable-procurement-opportunities-challenges":    "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&q=75",
  "procurement-role-innovation":                         "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&q=75",
  "procurement-success-mergers-and-acquisitions":        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=75",
  "procurement-business-continuity-planning":            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=75",
  "maximizing-procurement-savings-strategies-for-effective-cost-reduction": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=75",
  "procurement-the-key-to-successful-zero-based-budgeting-implementation": "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=600&q=75",
  "engaging-suppliers-key-strategies-for-sustainable-procurement": "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=75",
  // Leadership
  "steps-implement-procurement-process":                 "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=75",
  "global-procurement-opportunities-challenges":         "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=75",
  "create-holistic-procurement-budget":                  "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=600&q=75",
  "procurement-outsourcing-benefits-examples":           "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=75",
  "create-effective-procurement-policy":                 "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&q=75",
  "optimize-procurement-elevate-team-performance":       "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=75",
  "benefits-standardizing-procurement-process":          "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=75",
  "process-to-conduct-a-robust-procurement-audit":       "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=75",
  "collaboration-procurement-savings-efficiency":        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=75",
  "tail-spend-consolidation-benefits-constraints":       "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&q=75",
  "technology-maximize-source-to-pay-efficiency":        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=75",
  // Supplier Management
  "business-outcomes-supplier-relationship-management":  "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&q=75",
  "procurement-and-supplier-diversity-programme":        "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=75",
  "procurement-software-strategic-supplier-relationship-management-benefits": "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&q=75",
  "elevate-supplier-performance-procurement-software":   "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=75",
  "leverage-procurement-software-solutions-for-supplier-selection-and-evaluation": "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&q=75",
  "supplier-onboarding-qualification-procurement-software": "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&q=75",
  "supplier-contract-management-process-procurement-software-solutions": "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=600&q=75",
  "minimize-supplier-risk-using-procurement-software":   "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=600&q=75",
  "procurement-software-optimize-supplier-negotiations": "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=75",
  "procurement-software-supplier-performance-tracking":  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=75",
  "procurement-software-maximize-supplier-quality":      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=75",
  // Procurement 101
  "what-is-sourcing-what-is-procurement-what-is-the-difference": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=75",
  "types-of-spend-optimizing-value":                     "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=75",
  "exploring-direct-spend-impact-direct-materials-procurement-software": "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&q=75",
  "main-types-purchasing-processes-effective-procurement": "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=600&q=75",
  "key-terms-procurement-guide":                         "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=75",
  "rfq-and-auction":                                     "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=75",
  "create-procurement-contract":                         "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=75",
  "procurement-communication-plan":                      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=75",
  "payment-terms-and-conditions-purchase-orders":        "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&q=75",
  "purchase-order-accuracy-maximizing":                  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=75",
  // SMB
  "best-practices-smb-optimize-procurement":             "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=75",
  "procurement-training-program-smb-guide":              "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=75",
  "benefits-digital-transformation-procurement-smb":     "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=75",
  "procurement-software-advantages-smb":                 "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=75",
  "supply-chain-management-procurement-smb":             "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=75",
  "benefits-purchase-orders-small-manufacturers":        "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&q=75",
  "automating-purchase-order-small-manufacturers":       "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=75",
  // Manufacturing
  "critical-issues-procurement-manufacturing-companies": "https://images.unsplash.com/photo-1581093458791-9d42e3c7e117?w=600&q=75",
  "manufacturing-companies-robust-quality-management-system": "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&q=75",
  "procurement-iiot":                                    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=75",
  "benefits-procurement-process-mapping":                "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&q=75",
  "optimizing-procurement-best-practices-pharma-industry": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=75",
  "aerospace-procurement-success-strategies":            "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=75",
  "procurement-tools-for-electronics-unlocking-efficiency-and-success": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=75",
  "procurement-power-up-unleashing-tools-in-the-chemical-industry": "https://images.unsplash.com/photo-1581093458791-9d42e3c7e117?w=600&q=75",
  "automotive-industry-procurement-navigating-challenges-strategies": "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=75",
  "jewelry-procurement-challenges-innovative-solutions": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=75",
  "procurement-challenges-construction-material-acquisition": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=75",
  "procurement-challenges-in-the-metals-industry-navigating-with-resilience-and-ingenuity": "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&q=75",
  // Future
  "procurement-trends-predictions":                      "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&q=75",
  "artificial-intelligence-transform-supply-chain":      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=75",
  "cloud-computing-procurement-future-proof":            "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=75",
  "procurement-build-circular-economy":                  "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&q=75",
  "future-procurement-outsourcing-opportunities-challenges": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=75",
  "predicitve-analytics-disrupt-procurement":            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=75",
  "internet-of-things-optimize-procurement":             "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=75",
  "procurement-new-normal-covid19":                      "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=600&q=75",
  "sustainable-supply-chains-future-of-procurement":     "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&q=75",
  "history-evolution-procurement":                       "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=75",
};

const FALLBACK_IMGS = [
  "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=75",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=75",
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=75",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=75",
  "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&q=75",
  "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&q=75",
];

function getImg(slug: string, idx: number) {
  return SLUG_IMG[slug] ?? FALLBACK_IMGS[idx % FALLBACK_IMGS.length];
}

/* ─── Featured sidebar posts (first post of each category) ──────── */
const FEATURED_POSTS = CATEGORIES.slice(0, 3).map(c => c.posts[0]);
const LATEST_POSTS   = ALL_POSTS.slice(0, 4);

/* ─── Blog card — reference design: image top, text below ───────── */
function ImageCard({ post, imgIdx }: { post: Post; imgIdx: number }) {
  const [hov, setHov] = useState(false);
  const img = getImg(post.slug, imgIdx);
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
        delay: (imgIdx % 3) * 0.1,
      }}
      style={{ display: "flex", flex: 1, width: "100%" }}
    >
      <a
        href={`${BASE}${post.slug}`}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          display: "flex",
          flexDirection: "column",
          borderRadius: 14,
          overflow: "hidden",
          textDecoration: "none",
          background: "#fff",
          border: "1px solid rgba(15,23,42,0.08)",
          transition: "box-shadow .25s, transform .25s",
          boxShadow: hov
            ? "0 16px 48px -12px rgba(0,0,0,0.18)"
            : "0 2px 10px -4px rgba(0,0,0,0.08)",
          transform: hov ? "translateY(-4px)" : "none",
          width: "100%",
        }}
      >
        {/* Image area — light bg like reference */}
        <div style={{
          position: "relative",
          height: 190,
          background: "#f1f3f5",
          flexShrink: 0,
          overflow: "hidden",
        }}>
          <Image
            src={img}
            alt={post.title}
            fill
            style={{
              objectFit: "cover",
              transition: "transform .4s ease",
              transform: hov ? "scale(1.04)" : "scale(1)",
            }}
            sizes="(max-width:768px) 100vw, 33vw"
          />
        </div>

        {/* Text area — white, below image */}
        <div style={{ padding: "20px 22px 22px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
          {/* Category label */}
          <span style={{
            fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
            textTransform: "uppercase", color: "#3666ff",
          }}>
            {post.category}
          </span>

          {/* Title — underlined on hover like reference */}
          <h4 style={{
            margin: 0,
            fontSize: 15,
            fontWeight: 700,
            lineHeight: 1.4,
            color: "#0b1322",
            letterSpacing: "-0.01em",
            textDecoration: hov ? "underline" : "none",
            textDecorationColor: "#0b1322",
            textUnderlineOffset: 3,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}>
            {post.title}
          </h4>

          {/* Excerpt */}
          <p style={{
            margin: 0,
            fontSize: 13,
            color: "#64748b",
            lineHeight: 1.65,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            flex: 1,
          }}>
            {post.excerpt}
          </p>

          {/* Read more */}
          <div style={{
            display: "flex", alignItems: "center", gap: 5,
            fontSize: 13, fontWeight: 600, color: "#0b1322",
            marginTop: 4,
          }}>
            Read more <ChevronRight size={14} />
          </div>
        </div>
      </a>
    </motion.div>
  );
}

/* ─── Sidebar thumbnail row ──────────────────────────────────────── */
function SidebarRow({ post, imgIdx }: { post: Post; imgIdx: number }) {
  return (
    <a
      href={`${BASE}${post.slug}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: "flex", gap: 12, textDecoration: "none", alignItems: "flex-start" }}
    >
      <div style={{ width: 76, height: 58, borderRadius: 10, overflow: "hidden", flexShrink: 0, position: "relative" }}>
        <Image src={getImg(post.slug, imgIdx)} alt={post.title} fill style={{ objectFit: "cover" }} sizes="76px" />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 10.5, color: "#94a3b8", fontWeight: 500, marginBottom: 4 }}>{post.date}</div>
        <div style={{
          fontSize: 13, fontWeight: 700, color: "#0b1322", lineHeight: 1.4,
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>
          {post.title}
        </div>
      </div>
    </a>
  );
}

/* ─── Category section (title + 3-col grid + sidebar) ───────────── */
function CategoryBlock({ cat }: { cat: Cat }) {
  const [expanded, setExpanded] = useState(false);
  const gridPosts = expanded ? cat.posts : cat.posts.slice(0, 6);

  return (
    <div style={{ marginBottom: 72 }}>
      {/* two-column layout — 1 col on mobile/tablet, 1fr+280px on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10 items-start">

        {/* LEFT — section title + card grid */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#0b1322", letterSpacing: "-0.02em" }}>
                {cat.label}
              </h2>
              <div style={{ flex: 1, height: 1, background: "rgba(15,23,42,0.1)", marginLeft: 16, minWidth: 40 }} />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {gridPosts.map((post, i) => (
              <ImageCard key={post.slug} post={post} imgIdx={i} />
            ))}
          </div>

          {/* show more / less */}
          {cat.posts.length > 6 && (
            <ShimmerButton
              variant="secondary"
              onClick={() => setExpanded(e => !e)}
              className="mt-5 h-10 px-5 text-[13px] gap-2"
            >
              {expanded ? "Show less" : `Show ${cat.posts.length - 6} more articles`}
              <ChevronDown size={14} style={{ transform: expanded ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
            </ShimmerButton>
          )}
        </div>

        {/* RIGHT — Featured + Latest sidebar (secondary; hidden below lg) */}
        <div className="hidden lg:block sticky top-[100px]">
          {/* Featured */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: "#0b1322", letterSpacing: "0.02em" }}>Featured</span>
              <div style={{ flex: 1, height: 1, background: "rgba(15,23,42,0.1)" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {FEATURED_POSTS.map((p, i) => {
                return <SidebarRow key={p.slug} post={p} imgIdx={i} />;
              })}
            </div>
          </div>

          {/* Latest */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: "#0b1322", letterSpacing: "0.02em" }}>Latest</span>
              <div style={{ flex: 1, height: 1, background: "rgba(15,23,42,0.1)" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {LATEST_POSTS.map((p, i) => {
                return <SidebarRow key={p.slug} post={p} imgIdx={i + 3} />;
              })}
            </div>
          </div>

          {/* View all link */}
          <a
            href={`https://factwise.io/blog/category/${cat.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 5, marginTop: 20,
              fontSize: 12.5, fontWeight: 700, color: "#3666ff", textDecoration: "none",
            }}
          >
            View all {cat.label} <ChevronRight size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default function BlogPage() {
  const [query, setQuery]   = useState("");
  const [submitted, setSubmitted] = useState("");
  const [selectedCat, setSelectedCat] = useState<string>("all");

  const categoriesList = useMemo(() => {
    return [
      { label: "All", slug: "all" },
      ...CATEGORIES.map(c => ({ label: c.label, slug: c.slug }))
    ];
  }, []);

  const filteredCategories = useMemo(() => {
    if (selectedCat === "all") return CATEGORIES;
    return CATEGORIES.filter(cat => cat.slug === selectedCat);
  }, [selectedCat]);

  const results = useMemo(() => {
    const q = submitted.trim().toLowerCase();
    if (q.length < 2) return null;
    return ALL_POSTS.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }, [submitted]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(query);
  }

  return (
    <main style={{ minHeight: "100vh", background: "#fff", fontFamily: "var(--font-inter), sans-serif" }}>

      {/* ── Hero ── */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden bg-slate-950 px-6 pt-40 pb-24 text-center">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/procurement_team_collab_1778762496149.png"
            alt="FactWise insights"
            className="w-full h-full object-cover opacity-50 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/60 to-slate-950" />
        </div>

        <div className="relative z-10 w-full max-w-2xl mx-auto">

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-white font-bold tracking-tighter leading-[1.05] mb-6"
            style={{ fontSize: "clamp(34px, 5.5vw, 60px)" }}
          >
            Discover our latest insights
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-white/70 text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-10 font-light"
          >
            Procurement strategies, industry trends, and expert guidance — everything you need to build a world-class sourcing operation.
          </motion.p>

          {/* Search bar */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            onSubmit={handleSearch}
            style={{
              display: "flex", maxWidth: 520, margin: "0 auto",
              border: "1px solid rgba(255,255,255,0.18)", borderRadius: 10,
              overflow: "hidden", boxShadow: "0 8px 32px -8px rgba(0,0,0,0.5)",
              background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)",
            }}
          >
            <div style={{ padding: "0 14px", display: "flex", alignItems: "center" }}>
              <Search size={15} color="rgba(255,255,255,0.6)" />
            </div>
            <input
              type="text"
              placeholder="Search articles…"
              value={query}
              onChange={e => { setQuery(e.target.value); if (!e.target.value) setSubmitted(""); }}
              style={{
                flex: 1, border: "none", outline: "none",
                fontSize: 14, color: "#fff", padding: "13px 0",
                background: "transparent",
              }}
              className="placeholder:text-white/50"
            />
            <ShimmerButton
              type="submit"
              variant="primary"
              className="rounded-none rounded-r-[10px] h-auto py-3 px-6 text-[14px]"
            >
              Find Now
            </ShimmerButton>
          </motion.form>
        </div>
      </section>

      {/* ── Sticky Category Filter Bar ── */}
      <div style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(15,23,42,0.08)",
        boxShadow: "0 2px 16px -4px rgba(0,0,0,0.06)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{
            display: "flex",
            gap: "8px",
            overflowX: "auto",
            padding: "14px 0",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
            alignItems: "center",
          }} className="no-scrollbar">
            <style>{`
              .no-scrollbar::-webkit-scrollbar { display: none; }
              .cat-pill { transition: all 0.22s ease !important; }
              .cat-pill:hover { transform: translateY(-1px); }
            `}</style>
            <span style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#94a3b8",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              marginRight: 4,
              flexShrink: 0,
            }}>
              Filter:
            </span>
            {categoriesList.map((c) => {
              const isActive = selectedCat === c.slug;
              return (
                <motion.button
                  key={c.slug}
                  className="cat-pill"
                  onClick={() => {
                    setSelectedCat(c.slug);
                    setQuery("");
                    setSubmitted("");
                  }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: "7px 18px",
                    fontSize: "12.5px",
                    fontWeight: 600,
                    borderRadius: "9999px",
                    border: isActive ? "1.5px solid #3666ff" : "1.5px solid rgba(15,23,42,0.1)",
                    background: isActive
                      ? "linear-gradient(135deg, #3666ff 0%, #5b8aff 100%)"
                      : "#f8fafc",
                    color: isActive ? "#fff" : "#475569",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    boxShadow: isActive
                      ? "0 4px 14px rgba(54,102,255,0.3)"
                      : "0 1px 3px rgba(0,0,0,0.04)",
                    flexShrink: 0,
                    outline: "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "#eef2ff";
                      e.currentTarget.style.color = "#3666ff";
                      e.currentTarget.style.borderColor = "rgba(54,102,255,0.3)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "#f8fafc";
                      e.currentTarget.style.color = "#475569";
                      e.currentTarget.style.borderColor = "rgba(15,23,42,0.1)";
                    }
                  }}
                >
                  {c.label}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px 80px" }}>

        {/* Search results */}
        {results !== null ? (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
              <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#0b1322" }}>
                {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;{submitted}&rdquo;
              </h2>
              <ShimmerButton
                variant="secondary"
                onClick={() => { setQuery(""); setSubmitted(""); }}
                className="h-9 px-4 text-[12.5px]"
              >
                Clear
              </ShimmerButton>
            </div>

            {results.length > 0 ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 18 }}>
                {results.map((p, i) => {
                  return <ImageCard key={p.slug} post={p} imgIdx={i} />;
                })}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "60px 0", color: "#94a3b8" }}>
                <Search size={40} style={{ marginBottom: 12, opacity: 0.35 }} />
                <p style={{ fontSize: 16, fontWeight: 600, margin: "0 0 6px" }}>No articles found</p>
                <p style={{ fontSize: 13, margin: 0 }}>Try a different search term.</p>
              </div>
            )}
          </div>
        ) : (
          /* Normal category sections */
          filteredCategories.map(cat => <CategoryBlock key={cat.slug} cat={cat} />)
        )}
      </div>

      <FlickeringFooter />
    </main>
  );
}
