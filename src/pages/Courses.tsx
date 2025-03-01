import { useState, useEffect, useRef } from "react";
import { BookOpen, XCircle, ExternalLink } from "lucide-react";

// Define Course Type
type Course = {
  name: string;
  programme: string;
  semester: string;
  credits: string;
  content: { title: string; points: string[] }[];
  driveLink: string;
};

// Sample course data
const courses: Course[] = [
  {
    name: "Data Visualization and Analytics",
    programme: "B.Tech",
    semester: "Sixth",
    credits: "04 (3-1-0-0-4)",
    content: [
      { title: "Overview of Visualization:", points: ["Definition, Implications, Design Framework."] },
      { title: "Task Abstraction & Data Abstraction:", points: ["Mapping, charts, glyphs, stacked graphs."] },
      { title: "Visualization of Numerical Data:", points: ["Parallel coordinates, Tufte’s design rules, color usage."] },
      { title: "Non-Numerical Data Visualization:", points: ["Graphs, networks, treemaps, PCA, MDS."] },
      { title: "Visualization Systems:", points: ["Information visualization, database visualization."] },
      { title: "Trends & Tools:", points: ["Declarative & reactive programming."] },
      { 
        title: "Data Analytics:", 
        points: [
          "Statistical Modelling, Total Information Awareness.",
          "Distributed File Systems: MapReduce & Spark.",
          "Dimensionality Reduction: PCA, SVD.",
          "Mining Social Networks: Graph centrality, clustering, community detection.",
          "Large-scale Machine Learning: MLP, RNN, CNN, LSTM."
        ]
      },
    ],
    driveLink: "https://drive.google.com/your-google-drive-file-link",
  },
  {
    name: "Problem Solving through Programming in Python",
    programme: "B.Tech",
    semester: "First",
    credits: "04 (3-0-2-0-4)",
    content: [
      { title: "Introduction to Problem Solving:", points: ["Problem solving, definition and steps, Flowchart, Pseudocode."] },
      { title: "Python Fundamentals:", points: ["Syntax, variables, datatypes, operators, expressions, functions."] },
      { title: "Control Structures:", points: ["If-else, loops (for, while), break, continue, pass statements."] },
      { title: "Strings and Collections:", points: ["String operations, lists, tuples, sets, dictionaries."] },
      { title: "Functions and Files:", points: ["User-defined functions, recursion, lambda, file handling."] },
      { title: "Object Oriented Programming:", points: ["Classes, objects, inheritance, polymorphism, exception handling."] }
    ],
    driveLink: "https://drive.google.com/drive/folders/1SIGKXWl0yX-DToKgc3yoZbY6alRa1v6o",
  },
];

export default function Courses() {
  const [selectedSemester, setSelectedSemester] = useState<string>("All");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null); // ✅ Explicitly typing as `Course | null`
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsModalOpen(false);
      }
    };
    if (isModalOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isModalOpen]);

  // Filter courses based on selected semester
  const filteredCourses = selectedSemester === "All"
    ? courses
    : courses.filter(course => course.semester === selectedSemester);

  return (
    <div className="container mx-auto px-6 py-10 relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-200">
      {/* Header & Filter */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-900 tracking-wide animate-fade-in">Courses</h1>
        <select
          className="p-3 border border-gray-300 rounded-lg bg-white shadow-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          value={selectedSemester}
          onChange={(e) => setSelectedSemester(e.target.value)}
        >
          <option value="All">All Semesters</option>
          <option value="First">Semester 1</option>
          <option value="Sixth">Semester 6</option>
        </select>
      </div>

      {/* Course Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course, index) => (
            <div
              key={index}
              className="p-6 bg-white shadow-xl rounded-xl cursor-pointer transition-all transform hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r from-blue-100 to-blue-300 hover:text-gray-900 text-gray-900 flex flex-col items-center justify-center"
              onClick={() => { setSelectedCourse(course); setIsModalOpen(true); }}
            >
              <BookOpen size={50} className="mb-4 transition-transform duration-300 hover:rotate-12" />
              <h2 className="text-xl font-semibold text-center transition-colors duration-300">{course.name}</h2>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-700 col-span-full">No courses available for this semester.</p>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedCourse && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 backdrop-blur-lg p-4 animate-fade-in">
          <div ref={modalRef} className="bg-white bg-opacity-90 backdrop-blur-xl p-6 rounded-2xl shadow-2xl max-w-2xl w-full relative scale-95 animate-scale-in border border-gray-200">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition-all"
              onClick={() => setIsModalOpen(false)}
            >
              <XCircle size={28} />
            </button>

            <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">{selectedCourse.name}</h2>

            <div className="bg-gray-100 p-4 rounded-lg mb-4 text-gray-700">
              <p><strong>📖 Programme:</strong> {selectedCourse.programme}</p>
              <p><strong>📆 Semester:</strong> {selectedCourse.semester}</p>
              <p><strong>🎓 Credits:</strong> {selectedCourse.credits}</p>
            </div>

            {/* Scrollable Content */}
            <div className="max-h-72 overflow-y-auto p-2">
              <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-800">Content:</h3>
              {selectedCourse.content.map((section, index) => (
                <div key={index} className="mb-4">
                  <strong className="block text-gray-900">{section.title}</strong>
                  <ul className="list-disc pl-5 text-gray-600 text-sm">
                    {section.points.map((point, i) => (
                      <li key={i} className="hover:text-blue-500 transition-all duration-200">{point}</li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Download Button */}
              <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-800">Download Materials:</h3>
              <a
                href={selectedCourse.driveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all transform hover:scale-105"
              >
                <ExternalLink size={16} className="text-white" />
                Open Drive
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
