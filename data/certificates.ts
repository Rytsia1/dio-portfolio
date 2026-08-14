import type { Certificate } from "@/types/portfolio";

/**
 * Verified certificates from the CV.
 *
 * No credential URLs are populated — only add one when the real URL
 * exists. The brief is explicit: do not fabricate credentials.
 */
export const certificates: Certificate[] = [
  {
    id: "udemy-gaming-careers",
    title: "All About Gaming Industry Careers & Game Design Fundamentals",
    provider: "Udemy",
    category: "Game Design",
    // TODO: Replace with the actual completion year / month.
    date: "TODO: Year",
  },
  {
    id: "sololearn-cpp",
    title: "Introduction to C++",
    provider: "Sololearn",
    category: "Programming",
    // TODO: Replace with the actual completion year / month.
    date: "TODO: Year",
  },
  {
    id: "dqlab-python-data-science",
    title: "Python Fundamental for Data Science",
    provider: "DQLab",
    category: "Data",
    // TODO: Replace with the actual completion year / month.
    date: "TODO: Year",
  },
];
