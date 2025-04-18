"use client";

// import React from "react";

// Skills data
const skills = [
  {
    category: "Programming Languages",
    items: [
      { name: "Python", level: 100 },
      { name: "Java", level: 95 },
      { name: "C", level: 90 },
      { name: "C++", level: 90 },
    ],
  },
];

// Testimonials
const testimonials = [
  {
    quote:
      "Professor Sunil's ability to connect theory with real-world examples made learning so much easier. A truly exceptional mentor.",
    name: "M.K. Vivek",
    title: "Student, IIIT Dharwad",
    image: "https://ui-avatars.com/api/?name=M+K+Vivek&background=random",
  },
  {
    quote:
      "The depth and clarity with which Professor Sunil teaches is inspiring. He has played a big role in shaping my coding skills.",
    name: "M. Pranav Srinivas",
    title: "Student, IIIT Dharwad",
    image: "https://ui-avatars.com/api/?name=M+Pranav+Srinivas&background=random",
  },
  {
    quote:
      "Prof. Sunil C K helped me grow professionally through project work and clear guidance. I learned how to approach problems better and deliver solid results.",
    name: "Sreeraaj Manepalli",
    title: "Student, IIIT Dharwad",
    image: "https://ui-avatars.com/api/?name=Sreeraaj+Manepalli&background=random",
  },
  {
    quote:
      "I am grateful for Professor Sunil's guidance in academics and beyond. He is an inspiration to all of us.",
    name: "P. Manindhra Goud",
    title: "Student, IIIT Dharwad",
    image: "https://ui-avatars.com/api/?name=Manindhra+Goud&background=random",
  },
  {
    quote:
      "Thanks to Prof. Sunil’s guidance, I was able to work on a deep learning research paper. He’s always supportive and genuinely wants his students to succeed.",
    name: "D. Sai Pavan",
    title: "Student, IIIT Dharwad",
    image: "https://ui-avatars.com/api/?name=Sai+Pavan&background=random",
  },
  {
    quote:
      "He’s the kind of professor who remembers your ideas, checks in on your progress, and makes you feel like your work actually matters. That’s rare.",
    name: "R. Eswar Naik",
    title: "Student, IIIT Dharwad",
    image: "https://ui-avatars.com/api/?name=Eswar+Naik&background=random",
  },
];

const InfiniteMovingCards = ({
  items,
  speed = "slow",
  direction = "right",
}: {
  items: {
    quote: string;
    name: string;
    title: string;
    image: string;
  }[];
  speed?: "slow" | "medium" | "fast";
  direction?: "left" | "right";
}) => {
  const speedMap = {
    slow: "40s",
    medium: "25s",
    fast: "15s",
  };

  const animationDuration = speedMap[speed];

  return (
    <div className="relative w-full overflow-hidden group">
      <div
        className={`flex gap-6 w-max ${
          direction === "right" ? "flex-row-reverse" : "flex-row"
        } animate-marquee group-hover:[animation-play-state:paused]`}
        style={{
          animationDuration,
        }}
      >
        {[...items, ...items].map((item, idx) => (
          <div
            key={idx}
            className="min-w-[280px] max-w-sm bg-white rounded-lg border border-gray-200 p-6 flex flex-col gap-4 transition-transform hover:-translate-y-1 duration-300 shadow hover:shadow-lg"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 rounded-full object-cover shadow-sm"
              />
              <div>
                <p className="text-base font-semibold text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-500">{item.title}</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed italic border-l-4 border-blue-500 pl-4">
              “{item.quote}”
            </p>
          </div>
        ))}
      </div>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }

          .animate-marquee {
            animation: marquee linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default function Skills() {
  return (
    <div
      className="min-h-screen p-6 py-20 bg-white"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Skills Section */}
        <div>
          <h3 className="text-3xl font-semibold text-center text-gray-800 mb-10">
            Skills & Expertise
          </h3>

          <div className="space-y-12">
            {skills.map((category) => (
              <div key={category.category}>
                <h3 className="text-2xl font-medium mb-4 text-blue-700">
                  {category.category}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {category.items.map((skill) => (
                    <div
                      key={skill.name}
                      className="bg-white border border-gray-300 rounded-lg p-5 transition-all hover:shadow-md"
                    >
                      <div className="flex justify-between mb-2 text-sm font-medium text-gray-700">
                        <span>{skill.name}</span>
                        <span className="text-blue-600">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-full rounded-full transition-all"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <section id="testimonials" className="mt-20">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
            Testimonials from{" "}
            <span className="text-blue-600">Colleagues and Students</span>
          </h2>

          <div className="w-full rounded-lg relative overflow-hidden">
            <InfiniteMovingCards
              items={testimonials}
              direction="right"
              speed="slow"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
