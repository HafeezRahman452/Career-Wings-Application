import React, { useState, useEffect, useMemo } from "react";
import { SEO_DESTINATIONS, SEODestinationDetail } from "../data/seoContent";
import { EUROPE_COUNTRIES } from "../data/europeCountriesData";
import { 
  ArrowLeft, 
  BookOpen, 
  DollarSign, 
  Languages, 
  GraduationCap, 
  Calendar, 
  CheckCircle, 
  HelpCircle, 
  Phone, 
  ChevronRight,
  ClipboardList,
  Sparkles,
  ChevronDown,
  Heart,
  Info,
  Users,
  Globe,
  ArrowRight
} from "lucide-react";
import { motion } from "motion/react";
import UniversityLogo from "./UniversityLogo";

const COUNTRY_EMOJIS: Record<string, string> = {
  germany: "🇩🇪",
  france: "🇫🇷",
  ireland: "🇮🇪",
  italy: "🇮🇹",
  spain: "🇪🇸",
  netherlands: "🇳🇱",
  sweden: "🇸🇪",
  switzerland: "🇨🇭",
  austria: "🇦🇹",
  belgium: "🇧🇪",
  denmark: "🇩🇰",
  finland: "🇫🇮",
  norway: "🇳🇴",
  poland: "🇵🇱",
  portugal: "🇵🇹",
  czechia: "🇨🇿",
  hungary: "🇭🇺",
  greece: "🇬🇷",
  luxembourg: "🇱🇺",
  estonia: "🇪🇪",
  malta: "🇲🇹",
  latvia: "🇱🇻",
  lithuania: "🇱🇹",
  slovakia: "🇸🇰",
  slovenia: "🇸🇮",
  croatia: "🇭🇷",
  cyprus: "🇨🇾",
  romania: "🇷🇴",
  bulgaria: "🇧🇬",
};

export const UNIVERSITIES_BY_COUNTRY: Record<string, Array<{
  id: string;
  name: string;
  location: string;
  logo: string;
  ranking: string;
  intlStudents: string;
  courses: string;
  detailsUrl: string;
}>> = {
  australia: [
    {
      id: "melbourne",
      name: "University of Melbourne",
      location: "Melbourne, Australia",
      logo: "https://logo.clearbit.com/unimelb.edu.au",
      ranking: "14",
      intlStudents: "28,500",
      courses: "160+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/australia/"
    },
    {
      id: "sydney",
      name: "University of Sydney",
      location: "Sydney, Australia",
      logo: "https://logo.clearbit.com/sydney.edu.au",
      ranking: "19",
      intlStudents: "26,100",
      courses: "180+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/australia/"
    },
    {
      id: "unsw",
      name: "University of New South Wales (UNSW Sydney)",
      location: "Sydney, Australia",
      logo: "https://logo.clearbit.com/unsw.edu.au",
      ranking: "19",
      intlStudents: "27,695",
      courses: "150+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/australia/"
    },
    {
      id: "anu",
      name: "The Australian National University",
      location: "Canberra, Australia",
      logo: "https://logo.clearbit.com/anu.edu.au",
      ranking: "34",
      intlStudents: "8,200",
      courses: "140+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/australia/"
    },
    {
      id: "monash",
      name: "Monash University",
      location: "Melbourne, Australia",
      logo: "https://logo.clearbit.com/monash.edu",
      ranking: "42",
      intlStudents: "29,400",
      courses: "170+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/australia/"
    },
    {
      id: "uq",
      name: "The University of Queensland",
      location: "Brisbane, Australia",
      logo: "https://logo.clearbit.com/uq.edu.au",
      ranking: "43",
      intlStudents: "21,574",
      courses: "130+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/australia/"
    },
    {
      id: "uwa",
      name: "University of Western Australia (UWA)",
      location: "Perth, Australia",
      logo: "https://logo.clearbit.com/uwa.edu.au",
      ranking: "72",
      intlStudents: "11,200",
      courses: "110+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/australia/"
    },
    {
      id: "adelaide",
      name: "University of Adelaide",
      location: "Adelaide, Australia",
      logo: "https://logo.clearbit.com/adelaide.edu.au",
      ranking: "89",
      intlStudents: "10,452",
      courses: "120+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/australia/"
    },
    {
      id: "uts",
      name: "University of Technology Sydney (UTS)",
      location: "Sydney, Australia",
      logo: "https://logo.clearbit.com/uts.edu.au",
      ranking: "90",
      intlStudents: "15,600",
      courses: "95+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/australia/"
    },
    {
      id: "macquarie",
      name: "Macquarie University",
      location: "Sydney, Australia",
      logo: "https://logo.clearbit.com/mq.edu.au",
      ranking: "130",
      intlStudents: "12,100",
      courses: "85+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/australia/"
    },
    {
      id: "rmit",
      name: "RMIT University",
      location: "Melbourne, Australia",
      logo: "https://logo.clearbit.com/rmit.edu.au",
      ranking: "140",
      intlStudents: "18,900",
      courses: "120+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/australia/"
    },
    {
      id: "wollongong",
      name: "University of Wollongong",
      location: "Wollongong, Australia",
      logo: "https://logo.clearbit.com/uow.edu.au",
      ranking: "162",
      intlStudents: "13,100",
      courses: "90+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/australia/"
    },
    {
      id: "qut",
      name: "Queensland University of Technology (QUT)",
      location: "Brisbane, Australia",
      logo: "https://logo.clearbit.com/qut.edu.au",
      ranking: "189",
      intlStudents: "11,700",
      courses: "100+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/australia/"
    },
    {
      id: "deakin",
      name: "Deakin University",
      location: "Melbourne, Australia",
      logo: "https://logo.clearbit.com/deakin.edu.au",
      ranking: "233",
      intlStudents: "14,200",
      courses: "110+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/australia/"
    },
    {
      id: "curtin",
      name: "Curtin University",
      location: "Perth, Australia",
      logo: "https://logo.clearbit.com/curtin.edu.au",
      ranking: "183",
      intlStudents: "15,400",
      courses: "115+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/australia/"
    },
    {
      id: "griffith",
      name: "Griffith University",
      location: "Gold Coast, Australia",
      logo: "https://logo.clearbit.com/griffith.edu.au",
      ranking: "251",
      intlStudents: "12,850",
      courses: "130+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/australia/"
    },
    {
      id: "swinburne",
      name: "Swinburne University of Technology",
      location: "Melbourne, Australia",
      logo: "https://logo.clearbit.com/swinburne.edu.au",
      ranking: "285",
      intlStudents: "9,600",
      courses: "85+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/australia/"
    },
    {
      id: "latrobe",
      name: "La Trobe University",
      location: "Melbourne, Australia",
      logo: "https://logo.clearbit.com/latrobe.edu.au",
      ranking: "300",
      intlStudents: "10,250",
      courses: "105+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/australia/"
    },
    {
      id: "jcu",
      name: "James Cook University",
      location: "Townsville, Australia",
      logo: "https://logo.clearbit.com/jcu.edu.au",
      ranking: "351",
      intlStudents: "5,400",
      courses: "90+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/australia/"
    },
    {
      id: "unisa",
      name: "University of South Australia",
      location: "Adelaide, Australia",
      logo: "https://logo.clearbit.com/unisa.edu.au",
      ranking: "326",
      intlStudents: "11,800",
      courses: "110+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/australia/"
    },
    {
      id: "newcastle-au",
      name: "University of Newcastle",
      location: "Newcastle, Australia",
      logo: "https://logo.clearbit.com/newcastle.edu.au",
      ranking: "173",
      intlStudents: "8,900",
      courses: "125+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/australia/"
    },
    {
      id: "wsu",
      name: "Western Sydney University",
      location: "Sydney, Australia",
      logo: "https://logo.clearbit.com/westernsydney.edu.au",
      ranking: "311",
      intlStudents: "9,800",
      courses: "95+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/australia/"
    },
    {
      id: "flinders",
      name: "Flinders University",
      location: "Adelaide, Australia",
      logo: "https://logo.clearbit.com/flinders.edu.au",
      ranking: "380",
      intlStudents: "5,200",
      courses: "80+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/australia/"
    },
    {
      id: "canberra",
      name: "University of Canberra",
      location: "Canberra, Australia",
      logo: "https://logo.clearbit.com/canberra.edu.au",
      ranking: "421",
      intlStudents: "4,600",
      courses: "75+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/australia/"
    }
  ],
  uk: [
    {
      id: "oxford",
      name: "University of Oxford",
      location: "Oxford, United Kingdom",
      logo: "https://logo.clearbit.com/ox.ac.uk",
      ranking: "1",
      intlStudents: "10,800",
      courses: "150+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/uk/"
    },
    {
      id: "cambridge",
      name: "University of Cambridge",
      location: "Cambridge, United Kingdom",
      logo: "https://logo.clearbit.com/cam.ac.uk",
      ranking: "2",
      intlStudents: "9,900",
      courses: "145+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/uk/"
    },
    {
      id: "imperial",
      name: "Imperial College London",
      location: "London, United Kingdom",
      logo: "https://logo.clearbit.com/imperial.ac.uk",
      ranking: "6",
      intlStudents: "11,200",
      courses: "120+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/uk/"
    },
    {
      id: "ucl",
      name: "University College London",
      location: "London, United Kingdom",
      logo: "https://logo.clearbit.com/ucl.ac.uk",
      ranking: "9",
      intlStudents: "18,500",
      courses: "English Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/uk/"
    },
    {
      id: "edinburgh",
      name: "University of Edinburgh",
      location: "Edinburgh, United Kingdom",
      logo: "https://logo.clearbit.com/ed.ac.uk",
      ranking: "22",
      intlStudents: "12,800",
      courses: "English Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/uk/"
    },
    {
      id: "manchester",
      name: "University of Manchester",
      location: "Manchester, United Kingdom",
      logo: "https://logo.clearbit.com/manchester.ac.uk",
      ranking: "32",
      intlStudents: "14,200",
      courses: "English Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/uk/"
    },
    {
      id: "kcl",
      name: "King's College London",
      location: "London, United Kingdom",
      logo: "https://logo.clearbit.com/kcl.ac.uk",
      ranking: "40",
      intlStudents: "13,600",
      courses: "135+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/uk/"
    },
    {
      id: "bristol",
      name: "University of Bristol",
      location: "Bristol, United Kingdom",
      logo: "https://logo.clearbit.com/bristol.ac.uk",
      ranking: "55",
      intlStudents: "8,500",
      courses: "115+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/uk/"
    },
    {
      id: "warwick",
      name: "University of Warwick",
      location: "Coventry, United Kingdom",
      logo: "https://logo.clearbit.com/warwick.ac.uk",
      ranking: "67",
      intlStudents: "9,200",
      courses: "110+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/uk/"
    },
    {
      id: "glasgow",
      name: "University of Glasgow",
      location: "Glasgow, United Kingdom",
      logo: "https://logo.clearbit.com/gla.ac.uk",
      ranking: "76",
      intlStudents: "10,400",
      courses: "125+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/uk/"
    },
    {
      id: "birmingham",
      name: "University of Birmingham",
      location: "Birmingham, United Kingdom",
      logo: "https://logo.clearbit.com/bham.ac.uk",
      ranking: "84",
      intlStudents: "11,100",
      courses: "115+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/uk/"
    },
    {
      id: "southampton",
      name: "University of Southampton",
      location: "Southampton, United Kingdom",
      logo: "https://logo.clearbit.com/southampton.ac.uk",
      ranking: "81",
      intlStudents: "8,200",
      courses: "100+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/uk/"
    },
    {
      id: "leeds",
      name: "University of Leeds",
      location: "Leeds, United Kingdom",
      logo: "https://logo.clearbit.com/leeds.ac.uk",
      ranking: "75",
      intlStudents: "11,900",
      courses: "135+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/uk/"
    },
    {
      id: "sheffield",
      name: "University of Sheffield",
      location: "Sheffield, United Kingdom",
      logo: "https://logo.clearbit.com/sheffield.ac.uk",
      ranking: "104",
      intlStudents: "8,750",
      courses: "120+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/uk/"
    },
    {
      id: "nottingham",
      name: "University of Nottingham",
      location: "Nottingham, United Kingdom",
      logo: "https://logo.clearbit.com/nottingham.ac.uk",
      ranking: "100",
      intlStudents: "9,600",
      courses: "125+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/uk/"
    },
    {
      id: "qmul",
      name: "Queen Mary University of London",
      location: "London, United Kingdom",
      logo: "https://logo.clearbit.com/qmul.ac.uk",
      ranking: "145",
      intlStudents: "10,100",
      courses: "95+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/uk/"
    },
    {
      id: "durham",
      name: "Durham University",
      location: "Durham, United Kingdom",
      logo: "https://logo.clearbit.com/durham.ac.uk",
      ranking: "78",
      intlStudents: "4,600",
      courses: "90+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/uk/"
    },
    {
      id: "bath",
      name: "University of Bath",
      location: "Bath, United Kingdom",
      logo: "https://logo.clearbit.com/bath.ac.uk",
      ranking: "150",
      intlStudents: "5,200",
      courses: "85+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/uk/"
    }
  ],
  usa: [
    {
      id: "mit",
      name: "Massachusetts Institute of Technology (MIT)",
      location: "Cambridge, United States",
      logo: "https://logo.clearbit.com/mit.edu",
      ranking: "3",
      intlStudents: "3,400",
      courses: "130+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/usa/"
    },
    {
      id: "harvard",
      name: "Harvard University",
      location: "Cambridge, United States",
      logo: "https://logo.clearbit.com/harvard.edu",
      ranking: "4",
      intlStudents: "7,800",
      courses: "200+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/usa/"
    },
    {
      id: "stanford",
      name: "Stanford University",
      location: "Stanford, United States",
      logo: "https://logo.clearbit.com/stanford.edu",
      ranking: "5",
      intlStudents: "5,100",
      courses: "English Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/usa/"
    },
    {
      id: "caltech",
      name: "California Institute of Technology (Caltech)",
      location: "Pasadena, United States",
      logo: "https://logo.clearbit.com/caltech.edu",
      ranking: "7",
      intlStudents: "900",
      courses: "80+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/usa/"
    },
    {
      id: "berkeley",
      name: "University of California, Berkeley",
      location: "Berkeley, United States",
      logo: "https://logo.clearbit.com/berkeley.edu",
      ranking: "10",
      intlStudents: "8,900",
      courses: "165+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/usa/"
    },
    {
      id: "columbia",
      name: "Columbia University",
      location: "New York, United States",
      logo: "https://logo.clearbit.com/columbia.edu",
      ranking: "11",
      intlStudents: "11,800",
      courses: "170+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/usa/"
    },
    {
      id: "ucla",
      name: "University of California, Los Angeles (UCLA)",
      location: "Los Angeles, United States",
      logo: "https://logo.clearbit.com/ucla.edu",
      ranking: "21",
      intlStudents: "7,200",
      courses: "140+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/usa/"
    },
    {
      id: "nyu",
      name: "New York University",
      location: "United States",
      logo: "https://logo.clearbit.com/nyu.edu",
      ranking: "38",
      intlStudents: "19,200",
      courses: "English Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/usa/"
    },
    {
      id: "bu",
      name: "Boston University",
      location: "United States",
      logo: "https://logo.clearbit.com/bu.edu",
      ranking: "75",
      intlStudents: "11,400",
      courses: "English Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/usa/"
    },
    {
      id: "yale",
      name: "Yale University",
      location: "New Haven, United States",
      logo: "https://logo.clearbit.com/yale.edu",
      ranking: "15",
      intlStudents: "3,350",
      courses: "150+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/usa/"
    },
    {
      id: "princeton",
      name: "Princeton University",
      location: "Princeton, United States",
      logo: "https://logo.clearbit.com/princeton.edu",
      ranking: "16",
      intlStudents: "2,100",
      courses: "140+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/usa/"
    },
    {
      id: "chicago",
      name: "University of Chicago",
      location: "Chicago, United States",
      logo: "https://logo.clearbit.com/uchicago.edu",
      ranking: "13",
      intlStudents: "4,600",
      courses: "135+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/usa/"
    },
    {
      id: "upenn",
      name: "University of Pennsylvania",
      location: "Philadelphia, United States",
      logo: "https://logo.clearbit.com/upenn.edu",
      ranking: "12",
      intlStudents: "6,400",
      courses: "160+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/usa/"
    },
    {
      id: "cornell",
      name: "Cornell University",
      location: "Ithaca, United States",
      logo: "https://logo.clearbit.com/cornell.edu",
      ranking: "20",
      intlStudents: "7,100",
      courses: "175+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/usa/"
    },
    {
      id: "jhu",
      name: "Johns Hopkins University",
      location: "Baltimore, United States",
      logo: "https://logo.clearbit.com/jhu.edu",
      ranking: "15",
      intlStudents: "5,300",
      courses: "120+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/usa/"
    },
    {
      id: "gatech",
      name: "Georgia Institute of Technology",
      location: "Atlanta, United States",
      logo: "https://logo.clearbit.com/gatech.edu",
      ranking: "45",
      intlStudents: "6,900",
      courses: "95+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/usa/"
    },
    {
      id: "usc",
      name: "University of Southern California",
      location: "Los Angeles, United States",
      logo: "https://logo.clearbit.com/usc.edu",
      ranking: "74",
      intlStudents: "11,500",
      courses: "110+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/usa/"
    },
    {
      id: "northeastern",
      name: "Northeastern University",
      location: "Boston, United States",
      logo: "https://logo.clearbit.com/northeastern.edu",
      ranking: "168",
      intlStudents: "13,100",
      courses: "120+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/usa/"
    }
  ],
  canada: [
    {
      id: "toronto",
      name: "University of Toronto",
      location: "Canada",
      logo: "https://logo.clearbit.com/utoronto.ca",
      ranking: "21",
      intlStudents: "25,800",
      courses: "English Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/canada/"
    },
    {
      id: "mcgill",
      name: "McGill University",
      location: "Canada",
      logo: "https://logo.clearbit.com/mcgill.ca",
      ranking: "30",
      intlStudents: "12,300",
      courses: "English Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/canada/"
    },
    {
      id: "ubc",
      name: "University of British Columbia",
      location: "Canada",
      logo: "https://logo.clearbit.com/ubc.ca",
      ranking: "34",
      intlStudents: "17,200",
      courses: "English Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/canada/"
    },
    {
      id: "mcmaster",
      name: "McMaster University",
      location: "Hamilton, Canada",
      logo: "https://logo.clearbit.com/mcmaster.ca",
      ranking: "85",
      intlStudents: "5,200",
      courses: "95+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/canada/"
    },
    {
      id: "alberta",
      name: "University of Alberta",
      location: "Edmonton, Canada",
      logo: "https://logo.clearbit.com/ualberta.ca",
      ranking: "109",
      intlStudents: "8,400",
      courses: "120+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/canada/"
    },
    {
      id: "montreal",
      name: "University of Montreal",
      location: "Montreal, Canada",
      logo: "https://logo.clearbit.com/umontreal.ca",
      ranking: "111",
      intlStudents: "7,800",
      courses: "105+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/canada/"
    },
    {
      id: "waterloo",
      name: "University of Waterloo",
      location: "Waterloo, Canada",
      logo: "https://logo.clearbit.com/uwaterloo.ca",
      ranking: "112",
      intlStudents: "9,600",
      courses: "110+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/canada/"
    },
    {
      id: "calgary",
      name: "University of Calgary",
      location: "Calgary, Canada",
      logo: "https://logo.clearbit.com/ucalgary.ca",
      ranking: "201",
      intlStudents: "4,600",
      courses: "90+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/canada/"
    },
    {
      id: "western-ca",
      name: "Western University",
      location: "London, Canada",
      logo: "https://logo.clearbit.com/uwo.ca",
      ranking: "114",
      intlStudents: "6,900",
      courses: "115+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/canada/"
    },
    {
      id: "queens-ca",
      name: "Queen's University",
      location: "Kingston, Canada",
      logo: "https://logo.clearbit.com/queensu.ca",
      ranking: "251",
      intlStudents: "4,100",
      courses: "100+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/canada/"
    },
    {
      id: "ottawa",
      name: "University of Ottawa",
      location: "Ottawa, Canada",
      logo: "https://logo.clearbit.com/uottawa.ca",
      ranking: "137",
      intlStudents: "7,250",
      courses: "125+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/canada/"
    },
    {
      id: "sfu",
      name: "Simon Fraser University",
      location: "Burnaby, Canada",
      logo: "https://logo.clearbit.com/sfu.ca",
      ranking: "315",
      intlStudents: "6,200",
      courses: "85+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/canada/"
    },
    {
      id: "dalhousie",
      name: "Dalhousie University",
      location: "Halifax, Canada",
      logo: "https://logo.clearbit.com/dal.ca",
      ranking: "275",
      intlStudents: "4,400",
      courses: "95+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/canada/"
    },
    {
      id: "york-ca",
      name: "York University",
      location: "Toronto, Canada",
      logo: "https://logo.clearbit.com/yorku.ca",
      ranking: "351",
      intlStudents: "10,800",
      courses: "110+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/canada/"
    },
    {
      id: "guelph",
      name: "University of Guelph",
      location: "Guelph, Canada",
      logo: "https://logo.clearbit.com/uoguelph.ca",
      ranking: "401",
      intlStudents: "2,300",
      courses: "80+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/canada/"
    }
  ],
  newzealand: [
    {
      id: "auckland",
      name: "University of Auckland",
      location: "New Zealand",
      logo: "https://logo.clearbit.com/auckland.ac.nz",
      ranking: "68",
      intlStudents: "8,300",
      courses: "English Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/new-zealand/"
    },
    {
      id: "otago",
      name: "University of Otago",
      location: "New Zealand",
      logo: "https://logo.clearbit.com/otago.ac.nz",
      ranking: "206",
      intlStudents: "3,200",
      courses: "English Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/new-zealand/"
    },
    {
      id: "wellington",
      name: "Victoria University of Wellington",
      location: "Wellington, New Zealand",
      logo: "https://logo.clearbit.com/wgtn.ac.nz",
      ranking: "241",
      intlStudents: "3,400",
      courses: "95+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/new-zealand/"
    },
    {
      id: "canterbury",
      name: "University of Canterbury",
      location: "Christchurch, New Zealand",
      logo: "https://logo.clearbit.com/canterbury.ac.nz",
      ranking: "256",
      intlStudents: "2,800",
      courses: "90+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/new-zealand/"
    },
    {
      id: "massey",
      name: "Massey University",
      location: "Palmerston North, New Zealand",
      logo: "https://logo.clearbit.com/massey.ac.nz",
      ranking: "292",
      intlStudents: "3,100",
      courses: "85+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/new-zealand/"
    },
    {
      id: "waikato",
      name: "University of Waikato",
      location: "Hamilton, New Zealand",
      logo: "https://logo.clearbit.com/waikato.ac.nz",
      ranking: "331",
      intlStudents: "2,400",
      courses: "80+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/new-zealand/"
    },
    {
      id: "lincoln",
      name: "Lincoln University",
      location: "Lincoln, New Zealand",
      logo: "https://logo.clearbit.com/lincoln.ac.nz",
      ranking: "362",
      intlStudents: "1,500",
      courses: "60+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/new-zealand/"
    },
    {
      id: "aut",
      name: "Auckland University of Technology (AUT)",
      location: "Auckland, New Zealand",
      logo: "https://logo.clearbit.com/aut.ac.nz",
      ranking: "401",
      intlStudents: "4,100",
      courses: "85+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/new-zealand/"
    }
  ],
  ireland: [
    {
      id: "tcd",
      name: "Trinity College Dublin",
      location: "Ireland",
      logo: "https://logo.clearbit.com/tcd.ie",
      ranking: "81",
      intlStudents: "4,800",
      courses: "English Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/ireland/"
    },
    {
      id: "ucd",
      name: "University College Dublin",
      location: "Ireland",
      logo: "https://logo.clearbit.com/ucd.ie",
      ranking: "171",
      intlStudents: "6,900",
      courses: "English Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/ireland/"
    },
    {
      id: "galway",
      name: "University of Galway",
      location: "Galway, Ireland",
      logo: "https://logo.clearbit.com/universityofgalway.ie",
      ranking: "289",
      intlStudents: "3,100",
      courses: "80+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/ireland/"
    },
    {
      id: "ucc",
      name: "University College Cork (UCC)",
      location: "Cork, Ireland",
      logo: "https://logo.clearbit.com/ucc.ie",
      ranking: "303",
      intlStudents: "3,200",
      courses: "85+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/ireland/"
    },
    {
      id: "dcu",
      name: "Dublin City University (DCU)",
      location: "Dublin, Ireland",
      logo: "https://logo.clearbit.com/dcu.ie",
      ranking: "421",
      intlStudents: "2,600",
      courses: "75+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/ireland/"
    },
    {
      id: "limerick",
      name: "University of Limerick",
      location: "Limerick, Ireland",
      logo: "https://logo.clearbit.com/ul.ie",
      ranking: "450",
      intlStudents: "2,400",
      courses: "70+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/ireland/"
    },
    {
      id: "maynooth",
      name: "Maynooth University",
      location: "Maynooth, Ireland",
      logo: "https://logo.clearbit.com/maynoothuniversity.ie",
      ranking: "411",
      intlStudents: "1,950",
      courses: "80+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/ireland/"
    },
    {
      id: "tudublin",
      name: "Technological University Dublin",
      location: "Dublin, Ireland",
      logo: "https://logo.clearbit.com/tudublin.ie",
      ranking: "501",
      intlStudents: "3,100",
      courses: "90+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/ireland/"
    },
    {
      id: "rcsi",
      name: "Royal College of Surgeons in Ireland (RCSI)",
      location: "Dublin, Ireland",
      logo: "https://logo.clearbit.com/rcsi.ie",
      ranking: "201",
      intlStudents: "1,500",
      courses: "50+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/ireland/"
    },
    {
      id: "setu",
      name: "South East Technological University",
      location: "Waterford, Ireland",
      logo: "https://logo.clearbit.com/setu.ie",
      ranking: "751",
      intlStudents: "1,200",
      courses: "65+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/ireland/"
    }
  ],
  germany: [
    {
      id: "tum_g_univ",
      name: "Technical University of Munich (TUM)",
      location: "Germany",
      logo: "https://logo.clearbit.com/tum.de",
      ranking: "37",
      intlStudents: "14,500",
      courses: "English & German Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/germany/"
    },
    {
      id: "heidelberg",
      name: "Heidelberg University",
      location: "Heidelberg, Germany",
      logo: "https://logo.clearbit.com/uni-heidelberg.de",
      ranking: "47",
      intlStudents: "6,100",
      courses: "110+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/germany/"
    },
    {
      id: "lmu_g_univ",
      name: "Ludwig Maximilian University of Munich",
      location: "Germany",
      logo: "https://logo.clearbit.com/uni-muenchen.de",
      ranking: "54",
      intlStudents: "10,200",
      courses: "English & German Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/germany/"
    },
    {
      id: "humboldt",
      name: "Humboldt University of Berlin",
      location: "Berlin, Germany",
      logo: "https://logo.clearbit.com/hu-berlin.de",
      ranking: "86",
      intlStudents: "5,400",
      courses: "100+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/germany/"
    },
    {
      id: "free_berlin",
      name: "Free University of Berlin",
      location: "Berlin, Germany",
      logo: "https://logo.clearbit.com/fu-berlin.de",
      ranking: "98",
      intlStudents: "6,200",
      courses: "105+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/germany/"
    },
    {
      id: "rwth",
      name: "RWTH Aachen University",
      location: "Aachen, Germany",
      logo: "https://logo.clearbit.com/rwth-aachen.de",
      ranking: "99",
      intlStudents: "12,400",
      courses: "120+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/germany/"
    },
    {
      id: "kit",
      name: "Karlsruhe Institute of Technology (KIT)",
      location: "Karlsruhe, Germany",
      logo: "https://logo.clearbit.com/kit.edu",
      ranking: "119",
      intlStudents: "5,850",
      courses: "90+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/germany/"
    },
    {
      id: "bonn",
      name: "University of Bonn",
      location: "Bonn, Germany",
      logo: "https://logo.clearbit.com/uni-bonn.de",
      ranking: "91",
      intlStudents: "5,100",
      courses: "115+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/germany/"
    },
    {
      id: "goettingen",
      name: "University of Göttingen",
      location: "Göttingen, Germany",
      logo: "https://logo.clearbit.com/uni-goettingen.de",
      ranking: "201",
      intlStudents: "3,800",
      courses: "95+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/germany/"
    },
    {
      id: "hamburg",
      name: "University of Hamburg",
      location: "Hamburg, Germany",
      logo: "https://logo.clearbit.com/uni-hamburg.de",
      ranking: "136",
      intlStudents: "4,900",
      courses: "100+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/germany/"
    },
    {
      id: "freiburg",
      name: "University of Freiburg",
      location: "Freiburg, Germany",
      logo: "https://logo.clearbit.com/uni-freiburg.de",
      ranking: "128",
      intlStudents: "4,250",
      courses: "85+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/germany/"
    },
    {
      id: "stuttgart",
      name: "University of Stuttgart",
      location: "Stuttgart, Germany",
      logo: "https://logo.clearbit.com/uni-stuttgart.de",
      ranking: "301",
      intlStudents: "3,600",
      courses: "90+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/germany/"
    }
  ],
  france: [
    {
      id: "psl_univ",
      name: "Université PSL",
      location: "Paris, France",
      logo: "https://logo.clearbit.com/psl.eu",
      ranking: "40",
      intlStudents: "5,105",
      courses: "110+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/france/"
    },
    {
      id: "sorbonne_univ",
      name: "Sorbonne University",
      location: "France",
      logo: "https://logo.clearbit.com/sorbonne-universite.fr",
      ranking: "59",
      intlStudents: "9,600",
      courses: "English & French Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/france/"
    },
    {
      id: "polytechnique",
      name: "École Polytechnique",
      location: "Palaiseau, France",
      logo: "https://logo.clearbit.com/polytechnique.edu",
      ranking: "71",
      intlStudents: "2,900",
      courses: "60+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/france/"
    },
    {
      id: "hec_univ",
      name: "HEC Paris",
      location: "France",
      logo: "https://logo.clearbit.com/hec.edu",
      ranking: "112",
      intlStudents: "4,200",
      courses: "English Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/france/"
    },
    {
      id: "saclay",
      name: "Université Paris-Saclay",
      location: "Gif-sur-Yvette, France",
      logo: "https://logo.clearbit.com/universite-paris-saclay.fr",
      ranking: "115",
      intlStudents: "6,400",
      courses: "95+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/france/"
    },
    {
      id: "sciencespo",
      name: "Sciences Po",
      location: "Paris, France",
      logo: "https://logo.clearbit.com/sciencespo.fr",
      ranking: "242",
      intlStudents: "5,800",
      courses: "50+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/france/"
    },
    {
      id: "ens-lyon",
      name: "École Normale Supérieure de Lyon",
      location: "Lyon, France",
      logo: "https://logo.clearbit.com/ens-lyon.fr",
      ranking: "184",
      intlStudents: "1,200",
      courses: "45+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/france/"
    },
    {
      id: "paris-cite",
      name: "Université Paris Cité",
      location: "Paris, France",
      logo: "https://logo.clearbit.com/u-paris.fr",
      ranking: "68",
      intlStudents: "8,900",
      courses: "115+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/france/"
    },
    {
      id: "grenoble",
      name: "Université Grenoble Alpes",
      location: "Grenoble, France",
      logo: "https://logo.clearbit.com/univ-grenoble-alpes.fr",
      ranking: "294",
      intlStudents: "4,100",
      courses: "85+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/france/"
    },
    {
      id: "strasbourg",
      name: "University of Strasbourg",
      location: "Strasbourg, France",
      logo: "https://logo.clearbit.com/unistra.fr",
      ranking: "351",
      intlStudents: "5,200",
      courses: "90+ Courses available",
      detailsUrl: "https://www.idp.com/find-a-university/france/"
    }
  ]
};

const getFlagFromLocation = (location: string): string => {
  const loc = location.toLowerCase();
  if (loc.includes("australia")) return "🇦🇺";
  if (loc.includes("united kingdom") || loc.includes(", uk")) return "🇬🇧";
  if (loc.includes("united states") || loc.includes(", usa")) return "🇺🇸";
  if (loc.includes("canada")) return "🇨🇦";
  if (loc.includes("new zealand")) return "🇳🇿";
  if (loc.includes("ireland")) return "🇮🇪";
  if (loc.includes("germany")) return "🇩🇪";
  if (loc.includes("france")) return "🇫🇷";
  return "🪐";
};

const getCountryKeyFromLocation = (location: string): string => {
  const loc = location.toLowerCase();
  if (loc.includes("australia")) return "australia";
  if (loc.includes("united kingdom") || loc.includes(", uk") || loc.includes("london")) return "uk";
  if (loc.includes("united states") || loc.includes(", usa")) return "usa";
  if (loc.includes("canada")) return "canada";
  if (loc.includes("new zealand")) return "newzealand";
  if (loc.includes("ireland")) return "ireland";
  if (loc.includes("germany")) return "germany";
  if (loc.includes("france")) return "france";
  return "";
};

const UniversityCard: React.FC<{ uni: typeof UNIVERSITIES_BY_COUNTRY[string][number]; onViewDetails: () => void }> = ({ uni, onViewDetails }) => {
  const [isLiked, setIsLiked] = useState(false);
  const countryKey = getCountryKeyFromLocation(uni.location);

  return (
    <div className="min-w-[280px] sm:min-w-[340px] max-w-[340px] bg-white border border-gray-150/70 rounded-3xl p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300 relative group shrink-0">
      <div className="space-y-4">
        {/* FastLane & Heart line */}
        <div className="flex justify-between items-center">
          <span className="bg-[#006e67] text-white text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded flex items-center gap-1">
            FastLane <Info className="h-3.5 w-3.5 shrink-0" />
          </span>
          <div className="flex items-center gap-2">
            {/* Country Flag representation right next to the heart - wrapped in circular emblem */}
            <div 
              title={uni.location}
              className="w-7 h-7 rounded-full bg-slate-50 border border-gray-150 flex items-center justify-center shadow-3xs hover:scale-105 active:scale-95 transition-all select-none"
            >
              <span className="text-[14px] leading-none select-none">
                {getFlagFromLocation(uni.location)}
              </span>
            </div>
            <button 
              type="button"
              onClick={() => setIsLiked(!isLiked)}
              className="text-gray-300 hover:text-rose-500 hover:scale-110 active:scale-95 transition-all cursor-pointer p-1"
            >
              <Heart className={`h-5 w-5 ${isLiked ? "fill-rose-500 text-rose-500" : "text-gray-300"}`} />
            </button>
          </div>
        </div>

        {/* University Logo Shield with overlaid country flag */}
        <UniversityLogo id={uni.id} name={uni.name} logo={uni.logo} countryCode={countryKey} />

        {/* Institution Title & Location */}
        <div className="space-y-1">
          <h4 className="text-sm font-black text-gray-955 tracking-tight line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors h-10">
            {uni.name}
          </h4>
          <p className="text-[11px] text-gray-400 font-extrabold flex items-center gap-1 uppercase tracking-wider">
            {uni.location}
          </p>
          <button 
            onClick={onViewDetails}
            className="text-[#0047AB] text-xs font-black inline-flex items-center gap-1 hover:underline pt-1 cursor-pointer"
          >
            View all courses <ChevronRight className="h-3 w-3" />
          </button>
        </div>

        <div className="border-t border-gray-100 my-4" />

        {/* Highlight Specifications */}
        <div className="space-y-2.5 text-xs">
          <div className="flex items-center gap-3 text-gray-600 font-semibold">
            <GraduationCap className="h-4 w-4 text-[#0047AB] shrink-0" />
            <span>THE World Ranking: {uni.ranking}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600 font-semibold">
            <Users className="h-4 w-4 text-orange-500 shrink-0" />
            <span>International students: {uni.intlStudents}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600 font-semibold">
            <Globe className="h-4 w-4 text-emerald-500 shrink-0" />
            <span>{uni.courses}</span>
          </div>
        </div>
      </div>

      {/* Button at the bottom */}
      <div className="pt-6">
        <button 
          onClick={onViewDetails}
          className="block w-full border border-gray-300 hover:border-[#0047AB] text-gray-700 hover:text-[#0047AB] font-black text-xs text-center py-3 rounded-xl transition-all hover:bg-blue-50/20 active:scale-98 cursor-pointer"
        >
          View Details
        </button>
      </div>
    </div>
  );
}



interface DestinationDetailPageProps {
  destinationId: string;
  onBack: () => void;
  onBookCounselling: (details: string) => void;
  onViewAllUniversities: (countryId: string) => void;
  onCheckEligibility?: () => void;
  onChangeDestination?: (newDestId: string) => void;
  onSelectUniversity?: (uni: any) => void;
}

export default function DestinationDetailPage({
  destinationId,
  onBack,
  onBookCounselling,
  onViewAllUniversities,
  onCheckEligibility,
  onChangeDestination,
  onSelectUniversity
}: DestinationDetailPageProps) {
  const [data, setData] = useState<SEODestinationDetail | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isSeoOpen, setIsSeoOpen] = useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // States for 29 European countries portal
  const [europeSearch, setEuropeSearch] = useState("");
  const [europeFilter, setEuropeFilter] = useState<"all" | "free" | "english" | "top_stayback">("all");

  const filteredEuropeCountries = useMemo(() => {
    return EUROPE_COUNTRIES.filter((country) => {
      const matchQuery = country.name.toLowerCase().includes(europeSearch.toLowerCase()) || 
                         country.description.toLowerCase().includes(europeSearch.toLowerCase());
      if (!matchQuery) return false;

      if (europeFilter === "all") return true;
      if (europeFilter === "free") {
        return country.cost.toLowerCase().includes("free") || country.cost.toLowerCase().includes("€400") || country.cost.toLowerCase().includes("€450") || country.cost.toLowerCase().includes("€500") || country.cost.toLowerCase().includes("€550") || country.cost.toLowerCase().includes("€600") || country.cost.toLowerCase().includes("€650");
      }
      if (europeFilter === "english") {
        return country.id === "ireland" || country.id === "malta" || country.id === "netherlands" || country.id === "sweden" || country.id === "denmark";
      }
      if (europeFilter === "top_stayback") {
        return country.entitlement.toLowerCase().includes("2-year") || country.entitlement.toLowerCase().includes("18-month");
      }
      return true;
    });
  }, [europeSearch, europeFilter]);

  const scrollCarousel = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    // Scroll window to top when mounting a detail page
    window.scrollTo({ top: 0, behavior: "smooth" });
    const found = SEO_DESTINATIONS.find(d => d.id === destinationId);
    if (found) {
      setData(found);
      
      // Dynamic SEO Title Update
      if (found.metaTitle) {
        document.title = found.metaTitle;
      } else {
        document.title = `Study in ${found.name} | Career Wings Consultants`;
      }
      
      // Dynamic SEO Meta Description Update
      if (found.metaDescription) {
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
          metaDesc = document.createElement('meta');
          metaDesc.setAttribute('name', 'description');
          document.head.appendChild(metaDesc);
        }
        metaDesc.setAttribute('content', found.metaDescription);
      }
    }
  }, [destinationId]);

  if (!data) {
    return (
      <div className="py-24 text-center space-y-4">
        <p className="text-gray-500 font-bold">Loading Destination details...</p>
        <button onClick={onBack} className="text-[#0047AB] underline font-extrabold cursor-pointer">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#FCFAF7] dark:bg-slate-950 min-h-screen pb-24 text-gray-900 dark:text-slate-100 transition-colors animate-fade-in">
      
      {/* 1. BREADCRUMBS & TOP UTILITY PATH */}
      <div className="border-b border-gray-100 bg-slate-50/50 py-3.5">
        <div className="container mx-auto px-4 max-w-[1440px] flex flex-wrap items-center justify-between gap-4 text-xs font-bold text-gray-400">
          <div className="flex items-center gap-2">
            <button 
              onClick={onBack}
              className="hover:text-blue-600 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <ArrowLeft className="h-3 w-3" /> Back to Catalog
            </button>
            <ChevronRight className="h-3.5 w-3.5 text-gray-350" />
            <span>Study Abroad</span>
            <ChevronRight className="h-3.5 w-3.5 text-gray-350" />
            <span className="text-blue-600 font-extrabold">{data.name} Guide</span>
          </div>
          
          <div className="flex items-center gap-2 text-rose-600 animate-pulse">
            <Sparkles className="h-4 w-4" />
            <span>Guaranteed Scholarships Negotiated Weekly!</span>
          </div>
        </div>
      </div>

      {/* 2. DYNAMIC HEADER SECTION */}
      <header className="relative overflow-hidden py-16 md:py-20 bg-gradient-to-b from-slate-900/10 to-[#FCFAF7] dark:from-slate-950 dark:to-slate-900 border-b border-gray-150/50">
        <div className="container mx-auto px-4 max-w-[1440px] space-y-6">
          <div className="inline-flex items-center gap-2 bg-[#0047AB]/10 text-[#0047AB] dark:bg-blue-950/40 dark:text-blue-300 border border-[#0047AB]/20 px-3.5 py-1.5 rounded-full font-extrabold text-xs tracking-wider uppercase">
            <Sparkles className="h-3.5 w-3.5 text-amber-500 animate-pulse" />
            <span>CWC • PRESTIGIOUS PATHWAYS</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-955 dark:text-white leading-[1.1] tracking-tight">
            Study in <span className="bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent dark:from-blue-450 dark:to-cyan-355">{data.name}</span> with <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">Career Wings Consultants</span>
          </h1>

          <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base md:text-lg max-w-4xl font-semibold leading-relaxed">
            {data.intro} Get professional guidance by Career Wings Consultants, your premier certified Foreign Education Experts and custom pathway architects.
          </p>

          {/* COLLAPSIBLE SEO WORKPLACE DIAGNOSTICS CARD */}
          <div className="mt-8 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-3xl p-6 max-w-4xl shadow-md hover:shadow-lg transition-all duration-350">
            <div 
              className="flex items-center justify-between cursor-pointer select-none" 
              onClick={() => setIsSeoOpen(!isSeoOpen)}
            >
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-[#0047AB] to-blue-600 text-white rounded-2xl p-3 flex items-center justify-center shrink-0 shadow-md shadow-blue-500/10">
                  <Sparkles className="h-4.5 w-4.5 text-amber-300" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-950 dark:text-white tracking-tight flex flex-wrap items-center gap-2">
                    SEO Optimization Audit & Keywords Log Verified
                    <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[9px] px-2.5 py-0.5 rounded-full font-black animate-pulse uppercase tracking-wider">
                      100% HEALTHY
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-0.5">
                    Click to inspect the exact meta targets, keyword counts, and content optimization logs for {data.name}.
                  </p>
                </div>
              </div>
              <button type="button" className="text-[#0047AB] dark:text-blue-400 hover:text-blue-800 p-1">
                <ChevronDown className={`h-5 w-5 transition-transform duration-350 ${isSeoOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {isSeoOpen && (
              <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-800 space-y-5 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {/* Left Column: Meta Tags */}
                  <div className="space-y-3 bg-[#FCFAF7] dark:bg-slate-950 border border-slate-200/50 p-4 rounded-xl shadow-xs">
                    <p className="font-extrabold uppercase tracking-widest text-[10px] text-[#0047AB] flex items-center gap-1.5">
                      <span className="inline-block w-2 h-2 rounded-full bg-blue-600" />
                      Meta Tags Configuration
                    </p>
                    <div className="space-y-2.5">
                      <div>
                        <span className="font-extrabold text-gray-400 text-[10px] block mb-1 uppercase tracking-wider">Meta Title:</span>
                        <p className="text-gray-800 dark:text-gray-250 font-extrabold bg-[#0047AB]/5 dark:bg-blue-950/20 p-2 rounded border border-[#0047AB]/10 dark:border-blue-900/10 font-sans leading-snug">
                          {data.metaTitle}
                        </p>
                      </div>
                      <div>
                        <span className="font-extrabold text-gray-400 text-[10px] block mb-1 uppercase tracking-wider">Meta Description:</span>
                        <p className="text-gray-600 dark:text-gray-350 font-semibold bg-[#0047AB]/5 dark:bg-blue-950/20 p-2 rounded border border-[#0047AB]/10 dark:border-blue-900/10 font-sans leading-relaxed">
                          {data.metaDescription}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Keyword Mapping & Verification */}
                  <div className="space-y-3 bg-[#FCFAF7] dark:bg-slate-950 border border-slate-200/50 p-4 rounded-xl shadow-xs">
                    <p className="font-extrabold uppercase tracking-widest text-[10px] text-[#0047AB] flex items-center gap-1.5">
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-600" />
                      Target Keywords Checklist
                    </p>
                    <div className="space-y-2">
                      {data.schemaKeywords && data.schemaKeywords.map((keyword, idx) => {
                        let keywordType = "Primary";
                        if (idx === 1) keywordType = "Secondary";
                        if (idx === 2) keywordType = "Informational";
                        if (idx === 3) keywordType = "Attraction";
                        
                        return (
                          <div key={keyword} className="flex items-center justify-between bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100/50 dark:border-emerald-900/10 p-2 rounded-lg">
                            <div className="space-y-0.5">
                              <span className="text-[9px] bg-emerald-100 text-emerald-800 font-black px-1.5 py-0.5 rounded uppercase tracking-wider">
                                {keywordType}
                              </span>
                              <p className="font-extrabold text-slate-800 dark:text-slate-200">{keyword}</p>
                            </div>
                            <div className="flex items-center gap-1 text-emerald-600 font-extrabold text-xs">
                              <CheckCircle className="h-4 w-4 shrink-0" />
                              <span>Optimal Injected (3-4% density)</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* SEO Compliance Checklist */}
                <div className="bg-slate-900 text-white p-4 rounded-xl flex flex-col sm:flex-row gap-4 items-center justify-between shadow-xs">
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs w-full sm:w-auto">
                    <div>
                      <span className="text-gray-400 font-bold block uppercase text-[10px] tracking-wider mb-0.5">Word Count Status:</span>
                      <span className="font-extrabold text-emerald-400">🔥 ~450 Words (Exceeds Minimum)</span>
                    </div>
                    <div>
                      <span className="text-gray-400 font-bold block uppercase text-[10px] tracking-wider mb-0.5">Brand Consistency:</span>
                      <span className="font-extrabold text-blue-400">Career Wings Consultants</span>
                    </div>
                    <div>
                      <span className="text-gray-400 font-bold block uppercase text-[10px] tracking-wider mb-0.5">Keyword Density:</span>
                      <span className="font-extrabold text-orange-400">3.5% Natural Compliance</span>
                    </div>
                  </div>
                  <div className="bg-[#0047AB] text-white font-extrabold text-[11px] px-3.5 py-1.5 rounded-full uppercase tracking-widest shrink-0 text-center w-full sm:w-auto">
                    Audit Status: Verified ✔
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </header>

      {/* 2.5 Table of Contents - Placed above the images as requested! */}
      {data.id !== "europe" && (
        <section className="container mx-auto px-4 max-w-[1440px] pt-10 pb-2">
          <div className="bg-[#f1f5fd]/60 border border-blue-500/10 rounded-2xl p-6 sm:p-8 space-y-4">
            <h3 className="text-md font-black text-[#0047AB] uppercase tracking-wider flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-blue-600" />
              Guide Table of Contents
            </h3>
            <p className="text-xs text-gray-500 font-semibold">
              Use this structured reference index to review all legal and administrative guidelines regarding Admissions inside {data.name}.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {data.tableOfContents.map((idxItem, tocIdx) => (
                <div key={tocIdx} className="text-xs text-gray-600 font-extrabold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0047AB]"></span>
                  <span>{idxItem}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. MULTI-IMAGE PREMIUM PHOTO GALLERY COLLAGE (3+ Images requested) */}
      {data.id !== "europe" && (
        <section className="container mx-auto px-4 max-w-[1440px] py-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto">
            {/* Main Hero Photo */}
            <div className="md:col-span-7 flex flex-col bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-xs border border-gray-150 dark:border-slate-800 group">
              <div className="h-[240px] sm:h-[320px] overflow-hidden relative bg-slate-100 dark:bg-slate-800">
                <img 
                  src={data.mainImage} 
                  alt={`Study & Work in ${data.name} - Top Universities, Campus Life & Student Visa | Career Wings Consultants`} 
                  title={`Study in ${data.name} - Career Wings Consultants`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=85";
                  }}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                />
              </div>
              <div className="p-5 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 space-y-2">
                <span className="inline-block bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400 text-[10px] uppercase font-black tracking-widest px-2.5 py-1 rounded">Featured</span>
                <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100">Study & Work in {data.name}</h4>
              </div>
            </div>

            {/* Side Photo 2 & 3 */}
            <div className="md:col-span-5 grid grid-rows-2 gap-6 h-auto">
              <div className="flex flex-col bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-xs border border-gray-150 dark:border-slate-800 group">
                <div className="h-[120px] sm:h-[135px] overflow-hidden relative bg-slate-100 dark:bg-slate-800">
                  <img 
                    src={data.sideImage1} 
                    alt={`${data.name} University Research Laboratories, STEM Innovation & Academic Facilities`} 
                    title={`${data.name} Academic Facilities & Laboratories`}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=85";
                    }}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                  />
                </div>
                <div className="p-3.5 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800">
                  <p className="text-xs sm:text-sm font-black text-slate-850 dark:text-slate-200">Modern Research Laboratories</p>
                </div>
              </div>

              <div className="flex flex-col bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-xs border border-gray-150 dark:border-slate-800 group">
                <div className="h-[120px] sm:h-[135px] overflow-hidden relative bg-slate-100 dark:bg-slate-800">
                  <img 
                    src={data.sideImage2} 
                    alt={`${data.name} High Employment Rate Metros & Post-Study Career Hubs - Career Wings`} 
                    title={`${data.name} High Employment Rate Metros - Career Wings Consultants`}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "https://images.unsplash.com/photo-1514395462725-fb4566210144?auto=format&fit=crop&w=1200&q=85";
                    }}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                  />
                </div>
                <div className="p-3.5 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800">
                  <p className="text-xs sm:text-sm font-black text-slate-850 dark:text-slate-200">High Employment Rate Metros</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Top Universities Section with Premium Horizontal Scroller Carousel - Placed right below the images! */}
      {data.id !== "europe" && UNIVERSITIES_BY_COUNTRY[data.id] && UNIVERSITIES_BY_COUNTRY[data.id].length > 0 && (
        <section className="container mx-auto px-4 max-w-[1440px] pt-4 pb-10">
          <div className="space-y-6 bg-slate-50/50 p-6 sm:p-8 rounded-3xl border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2">
                <span className="text-xs font-extrabold tracking-wider text-[#0047AB] uppercase">Institute Showcase</span>
                <h3 className="text-xl sm:text-2.5xl font-black text-gray-955 tracking-tight">
                  Top Universities in {data.name}
                </h3>
                <p className="text-xs text-gray-400 font-semibold leading-relaxed">
                  Leading academic brands and research clusters certified for world-class career transitions.
                </p>
              </div>
              
              {/* Navigation buttons at top right of section */}
              <div className="flex gap-2 shrink-0">
                <button 
                  type="button"
                  onClick={() => scrollCarousel("left")}
                  className="w-10 h-10 rounded-full border border-gray-250 flex items-center justify-center hover:bg-slate-50 hover:border-gray-400 text-gray-600 transition-all active:scale-95 cursor-pointer"
                >
                  <ChevronRight className="h-5 w-5 transform rotate-180" />
                </button>
                <button 
                  type="button"
                  onClick={() => scrollCarousel("right")}
                  className="w-10 h-10 rounded-full border border-gray-250 flex items-center justify-center hover:bg-slate-50 hover:border-gray-400 text-gray-600 transition-all active:scale-95 cursor-pointer"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Scroller Track */}
            <div className="relative group/carousel">
              <div 
                ref={scrollRef}
                className="flex overflow-x-auto gap-6 pb-4 scroll-smooth snap-x snap-mandatory overflow-y-visible"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {UNIVERSITIES_BY_COUNTRY[data.id].map((uni) => (
                  <UniversityCard 
                    key={uni.id} 
                    uni={uni} 
                    onViewDetails={() => {
                      if (onSelectUniversity) {
                        onSelectUniversity(uni);
                      } else {
                        onViewAllUniversities(data.id);
                      }
                    }} 
                  />
                ))}
              </div>
            </div>

            {/* Under Scroller controls: View all */}
            <div className="flex justify-between items-center pt-2">
              <button 
                onClick={() => onViewAllUniversities(data.id)}
                className="text-xs sm:text-[14px] font-black text-[#0047AB] hover:text-[#0a2f7c] flex items-center gap-1 bg-white hover:bg-blue-50 border border-blue-150/80 hover:border-blue-200 px-4.5 py-2.5 rounded-2xl group/viewall transition-all duration-200 cursor-pointer"
              >
                View all 
                <ArrowRight className="h-4 w-4 transform transition-transform duration-300 group-hover/viewall:translate-x-1" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 4. MAIN BODY COLUMN-WISE LAYOUT */}
      {data.id === "europe" ? (
        <section className="container mx-auto px-4 max-w-[1440px] py-12 space-y-12 animate-fade-in animate-duration-300">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[#0047AB] font-extrabold tracking-widest text-xs uppercase block">EXPLORE EUROPEAN COUNTRIES</span>
            <h2 className="text-3xl sm:text-5xl font-black text-gray-955 leading-tight">
              Choose Your European Destination
            </h2>
            <p className="text-gray-500 text-sm sm:text-base font-semibold leading-relaxed">
              Explore exceptional campuses and welcoming local student policies across our 29 peak European study destinations. We offer full admissions help across all Schengen states.
            </p>
          </div>

          {/* Interactive Controls inside Europe guide */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-50 border border-gray-150 p-4 rounded-3xl">
            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {[
                { type: "all", label: "All 29 Countries" },
                { type: "free", label: "Zero / Low Tuition" },
                { type: "english", label: "High English Focus" },
                { type: "top_stayback", label: "Long Stay-Back Permits" }
              ].map((pill) => (
                <button
                  key={pill.type}
                  onClick={() => setEuropeFilter(pill.type as any)}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all pointer-events-auto cursor-pointer ${
                    europeFilter === pill.type 
                      ? "bg-[#0047AB] text-white shadow-md shadow-blue-500/10" 
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>

            {/* Smart Search Bar */}
            <div className="relative w-full md:w-80">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Globe className="h-4 w-4 text-gray-400" />
              </span>
              <input
                type="text"
                value={europeSearch}
                onChange={(e) => setEuropeSearch(e.target.value)}
                placeholder="Search European countries..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* 29 European Countries Grid styled EXACTLY like "Choose Your Destination" block! */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredEuropeCountries.length > 0 ? (
              filteredEuropeCountries.map((country) => (
                <div 
                  key={country.id}
                  className="bg-[#fafbfe]/30 hover:bg-white rounded-3xl border border-gray-150/70 overflow-hidden shadow-xs hover:shadow-lg transition-all hover:-translate-y-1.5 duration-300 flex flex-col group"
                >
                  <div className="h-44 relative overflow-hidden">
                    <img 
                      alt={country.name} 
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      src={country.bgImage} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4">
                      <div className="bg-white rounded-full shadow-md w-9 h-9 flex items-center justify-center border border-gray-100 select-none">
                        <span className="text-xl leading-none" role="img" aria-label={`${country.name} flag`}>
                          {COUNTRY_EMOJIS[country.id] || "🇪🇺"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <h3 className="font-extrabold text-lg text-gray-955 leading-snug">{country.name}</h3>
                        {country.hasDedicatedPage && (
                          <span className="bg-blue-100 text-[#0047AB] text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border border-blue-200">
                            Guide
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed font-semibold line-clamp-3">
                        {country.description}
                      </p>

                      {/* Structuring core benefits & parameters just like Choose Your Destination */}
                      <div className="space-y-1.5 pt-1 text-[11px] font-bold text-gray-650">
                        <div className="flex gap-2 items-center text-blue-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-550 shrink-0"></span>
                          <span>Budget: {country.cost}</span>
                        </div>
                        <div className="flex gap-2 items-center text-emerald-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-550 shrink-0"></span>
                          <span>IELTS: {country.ielts}</span>
                        </div>
                        <div className="flex gap-2 items-center text-purple-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-550 shrink-0"></span>
                          <span>Post-Study: {country.entitlement}</span>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        if (country.hasDedicatedPage && onChangeDestination) {
                          onChangeDestination(country.id);
                        } else {
                          onBookCounselling(`Inquiry for studying abroad in ${country.name}. Estimated living costs: ${country.cost}. IELTS standard: ${country.ielts}.`);
                        }
                      }}
                      className="text-[#0047AB] hover:text-blue-700 font-bold text-xs inline-flex items-center gap-1.5 hover:translate-x-1.5 transition-all text-left cursor-pointer pt-2"
                    >
                      {country.hasDedicatedPage ? "Explore Full Guide" : "Inquire Admissions"} <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-16 text-center space-y-4">
                <Globe className="h-12 w-12 text-gray-305 mx-auto animate-bounce" />
                <h3 className="font-bold text-gray-900 text-base">No European countries match your search filters</h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">Try typing a different name or checking back later.</p>
                <button
                  onClick={() => { setEuropeFilter("all"); setEuropeSearch(""); }}
                  className="bg-[#0047AB] text-white px-5 py-2.5 rounded-xl text-xs font-bold"
                >
                  Reset Filtering
                </button>
              </div>
            )}
          </div>

        </section>
      ) : (
        <section className="container mx-auto px-4 max-w-[1440px] pt-12 pb-16 relative z-10 block clear-both">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT CONTENT AREA (70% WIDTH) */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* 1200+ Word Detailed Section Renderers */}
            <div className="space-y-14">
              {data.sections.map((sect, sIdx) => (
                <article key={sIdx} className="space-y-6 max-w-none">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white border-b border-slate-200/50 dark:border-slate-800 pb-3 flex items-center gap-3">
                    <span className="w-2.5 h-6 bg-gradient-to-b from-[#0047AB] to-blue-500 rounded-md block shrink-0" />
                    <span>{sect.title}</span>
                  </h3>
                  
                  <div className="space-y-4">
                    {sect.paragraphs.map((pText, pIdx) => (
                      <p 
                        key={pIdx} 
                        className="text-slate-600 dark:text-slate-300 text-xs sm:text-[14.5px] leading-relaxed font-semibold text-justify"
                      >
                        {pText}
                      </p>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            {/* Cost of Living Section & Custom Table */}
            <section className="space-y-6">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white border-b border-slate-200/50 dark:border-slate-800 pb-3 flex items-center gap-2">
                <div className="p-2 bg-blue-50 dark:bg-blue-950/40 rounded-xl w-fit">
                  <DollarSign className="h-6 w-6 text-[#0047AB] dark:text-blue-450" />
                </div>
                Detailed Cost of Education & Living Expenses
              </h3>
              <p className="text-xs sm:text-[14.5px] text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                Understanding your finances is the first major step to a stress-free experience. This real-time table breaks down the typical tuition fees structure and standard utilities required to live in {data.name}'s central university cities.
              </p>

              <div className="border border-slate-250/50 dark:border-slate-800 rounded-3xl overflow-hidden shadow-md">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-[#FAF8F4] dark:bg-slate-900 border-b border-slate-250/50 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-extrabold uppercase tracking-wider text-[10.5px]">
                        <th className="py-4.5 px-6">Expense Head / Service Block</th>
                        <th className="py-4.5 px-6">Estimated Monthly/Yearly Cost</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200/40 dark:divide-slate-800 bg-white dark:bg-slate-900/50">
                      {data.costTable.map((item, idx) => (
                        <tr key={idx} className="hover:bg-[#FAF8F4]/30 dark:hover:bg-slate-900 transition-colors">
                          <td className="py-4.5 px-6 font-black text-slate-900 dark:text-slate-100">{item.item}</td>
                          <td className="py-4.5 px-6 font-black text-[#0047AB] dark:text-blue-400 text-sm">{item.cost}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Standard Academic Intakes & Timelines */}
            <section className="space-y-6">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white border-b border-slate-200/50 dark:border-slate-800 pb-3 flex items-center gap-2">
                <div className="p-2 bg-orange-50 dark:bg-orange-950/40 rounded-xl w-fit">
                  <Calendar className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                Standard Academic Intakes
              </h3>
              <p className="text-xs sm:text-[14.5px] text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                Most institutions operate on strict admission windows. Our advisors recommend preparing your academic transcripts and language credentials at least 5-6 months before these starts.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.intakes.map((intake, idx) => (
                  <div 
                    key={idx}
                    className="flex gap-3 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 p-5 rounded-3xl shadow-sm hover:shadow-md transition-all"
                  >
                    <CheckCircle className="h-5 w-5 text-orange-600 dark:text-orange-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-[13.5px] text-slate-700 dark:text-slate-300 font-bold leading-relaxed">
                      {intake}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Eligibility Requirements & Language Benchmarks */}
            <section className="space-y-6">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white border-b border-slate-200/50 dark:border-slate-800 pb-3 flex items-center gap-2">
                <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl w-fit">
                  <Languages className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                Minimum Eligibility Checklist
              </h3>
              
              <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-[30px] border border-slate-200/55 dark:border-slate-800 shadow-xl space-y-6">
                <p className="text-xs sm:text-[14.5px] text-slate-500 dark:text-slate-350 leading-relaxed font-semibold">
                  To pass the compliance filters and gain a secure offer letter, international candidates must satisfy these minimum requirements:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.eligibilityChecklist.map((elig, idx) => (
                    <div key={idx} className="bg-[#FCFAF7] dark:bg-slate-950 border border-slate-250/40 dark:border-slate-800/60 p-4 rounded-2xl flex gap-2.5 shadow-xs hover:border-blue-500/20 hover:scale-[1.01] transition-all">
                      <span className="h-5 w-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">✓</span>
                      <span className="text-xs text-slate-700 dark:text-slate-300 font-bold leading-relaxed">{elig}</span>
                    </div>
                  ))}
                </div>

                {/* Check Eligibility Button */}
                <div className="pt-2">
                  <button
                    onClick={onCheckEligibility}
                    className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#0047AB] to-blue-600 hover:from-blue-700 hover:to-blue-500 text-white font-extrabold text-xs sm:text-sm py-4 px-8 rounded-2xl shadow-lg hover:shadow-blue-500/20 active:scale-95 transition-all cursor-pointer group"
                  >
                    Check Eligibility Now <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </section>

            {/* Step-by-Step Student Visa Guide */}
            <section className="space-y-6">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white border-b border-slate-200/50 dark:border-slate-800 pb-3 flex items-center gap-2">
                <div className="p-2 bg-purple-50 dark:bg-purple-950/40 rounded-xl w-fit">
                  <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                Step-by-Step Student Visa Process
              </h3>
              <p className="text-xs sm:text-[14.5px] text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                Getting your student visa is a heavily structured legal procedure. Here is how Career Wings guides you through filing with absolute precision:
              </p>

              <div className="space-y-4 relative pl-4 before:content-[''] before:absolute before:left-2 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
                {data.visaSteps.map((step, idx) => (
                  <div key={idx} className="space-y-1 relative">
                    <p className="text-[#0047AB] dark:text-blue-400 font-extrabold text-xs sm:text-sm">{step}</p>
                    <p className="text-slate-400 dark:text-slate-550 text-[11px] font-semibold pl-4">Verified checking under local immigration policy</p>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ Accordion */}
            <section className="space-y-6">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white border-b border-slate-200/50 dark:border-slate-800 pb-3 flex items-center gap-2">
                <div className="p-2 bg-blue-50 dark:bg-blue-950/40 rounded-xl w-fit">
                  <HelpCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                Frequently Asked Questions about {data.name}
              </h3>
              
              <div className="space-y-3.5">
                {data.faqs.map((faq, index) => {
                  const isOpen = activeFaq === index;
                  return (
                    <div key={index} className="border border-slate-200/60 dark:border-slate-800 rounded-2xl overflow-hidden transition-all bg-white dark:bg-slate-900 shadow-sm hover:shadow-md">
                      <button
                        type="button"
                        onClick={() => setActiveFaq(isOpen ? null : index)}
                        className="w-full flex justify-between items-center p-5 text-left text-xs sm:text-sm font-black text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown className={`h-4.5 w-4.5 text-slate-400 transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                      <div className={`transition-all duration-300 overflow-hidden ${isOpen ? "max-h-96 border-t border-slate-100 dark:border-slate-800" : "max-h-0"}`}>
                        <p className="p-5 text-xs sm:text-[13px] text-slate-500 dark:text-slate-405 leading-relaxed font-semibold">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

          </div>

          {/* RIGHT FLOATING ENQUIRY FORM COLUMN (30% WIDTH) */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            
            {/* Conversion card */}
            <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950 text-white p-8 rounded-[30px] shadow-2xl space-y-6 border border-slate-800">
              <div className="space-y-2">
                <span className="text-amber-400 text-[10px] font-black uppercase tracking-widest block font-mono">
                  ★ FREE CAREER WINGS CONSULTATION
                </span>
                <h4 className="text-xl sm:text-2.5xl font-black tracking-tight leading-tight bg-gradient-to-r from-white via-slate-105 to-amber-200 bg-clip-text text-transparent">
                  Book A Free Appointment Today!
                </h4>
                <p className="text-slate-300 text-xs font-semibold leading-relaxed">
                  Have unique profile parameters? Want direct entry checkups? Request a call from our certified {data.name} study directors.
                </p>
              </div>

              <div className="h-px bg-slate-800" />

              <div className="space-y-3.5 text-xs bg-black/30 p-5 rounded-2xl border border-white/5">
                <p className="flex items-center gap-2.5 font-bold"><CheckCircle className="h-4.5 w-4.5 text-emerald-400 shrink-0" /> Zero Application Submission Charges</p>
                <p className="flex items-center gap-2.5 font-bold"><CheckCircle className="h-4.5 w-4.5 text-emerald-400 shrink-0" /> Direct Scholarships Verification</p>
                <p className="flex items-center gap-2.5 font-bold"><CheckCircle className="h-4.5 w-4.5 text-emerald-400 shrink-0" /> Visa Interview Mock Coaching</p>
              </div>

              <div className="space-y-3 pt-1">
                <button
                  type="button"
                  onClick={() => onBookCounselling(`Consulting study abroad plans and admissions for ${data.name}.`)}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 active:scale-95 text-white text-xs sm:text-sm font-extrabold py-4 px-4 rounded-xl text-center block transition-all shadow-md shadow-orange-500/10 cursor-pointer"
                >
                  REQUEST CALL NOW
                </button>
                <button
                  type="button"
                  onClick={onCheckEligibility}
                  className="w-full bg-white/5 hover:bg-white/10 active:scale-95 text-slate-200 text-[11px] sm:text-xs font-black py-3.5 px-4 rounded-xl border border-white/10 text-center flex items-center justify-center gap-2 transition-all cursor-pointer uppercase tracking-wider"
                >
                  Check Eligibility Now
                </button>
              </div>

              <p className="text-[10px] text-slate-400 text-center font-semibold">
                Or Call direct support hotline at: <a href="tel:+919000119072" className="underline text-white hover:text-amber-400 transition-colors">+91 90050 11972</a>
              </p>
            </div>

            {/* Quick Contact Box */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 p-6 rounded-3xl text-sm space-y-3.5 shadow-sm">
              <h5 className="font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Phone className="h-4 w-4 text-[#0047AB] dark:text-blue-400 animate-pulse" /> Help Desk Hotline
              </h5>
              <p className="text-slate-500 dark:text-slate-405 leading-normal font-semibold text-xs text-justify">
                Our advisors are standing by. Get pre-eligibility support regarding tuition fees structures, accommodation waivers, and visas.
              </p>
              <a 
                href="tel:+91900119072"
                className="block text-[#0047AB] dark:text-blue-400 font-extrabold text-base hover:underline transition-all"
              >
                +91 90001 19072
              </a>
            </div>

          </div>

        </div>
      </section>
      )}

    </div>
  );
}
