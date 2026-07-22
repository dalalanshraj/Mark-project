import { useMemo } from "react";
import { useEffect } from "react";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function MonthCalendar({ month, year, monthName, calendarMap }) {
  // ==========================================
  // DAYS
  // ==========================================

  const daysInMonth = useMemo(() => {
    return new Date(year, month + 1, 0).getDate();
  }, [month, year]);

  const firstDay = useMemo(() => {
    return new Date(year, month, 1).getDay();
  }, [month, year]);

  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (date) => {
    return [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0"),
    ].join("-");
  };

  // ==========================================
  // BUILD MONTH
  // ==========================================

  const calendarDays = useMemo(() => {
    const arr = [];

    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) {
      arr.push({
        empty: true,
      });
    }

    // Month days
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);

      const key = formatDate(date);

      arr.push({
        empty: false,
        key,
        day: d,
        date,
        events: calendarMap[key] || [],
      });
    }

    return arr;
  }, [month, year, firstDay, daysInMonth, calendarMap]);

  // ==========================================
  // FIND STATUS
  // ==========================================

  const getStatus = (events) => {
    if (!events.length) return "A";

    const statuses = events.map((e) => e.status);

    if (statuses.includes("CIN") && statuses.includes("COUT")) {
      return "TURN";
    }

    if (statuses.includes("CIN")) return "CIN";

    if (statuses.includes("COUT")) return "COUT";

    if (statuses.includes("R")) return "R";

    if (statuses.includes("H")) return "H";

    return "A";
  };
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isPastDate = (date) => {
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);

    return compareDate < today;
  };

  // ==========================================
  // OWNERREZ STYLE ICON
  // ==========================================

  const getDayClass = (status) => {
    switch (status) {
      case "A":
        return "bg-[#d9f8e8] text-black";

      case "R":
        return "bg-[#5B5BF7] text-white";

      case "H":
        return "bg-[#FFC107] text-black";

      // Green background + Blue triangle (bottom-right)
      case "CIN":
        return "bg-[linear-gradient(135deg,#d9f8e8_0%,#d9f8e8_50%,#5B5BF7_50%,#5B5BF7_100%)] text-black";

      // Green background + Blue triangle (top-left)
      case "COUT":
        return "bg-[linear-gradient(315deg,#d9f8e8_0%,#d9f8e8_50%,#5B5BF7_50%,#5B5BF7_100%)] text-black";

      // Blue background
      case "TURN":
        return "bg-[#5B5BF7] text-white";

      default:
        return "bg-[#d9f8e8] text-black";
    }
  };

  useEffect(() => {
    const preventPaste = (e) => {
      e.preventDefault();
    };

    document.addEventListener("paste", preventPaste);

    return () => {
      document.removeEventListener("paste", preventPaste);
    };
  }, []);
  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="overflow-hidden rounded-lg border border-gray-300 bg-white">
      {/* Month Header */}

      <div className="border-b bg-gray-100 py-2">
        <h3 className="text-center text-base font-semibold text-gray-800">
          {monthName} {year}
        </h3>
      </div>

      {/* Week Days */}

      <div className="grid grid-cols-7 border-b bg-gray-50">
        {weekDays.map((day) => (
          <div
            key={day}
            className="border-r last:border-r-0 py-2 text-center text-xs font-semibold text-gray-600"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days */}

      <div className="grid grid-cols-7">
        {calendarDays.map((item, index) => {
          if (item.empty) {
            return (
              <div
                key={index}
                className="aspect-square border border-gray-200 bg-white"
              />
            );
          }

          const status = getStatus(item.events);
          const isDisabled = isPastDate(item.date);
          const displayStatus = isDisabled ? "DISABLED" : status;

          return (
            <button
              key={item.key}
              disabled={isDisabled}
              className={`
  relative
  aspect-square
  rounded-xl
  m-1
  flex
  items-center
  justify-center
  text-lg
  font-semibold
  transition-all
  ${
    isDisabled
      ? "bg-gray-200 text-gray-400 cursor-not-allowed opacity-70"
      : `${getDayClass(displayStatus)} hover:scale-105`
  }
`}
            >
              {item.day}

              {!isDisabled && displayStatus === "TURN" && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div
                    className="
        absolute
        top-1/2
        left-1/2
        w-[120%]
        h-[3px]
        bg-black
        -translate-x-1/2
        -translate-y-1/2
        -rotate-45
      "
                  />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
