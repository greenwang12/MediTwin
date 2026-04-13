import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white p-6">

      {/* 🔥 HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          MediTwin Dashboard
        </h1>

        <button
          onClick={() => navigate("/analysis")}
          className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl"
        >
          Start Analysis
        </button>
      </div>

      {/* 💎 STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        {[
          { title: "Treatment Rate", value: "92%", change: "+12%" },
          { title: "Recovery Index", value: "87%", change: "+8%" },
          { title: "Risk Level", value: "Low", change: "-5%" },
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg"
          >
            <h2 className="text-gray-400">{item.title}</h2>
            <p className="text-2xl font-bold mt-2">{item.value}</p>
            <p className="text-green-400 text-sm mt-1">{item.change}</p>
          </motion.div>
        ))}
      </div>

      {/* 📊 GRAPH SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* GRAPH */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">

          <h2 className="text-lg mb-4 text-gray-300">
            AI Health Trend Analysis
          </h2>

          {/* Fake Graph */}
          <div className="h-[250px] flex items-end gap-2">
            {[40, 60, 30, 80, 70, 90, 50, 75].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-blue-500 to-purple-500 rounded-md"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        {/* 🤖 AI PANEL */}
        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex flex-col justify-between">

          <div>
            <h2 className="text-lg text-gray-300">AI Assistant</h2>
            <p className="text-sm text-gray-400 mt-2">
              Monitoring patient trends and predicting potential risks.
            </p>
          </div>

          <button
            onClick={() => navigate("/analysis")}
            className="mt-6 bg-gradient-to-r from-blue-500 to-purple-500 py-3 rounded-xl"
          >
            Run Diagnosis
          </button>
        </div>
      </div>

      {/* 🧊 INTERACTIVE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

        {["Heart Analysis", "Lung Check", "Kidney Scan"].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/analysis")}
            className="cursor-pointer p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition"
          >
            <h2 className="text-lg font-semibold">{item}</h2>
            <p className="text-sm text-gray-400 mt-2">
              Tap to analyze this system
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}