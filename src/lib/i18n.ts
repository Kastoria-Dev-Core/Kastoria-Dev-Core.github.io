export type Lang = "el" | "en";

/** The page's text. Kept plain and specific: what we made, for whom, and where to find it. */
export const t = {
  el: {
    htmlLang: "el",
    title: "Kastoria Dev Core",
    description: "Φοιτητές Πληροφορικής στην Καστοριά. Φτιάχνουμε ανοιχτό λογισμικό για την πόλη, όπως την εφαρμογή των αστικών λεωφορείων.",
    nav: { work: "Έργα", log: "Πρόσφατα", team: "Ομάδα", join: "Συμμετοχή", other: "English", otherHref: "/en/" },
    intro: "Είμαστε φοιτητές του Τμήματος Πληροφορικής στην Καστοριά.",
    introMore: "Γράφουμε λογισμικό που χρησιμοποιεί η πόλη. Το πρώτο μας έργο είναι η εφαρμογή του Αστικού ΚΤΕΛ, για Android και iPhone.",
    mapCaption: (lines: number, stops: number) => `Το δίκτυο των αστικών λεωφορείων: ${lines} γραμμές, ${stops} στάσεις. Ζωγραφισμένο από τα δεδομένα της εφαρμογής μας.`,
    work: "Έργα",
    workLead: "Όλα ανοιχτού κώδικα. Ο κώδικας, τα docs και οι εκδόσεις τους είναι στο GitHub.",
    buses: {
      name: "Αστικά Καστοριάς",
      text: "Η εφαρμογή του Αστικού ΚΤΕΛ για Android και iPhone: δρομολόγια, στάσεις και ζωντανές ώρες για κάθε γραμμή της πόλης. Ξέρει τις αργίες και το Πάσχα, δουλεύει χωρίς σύνδεση, σε ελληνικά και αγγλικά.",
      announcements: "Ανακοινώσεις",
      announcementsNote: "cron job που φέρνει τις ανακοινώσεις του ΚΤΕΛ",
    },
    projects: {
      unicalendar: { name: "UniCalendar", text: "Ημερολόγιο για Android που φέρνει μόνο του τα μαθήματα και τις εξεταστικές του πανεπιστημίου." },
    },
    log: "Πρόσφατα",
    logLead: (n: number) => `Τα τελευταία pull requests που μπήκαν. ${n} συνολικά μέχρι σήμερα.`,
    team: "Ομάδα",
    teamLead: "Τρεις φοιτητές του Τμήματος Πληροφορικής του Πανεπιστημίου Δυτικής Μακεδονίας.",
    join: "Συμμετοχή",
    joinText: "Η ομάδα είναι ανοιχτή σε φοιτητές κάθε τμήματος και έτους, και δεν χρειάζεται εμπειρία. Διάλεξε ένα ανοιχτό issue, ή άνοιξε ένα με τη δική σου ιδέα.",
    joinLink: "Πώς να συνεισφέρεις",
    reposLink: "Όλα τα repositories",
    footer: "Κάθε έργο έχει τη δική του άδεια, γραμμένη στο repository του.",
    updated: "Ενημερώθηκε",
    dateLocale: "el-GR",
  },
  en: {
    htmlLang: "en",
    title: "Kastoria Dev Core",
    description: "Informatics students in Kastoria, Greece. We build open source software for the town, like its city bus app.",
    nav: { work: "Work", log: "Recently", team: "Team", join: "Join", other: "Ελληνικά", otherHref: "/" },
    intro: "We're Informatics students in Kastoria, Greece.",
    introMore: "We write software the town uses. Our first project is the app of its city buses, for Android and iPhone.",
    mapCaption: (lines: number, stops: number) => `The city bus network: ${lines} lines, ${stops} stops. Drawn from our app's data.`,
    work: "Work",
    workLead: "All open source. Their code, docs and releases are on GitHub.",
    buses: {
      name: "Kastoria City Buses",
      text: "The app of the city's buses, for Android and iPhone: timetables, stops and live times for every line in town. Knows the holidays and Easter, works offline, in Greek and English.",
      announcements: "Notices",
      announcementsNote: "cron job that brings in the operator's notices",
    },
    projects: {
      unicalendar: { name: "UniCalendar", text: "An Android calendar that brings in the university's lectures and exam timetables on its own." },
    },
    log: "Recently",
    logLead: (n: number) => `The latest pull requests merged. ${n} so far.`,
    team: "Team",
    teamLead: "Three students of the Department of Informatics, University of Western Macedonia.",
    join: "Join",
    joinText: "The team is open to students of any department or year, no experience needed. Pick an open issue, or open one with your own idea.",
    joinLink: "How to contribute",
    reposLink: "All repositories",
    footer: "Each project has its own license, stated in its repository.",
    updated: "Updated",
    dateLocale: "en-GB",
  },
} as const;

export type Strings = (typeof t)[Lang];
