import { useState, useEffect } from "react";
import Body from "./features/medVisual/components/Body";
import { useRef } from "react";

type DiseaseResult = {
  condition: string;
  confidence?: number;
  risk: string;
  doctor_explanation: string;
  patient_explanation: string;
  future_if_untreated: string[];
  how_to_improve: string[];
};

type SelectedDisease = {
  name: string;
  organ: string;
};


export default function Analysis() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [symptoms, setSymptoms] = useState("");
  const [results, setResults] = useState<DiseaseResult[]>([]);
  const [mode, setMode] = useState<"doctor" | "patient">("patient");
  const [loading, setLoading] = useState(false);
const [selectedDisease, setSelectedDisease] = useState<SelectedDisease | null>(null);

  // 🔊 Voice
  const [speaking, setSpeaking] = useState(false);
  const [lang, setLang] = useState("en");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const resultRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadVoices = () => {
      setVoices(window.speechSynthesis.getVoices());
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  // 🔥 ANALYZE
  async function analyze() {
    try {
      if (!age || !symptoms) {
        alert("Enter age and symptoms");
        return;
      }

      setLoading(true);

      const res = await fetch("http://127.0.0.1:8000/analyze-patient", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          age: Number(age),
          gender,
          symptoms: symptoms.split(",").map((s) => s.trim()),
        }),
      });

      const data = await res.json();
      const analysis: DiseaseResult[] = data.analysis ?? [];

      const sorted = analysis.sort(
        (a, b) => (b.confidence || 0) - (a.confidence || 0)
      );

      setResults(sorted);
      setTimeout(() => {
  resultRef.current?.scrollIntoView({ behavior: "smooth" });
}, 300);

      // ✅ Correct disease mapping
if (sorted.length > 0) {
  const condition = sorted[0]?.condition?.toLowerCase() || "";

  let organ = "";

  if (condition.includes("heart")) organ = "heart";
  else if (condition.includes("asthma") || condition.includes("lung")) organ = "lungs";
  else if (condition.includes("kidney")) organ = "kidneys";

 if (organ) {
  setSelectedDisease({
    name: sorted[0].condition,
    organ: organ,
  });
}
}
    } catch (err) {
      console.error(err);
      alert("API error");
    } finally {
      setLoading(false);
    }
  }

  // 🔊 SPEAK (FIXED)
  async function speak(text: string) {
    try {
      window.speechSynthesis.cancel();
      setSpeaking(true);

      let finalText = text;

      if (lang !== "en") {
        const res = await fetch("http://127.0.0.1:8000/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text, lang }),
        });

        const data = await res.json();
        finalText = data.translated;
      }

      const speech = new SpeechSynthesisUtterance(finalText);

      const langMap: Record<string, string> = {
        en: "en-US",
        hi: "hi-IN",
        kn: "kn-IN",
      };

      speech.lang = langMap[lang] || "en-US";

      const voice =
        voices.find((v) => v.lang === speech.lang) ||
        voices.find((v) => v.lang.startsWith(lang)) ||
        voices.find((v) => v.lang.startsWith("en"));

      if (voice) speech.voice = voice;

      speech.rate = 0.9;

      speech.onend = () => setSpeaking(false);
      speech.onerror = () => setSpeaking(false);

      window.speechSynthesis.speak(speech);
    } catch (err) {
      console.error(err);
      setSpeaking(false);
    }
  }

  return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">

    {/* 🔥 PROFESSIONAL HEADER */}
    <div className="text-center mb-10">
      <h1 className="text-5xl font-extrabold tracking-tight">
        <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
          MediTwin
        </span>
      </h1>

      <div className="flex items-center justify-center gap-3 mt-3 text-gray-500">
        <div className="h-[1px] w-12 bg-gray-300"></div>
        <p className="text-sm tracking-wide">
          Visualizing Health, Simplifying Care
        </p>
        <div className="h-[1px] w-12 bg-gray-300"></div>
      </div>
    </div>

    {/* 🧊 GLASS FORM CARD */}
    <div className="max-w-xl mx-auto p-8 rounded-3xl backdrop-blur-xl bg-white/60 border border-white/40 shadow-2xl">

      {/* AGE */}
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Enter age"
        className="w-full p-4 rounded-xl bg-white/70 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4 transition"
      />

      {/* GENDER */}
      <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        className="w-full p-4 rounded-xl bg-white/70 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4 transition"
      >
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      {/* SYMPTOMS */}
      <input
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        placeholder="Enter symptoms"
        className="w-full p-4 rounded-xl bg-white/70 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-6 transition"
      />

      {/* ANALYZE BUTTON */}
      <button
        onClick={analyze}
        className="mx-auto block px-10 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-lg font-medium shadow-md hover:shadow-xl hover:scale-[1.03] transition"
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

    </div>
      {/* MODE */}
      {results.length > 0 && (
        <div className="flex justify-center mt-6 gap-3">
          <button
            onClick={() => setMode("doctor")}
            className={`px-5 py-2 rounded-lg ${
              mode === "doctor" ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
          >
            👨‍⚕️ Doctor
          </button>

          <button
            onClick={() => setMode("patient")}
            className={`px-5 py-2 rounded-lg ${
              mode === "patient" ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
          >
            🙍 Patient
          </button>
        </div>
      )}

      {/* 🔥 SPLIT */}
      {results.length > 0 && (
        <div ref={resultRef} className="max-w-6xl mx-auto mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* LEFT AI PANEL */}
          <div className="space-y-4">
            {results.map((d, i) => {
              const isTop = i === 0;

              return (
                <div
                  key={i}
                  className={`p-6 rounded-2xl shadow-md border ${
                    isTop ? "border-blue-500 bg-blue-50" : "bg-white border-gray-200"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-blue-700">
                      {d.condition}
                      {isTop && <span className="ml-2 text-sm">⭐ Top Match</span>}
                    </h2>

                    {d.confidence && (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        {d.confidence.toFixed(1)}%
                      </span>
                    )}
                  </div>

                  <p className="mt-4 text-gray-700 leading-relaxed">
                    {mode === "doctor"
                      ? d.doctor_explanation
                      : d.patient_explanation}
                  </p>

                  <select
                    value={lang}
                    onChange={(e) => setLang(e.target.value)}
                    className="mt-4 w-full p-3 border rounded-xl bg-gray-50"
                  >
                    <option value="en">GB English</option>
                    <option value="hi">Hindi</option>
                    <option value="kn">Kannada</option>
                  </select>

                  <button
                    onClick={() =>
                      speak(
                        mode === "doctor"
                          ? d.doctor_explanation
                          : d.patient_explanation
                      )
                    }
                    className="mt-4 w-full bg-green-500 text-white py-3 rounded-xl"
                  >
                    🔊 Listen Explanation
                  </button>

                  <button
                    onClick={() => {
                      window.speechSynthesis.cancel();
                      setSpeaking(false);
                    }}
                    className="mt-3 w-full bg-red-500 text-white py-3 rounded-xl"
                  >
                    ⏹ Stop
                  </button>

                  {speaking && (
                    <p className="text-sm text-gray-500 mt-2">🔊 Speaking...</p>
                  )}

                  <div className="mt-5">
                    <h3 className="text-yellow-600 font-semibold mb-2">
                      ⚠️ Disease Progression
                    </h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {d.future_if_untreated?.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-green-600 font-semibold mb-2">
                      ✅ Improvement
                    </h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {d.how_to_improve?.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT BODY */}
          <div className="bg-white rounded-2xl shadow border flex items-start justify-center p-4 min-h-[500px] overflow-hidden">
            {selectedDisease && <Body selectedDisease={selectedDisease} />}
          </div>

        </div>
      )}
    </div>
  );
}