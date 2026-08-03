import cron from "node-cron";
import Listing from "../models/Listing.js";

import {
  syncListingCalendars,
  buildCalendarEntries,
} from "../helpers/icalHelper.js";

 
 const startCalendarCron = () => {
  cron.schedule("0 * * * *", async () => {

    const start = Date.now();
 

    try {
      const listings = await Listing.find({
        "icalSources.url": { $exists: true, $ne: "" },
      });

      console.log(`Found ${listings.length} listings`);

      for (const listing of listings) {
        try {
          const events = await syncListingCalendars(listing);

          // your existing logs...

          const mergedCalendar = buildCalendarEntries(events);

          listing.calendar = listing.calendar.filter(
            (item) => item.source !== "ical"
          );

          listing.calendar.push(...mergedCalendar);

          await listing.save();

          console.log(`✅ ${listing.property.title} synced`);
        } catch (err) {
          console.error(`❌ ${listing.property.title}`, err.message);
        }
      }

     

    } catch (err) {
      console.error(err);
    }
  });
};
export default startCalendarCron;