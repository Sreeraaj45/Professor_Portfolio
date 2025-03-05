# Complete Documentation for the Project

## Overview

This project is a **personal portfolio website** built using **React, Tailwind CSS, and React Router**. It includes a sidebar navigation, an interactive home page, an about section with an education/work experience timeline, a skills section, a courses section, a contact form, and links to projects and external profiles. The site is structured for a **professor** specializing in **Machine Learning, Deep Learning, and Artificial Intelligence**.

## Technologies Used

- **React**: Component-based UI development.
- **React Router**: Page navigation without reloading.
- **Tailwind CSS**: Utility-first styling for responsiveness and design.
- **Lucide-react**: Modern and lightweight icons.
- **AOS (Animate on Scroll)**: Smooth animations on page scroll.
- **React Vertical Timeline**: Used for visually appealing education and work experience timeline.
- **EmailJS**: Handles contact form submissions.
- **Vite**: Fast development server and build tool for React applications.

---

## File Structure

```
📂 project-root/
├── 📂 node_modules/             # Dependencies installed via npm
├── 📂 src/                      # Source code
│   ├── 📂 assets/               # Contains images, PDFs
│   ├── 📂 components/           # Reusable React components
│   │   ├── Sidebar.tsx         # Sidebar navigation
│   ├── 📂 pages/                # Page components
│   │   ├── Home.tsx            # Landing page with image slider
│   │   ├── About.tsx           # About page with timeline
│   │   ├── Projects.tsx        # Research projects page
│   │   ├── Skills.tsx          # Skills and expertise page
│   │   ├── Courses.tsx         # Courses and academic details
│   │   ├── Contact.tsx         # Contact form page
│   ├── 📂 routes/               # Route configurations
│   │   ├── App.tsx             # Main app component
│   │   ├── main.tsx            # Application entry point
│   │   ├── index.html          # Main HTML entry point
│   │   ├── index.css           # Global styling
│   │   ├── vite-env.d.ts       # TypeScript support for Vite
├── 📜 .gitignore                # Git ignored files
├── 📜 eslint.config.js          # ESLint configuration
├── 📜 index.html                # Main HTML file
├── 📜 package.json              # Project metadata and dependencies
├── 📜 postcss.config.js         # PostCSS configuration for Tailwind CSS
├── 📜 tailwind.config.js        # Tailwind CSS configuration
├── 📜 tsconfig.app.json         # TypeScript configuration for the app
├── 📜 tsconfig.json             # TypeScript global configuration
├── 📜 tsconfig.node.json        # TypeScript configuration for Node.js
├── 📜 vite.config.ts            # Vite configuration
```

---

## Components Breakdown

### 1. Sidebar.tsx

This is a **responsive sidebar navigation** component that allows users to navigate the portfolio website.

**Key Features:**

- **Profile Section**: Displays user profile image and details.
- **Navigation Links**: Routes to different pages using `react-router-dom`.
- **Social Links**: Links to GitHub and LinkedIn.
- **Mobile-Friendly**: Toggles open/close on smaller screens.

**Code Highlights:**

- Uses `useState` to control the sidebar visibility.
- Dynamic class toggling for smooth transition effects.
- Active link highlighting using `NavLink`.

---

### 2. Home.tsx

This is the **landing page** of the website, featuring an **image slider** and **CTA buttons**.

**Key Features:**

- **Greeting Section**: Displays a welcome message and introduction.
- **Download Resume Button**: Allows users to download the resume.
- **Project Link**: Directs users to view work.
- **Auto-Sliding Image Carousel**: Displays images in a loop every 10 seconds.

**Code Highlights:**

- Uses `useEffect` for font loading (`Poppins`).
- Implements `useState` to manage slider state and transitions.
- Auto-slide function (`startAutoSlide`) updates the image every **10 seconds**.
- Manual navigation buttons (`nextImage`, `prevImage`) allow user interaction.

---

### 3. About.tsx

This page contains **biographical information, education, work experience, and research details**.

**Key Features:**

- **About Me Section**: Introduces the professor's background, research interests, and expertise.
- **Education Timeline**: Shows academic qualifications.
- **Work Experience Timeline**: Displays professional history using `react-vertical-timeline-component`.
- **Research & Certifications**: Highlights important research and qualifications.
- **Interactive Author & Research Links**: Links to **Google Scholar, ORCID, Scopus ID, and WoS Researcher ID**.
- **Extra-Curricular Activities**: Showcases athletic achievements and hobbies.
- **Google Maps Integration**: Embeds a map of the professor's workplace.

**Code Highlights:**

- Uses `AOS` for smooth fade-in animations.
- Implements `react-vertical-timeline-component` for education & experience sections.
- Dynamic rendering of timeline items using `.map()`.
- Embeds an **interactive Google Map** with the professor's office location.

---

### 4. Projects.tsx

This page showcases various **research projects** and their corresponding articles.

**Key Features:**

- **Research Projects Grid**: Displays research projects related to **machine learning, deep learning, plant disease detection, intrusion detection, and biometric recognition**.
- **Project Cards**: Each project card includes **a title, description, image, technologies used, and a link to the research article**.
- **Hover Effects**: Each project has a **hover animation** to enhance interactivity.
- **Dynamic Rendering**: Projects are mapped dynamically using `.map()`.

**Code Highlights:**

- Uses an array of objects to **store project data** (title, description, image, technologies, and article URL).
- Implements a **grid layout** for better responsiveness.
- Applies **fade-in animations** using `AOS`.

---

### 5. index.html

This is the **main HTML file** that serves as the entry point for the web application.

**Key Features:**

- **Metadata and SEO**: Defines character set, viewport settings, and page title.
- **Favicon**: Sets an image as the browser tab icon.
- **Root Element**: Contains a `<div id="root"></div>` where the React app is rendered.
- **Module Script Import**: Loads the `main.tsx` script to start the React app.

**Code Highlights:**

- Uses `<meta>` tags for viewport and character set configuration.
- Links a favicon for better branding.
- Includes a `<script type="module">` to load the main React entry file.

---

## Conclusion

This **React-based portfolio website** provides a well-structured, modern, and responsive platform to showcase an academic profile, projects, skills, courses, and research. The use of **animations, timelines, and interactive elements** enhances user engagement.
