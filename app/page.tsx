"use client";

import { useState } from "react";

const questions = [
  {
    id: 1,
    question: "¿Aún gestionas a tus pacientes por Excel?",
    options: ["Sí, es un caos", "A veces", "No, tengo un sistema"]
  },
  {
    id: 2,
    question: "¿Agendas pacientes por WhatsApp?",
    options: ["Sí, todo el día", "Ocasionalmente", "No, uso agenda digital"]
  },
  {
    id: 3,
    question: "¿Tus pagos no llegan a tiempo?",
    options: ["Siempre tengo ese problema", "A veces", "No, todo está en orden"]
  }
];

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const handleAnswer = (answer: string) => {
    const newAnswers = { ...answers, [currentQuestion]: answer };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    } else {
      setTimeout(() => {
        setIsCompleted(true);
      }, 300);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 overflow-hidden relative">
      {/* Gradient orbs background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <main className="relative z-10 w-full max-w-3xl px-6 py-12">
        {!isCompleted ? (
          <div className="space-y-12 animate-fadeIn">
            {/* Progress bar */}
            <div className="flex gap-2 justify-center">
              {questions.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    idx === currentQuestion
                      ? "w-12 bg-gradient-to-r from-purple-500 to-blue-500"
                      : idx < currentQuestion
                      ? "w-8 bg-zinc-600"
                      : "w-8 bg-zinc-800"
                  }`}
                />
              ))}
            </div>

            {/* Question */}
            <div className="text-center space-y-8">
              <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                {questions[currentQuestion].question}
              </h1>
              
              {/* Options */}
              <div className="flex flex-col gap-4 mt-12 max-w-xl mx-auto">
                {questions[currentQuestion].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(option)}
                    className="group relative px-8 py-6 rounded-2xl bg-zinc-800/50 border border-zinc-700/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-[1.02] hover:bg-zinc-800/80 backdrop-blur-sm"
                  >
                    <span className="text-lg text-zinc-200 group-hover:text-white transition-colors">
                      {option}
                    </span>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/10 group-hover:to-blue-500/10 transition-all duration-300"></div>
                  </button>
                ))}
              </div>
            </div>

            {/* Question counter */}
            <p className="text-center text-zinc-500 text-sm">
              Pregunta {currentQuestion + 1} de {questions.length}
            </p>
          </div>
        ) : (
          <div className="text-center space-y-8 animate-fadeIn">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
              ¡Gracias por responder!
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Entendemos tus desafíos y tenemos la solución perfecta para ti.
            </p>
            <div className="flex flex-col gap-4 items-center">
              <button
                onClick={() => {
                  setCurrentQuestion(0);
                  setAnswers({});
                  setIsCompleted(false);
                }}
                className="mt-8 px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
              >
                Comenzar de nuevo
              </button>
              
              <a
                href="https://wa.me/56912345678?text=Hola,%20vi%20el%20cuestionario%20y%20me%20interesa%20saber%20más"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-4 rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-600/50"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Contáctanos
              </a>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
