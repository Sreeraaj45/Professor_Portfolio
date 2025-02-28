import { useState, useEffect, useRef } from "react";
import { BookOpen, XCircle, ExternalLink } from "lucide-react";

const courseDetails = {
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
  references: [
    "Visualization Analysis and Design, Tamara Munzner, CRC Press, 2014",
    "Visualize This: The Flowing Data Guide to Design, Nathan Yau, Wiley, 2011",
    "Fundamental Statistical Concepts in Presenting Data: Rafe Donahue, 2011",
    "Deep Learning: A Practitioner’s Approach, Josh Patterson & Adam Gibson, O’Reilly, 2017",
    "Deep Learning, Ian Goodfellow, Y. Bengio & A. Courville, MIT Press, 2016",
  ],
  
  driveLink: "https://drive.google.com/your-google-drive-file-link",
};

export default function Courses() {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  return (
    <div className="container mx-auto px-6 py-10 relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-200">
      {/* Header */}
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-900 tracking-wide animate-fade-in">Courses</h1>

      {/* Course Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div
          className="p-6 bg-white shadow-xl rounded-xl cursor-pointer transition-all transform hover:scale-105 hover:shadow-2xl hover:bg-blue-600 hover:text-white text-gray-900 flex flex-col items-center justify-center"
          onClick={() => setIsModalOpen(true)}
        >
          <BookOpen size={50} className="mb-4 transition-transform duration-300 hover:rotate-12" />
          <h2 className="text-xl font-semibold text-center transition-colors duration-300">Data Visualization and Analytics</h2>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-md p-4 animate-fade-in">
          <div ref={modalRef} className="bg-white bg-opacity-90 backdrop-blur-xl p-6 rounded-2xl shadow-2xl max-w-2xl w-full relative scale-95 animate-scale-in border border-gray-200">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition-all"
              onClick={() => setIsModalOpen(false)}
            >
              <XCircle size={28} />
            </button>

            <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">{courseDetails.name}</h2>

            <div className="bg-gray-100 p-4 rounded-lg mb-4 text-gray-700">
              <p><strong>📖 Programme:</strong> {courseDetails.programme}</p>
              <p><strong>📆 Semester:</strong> {courseDetails.semester}</p>
              <p><strong>🎓 Credits:</strong> {courseDetails.credits}</p>
            </div>

            {/* Scrollable Content */}
            <div className="max-h-72 overflow-y-auto p-2">
              <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-800">Content:</h3>
              {courseDetails.content.map((section, index) => (
                <div key={index} className="mb-4">
                  <strong className="block text-gray-900">{section.title}</strong>
                  <ul className="list-disc pl-5 text-gray-600 text-sm">
                    {section.points.map((point, i) => (
                      <li key={i} className="hover:text-blue-500 transition-all">{point}</li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Download Button */}
              <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-800">Download Materials:</h3>
              <a
                href={courseDetails.driveLink}
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

      {/* Animations & Styling */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { transform: scale(0.9); }
          to { transform: scale(1); }
        }
        .animate-fade-in { animation: fade-in 0.5s ease-in-out; }
        .animate-scale-in { animation: scale-in 0.3s ease-in-out; }
      `}</style>
    </div>
  );
}
