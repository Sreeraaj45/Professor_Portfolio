const skills = [
  {
    category: 'Programming Languages',
    items: [
      { name: 'Python', level: 100 },
      { name: 'Java', level: 90 },
      { name: 'C', level: 85 },
    ],
  },
];

export default function Skills() {
  return (
    <div className="min-h-screen p-6 py-20 bg-gray-50" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="max-w-4xl mx-auto" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="text-4xl font-bold mb-8 text-gray-800 text-center" data-aos="fade-down">
          Skills & Expertise
        </h2>

        <div className="space-y-12">
          {skills.map((category, index) => (
            <div key={category.category} data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}>
              <h3 className="text-2xl font-bold mb-6 text-gray-700">{category.category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.items.map((skill) => (
                  <div
                    key={skill.name}
                    className="bg-white rounded-lg shadow-lg p-6 transform transition duration-500 hover:scale-105 hover:shadow-xl"
                  >
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold text-gray-800">{skill.name}</span>
                      <span className="text-blue-600">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-blue-700 h-full rounded-full transition-all duration-700 ease-in-out"
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
    </div>
  );
}
