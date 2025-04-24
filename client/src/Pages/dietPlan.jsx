import { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const questions = [
  {
    question: "What's your primary fitness goal?",
    options: ["Weight Loss", "Muscle Gain", "Maintenance"],
    key: "goal",
  },
  {
    question: "What's your dietary preference?",
    options: ["Vegetarian", "Vegan", "Non-Vegetarian"],
    key: "preference",
  },
  {
    question: "How many meals do you prefer daily?",
    options: ["3", "4", "5+"],
    key: "mealsPerDay",
  },
];

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const DietPlan = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [plans, setPlans] = useState({});
  const [loadingDay, setLoadingDay] = useState(null);
  const [openDay, setOpenDay] = useState(null);
  const [savedDays, setSavedDays] = useState({});
  const pdfRef = useRef(null);

  useEffect(() => {
    if (currentQuestion >= questions.length) {
      generateFullWeekPlan();
    }
  }, [currentQuestion]);

  const generateDietPlan = async (day) => {
    setLoadingDay(day);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const vibes = [
        "Make it light and energizing 🌞",
        "Add a bit of traditional flair 🍲",
        "Go international with flavors 🌍",
        "Make it creative and playful 🎨",
        "Think fitness-enthusiast approved 💪",
        "Keep it cozy and comfort-food-inspired 🍛",
        "Add a bit of street food fusion 🌯",
      ];
    const prompt = `Generate a structured ${answers.preference} diet plan for someone aiming for ${answers.goal}, eating ${answers.mealsPerDay} meals a day, for ${day}.

Use this exact format:
- Title the section as "Morning", "Lunch", "Evening Snack", and "Dinner"
- Below each section title, give 3-4 bullet points (not using * or - symbols), just line breaks
- No markdown symbols, no asterisks, no stars
- Make it sound fun and include relevant emojis
- Keep it readable and short
`;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();
      setPlans((prev) => ({ ...prev, [day]: text }));
    } catch (err) {
      console.error("Error generating:", err);
      setPlans((prev) => ({ ...prev, [day]: "❌ Failed to generate. Try again." }));
    } finally {
      setLoadingDay(null);
    }
  };

  const generateFullWeekPlan = async () => {
    for (const day of daysOfWeek) {
      await generateDietPlan(day);
    }
  };

  const toggleDay = (day) => {
    setOpenDay((prev) => (prev === day ? null : day));
  };

  const handleSave = (day) => {
    setSavedDays((prev) => ({ ...prev, [day]: true }));
    // Hook Firebase or local storage here
  };

  const handleAnswer = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setCurrentQuestion((prev) => prev + 1);
  };

  const handleDownloadPDF = async () => {
    const input = pdfRef.current;
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('DietPlan.pdf');
  };

  const formatPlan = (plan) => {
    const sections = plan
      .split(/(?=Breakfast|Lunch|Dinner|Snack|Snacks)/gi)
      .map((sec, idx) => (
        <div key={idx} className="border-b border-gray-700 pb-3 mb-3">
          <h4 className="text-lg text-purple-400 font-semibold mb-1">
            {sec.split('\n')[0].trim()}
          </h4>
          <p className="text-sm text-gray-300 whitespace-pre-wrap">
            {sec.split('\n').slice(1).join('\n').replace(/\*/g, '').trim()}
          </p>
        </div>
      ));
    return sections;
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white flex flex-col items-center py-10 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-3xl md:text-4xl font-bold mb-6">🥗 AI-Powered Diet Wizard</h1>

      {currentQuestion < questions.length ? (
        <div className="bg-gray-900 p-6 rounded-2xl shadow-lg text-center max-w-md">
          <h2 className="text-xl mb-4">{questions[currentQuestion].question}</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {questions[currentQuestion].options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(questions[currentQuestion].key, option)}
                className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-full transition"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          <motion.div
            className="bg-gray-900 rounded-2xl shadow-lg p-6 max-w-2xl w-full space-y-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            ref={pdfRef}
          >
            <h2 className="text-xl font-semibold mb-2 text-purple-300">
              {answers.goal} | {answers.preference} | {answers.mealsPerDay} meals/day
            </h2>

            {daysOfWeek.map((day) => (
              <div key={day}>
                <div
                  onClick={() => toggleDay(day)}
                  className="cursor-pointer py-3 flex justify-between items-center border-b border-gray-600"
                >
                  <h3 className="text-lg font-semibold">{day}</h3>
                  <span className="text-sm text-gray-400">
                    {openDay === day ? "Close" : "Open"}
                  </span>
                </div>

                {openDay === day && (
                  <motion.div
                    className="p-4 bg-gray-800 rounded-lg mt-2 shadow-inner"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {loadingDay === day ? (
                      <p className="text-center text-purple-300 animate-pulse">⏳ Generating...</p>
                    ) : (
                      <div className="space-y-3">
                        {plans[day] ? formatPlan(plans[day]) : "⚠️ Not available."}
                      </div>
                    )}
                    <div className="flex justify-between pt-4">
                      <button
                        onClick={() => generateDietPlan(day)}
                        disabled={loadingDay === day}
                        className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition"
                      >
                        🔁 Regenerate
                      </button>
                      <button
                        onClick={() => handleSave(day)}
                        disabled={!plans[day]}
                        className={`px-4 py-2 rounded-lg transition ${
                          savedDays[day] ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"
                        }`}
                      >
                        {savedDays[day] ? "✅ Saved" : "💾 Save"}
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </motion.div>

          <button
            onClick={handleDownloadPDF}
            className="mt-6 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-semibold text-white shadow-lg transition"
          >
            📥 Download Full Diet Plan (PDF)
          </button>
        </>
      )}
    </motion.div>
  );
};

export default DietPlan;
