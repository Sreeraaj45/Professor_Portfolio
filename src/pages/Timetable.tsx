import React from "react";

export default function Timetable() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-6 text-blue-700">
          Professor's Weekly Timetable
        </h1>

        {/* Button to redirect to Google Sheets */}
        <a
          href="https://docs.google.com/spreadsheets/d/your-google-sheets-id"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-all duration-300 transform hover:scale-105"
        >
          View Full Timetable in Google Sheets
        </a>
      </div>
    </div>
  );
}