import { useState, useEffect, useRef } from "react";
import { BookOpen, XCircle, ExternalLink, LayoutGrid, List, Search, ArrowUpAZ, ArrowDownAZ, Loader } from "lucide-react";
import axios from "axios";

type Course = {
  _id: string;
  name: string;
  programme: string;
  semester: string;
  credits: string;
  content: { title: string; points: string[] }[];
  driveLink: string;
};

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<string>("All");
  const [isGridView, setIsGridView] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState<boolean>(false);
  const [newCourse, setNewCourse] = useState<Omit<Course, '_id'>>({
    name: "",
    programme: "",
    semester: "",
    credits: "",
    content: [],
    driveLink: "",
  });
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isAscending, setIsAscending] = useState<boolean>(true);
  const [formContentItems, setFormContentItems] = useState<{title: string, points: string}[]>([{title: "", points: ""}]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement>(null);

  // Fetch courses when component mounts
  useEffect(() => {
    fetchCourses();
    // Check if user is admin (this would depend on your auth implementation)
    const token = localStorage.getItem('token');
    if (token) {
      setIsAdmin(true); // In a real app, you would validate the token and check user role
    }
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/courses`);
      setCourses(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch courses");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsModalOpen(false);
        setIsAddCourseModalOpen(false);
      }
    };
    if (isModalOpen || isAddCourseModalOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isModalOpen, isAddCourseModalOpen]);

  const handleAddCourse = async () => {
    try {
      // Transform content items from form
      const formattedContent = formContentItems.map(item => ({
        title: item.title,
        points: item.points.split('\n').filter(point => point.trim() !== '')
      }));

      const courseData = {
        ...newCourse,
        content: formattedContent
      };

      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/courses`, courseData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setCourses([...courses, response.data]);
      setIsAddCourseModalOpen(false);
      setNewCourse({ name: "", programme: "", semester: "", credits: "", content: [], driveLink: "" });
      setFormContentItems([{title: "", points: ""}]);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to add course");
      console.error(err);
    }
  };

  const handleDeleteCourse = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setCourses(courses.filter(course => course._id !== id));
      if (selectedCourse?._id === id) {
        setIsModalOpen(false);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to delete course");
      console.error(err);
    }
  };

  const handleContentItemChange = (index: number, field: 'title' | 'points', value: string) => {
    const updatedItems = [...formContentItems];
    updatedItems[index][field] = value;
    setFormContentItems(updatedItems);
  };

  const addContentItem = () => {
    setFormContentItems([...formContentItems, {title: "", points: ""}]);
  };

  const removeContentItem = (index: number) => {
    if (formContentItems.length > 1) {
      const updatedItems = [...formContentItems];
      updatedItems.splice(index, 1);
      setFormContentItems(updatedItems);
    }
  };

  const filteredCourses = courses
    .filter(course => selectedSemester === "All" || course.semester === selectedSemester)
    .filter(course => course.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => isAscending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));

  // Get unique semesters for dropdown
  const uniqueSemesters = ["All", ...new Set(courses.map(course => course.semester))];

  return (
    <div className="container mx-auto px-6 py-10 min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      {/* Header, Filter, and Layout Toggle */}
      <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold text-gray-900 tracking-wide">Courses</h1>

          {/* Styled Sorting Button */}
          <button 
            onClick={() => setIsAscending(!isAscending)}
            className="p-2 bg-white shadow-md rounded-full border border-gray-300 hover:bg-blue-500 hover:text-white transition-all transform hover:scale-105"
          >
            {isAscending ? <ArrowUpAZ size={22} className="text-gray-600 hover:text-white transition-all" /> 
                        : <ArrowDownAZ size={22} className="text-gray-600 hover:text-white transition-all" />}
          </button>
        </div>

        <div className="flex items-center gap-6">
          {/* Search Bar */}
          <div className="relative flex items-center w-full sm:w-auto">
            <Search size={20} className="absolute left-3 text-gray-500" />
            <input
              type="text"
              placeholder="Search courses..."
              className="p-3 pl-10 w-full border border-gray-300 rounded-lg bg-white shadow-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4">
            {/* Layout Toggle */}
            <button
              onClick={() => setIsGridView(!isGridView)}
              className="p-2 bg-white shadow-md rounded-lg border border-gray-300 hover:bg-gray-100 transition"
            >
              {isGridView ? <List size={20} /> : <LayoutGrid size={20} />}
            </button>

            {/* Semester Filter */}
            <select
              className="p-3 border border-gray-300 rounded-lg bg-white shadow-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
            >
              {uniqueSemesters.map((semester, index) => (
                <option key={index} value={semester}>{semester === "All" ? "All Semesters" : `Semester ${semester}`}</option>
              ))}
            </select>

            {/* Add Course Button - only visible for admins */}
            {isAdmin && (
              <button
                onClick={() => setIsAddCourseModalOpen(true)}
                className="p-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-700 transition"
              >
                Add Course
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Loading state */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader size={48} className="animate-spin text-blue-500" />
        </div>
      ) : (
        <>
          {/* Course Layout (Grid / List) */}
          <div className={`flex flex-wrap justify-center gap-6 ${isGridView ? "md:justify-start" : "flex-col"}`}>
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <div
                  key={course._id}
                  className={`bg-white shadow-md rounded-lg cursor-pointer transition-all transform hover:scale-105 hover:shadow-xl hover:bg-gradient-to-r from-blue-100 to-blue-300 hover:text-gray-900 
                    ${isGridView ? "w-full sm:w-[250px] md:w-[300px] p-5 flex flex-col items-center" : "w-[90%] max-w-[950px] p-6 flex items-center justify-between"}`}
                  onClick={() => { setSelectedCourse(course); setIsModalOpen(true); }}
                >
                  {/* Show Icon Only in Grid Mode */}
                  {isGridView && <BookOpen size={50} className="mb-3 transition-transform duration-300 hover:rotate-12" />}

                  {/* Course Name */}
                  <h2 className={`text-lg font-semibold ${isGridView ? "text-center" : "text-left text-xl"}`}>
                    {course.name}
                  </h2>

                  {/* Show Semester in List View Only */}
                  {!isGridView && (
                    <span className="text-gray-600 font-medium text-sm bg-gray-200 px-3 py-1 rounded-md">
                      {course.semester} Sem
                    </span>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-700 col-span-full">No courses available for this semester.</p>
            )}
          </div>
        </>
      )}

      {/* Add Course Modal */}
      {isAddCourseModalOpen && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 backdrop-blur-lg p-4 z-50 modal-backdrop"
        >
          <div 
            ref={modalRef} 
            className="bg-white p-6 rounded-2xl shadow-2xl max-w-lg sm:max-w-xl md:max-w-2xl w-[90%] border border-gray-300 relative overflow-auto max-h-[90vh]"
          >
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500 transition"
              onClick={() => setIsAddCourseModalOpen(false)}
            >
              <XCircle size={28} />
            </button>

            <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Add New Course</h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddCourse();
              }}
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="Course Name"
                value={newCourse.name}
                onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
              <input
                type="text"
                placeholder="Programme"
                value={newCourse.programme}
                onChange={(e) => setNewCourse({ ...newCourse, programme: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
              <input
                type="text"
                placeholder="Semester"
                value={newCourse.semester}
                onChange={(e) => setNewCourse({ ...newCourse, semester: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
              <input
                type="text"
                placeholder="Credits"
                value={newCourse.credits}
                onChange={(e) => setNewCourse({ ...newCourse, credits: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
              <input
                type="url"
                placeholder="Drive Link"
                value={newCourse.driveLink}
                onChange={(e) => setNewCourse({ ...newCourse, driveLink: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
              
              {/* Content Items */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Course Content Sections</h3>
                {formContentItems.map((item, index) => (
                  <div key={index} className="p-4 border border-gray-300 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium">Section {index + 1}</h4>
                      <button 
                        type="button"
                        onClick={() => removeContentItem(index)}
                        className="text-red-500 hover:text-red-700"
                        disabled={formContentItems.length === 1}
                      >
                        Remove
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Section Title"
                      value={item.title}
                      onChange={(e) => handleContentItemChange(index, 'title', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg mb-2"
                      required
                    />
                    <textarea
                      placeholder="Points (one per line)"
                      value={item.points}
                      onChange={(e) => handleContentItemChange(index, 'points', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg min-h-24"
                      required
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addContentItem}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                >
                  + Add Section
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-3 rounded-lg shadow-md hover:bg-blue-700 transition"
              >
                Add Course
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Course Detail Modal */}
      {isModalOpen && selectedCourse && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 backdrop-blur-lg p-4 modal-backdrop">
          <div 
            ref={modalRef} 
            className="bg-white p-6 rounded-2xl shadow-2xl max-w-lg sm:max-w-xl md:max-w-2xl w-[90%] border border-gray-300 relative overflow-auto max-h-[90vh]"
          >
            {/* Close Button (Inside the Card) */}
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500 transition"
              onClick={() => setIsModalOpen(false)}
            >
              <XCircle size={28} />
            </button>

            <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">{selectedCourse.name}</h2>

            <div className="bg-gray-100 p-4 rounded-lg mb-4 text-gray-700 shadow-inner">
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
                      <li key={i} className="hover:text-blue-500">{point}</li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Admin Actions */}
              {isAdmin && (
                <div className="mb-4 p-3 bg-gray-100 rounded-lg">
                  <h4 className="font-medium text-gray-700 mb-2">Admin Actions</h4>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDeleteCourse(selectedCourse._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition text-sm"
                    >
                      Delete Course
                    </button>
                    {/* You can add an edit button here if needed */}
                  </div>
                </div>
              )}

              {/* Buttons - Open Drive & Marks */}
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                {/* Open Drive Button */}
                <a
                  href={selectedCourse.driveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all w-full sm:w-auto"
                >
                  <ExternalLink size={16} />
                  Open Drive
                </a>

                {/* Marks Button - Google Sheets */}
                <a
                  href="https://docs.google.com/spreadsheets/d/your-google-sheets-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-green-500 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition-all w-full sm:w-auto"
                >
                  <ExternalLink size={16} />
                  Marks
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
