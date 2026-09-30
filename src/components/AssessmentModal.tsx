import React, { useState } from 'react';
import { useLMS } from '../context/LMSContext';
import {
  X,
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ChevronRight,
  RotateCcw
} from 'lucide-react';

export const AssessmentModal: React.FC = () => {
  const {
    activeQuizState,
    setActiveQuizState,
    submitQuiz,
    currentUser
  } = useLMS();

  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<{ passed: boolean; scorePercent: number } | null>(null);

  if (!activeQuizState) return null;

  const { course, module: currentModule, quiz } = activeQuizState;

  const handleOptionSelect = (questionId: string, optionIndex: number) => {
    if (result) return; // Prevent changing after submission
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const isAllAnswered = quiz.questions.every(q => selectedAnswers[q.id] !== undefined);

  const handleSubmit = () => {
    const outcome = submitQuiz(course.id, quiz.id, selectedAnswers);
    setResult(outcome);
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setResult(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-amber-400 font-mono uppercase tracking-wider block">
                {course.title}
              </span>
              <h3 className="text-sm sm:text-base font-bold font-display text-white">
                {quiz.title}
              </h3>
            </div>
          </div>

          <button
            onClick={() => {
              setActiveQuizState(null);
              setResult(null);
            }}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Result Banner if submitted */}
          {result && (
            <div
              className={`p-5 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
                result.passed
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                  : 'bg-red-500/10 border-red-500/30 text-red-200'
              }`}
            >
              <div className="flex items-center gap-3">
                {result.passed ? (
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />
                ) : (
                  <XCircle className="w-8 h-8 text-red-400 shrink-0" />
                )}
                <div>
                  <h4 className="text-base font-bold text-white">
                    {result.passed ? 'Assessment Passed Successfully!' : 'Passing Criteria Not Met'}
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Your Score: <strong className="font-mono text-white">{result.scorePercent}%</strong> (Required:{' '}
                    {quiz.passingScorePercent}%)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {!result.passed && (
                  <button
                    onClick={handleReset}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Quiz</span>
                  </button>
                )}
                <button
                  onClick={() => {
                    setActiveQuizState(null);
                    setResult(null);
                  }}
                  className="px-4 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-colors"
                >
                  Continue Learning
                </button>
              </div>
            </div>
          )}

          {/* Assessment Instructions */}
          {!result && (
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-slate-300 flex items-center justify-between">
              <span>Answer all questions accurately to test practical technique retention.</span>
              <span className="text-amber-400 font-mono font-semibold">
                Pass Mark: ≥{quiz.passingScorePercent}%
              </span>
            </div>
          )}

          {/* Questions List */}
          <div className="space-y-6">
            {quiz.questions.map((q, qIndex) => {
              const selectedOption = selectedAnswers[q.id];
              const isAnswered = selectedOption !== undefined;

              return (
                <div
                  key={q.id}
                  className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs text-amber-400 font-mono font-semibold">
                      <span>Question {qIndex + 1} of {quiz.questions.length}</span>
                    </div>

                    {result && (
                      <span
                        className={`text-xs font-semibold flex items-center gap-1 ${
                          selectedOption === q.correctIndex ? 'text-emerald-400' : 'text-red-400'
                        }`}
                      >
                        {selectedOption === q.correctIndex ? (
                          <>
                            <CheckCircle2 className="w-4 h-4" /> Correct
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4" /> Incorrect
                          </>
                        )}
                      </span>
                    )}
                  </div>

                  <p className="text-sm font-semibold text-white leading-relaxed">
                    {q.question}
                  </p>

                  {/* Options */}
                  <div className="space-y-2">
                    {q.options.map((opt, optIndex) => {
                      const isSelected = selectedOption === optIndex;
                      const isCorrect = optIndex === q.correctIndex;

                      let buttonStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700';

                      if (result) {
                        if (isCorrect) {
                          buttonStyle = 'bg-emerald-500/15 border-emerald-500/50 text-emerald-200 font-medium';
                        } else if (isSelected && !isCorrect) {
                          buttonStyle = 'bg-red-500/15 border-red-500/50 text-red-200';
                        }
                      } else if (isSelected) {
                        buttonStyle = 'bg-amber-500/15 border-amber-500/50 text-amber-200 font-medium';
                      }

                      return (
                        <button
                          key={optIndex}
                          type="button"
                          disabled={!!result}
                          onClick={() => handleOptionSelect(q.id, optIndex)}
                          className={`w-full p-3 rounded-lg border text-left text-xs transition-colors flex items-center justify-between ${buttonStyle}`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center font-mono text-[10px] text-slate-400">
                              {String.fromCharCode(65 + optIndex)}
                            </span>
                            <span>{opt}</span>
                          </div>

                          {result && isCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation shown after submission */}
                  {result && (
                    <div className="pt-2 border-t border-slate-800/80 text-xs text-slate-400 space-y-1">
                      <span className="font-semibold text-slate-300">Technical Rationale:</span>
                      <p className="leading-relaxed">{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer / Submission */}
        {!result && (
          <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between">
            <div className="text-xs text-slate-400">
              {Object.keys(selectedAnswers).length} of {quiz.questions.length} answered
            </div>

            <button
              disabled={!isAllAnswered}
              onClick={handleSubmit}
              className="px-6 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 disabled:opacity-40 text-slate-950 font-bold text-xs flex items-center gap-2 transition-colors shadow-sm"
            >
              <span>Submit Assessment</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
