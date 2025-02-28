import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { GraduationCap, BookOpen, Search, Globe, BadgeCheck, Trophy, MapPin } from "lucide-react"; 
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

// Import images for education
import kvgImg from "../assets/kvg.jfif";
import uvceImg from "../assets/uvce.jfif";
import nitkImg from "../assets/nitk.jfif";

// Work experience images
import vivekanandaImg from "../assets/vivekananda.jfif";
import bnmImg from "../assets/bnm.jfif";
import sahyadriImg from "../assets/sahayadri.jfif";
import srinivasImg from "../assets/srinivas.jfif";
import iiitImg from "../assets/iiitdwd.jfif";

export default function About() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const education = [
    { title: "Bachelor of Engineering (B.E)", school: "KVG College of Engineering", year: "2005 - 2009", img: kvgImg },
    { title: "Master of Engineering (M.Eng)", school: "UVCE, Bengaluru", year: "2013 - 2015", img: uvceImg },
    { title: "Ph.D. in Machine Learning & Deep Learning", school: "NIT Karnataka", year: "2018 - 2023", img: nitkImg },
  ];

  const experiences = [
    { title: "Lecturer", company: "Vivekananda College of Engineering", year: "Jul 2011 - Jun 2013", img: vivekanandaImg },
    { title: "Assistant Professor", company: "BNM Institute of Technology", year: "Jan 2016 - May 2016", img: bnmImg },
    { title: "Assistant Professor", company: "Sahyadri College of Engineering", year: "Jul 2016 - Jul 2017", img: sahyadriImg },
    { title: "Assistant Professor", company: "Srinivas Institute of Technology", year: "Aug 2017 - Dec 2018", img: srinivasImg },
    { title: "Research Scholar", company: "NIT Karnataka", year: "Dec 2018 - Jan 2023", img: nitkImg },
    { title: "Assistant Professor", company: "BNM Institute of Technology", year: "Feb 2023 - Aug 2023", img: bnmImg },
    { title: "Associate Professor", company: "BNM Institute of Technology", year: "Sep 2023 - Jan 2024", img: bnmImg },
    { title: "Assistant Professor", company: "IIIT Dharwad", year: "Feb 2024 - Present", img: iiitImg },
  ];

  return (
    <div className="min-h-screen p-6 py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto">
          {/* About Me Section */}
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-800" data-aos="fade-down">
          About Me
          </h2>
          <div className="bg-white rounded-xl shadow-md p-8 transition-all hover:shadow-lg transform hover:scale-105 duration-300" data-aos="fade-up">
            <p className="text-lg text-gray-700 leading-relaxed">
              I am an <strong>Assistant Professor at IIIT Dharwad</strong> with a passion for teaching and research in 
              <strong> Machine Learning, Deep Learning,</strong> and <strong>Artificial Intelligence</strong>. I hold a <strong>Ph.D.</strong> from 
              <strong> NIT Karnataka</strong>, where my research focused on <strong>deep learning-based plant disease detection 
              and classification</strong>. My work has been published in <strong>reputed journals</strong>, contributing to 
              advancements in <strong>computer vision</strong> and <strong>AI-driven agriculture</strong>.
            </p>
            <p className="text-lg text-gray-700 mt-4 leading-relaxed">
              With a background in <strong>Computer Science and Software Engineering</strong> (<strong>B.E, M.Eng</strong>), 
              I specialize in <strong>ML, deep learning, and security applications</strong>. My research interests include&nbsp;   
               <strong>efficient neural network architectures, AI interpretability, and real-world ML applications</strong>.
            </p>
          </div>


        {/* Education - Vertical Timeline */}
        <h3 className="text-3xl font-bold text-gray-800 text-center mt-16 mb-6" data-aos="fade-up">
          Education
        </h3>
        <VerticalTimeline>
          {education.map((edu, index) => (
            <VerticalTimelineElement
              key={index}
              date={edu.year}
              contentStyle={{ background: "#f8f9fa", color: "#333", borderRadius: "10px", transition: "all 0.3s"  }}
              contentArrowStyle={{ borderRight: "7px solid #e0e0e0" }}
              iconStyle={{ background: "white", boxShadow: "0 0 8px rgba(0, 0, 0, 0.2)" }}
              icon={
                <img
                  src={edu.img}
                  alt={edu.school}
                  className="w-full h-full rounded-full hover:scale-110 transition-transform duration-300"
                />}
            >
              <h3 className="text-xl font-bold">{edu.title}</h3>
              <p className="text-gray-600">{edu.school}</p>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>

        {/* Experience - Vertical Timeline */}
        <h3 className="text-3xl font-bold text-gray-800 text-center mt-16 mb-6" data-aos="fade-up">
          Work Experience
        </h3>
        <VerticalTimeline>
          {experiences.map((exp, index) => (
            <VerticalTimelineElement
              key={index}
              date={exp.year}
              contentStyle={{ background: "#f8f9fa", color: "#333", borderRadius: "10px", transition: "all 0.3s" }}
              contentArrowStyle={{ borderRight: "7px solid #e0e0e0" }}
              iconStyle={{ background: "white", boxShadow: "0 0 8px rgba(0, 0, 0, 0.2)" }}
              icon={
                <img
                  src={exp.img}
                  alt={exp.company}
                  className="w-full h-full rounded-full hover:scale-110 transition-transform duration-300"
                />}
            >
              <h3 className="text-xl font-bold">{exp.title}</h3>
              <p className="text-gray-600">{exp.company}</p>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10" data-aos="fade-up">
          {/* Author Identifiers Section */}
          <div className="bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg hover:scale-105 duration-300 w-full">
            <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-600" /> Author Identifiers
            </h3>

            <ul className="space-y-3">
              {[
                { label: "Google Scholar", link: "https://scholar.google.com/citations?user=3elvnsAAAAJhl=enauthuser=1oi=sra", icon: <BookOpen /> },
                { label: "ORCID", link: "https://orcid.org/0000-0002-1217-891X", icon: <GraduationCap /> },
                { label: "Scopus ID", link: "https://www.scopus.com/authid/detail.uri?authorId=57224694127", icon: <Search /> },
                { label: "WoS Researcher ID", link: "https://www.webofscience.com/wos/author/record/GVS-0017-2022", icon: <Globe /> }
              ].map(({ label, link, icon }, index) => (
                <a key={index} href={link} target="_blank" rel="noopener noreferrer" className="block">
                  <button 
                    className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 hover:bg-blue-100 transition-all duration-300 shadow-sm hover:shadow-md w-full"
                  >
                    {/* Icon Wrapper */}
                    <span className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-full group-hover:scale-110 transition-transform duration-300">
                      {icon}
                    </span>

                    {/* Label */}
                    <span className="text-gray-700 font-semibold hover:text-blue-700 transition-all text-lg">
                      {label}
                    </span>
                  </button>
                </a>
              ))}
            </ul>
          </div>

          {/* Research Experience Section */}
          <div className="bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg hover:scale-105 duration-300 w-full">
            <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <Search className="w-6 h-6 text-green-600" /> Research Experience
            </h3>

            <ul className="list-disc pl-5 space-y-3 text-gray-700">
              <li>Conducted research on **AI applications in agriculture**, including <strong>image recognition</strong> for <strong>pest, disease, and nutrition deficiency</strong> identification.</li>
              <li>Spearheaded <strong>AI-driven projects in agriculture</strong>, focusing on <strong>crop yield prediction, disease detection, and precision farming</strong>.</li>
              <li>Developed <strong>Weed Detection and Classification</strong> models using <strong>Deep Learning</strong> approaches.</li>
              <li>Collaborated with <strong>cross-functional teams</strong> to integrate AI solutions into existing agricultural processes.</li>
              <li>Implemented <strong>Anomaly Detection</strong> techniques to enhance precision farming efficiency.</li>
            </ul>
          </div>
        </div>



        {/* Certifications, Extra Curricular Activities, and Address */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10" data-aos="fade-up">
            {[
              {
                title: "Certifications",
                icon: <BadgeCheck className="w-6 h-6 text-blue-600" />,
                items: [
                  "Introduction to TensorFlow (Coursera)", 
                  "Neural Networks and Deep Learning (Coursera)", 
                  "Java Fundamentals (Oracle Academy)", 
                  "Machine Learning (NPTEL)"
                ]
              },

              {
                title: "Extra Curricular Activities",
                icon: <Trophy className="w-6 h-6 text-yellow-600" />,
                items: [
                  <ol key="list" className="list-decimal pl-5 space-y-2">
                    <li><strong>Represented NITK</strong> in <strong>All India Inter-NIT athletics</strong> and won two medals in <strong>2022</strong>, held at <strong>NIT Jaipur</strong>.</li>
                    <li>Won six medals in <strong>VTU athletics meet</strong> during <strong>2007-2009</strong>.</li>
                    <li><strong>Represented VTU</strong> in <strong>Inter-University athletics meet</strong>.</li>
                    <li>Participated in various <strong>open runs and marathons</strong> and won in a few events.</li>
                    <li>Hobbies include <strong>agriculture, yoga, running,</strong> and <strong>playing tennis</strong>.</li>
                  </ol>
                ]
              },
            
              {
                title: "Address",
                icon: <MapPin className="w-6 h-6 text-red-600" />,
                items: [
                  "Department of CSE, Room No: F123, IIIT Dharwad, Karnataka-580009",
                  <iframe
                    key="map"
                    src="https://maps.google.com/maps?q=IIIT+Dharwad,+Karnataka-580009&output=embed"
                    width="100%"
                    height="250"
                    style={{ border: "0", borderRadius: "10px", marginTop: "10px" }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                ]
              }
            
            ].map((section, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg hover:scale-105 duration-300"
              >
                {/* Section Title with Icon */}
                <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                  {section.icon} {section.title}
                </h3>
          
                {/* Section Content */}
                <ul className="space-y-3 text-gray-600">
                  {section.items.map((item, i) => <li key={i} className="transition-all hover:text-blue-600">{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
      </div>
    </div>
  );
}
