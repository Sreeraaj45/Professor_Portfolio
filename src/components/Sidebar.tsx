import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Home, User, Code2, Briefcase, Mail, Github, Linkedin, Book } from 'lucide-react';
import ProfilePic from '../assets/profile-pic.png';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/about', icon: User, label: 'About' },
  { path: '/skills', icon: Code2, label: 'Skills' },
  { path: '/projects', icon: Briefcase, label: 'Projects' },
  { path: '/courses', icon: Book, label: 'Courses' }, 
  { path: '/contact', icon: Mail, label: 'Contact' },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-8 z-50 p-2 bg-white rounded-lg shadow-lg transition-all hover:scale-105 active:scale-95 md:hidden"
      >
        {isOpen ? <X size={24} className="text-gray-800" /> : <Menu size={24} className="text-gray-800" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          
          {/* Profile Section */}
          <div className="p-6 text-center border-b bg-gradient-to-r from-blue-50 to-blue-100">
            <img
              src={ProfilePic}
              alt="Profile"
              className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-white shadow-md transition-transform hover:scale-105"
            />
            <h2 className="text-xl font-bold mt-3 text-gray-900">Sunil CK</h2>
            <p className="text-gray-600">Assistant Professor</p>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 mt-4">
            {navItems.map(({ path, icon: Icon, label }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 mb-2 rounded-lg transition-all text-gray-700 ${
                    isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100 hover:pl-5'
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <Icon size={20} className="mr-3" />
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Social Links */}
          <div className="p-6 border-t flex justify-center space-x-6">
            <a
              href="https://github.com/sunilchinnahalli"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 transition-transform hover:scale-110 hover:text-gray-900"
            >
              <Github size={22} />
            </a>
            <a
              href="https://in.linkedin.com/in/sunil-ck-ph-d-4599237a?original_referer=https%3A%2F%2Fwww.google.com%2F"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 transition-transform hover:scale-110 hover:text-gray-900"
            >
              <Linkedin size={22} />
            </a>
            {/* <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 transition-transform hover:scale-110 hover:text-gray-900"
            >
              <Twitter size={22} />
            </a> */}
          </div>
        </div>
      </aside>
    </>
  );
}
