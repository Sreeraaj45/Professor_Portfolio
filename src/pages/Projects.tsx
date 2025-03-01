import cardamom from '../assets/cardamom.avif'
import benz from '../assets/benz.avif'
import tomatoes from '../assets/tomatoes.webp'
import disease from '../assets/disease.webp'
import detection from '../assets/detection.jpg'
import detection2 from '../assets/detection2.jpg'
import detection3 from '../assets/detection3.png'
import detection4 from '../assets/detection4.jpg'
import coffee from '../assets/coffee.jpg'
import ids from '../assets/ids.webp'
import infrared from '../assets/infrared.jpg'
import biometric  from '../assets/biometric.jpg'

const projects = [
  {
    title: 'Cardamom Plant Disease Detection',
    description: 'Cardamom, a key spice, faces diseases affecting yield. This study uses EfficientNetV2 for detection, achieving 98.26% accuracy.',
    image: cardamom,
    technologies: ['Python'],
    demoUrl: 'https://ieeexplore.ieee.org/abstract/document/9663367',
  },
  {
    title: 'Tomato plant disease classification',
    description: 'Agricultural productivity declines due to climate change and plant diseases. This study classifies tomato diseases using MFFN, achieving 99.83% accuracy.',
    image: tomatoes,
    technologies: ['Python'],
    demoUrl: 'https://www.sciencedirect.com/science/article/abs/pii/S0957417423008837',
  },
  {
    title: 'Multi-level deep information feature fusion extraction network for interpretable plant disease classification',
    description: 'DFN-PSAN enhances plant disease classification in real-world farms using deep learning, achieving 95.27% accuracy with improved interpretability and efficiency.',
    image: disease,
    technologies: ['Python'],
    demoUrl: 'https://www.sciencedirect.com/science/article/abs/pii/S0168169923008694',
  },
  {
    title: 'Systematic study on deep learning-based plant disease detection or classification',
    description: 'This study reviews 160 plant disease detection approaches using ML and DL, analyzing datasets, challenges, and the need for cost-effective automation.',
    image: detection,
    technologies: ['Python'],
    demoUrl: 'https://link.springer.com/article/10.1007/s10462-023-10517-0',
  },
  {
    title: 'Binary class and multi-class plant disease detection using ensemble deep learning-based approach',
    description: 'This study proposes an ensemble deep learning approach for plant disease detection, achieving up to 100% accuracy across various crop datasets.',
    image: detection2,
    technologies: ['Python'],
    demoUrl: 'https://www.inderscienceonline.com/doi/abs/10.1504/IJSAMI.2022.126802',
  },
  {
    title: 'Empirical Study on Multi Convolutional Layer-based Convolutional Neural Network Classifier for Plant Leaf Disease Detection',
    description: 'This study evaluates the MCLCNN classifier for real-time plant disease detection, achieving up to 99.25% accuracy on Peach plant leaves.',
    image: detection3,
    technologies: ['Python'],
    demoUrl: 'https://ieeexplore.ieee.org/abstract/document/9342729',
  },
  {
    title: 'An Efficient Infectious Disease Detection in Plants Using Deep Learning',
    description: 'This research explores deep learning for plant disease detection, achieving up to 99% accuracy using ensemble models, MFFN, and EfficientNetV2.',
    image: detection4,
    technologies: ['Python'],
    demoUrl: 'https://link.springer.com/chapter/10.1007/978-981-97-5204-1_3',
  },
  {
    title: 'Coffee Plant Disease Identification using Enhanced Short Learning EfficientNetV2',
    description: 'This study employs Enhanced EfficientNetV2-S for coffee plant disease detection, achieving 98.1% accuracy, surpassing DenseNet-121’s 92.9%.',
    image: coffee,
    technologies: ['Python'],
    demoUrl: 'https://ieeexplore.ieee.org/abstract/document/10440883',
  },
  {
    title: 'Comparative Analysis of Intrusion Detection System using ML and DL Techniques',
    description: 'This study enhances intrusion detection using feature selection and stacked ensemble learning, achieving robust classification on the NSL-KDD dataset.',
    image: ids,
    technologies: ['Python'],
    demoUrl: 'https://link.springer.com/chapter/10.1007/978-3-031-27409-1_67',
  },
  {
    title: 'Vehicle Re-identification Using Convolutional Neural Networks',
    description: 'This study enhances vehicle re-identification without number plates using filter grafting, semi-supervised learning, and multi-loss techniques for improved accuracy.',
    image: benz,
    technologies: ['Python'],
    demoUrl: 'https://link.springer.com/chapter/10.1007/978-981-99-1203-2_35',
  },
  {
    title: 'Aerial infrared thermal imaging transmission line defect detection methods incorporating explicit visual center structures',
    description: 'This study enhances infrared thermal imaging for transmission line defect detection using an explicit visual center structure and global attention mechanism, achieving 83.14% accuracy.',
    image: infrared,
    technologies: ['Python'],
    demoUrl: 'https://www.sciencedirect.com/science/article/abs/pii/S0263224124024904',
  },
  {
    title: 'Feature integration for frontal gait recognition through contour image analysis',
    description: 'This study introduces a frontal-view gait recognition method using Gait Energy Image (GEI), achieving superior identification performance on benchmark datasets.',
    image: biometric,
    technologies: ['Python'],
    demoUrl: 'https://link.springer.com/article/10.1007/s11760-024-03655-7',
  },
];

export default function Projects() {
  return (
    <div className="min-h-screen p-6 py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center text-gray-800" data-aos="fade-down">
          My Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:-translate-y-2 hover:shadow-2xl duration-300 flex flex-col"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-600 flex-grow">{project.description}</p>

                <div className="flex flex-wrap gap-2 my-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Updated Button with Blue Gradient */}
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300"
                >
                  Article
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

