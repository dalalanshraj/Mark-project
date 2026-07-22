import MonthCalendar from "./MonthCalendar";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function YearCalendar({
  year,
  calendarMap,
}) {
  // ==========================================
  // MONTHS
  // ==========================================

  const months = Array.from(
    { length: 12 },
    (_, monthIndex) => {
      return {
        id: monthIndex,
        month: monthIndex,
        year,
        name: monthNames[monthIndex],
      };
    }
  );

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="w-full">

      {/* Title */}

      <div className="mb-8 flex items-center justify-between">

        <h2 className="text-2xl font-bold text-gray-900">
          {year} Availability Calendar
        </h2>

        <div className="text-sm text-gray-500">
          {months.length} Months
        </div>

      </div>

      {/* Calendar Grid */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-6
        "
      >
        {months.map((month) => (
          <MonthCalendar
            key={month.id}
            month={month.month}
            year={month.year}
            monthName={month.name}
            calendarMap={calendarMap}
          />
        ))}
      </div>

    </div>
  );
}