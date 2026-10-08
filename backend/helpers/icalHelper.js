import fetch from "node-fetch";
import ical from "node-ical";

/* =========================================================
   SOURCE PRIORITY
========================================================= */

const SOURCE_PRIORITY = {
  OwnerRez: 1,
  Booking: 2,
  Hospitable: 2,
  Airbnb: 3,
  VRBO: 4,
  ECBYO: 5,
};

const getPriority = (source) => {
  return SOURCE_PRIORITY[source] ?? 99;
};

/* =========================================================
   DATE HELPERS
========================================================= */

const normalizeDate = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

const formatDate = (date) => {
  const d = normalizeDate(date);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

/* =========================================================
   GUEST HELPERS
========================================================= */

const cleanGuestName = (summary = "") => {
  return summary
    .replace(/\(.*?\)/g, "")
    .replace(/Blocked\s*-\s*/gi, "")
    .replace(/Reserved\s*-\s*/gi, "")
    .replace(/Smartbnb/gi, "")
    .replace(/Airbnb/gi, "")
    .replace(/VRBO/gi, "")
    .replace(/\s+/g, " ")
    .trim();
};

const getReservationId = (summary = "") => {
  const match = summary.match(/(HM[A-Z0-9]+|HA-[A-Z0-9]+|BR-[A-Z0-9]+)/i);

  return match ? match[0] : null;
};

/* =========================================================
   OVERLAP CHECK
========================================================= */

const datesOverlap = (a, b) => {
  const aStart = new Date(a.checkIn);
  const aEnd = new Date(a.checkOut);

  const bStart = new Date(b.checkIn);
  const bEnd = new Date(b.checkOut);

  return aStart < bEnd && bStart < aEnd;
};

/* =========================================================
   FETCH + MERGE ICAL EVENTS
========================================================= */

export const syncListingCalendars = async (listing) => {
  const events = [];

  const sources = (listing.icalSources || []).filter(
    (s) => s.enabled !== false && s.url,
  );

   

 for (const source of sources) {
  try {
    console.log("=================================");
    console.log("ICAL SOURCE:", source.name);
    console.log("ICAL URL:", source.url);

    const response = await fetch(source.url.trim(), {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/138.0.0.0 Safari/537.36",
        Accept: "text/calendar,text/plain,*/*",
      },
    });

    console.log("ICAL STATUS:", response.status);
    console.log("ICAL CONTENT TYPE:", response.headers.get("content-type"));

    const text = await response.text();

    console.log("ICAL RESPONSE LENGTH:", text.length);
    console.log("ICAL RESPONSE START:", text.substring(0, 300));

    if (!response.ok) {
      throw new Error(
        `iCal fetch failed: ${response.status} ${response.statusText}`
      );
    }

    const parsed = ical.parseICS(text);

    console.log(
      "ICAL PARSED EVENTS:",
      Object.values(parsed).filter(
        (event) => event.type === "VEVENT"
      ).length
    );

    Object.values(parsed).forEach((event) => {
      if (event.type !== "VEVENT") return;
      if (!event.start || !event.end) return;

      console.log("EVENT:", {
        summary: event.summary,
        start: event.start,
        end: event.end,
      });

      events.push({
        source: source.name,
        summary: event.summary || "",
        guest: cleanGuestName(event.summary),
        reservationId: getReservationId(event.summary),
        start: event.start,
        end: event.end,
        checkIn: formatDate(event.start),
        checkOut: formatDate(event.end),
      });
    });
  } catch (err) {
    console.log(
      `ICAL ERROR (${source.name}):`,
      err.message
    );
  }
}

 

  /* =====================================================
     REMOVE DUPLICATES
  ===================================================== */

  const seen = new Map();

for (const event of events) {
  let key;

  if (event.reservationId) {
    key = `RID:${event.reservationId}`;
  } else {
    key = [
      event.source,
      event.guest,
      event.checkIn,
      event.checkOut,
    ]
      .join("|")
      .toLowerCase();
  }

  if (!seen.has(key)) {
    seen.set(key, event);
  }
}

return [...seen.values()];

  const uniqueEvents = [...seen.values()];
 
 
  return uniqueEvents;
};

export const buildCalendarEntries = (events = []) => {
  const occupied = new Map();

  // ==========================================
  // DATE HELPER
  // ==========================================

  const addDays = (dateString, days) => {
    const [y, m, d] = dateString.split("-").map(Number);

    const dt = new Date(Date.UTC(y, m - 1, d));

    dt.setUTCDate(dt.getUTCDate() + days);

    return dt.toISOString().slice(0, 10);
  };

  // ==========================================
  // CREATE DATE OBJECT
  // ==========================================

  const createDate = (dateString) => {
    const [y, m, d] = dateString.split("-").map(Number);

    return new Date(
      Date.UTC(y, m - 1, d, 12, 0, 0)
    );
  };

  // ==========================================
  // EMPTY DATE OBJECT
  // ==========================================

  const createEmptyDate = () => ({
    occupied: false,
    bookings: [],
    checkIn: [],
    checkOut: [],
  });

  // ==========================================
  // STEP 1
  // BUILD OCCUPANCY MAP
  // ==========================================

  for (const event of events) {
    const checkIn = event.checkIn;
    const checkOut = event.checkOut;

    if (!checkIn || !checkOut) {
      continue;
    }

    // ------------------------------------------
    // OCCUPIED NIGHTS
    // ------------------------------------------

    let current = checkIn;

    while (current < checkOut) {
      if (!occupied.has(current)) {
        occupied.set(current, createEmptyDate());
      }

      const info = occupied.get(current);

      info.occupied = true;

      // IMPORTANT:
      // Keep EVERY booking/source
      info.bookings.push(event);

      current = addDays(current, 1);
    }

    // ------------------------------------------
    // CHECK-IN
    // ------------------------------------------

    if (!occupied.has(checkIn)) {
      occupied.set(checkIn, createEmptyDate());
    }

    occupied.get(checkIn).checkIn.push(event);

    // ------------------------------------------
    // CHECK-OUT
    // ------------------------------------------

    if (!occupied.has(checkOut)) {
      occupied.set(checkOut, createEmptyDate());
    }

    occupied.get(checkOut).checkOut.push(event);
  }

  // ==========================================
  // STEP 2
  // BUILD CALENDAR
  // ==========================================

  const dates = [...occupied.keys()].sort();

  const calendar = [];

  for (const date of dates) {
    const info = occupied.get(date);

    const hasCheckIn = info.checkIn.length > 0;
    const hasCheckOut = info.checkOut.length > 0;

    const currentDate = createDate(date);

    // ========================================
    // TURNOVER
    // ========================================

    if (hasCheckIn && hasCheckOut) {
      // --------------------------------------
      // ALL CHECK-OUT EVENTS
      // --------------------------------------

      for (const event of info.checkOut) {
        calendar.push({
          date: currentDate,
          status: "COUT",
          source: "ical",

          guest: event?.guest || "",

          summary: event?.summary || "",

          reservationId:
            event?.reservationId || "",

          sourceName:
            event?.source || "",
        });
      }

      // --------------------------------------
      // ALL CHECK-IN EVENTS
      // --------------------------------------

      for (const event of info.checkIn) {
        calendar.push({
          date: currentDate,
          status: "CIN",
          source: "ical",

          guest: event?.guest || "",

          summary: event?.summary || "",

          reservationId:
            event?.reservationId || "",

          sourceName:
            event?.source || "",
        });
      }

      continue;
    }

    // ========================================
    // CHECK-IN
    // ========================================

    if (hasCheckIn) {
      for (const event of info.checkIn) {
        calendar.push({
          date: currentDate,
          status: "CIN",
          source: "ical",

          guest: event?.guest || "",

          summary: event?.summary || "",

          reservationId:
            event?.reservationId || "",

          sourceName:
            event?.source || "",
        });
      }

      continue;
    }

    // ========================================
    // CHECK-OUT
    // ========================================

    if (hasCheckOut) {
      for (const event of info.checkOut) {
        calendar.push({
          date: currentDate,
          status: "COUT",
          source: "ical",

          guest: event?.guest || "",

          summary: event?.summary || "",

          reservationId:
            event?.reservationId || "",

          sourceName:
            event?.source || "",
        });
      }

      continue;
    }

    // ========================================
    // RESERVED
    // ========================================

    if (info.occupied) {
      // IMPORTANT:
      // Don't use bookings[0].
      // Save EVERY booking separately.

      for (const event of info.bookings) {
        calendar.push({
          date: currentDate,
          status: "R",
          source: "ical",

          guest: event?.guest || "",

          summary: event?.summary || "",

          reservationId:
            event?.reservationId || "",

          sourceName:
            event?.source || "",
        });
      }
    }
  }

  // ==========================================
  // STEP 3
  // DO NOT REMOVE SAME DATE/STATUS EVENTS
  // ==========================================

  // IMPORTANT:
  //
  // DON'T DO:
  //
  // date-status dedupe
  //
  // Because:
  //
  // Oct 10 - R - VRBO
  // Oct 10 - R - Airbnb
  // Oct 10 - R - Florida Rentals
  //
  // are 3 different records.
  //
  // We want to keep all 3.

  // ==========================================
  // STEP 4
  // SORT
  // ==========================================

  return calendar.sort((a, b) => {
    const dateDifference =
      new Date(a.date).getTime() -
      new Date(b.date).getTime();

    if (dateDifference !== 0) {
      return dateDifference;
    }

    // Keep a stable order for same-date entries
    const statusOrder = {
      COUT: 1,
      CIN: 2,
      R: 3,
      H: 4,
      A: 5,
    };

    return (
      (statusOrder[a.status] || 99) -
      (statusOrder[b.status] || 99)
    );
  });
};