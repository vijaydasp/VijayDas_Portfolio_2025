import React, { useEffect, memo, useMemo, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  FileText,
  Code,
  Award,
  Globe,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

// ---------- Memoized Components ----------

const Header = memo(() => (
  <div className="text-center lg:mb-8 mb-2 px-[5%]">
    <div className="inline-block relative group">
      <h2
        className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
        data-aos="zoom-in-up"
        data-aos-duration="600"
      >
        About Me
      </h2>
    </div>
    <p
      className="mt-2 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2"
      data-aos="zoom-in-up"
      data-aos-duration="800"
    >
      <Sparkles className="w-5 h-5 text-purple-400" />
      Transforming ideas into digital experiences
      <Sparkles className="w-5 h-5 text-purple-400" />
    </p>
  </div>
));

// ---------- Profile Image Component ----------

const ProfileImage = memo(() => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    let isMounted = true;
    const fetchProfileImage = async () => {
      try {
        const snapshot = await getDoc(doc(db, "images", "profile_image"));
        if (snapshot.exists()) {
          const data = snapshot.data();
          if (data && typeof data.Img === "string" && data.Img.length > 0) {
            if (isMounted) setImageUrl(data.Img);
          }
        }
      } catch (err) {
        console.error("Failed to load profile image from Firestore", err);
      }
    };
    fetchProfileImage();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="flex justify-end items-center sm:p-12 sm:py-0 sm:pb-0 p-0 py-2 pb-2">
      <div className="relative group" data-aos="fade-up" data-aos-duration="1000">
        <div className="absolute -inset-6 opacity-[25%] z-0 hidden sm:block">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-600 rounded-full blur-2xl animate-spin-slower" />
          <div className="absolute inset-0 bg-gradient-to-l from-fuchsia-500 via-rose-500 to-pink-600 rounded-full blur-2xl animate-pulse-slow opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-600 via-cyan-500 to-teal-400 rounded-full blur-2xl animate-float opacity-50" />
        </div>
        <div className="relative">
          <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-[0_0_40px_rgba(120,119,198,0.3)] transform transition-all duration-700 group-hover:scale-105">
            <div className="absolute inset-0 border-4 border-white/20 rounded-full z-20 transition-all duration-700 group-hover:border-white/40 group-hover:scale-105" />
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Profile"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                loading="lazy"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

// ---------- Stat Card Component ----------

const StatCard = memo(({ icon: Icon, color, value, label, description, animation }) => (
  <div data-aos={animation} data-aos-duration={1300} className="relative group">
    <div className="relative z-10 bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full flex flex-col justify-between">
      <div
        className={`absolute -z-10 inset-0 bg-gradient-to-br ${color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
      ></div>

      <div className="flex items-center justify-between mb-4">
        <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white/10 transition-transform group-hover:rotate-6">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <span className="text-4xl font-bold text-white">{value}</span>
      </div>

      <div>
        <p className="text-sm uppercase tracking-wider text-gray-300 mb-2">
          {label}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-400">{description}</p>
          <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
        </div>
      </div>
    </div>
  </div>
));

// ---------- Main About Page ----------

const AboutPage = () => {
  const [cvUrl, setCvUrl] = useState("");
  const [totalProjects, setTotalProjects] = useState(0);
  const [totalCertificates, setTotalCertificates] = useState(0);

  // Fetch CV from Firestore
  useEffect(() => {
    const fetchCV = async () => {
      try {
        const snapshot = await getDoc(doc(db, "files", "cv_pdf"));
        if (snapshot.exists()) {
          const data = snapshot.data();
          if (data && typeof data.CV === "string" && data.CV.length > 0) {
            setCvUrl(data.CV);
          }
        }
      } catch (err) {
        console.error("Failed to load CV from Firestore:", err);
      }
    };

    fetchCV();
  }, []);

  // Update counts from localStorage
  useEffect(() => {
    const updateCounts = () => {
      const storedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
      const storedCertificates = JSON.parse(localStorage.getItem("certificates") || "[]");
      
      setTotalProjects(storedProjects.length);
      setTotalCertificates(storedCertificates.length);
    };

    // Initial load
    updateCounts();

    // Listen for storage changes
    window.addEventListener("storage", updateCounts);

    // Custom event for same-page updates
    const handleLocalStorageUpdate = () => updateCounts();
    window.addEventListener("localStorageUpdated", handleLocalStorageUpdate);

    return () => {
      window.removeEventListener("storage", updateCounts);
      window.removeEventListener("localStorageUpdated", handleLocalStorageUpdate);
    };
  }, []);

  // Calculate years of experience (memoized)
  const YearExperience = useMemo(() => {
    const startDate = new Date(2022, 8, 1);
    const today = new Date();
    return (
      today.getFullYear() -
      startDate.getFullYear() -
      (today <
        new Date(today.getFullYear(), startDate.getMonth(), startDate.getDate())
        ? 1
        : 0)
    );
  }, []);

  // Initialize AOS
  useEffect(() => {
    const initAOS = () => {
      AOS.init({ once: false });
    };
    initAOS();
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initAOS, 250);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  // Stats data
  const statsData = useMemo(
    () => [
      {
        icon: Code,
        color: "from-[#6366f1] to-[#a855f7]",
        value: totalProjects,
        label: "Total Projects",
        description: "Where innovation meets intelligence",
        animation: "fade-right",
      },
      {
        icon: Award,
        color: "from-[#a855f7] to-[#6366f1]",
        value: totalCertificates,
        label: "Certificates",
        description: "Professional skills validated",
        animation: "fade-up",
      },
      {
        icon: Globe,
        color: "from-[#6366f1] to-[#a855f7]",
        value: YearExperience,
        label: "Years of Experience",
        description: "Continuous learning journey",
        animation: "fade-left",
      },
    ],
    [totalProjects, totalCertificates, YearExperience]
  );

  return (
    <div
      className="h-auto pb-[10%] text-white overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] mt-10 sm-mt-0"
      id="About"
    >
      <Header />

      <div className="w-full mx-auto pt-1 sm:pt-1 relative">
        <div className="flex flex-col-reverse lg:grid lg:[grid-template-columns:1.5fr_1fr] gap-10 lg:gap-16 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                Hello, I'm
              </span>{" "}
              <span className="text-gray-200">Vijay Das P</span>
            </h2>

            <p
              className="text-xs sm:text-sm lg:text-base text-gray-400 leading-relaxed text-justify pb-4 sm:pb-0 max-w-3xl mx-auto"
              data-aos="fade-right"
              data-aos-duration="1500"
            >
              Highly skilled Embedded Systems Engineer with 3+ years of experience in designing, developing, and integrating embedded solutions for academic and industrial applications. Proficient in C, Python, and microcontroller programming with hands-on expertise in Raspberry Pi, ESP32, ESP8266, and Arduino platforms. Strong background in firmware development, real-time sensor interfacing, circuit design, and hardware-software integration. Experienced with embedded Linux (Raspberry Pi OS), and adept at building IoT systems, automation tools, and intelligent edge applications. Passionate about real-time systems, IoT, and smart automation with a strong focus on performance and reliability.
            </p>



            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 lg:gap-4 lg:px-0 w-full">
              {cvUrl ? (
                <a
                  href={cvUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full lg:w-auto"
                >
                  <button
                    data-aos="fade-up"
                    data-aos-duration="800"
                    className="w-full lg:w-auto sm:px-6 py-2 sm:py-3 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center lg:justify-start gap-2 shadow-lg hover:shadow-xl animate-bounce-slow"
                  >
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5" /> Download CV
                  </button>
                </a>
              ) : (
                <button
                  disabled
                  className="w-full lg:w-auto sm:px-6 py-2 sm:py-3 rounded-lg bg-gray-700 text-gray-300 font-medium cursor-not-allowed flex items-center justify-center lg:justify-start gap-2"
                >
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5" /> Loading CV...
                </button>
              )}

              <a href="#Portofolio" className="w-full lg:w-auto">
                <button
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  className="w-full lg:w-auto sm:px-6 py-2 sm:py-3 rounded-lg border border-[#a855f7]/50 text-[#a855f7] font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center lg:justify-start gap-2 hover:bg-[#a855f7]/10 animate-bounce-slow delay-200"
                >
                  <Code className="w-4 h-4 sm:w-5 sm:h-5" /> View Projects
                </button>
              </a>
            </div>
          </div>

          <ProfileImage />
        </div>

        <a href="#Portofolio">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 cursor-pointer">
            {statsData.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </a>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes spin-slower {
          to { transform: rotate(360deg); }
        }
        .animate-bounce-slow { animation: bounce 3s infinite; }
        .animate-pulse-slow { animation: pulse 3s infinite; }
        .animate-spin-slower { animation: spin-slower 8s linear infinite; }
      `}</style>
    </div>
  );
};

export default memo(AboutPage);
