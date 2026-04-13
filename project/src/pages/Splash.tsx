import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 2800); // smooth timing

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen w-full relative overflow-hidden">

      {/* 🔥 Background Image */}
      <motion.img
        src="/splash.png" // put your image in public folder
        alt="MediTwin"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.5 }}
      />

      {/* 🌫 Soft white overlay (medical premium feel) */}
      <div className="absolute inset-0 bg-white/15 backdrop-blur-[2px]" />

      {/* ✨ Gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-200/30 via-purple-200/20 to-transparent" />

      {/* 🧠 Center Content */}
      <div className="relative z-10 flex items-center justify-center h-full">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-center"
        >

          {/* Title */}
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            MediTwin
          </h1>

          {/* Tagline */}
          <p className="mt-3 text-gray-600 text-lg tracking-wide">
            Visualizing Health, Simplifying Care
          </p>

        </motion.div>

      </div>
    </div>
  );
}