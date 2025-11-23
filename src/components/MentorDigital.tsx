import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send } from "lucide-react";
import {
  questionsMentor,
  getMentorAnswer,
} from "@/domain/services/mentorService";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  isTyping?: boolean;
}

export const MentorDigital = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [availableQuestions, setAvailableQuestions] = useState(
    questionsMentor.map((_question, index) => index),
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleQuestion = (index: number) => {
    const question = questionsMentor[index];
    const response = getMentorAnswer(index);

    const userMessageId = `msg-${Date.now()}`;
    const responseMessageId = `msg-${Date.now()}-response`;

    setMessages((prev) => [
      ...prev,
      { id: userMessageId, text: question.question, isUser: true },
    ]);

    setAvailableQuestions((prev) => prev.filter((i) => i !== index));

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: responseMessageId, text: "", isUser: false, isTyping: true },
      ]);

      let charIndex = 0;
      const typingSpeed = 15;

      const typeMessage = () => {
        if (charIndex < response.length) {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === responseMessageId
                ? { ...msg, text: response.substring(0, charIndex + 1) }
                : msg,
            ),
          );
          charIndex++;
          setTimeout(typeMessage, typingSpeed);
        } else {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === responseMessageId ? { ...msg, isTyping: false } : msg,
            ),
          );
        }
      };

      typeMessage();
    }, 500);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 h-full flex flex-col animate-slideInRight max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b">
        <div className="bg-blue-100 p-2 rounded-full animate-pulse">
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            Mentor Digital
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Resuelve tus dudas sobre formalización
          </p>
        </div>
      </div>

      <div className="overflow-y-auto mb-4 space-y-3 sm:space-y-4 h-[600px] sm:min-h-[600px] pr-1 sm:pr-2">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center px-4 animate-fadeIn">
              <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-6 sm:p-8 border border-blue-100">
                <MessageCircle className="w-12 h-12 sm:w-16 sm:h-16 text-blue-600 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                  ¡Bienvenido al Mentor Digital!
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Selecciona una pregunta para comenzar tu proceso de
                  formalización. Estamos aquí para ayudarte paso a paso.
                </p>
              </div>
            </div>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? "justify-end" : "justify-start"} animate-fadeInUp`}
            style={{
              animationDelay: `${index * 50}ms`,
            }}
          >
            <div
              className={`max-w-[85%] sm:max-w-[80%] px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl transition-all duration-300 ${
                message.isUser
                  ? "bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-tr-none shadow-md"
                  : "bg-gray-100 text-gray-900 rounded-tl-none"
              }`}
            >
              <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                {message.text}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {availableQuestions.length > 0 ? (
        <div className="space-y-2 sm:space-y-3 animate-slideUp">
          <p className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3 px-1">
            Preguntas disponibles:
          </p>
          <div className="space-y-2 max-h-[200px] sm:max-h-[280px] overflow-y-auto pr-1 sm:pr-2">
            {availableQuestions.map((index) => (
              <button
                key={index}
                onClick={() => handleQuestion(index)}
                className="w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 bg-blue-50 hover:bg-blue-100 active:bg-blue-200 rounded-xl transition-colors duration-200 flex items-start gap-2 sm:gap-3 group"
              >
                <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 group-hover:translate-x-1 transition-transform flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-gray-700 font-medium leading-snug">
                  {questionsMentor[index].question}
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        messages.length > 0 && (
          <div className="text-center py-3 sm:py-4 bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl border border-blue-100 animate-fadeIn">
            <p className="text-xs sm:text-sm font-semibold text-blue-800">
              Has consultado todas las preguntas
            </p>
            <p className="text-xs text-blue-600 mt-1">
              ¡Felicitaciones por tu interés en formalizarte!
            </p>
          </div>
        )
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.4s ease-out forwards;
        }
        .animate-slideInRight {
          animation: slideInRight 0.5s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};
