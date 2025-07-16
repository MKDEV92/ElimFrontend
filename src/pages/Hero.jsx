import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBookOpen, FaGraduationCap, FaFileAlt } from "react-icons/fa";

const Hero = () => {
  const navigate = useNavigate();

  const materials = [
    {
      icon: <FaFileAlt className="text-4xl text-violet-600 mx-auto mb-4" />,
      title: "KASNEB Past Papers",
      desc: "Access KASNEB college and mock past exams from top institutions.",
    },
    {
      icon: <FaBookOpen className="text-4xl text-violet-600 mx-auto mb-4" />,
      title: "Course Notes",
      desc: "Comprehensive, organized notes to help you master every subject.",
    },
    {
      icon: <FaGraduationCap className="text-4xl text-violet-600 mx-auto mb-4" />,
      title: "Revision Materials",
      desc: "Prepare with up-to-date mocks aligned with current syllabuses.",
    },
  ];

  const testimonials = [
    {
      quote:
        "These materials helped me boost my grades in Physics and Biology. Super organized and easy to follow.",
      name: "Faith N., KCSE Candidate",
    },
    {
      quote:
        "As a diploma student, it’s hard to find resources. This site gave me mock papers that felt exactly like the real thing.",
      name: "Brian O., Diploma Student",
    },
    {
      quote:
        "Affordable and relevant. I passed my exams with confidence thanks to these revision packs.",
      name: "Mercy K., Business Studies",
    },
  ];

  return (
    <section>
      {/* Hero Top Section */}
      <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white py-20 px-6 text-center">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Ace Your Exams with Quality Revision Materials
          </h1>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Explore a wide range of past papers, course notes, and mock exams –
            all curated for Kenyan secondary and college students.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigate("/courses")}
              className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-full font-medium transition"
            >
              Browse Materials
            </button>
            <button className="border border-violet-300 hover:bg-violet-50 text-white hover:text-violet-700 px-6 py-3 rounded-full font-medium transition">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Materials Cards */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center">
          {materials.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition"
            >
              {item.icon}
              <h3 className="text-xl text-black font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-white py-16 px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          What Students Are Saying
        </h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition"
            >
              <p className="text-gray-600 italic mb-4">“{testimonial.quote}”</p>
              <div className="font-semibold text-gray-800">{testimonial.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
