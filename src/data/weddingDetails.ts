/**
 * Single source of truth for every wedding detail shown on the site.
 * Edit text here and it updates everywhere.
 */

export interface Person {
  fullName: string;
  shortName: string;
}

export interface EventMoment {
  /** Day of week exactly as printed on the invitation. */
  dayLabel: string;
  /** Date exactly as printed on the invitation. */
  dateLabel: string;
  /** Time exactly as printed on the invitation. */
  timeLabel: string;
}

export interface WeddingDetails {
  groom: Person;
  bride: Person;
  monogram: { first: string; second: string };
  heroTagline: string;
  openPrompt: string;
  invitationLine: string;
  muhurtham: EventMoment & {
    /**
     * Exact moment the countdown targets, in Indian Standard Time (UTC+05:30).
     * Keep it in sync with the labels above.
     */
    isoDateTime: string;
    /**
     * The supplied wording also mentioned "Early hours of Thursday".
     * The family confirmed Wednesday, 02 December 2026, 04:45 AM.
     * Add a short note here (it appears under the muhurtham time) if that ever changes.
     */
    note: string;
  };
  venue: { name: string; address: string };
  dinner: EventMoment & { venueName: string };
  sender: { name: string; nickname: string; place: string; phone: string };
  bestCompliments: { name: string; phone: string };
  closingMessage: string;
  music: { src: string; title: string };
}

export const weddingDetails: WeddingDetails = {
  groom: { fullName: "Arun Sai Durga Reddy", shortName: "Arun" },
  bride: { fullName: "Grashma Aniswa", shortName: "Grashma" },
  monogram: { first: "A", second: "G" },
  heroTagline: "A New Chapter Begins",
  openPrompt: "Open Your Invitation",
  invitationLine: "Together with our families, we invite you to celebrate our wedding.",
  muhurtham: {
    dayLabel: "Wednesday",
    dateLabel: "02 December 2026",
    timeLabel: "04:45 AM",
    isoDateTime: "2026-12-02T04:45:00+05:30",
    note: "",
  },
  venue: {
    name: "Sridevi Function Hall A/c",
    address: "Ramavaram Road, Polamuru",
  },
  dinner: {
    dayLabel: "Wednesday",
    dateLabel: "02 December 2026",
    timeLabel: "6:00 PM onwards",
    venueName: "Sridevi Function Hall A/c",
  },
  sender: {
    name: "K. Arun Sai Durga Reddy",
    nickname: "Chinnu",
    place: "ANAPARTHI",
    phone: "8519892036",
  },
  bestCompliments: { name: "Kumari Flex", phone: "8500235279" },
  closingMessage: "With love and blessings, we look forward to celebrating with you.",
  music: {
    // Replace this file with your own song (keep the same name, or change the path here).
    src: "/audio/new wedding.mp3",
    title: "Wedding melody",
  },
};

/** Section anchors shared by navigation and page sections. */
export const SECTION_IDS = {
  home: "home",
  countdown: "countdown",
  details: "details",
  timeline: "celebrations",
  venue: "venue",
  dinner: "dinner",
  gallery: "gallery",
  contact: "contact",
} as const;
