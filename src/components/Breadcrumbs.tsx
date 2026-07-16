import React from "react";
import { ChevronRight, Home } from "lucide-react";
import { DESTINATIONS } from "../data/mockData";
import { SEO_WORK_VISAS } from "../data/seoContent";
import { Destination } from "../types";

interface BreadcrumbsProps {
  currentTab: string;
  activeTestPrepTab?: string;
  selectedDestination?: Destination | null;
  selectedWorkVisaId?: string | null;
  selectedUniversity?: any;
  onNavigate: (tab: string) => void;
  onSelectDestination?: (dest: Destination | null) => void;
  onSelectWorkVisa?: (id: string | null) => void;
  onSelectUniversity?: (uni: any) => void;
}

export default function Breadcrumbs({
  currentTab,
  activeTestPrepTab = "ielts",
  selectedDestination,
  selectedWorkVisaId,
  selectedUniversity,
  onNavigate,
  onSelectDestination,
  onSelectWorkVisa,
  onSelectUniversity
}: BreadcrumbsProps) {
  // If we are on the Home page, we don't necessarily need a complex breadcrumb trail,
  // but let's provide a subtle clean trace if currentTab is not "home"
  if (currentTab === "home") {
    return null;
  }

  // Get active test prep name
  const getTestPrepName = (tab: string) => {
    switch (tab) {
      case "ielts": return "IELTS Training";
      case "pte": return "PTE Academic";
      case "toefl": return "TOEFL iBT";
      case "duolingo": return "Duolingo DET";
      case "spoken": return "Spoken English";
      default: return tab.toUpperCase();
    }
  };

  // Get active work visa name
  const workVisa = SEO_WORK_VISAS.find(v => v.id === selectedWorkVisaId);
  const visaName = workVisa ? workVisa.name : "Work Visa Guide";

  // Build the items list
  const breadcrumbItems = [];

  // 1. Home is ALWAYS the base root
  breadcrumbItems.push({
    label: "Home",
    isHome: true,
    tab: "home",
    onClick: () => {
      onSelectDestination?.(null);
      onSelectWorkVisa?.(null);
      onNavigate("home");
    }
  });

  // 2. Map middle categories & current sub-items
  if (currentTab === "destinations") {
    breadcrumbItems.push({
      label: "Study Destinations",
      isCurrent: true
    });
  } else if (currentTab === "destination-detail") {
    breadcrumbItems.push({
      label: "Study Destinations",
      tab: "destinations",
      onClick: () => {
        onSelectDestination?.(null);
        onNavigate("destinations");
      }
    });
    if (selectedDestination) {
      breadcrumbItems.push({
        label: selectedDestination.name,
        isCurrent: true
      });
    }
  } else if (currentTab === "university-finder") {
    if (selectedDestination) {
      breadcrumbItems.push({
        label: "Study Destinations",
        tab: "destinations",
        onClick: () => {
          onSelectDestination?.(null);
          onNavigate("destinations");
        }
      });
      breadcrumbItems.push({
        label: selectedDestination.name,
        tab: "destination-detail",
        onClick: () => {
          onNavigate("destination-detail");
        }
      });
    } else {
      breadcrumbItems.push({
        label: "University Finder",
        tab: "university-finder",
        onClick: () => onNavigate("university-finder")
      });
    }
    breadcrumbItems.push({
      label: "Compare Universities",
      isCurrent: true
    });
  } else if (currentTab === "tests") {
    breadcrumbItems.push({
      label: "Test Preparation",
      tab: "tests",
      onClick: () => onNavigate("tests")
    });
    if (activeTestPrepTab) {
      breadcrumbItems.push({
        label: getTestPrepName(activeTestPrepTab),
        isCurrent: true
      });
    }
  } else if (currentTab === "work-visa-detail") {
    breadcrumbItems.push({
      label: "Work Visas",
      tab: "home",
      onClick: () => {
        onSelectWorkVisa?.(null);
        onNavigate("home");
        // Scroll to work visa section which is on home page
        setTimeout(() => {
          const el = document.getElementById("work-visas");
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    });
    breadcrumbItems.push({
      label: visaName,
      isCurrent: true
    });
  } else if (currentTab === "university-detail") {
    breadcrumbItems.push({
      label: "University Finder",
      tab: "university-finder",
      onClick: () => {
        onSelectUniversity?.(null);
        onNavigate("university-finder");
      }
    });
    if (selectedUniversity) {
      breadcrumbItems.push({
        label: selectedUniversity.name,
        isCurrent: true
      });
    } else {
      breadcrumbItems.push({
        label: "University Detail",
        isCurrent: true
      });
    }
  } else {
    // Other simple single level pages
    const labelMap: Record<string, string> = {
      about: "About Us",
      blog: "Blog & Resources",
      search: "Course Search",
      calculator: "Cost & Living Calculator",
      eligibility: "Eligibility Checker",
      services: "Student Essentials",
      community: "Interactive Community",
      news: "Study Abroad Blog",
      offices: "Our Metros Offices",
      info_germany_free: "Germany Free Universities Guide",
      info_canada_sds: "Canada SDS Program Rules",
      info_uk_psw: "United Kingdom PSW Route",
      info_usa_stem: "United States STEM OPT Rules",
      info_scholarships: "Specialized Scholarship Funding Guide",
      info_sop_guide: "Expert SOP drafting manual"
    };

    const label = labelMap[currentTab] || currentTab.replace("info_", "").replace(/_/g, " ").replace("-", " ");
    breadcrumbItems.push({
      label: label.charAt(0).toUpperCase() + label.slice(1),
      isCurrent: true
    });
  }

  return (
    <nav className="flex items-center" aria-label="Breadcrumb" id="cwc-breadcrumbs-nav">
      <ol className="inline-flex items-center space-x-1.5 md:space-x-2 text-xs sm:text-sm font-semibold text-gray-500 dark:text-slate-400">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          return (
            <React.Fragment key={index}>
              {index > 0 && (
                <ChevronRight className="h-3 w-3 text-gray-300 dark:text-slate-600 shrink-0 mx-0.5" />
              )}
              <li className="inline flex items-center">
                {item.isCurrent ? (
                  <span className="text-[#0047AB] dark:text-blue-400 font-extrabold select-none">
                    {item.label}
                  </span>
                ) : (
                  <button
                    onClick={item.onClick}
                    className="inline-flex items-center gap-1.5 hover:text-[#0047AB] dark:hover:text-blue-400 transition-colors cursor-pointer text-gray-500 dark:text-slate-400 font-semibold"
                  >
                    {item.isHome && (
                      <Home className="h-3.5 w-3.5 text-[#0047AB]/70 dark:text-blue-400/70" />
                    )}
                    <span>{item.label}</span>
                  </button>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
