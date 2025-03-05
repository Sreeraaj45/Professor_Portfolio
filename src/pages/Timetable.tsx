import React, { useState } from "react";
import { Calendar, dateFnsLocalizer, Event } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import { Dialog } from "@headlessui/react";

// Setup localization for dates
const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

// Define the teaching schedule
const events: Event[] = [
  { title: "Problem-Solving (CS161)", start: new Date(2025, 2, 3, 9, 0), end: new Date(2025, 2, 3, 10, 0) },
  { title: "Theory of Computation (CS206)", start: new Date(2025, 2, 4, 10, 0), end: new Date(2025, 2, 4, 11, 0) },
  { title: "Data Analytics & Visualization (DS355)", start: new Date(2025, 2, 5, 11, 0), end: new Date(2025, 2, 5, 12, 0) },
  { title: "Statistics for CS (CS309)", start: new Date(2025, 2, 6, 14, 0), end: new Date(2025, 2, 6, 15, 0) },
  { title: "Machine Learning & Deep Learning", start: new Date(2025, 2, 7, 15, 0), end: new Date(2025, 2, 7, 16, 0) },
  { title: "Graph Theory", start: new Date(2025, 2, 3, 11, 0), end: new Date(2025, 2, 3, 12, 0) },
  { title: "Data Structures & Algorithms", start: new Date(2025, 2, 4, 12, 0), end: new Date(2025, 2, 4, 13, 0) },
  { title: "Internet of Things", start: new Date(2025, 2, 5, 9, 0), end: new Date(2025, 2, 5, 10, 0) },
  { title: "Robotics", start: new Date(2025, 2, 6, 10, 0), end: new Date(2025, 2, 6, 11, 0) },
  { title: "Automata Theory & Compilers", start: new Date(2025, 2, 7, 13, 0), end: new Date(2025, 2, 7, 14, 0) },
];

// Assign colors for subjects
const subjectColors: { [key: string]: string } = {
  "Problem-Solving (CS161)": "bg-blue-500",
  "Theory of Computation (CS206)": "bg-red-500",
  "Data Analytics & Visualization (DS355)": "bg-green-500",
  "Statistics for CS (CS309)": "bg-purple-500",
  "Machine Learning & Deep Learning": "bg-yellow-500",
  "Graph Theory": "bg-indigo-500",
  "Data Structures & Algorithms": "bg-pink-500",
  "Internet of Things": "bg-teal-500",
  "Robotics": "bg-orange-500",
  "Automata Theory & Compilers": "bg-gray-500",
};

// Custom event styling function
const eventStyleGetter = (event: Event) => {
  const backgroundColor = subjectColors[event.title] || "bg-gray-300";
  return { className: `text-white ${backgroundColor} rounded-md p-2 text-xs` };
};

// Custom event component to show full name on hover
const CustomEvent = ({ event }: { event: Event }) => (
    <div
      title={event.title}
      className="p-1 transition-transform transform hover:scale-105 hover:shadow-md"
    >
      {event.title}
    </div>
  );
  

export default function Timetable() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">Professor's Weekly Timetable</h1>

      <div className="border border-gray-300 shadow-lg rounded-lg p-4">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }} // Increased height for better visibility
          views={["week", "day"]}
          defaultView="week"
          eventPropGetter={eventStyleGetter} // Apply colors
          components={{ event: CustomEvent }} // Show full name on hover
          onSelectEvent={(event) => setSelectedEvent(event)} // Open modal on click
        />
      </div>

      {/* Modal to show event details */}
      {selectedEvent && (
        <Dialog open={true} onClose={() => setSelectedEvent(null)} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-2">{selectedEvent.title}</h2>
            <p className="text-gray-600">
              {format(selectedEvent.start, "EEEE, MMM d h:mm a")} - {format(selectedEvent.end, "h:mm a")}
            </p>
            <button
                onClick={() => setSelectedEvent(null)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 transform hover:scale-105"
                >
                Close
            </button>

          </div>
        </Dialog>
      )}
    </div>
  );
}
