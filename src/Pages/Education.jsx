import React from "react";
import { FaGraduationCap, FaSchool, FaMedal, FaBookOpen } from "react-icons/fa";

const educationData = [
  {
    degree: "M.Sc. Electronics",
    institution: "Don Bosco College, Monnuthy, Thrissur",
    date: "09/2020 – 09/2022",
    icon: <FaGraduationCap className="text-3xl md:text-4xl text-[#a855f7] mb-2" />, // highlight as badge
    badge: "Highest Degree",
    gradient: "from-[#a855f7]/90 to-[#6366f1]/80",
  },
  {
    degree: "B.Sc. Electronics",
    institution: "Institute of Ilumon Resources Development, Malappuram",
    date: "08/2018 – 03/2020",
    icon: <FaBookOpen className="text-2xl md:text-3xl text-[#7ed7c1] mb-2" />, 
    gradient: "from-[#7ed7c1]/80 to-[#6366f1]/60",
  },
  {
    degree: "Higher Secondary Education (HSE)",
    institution: "Govt. Manavedan Higher Secondary School, Nilambur",
    date: "03/2018",
    icon: <FaSchool className="text-2xl md:text-3xl text-[#fec260] mb-2" />, 
    gradient: "from-[#fec260]/80 to-[#6366f1]/40",
  },
  {
    degree: "Matriculation (SSLC)",
    institution: "Good Hope English Medium School, Nilambur",
    date: "03/2015",
    icon: <FaMedal className="text-2xl md:text-3xl text-[#52b69a] mb-2" />, 
    gradient: "from-[#52b69a]/70 to-[#6366f1]/30",
  },
];

const Education = () => (
  <section id="Education" className="md:px-[10%] px-[5%] w-full bg-[#030014] sm:mt-0 mt-[3rem] select-none">
    <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
      <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
        <span
          style={{
            color: "#6366f1",
            backgroundImage: "linear-gradient(45deg, #6366f1 10%, #a855f7 93%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Education
        </span>
      </h2>
      <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
        My academic journey at a glance.
      </p>
    </div>
    <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-7 pb-12">
      {educationData.map((item, idx) => (
        <div
          key={idx}
          className={`relative rounded-2xl shadow-xl border border-white/10 bg-gradient-to-br ${item.gradient} p-7 md:p-10 flex flex-col items-start min-h-[180px] overflow-hidden animate-fadeup`}
          data-aos="zoom-in"
          data-aos-delay={idx * 150}
          data-aos-duration="900"
        >
          {/* Badge for Highest Degree */}
          {item.badge && (
            <span className="absolute top-5 right-5 bg-[#a855f7]/80 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg tracking-wide">
              {item.badge}
            </span>
          )}

          {item.icon}
          <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
            {item.degree}
          </h3>
          <div className="text-gray-200 text-sm md:text-base mb-0.5 font-semibold">
            {item.institution}
          </div>
          <div className="text-slate-200 text-xs md:text-sm opacity-80">
            {item.date}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Education;
