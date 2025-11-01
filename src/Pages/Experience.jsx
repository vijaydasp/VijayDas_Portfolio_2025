import React from "react";

const Experience = () => {
  return (
    <section id="Experience" className="md:px-[10%] px-[5%] w-full bg-[#030014] sm:mt-0 mt-[3rem]">
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
            Experience
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Professional roles, responsibilities, and impact across embedded systems and AI/ML.
        </p>
      </div>

      <div className="w-full pb-14">
        <div
          className="relative border border-white/10 rounded-2xl p-6 md:p-8 bg-white/5 backdrop-blur-md overflow-hidden"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <div className="absolute inset-0 pointer-events-none"
               style={{
                 background:
                   "radial-gradient(1200px 200px at 50% -20%, rgba(99,102,241,0.08), rgba(99,102,241,0) 60%), radial-gradient(1200px 200px at 50% 120%, rgba(168,85,247,0.08), rgba(168,85,247,0) 60%)",
               }}
          />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-white">Embedded Systems Engineer</h3>
              <p className="text-slate-300">Nexus Technologies</p>
            </div>
            <div className="text-slate-400 text-sm md:text-base">
              <span>2022 – 2025</span>
              <span className="mx-2">|</span>
              <span>Calicut, India</span>
            </div>
          </div>

          <hr className="my-6 border-white/10" />

          <ul className="list-disc list-inside space-y-3 text-slate-300">
            <li>
              Designed and developed embedded system solutions for academic and industrial applications using Raspberry Pi, ESP32, ESP8266, and Arduino.
            </li>
            <li>
              Provided technical guidance and hardware support for student and institutional projects.
            </li>
            <li>
              Worked on real-time sensor interfacing, microcontroller programming, and PCB/circuit design.
            </li>
            <li>
              Collaborated on prototyping and testing devices for automation, IoT, and control systems.
            </li>
            <li>
              Developed web-based and standalone applications using Python, Flask, and Django.
            </li>
            <li>
              Built and deployed AI/ML models including YOLO and TensorFlow for object detection and classification projects.
            </li>
            <li>
              Guided students through project architecture, API development, and database integration.
            </li>
            <li>
              Integrated software tools into embedded hardware setups for complete IoT solutions.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Experience;


