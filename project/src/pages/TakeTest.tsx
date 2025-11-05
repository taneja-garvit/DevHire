import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Timer from '../components/Timer';
import QuestionCard from '../components/QuestionCard';
import ProgressBar from '../components/ProgressBar';
import QuestionNavigator from '../components/QuestionNavigator';
import ConfirmModal from '../components/ConfirmModal';
import Button from '../components/Button';

interface Question {
  questionId: string;
  questionText: string;
  options: string[];
}

interface TestAnswer {
  questionId: string;
  selectedIndex: number | null;
}

const TEST_DURATION = 30 * 60;

function TakeTest() {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<TestAnswer[]>([]);
  const [timeLeft, setTimeLeft] = useState(TEST_DURATION);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [markedQuestions, setMarkedQuestions] = useState<Set<number>>(new Set());
  const [recruiterId, setRecruiterId] = useState<string>('');

  const answeredQuestions = new Set(
    answers
      .filter((a) => a.selectedIndex !== null)
      .map((a) => questions.findIndex((q) => q.questionId === a.questionId))
  );

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Get recruiterId from navigation state
    if (location.state?.recruiterId) {
      setRecruiterId(location.state.recruiterId);
    }

    const savedState = localStorage.getItem(`test_${testId}`);
    if (savedState) {
      try {
        const state = JSON.parse(savedState);
        setQuestions(state.questions);
        setAnswers(state.answers);
        setCurrentQuestionIndex(state.currentQuestionIndex);
        setTimeLeft(state.timeLeft);
        setMarkedQuestions(new Set(state.markedQuestions));
        if (state.recruiterId) {
          setRecruiterId(state.recruiterId);
        }
      } catch {
        fetchTestQuestions();
      }
    } else {
      fetchTestQuestions();
    }
  }, [testId, navigate, location]);

  const fetchTestQuestions = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `http://localhost:4000/assessments/${testId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Backend returns { success: true, test: { questions: [...] } }
      const testQuestions = response.data.test?.questions || [];
      setQuestions(testQuestions);
      setAnswers(
        testQuestions.map((q: Question) => ({
          questionId: q.questionId,
          selectedIndex: null,
        }))
      );
    } catch (err: any) {
      setError('Failed to load test');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const saveState = () => {
      const state = {
        questions,
        answers,
        currentQuestionIndex,
        timeLeft,
        markedQuestions: Array.from(markedQuestions),
        recruiterId,
      };
      localStorage.setItem(`test_${testId}`, JSON.stringify(state));
    };

    const interval = setInterval(saveState, 5000);
    window.addEventListener('beforeunload', saveState);

    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeunload', saveState);
      saveState();
    };
  }, [questions, answers, currentQuestionIndex, timeLeft, markedQuestions, testId, recruiterId]);

  const handleAutoSubmit = useCallback(() => {
    handleSubmitTest();
  }, []);

  const handleSelectOption = (optionIndex: number) => {
    const newAnswers = [...answers];
    const questionId = questions[currentQuestionIndex].questionId;
    const answerIndex = newAnswers.findIndex(
      (a) => a.questionId === questionId
    );

    if (answerIndex !== -1) {
      newAnswers[answerIndex].selectedIndex = optionIndex;
      setAnswers(newAnswers);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleMarkQuestion = () => {
    const newMarked = new Set(markedQuestions);
    if (newMarked.has(currentQuestionIndex)) {
      newMarked.delete(currentQuestionIndex);
    } else {
      newMarked.add(currentQuestionIndex);
    }
    setMarkedQuestions(newMarked);
  };

  const handleJumpToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const handleSubmitTest = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');

      if (!token || !user) {
        navigate('/login');
        return;
      }

      const response = await axios.post(
        `http://localhost:4000/evaluator/${testId}/submit`,
        {
          answers: answers.map((a) => ({
            questionId: a.questionId,
            selectedIndex: a.selectedIndex ?? -1,
          })),
          recruiterId: recruiterId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      localStorage.removeItem(`test_${testId}`);

      navigate('/test-results', {
        state: {
          score: response.data.data.totalScore,
          totalQuestions: response.data.data.totalQuestions,
          results: response.data.data.results,
        },
      });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to submit test');
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4" />
          <p className="text-gray-600">Loading test...</p>
        </div>
      </div>
    );
  }

  if (error || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-sm p-8 max-w-md w-full text-center">
          <p className="text-red-600 mb-4">{error || 'No questions found'}</p>
          <button
            onClick={() => navigate('/jobs')}
            className="text-yellow-500 hover:text-yellow-600 font-medium"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers.find(
    (a) => a.questionId === currentQuestion.questionId
  );
  const answeredCount = answeredQuestions.size;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            <div className="text-sm font-medium text-gray-600">
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>

            <Timer seconds={timeLeft} onTimeUp={handleAutoSubmit} />

            <button
              onClick={() => setShowSubmitConfirm(true)}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Submit Test
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProgressBar answered={answeredCount} total={questions.length} />

        <QuestionCard
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          questionText={currentQuestion.questionText}
          options={currentQuestion.options}
          selectedOption={currentAnswer?.selectedIndex ?? null}
          onSelectOption={handleSelectOption}
        />

        <div className="flex gap-4 mb-8">
          <Button
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            variant="secondary"
          >
            <ArrowLeft size={20} className="mr-2" />
            Previous
          </Button>

          <button
            onClick={handleMarkQuestion}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              markedQuestions.has(currentQuestionIndex)
                ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {markedQuestions.has(currentQuestionIndex)
              ? '✓ Marked for Review'
              : 'Mark for Review'}
          </button>

          <Button
            onClick={handleNextQuestion}
            disabled={currentQuestionIndex === questions.length - 1}
            variant="secondary"
          >
            Next
            <ArrowRight size={20} className="ml-2" />
          </Button>
        </div>

        <QuestionNavigator
          totalQuestions={questions.length}
          currentQuestion={currentQuestionIndex}
          answeredQuestions={answeredQuestions}
          markedQuestions={markedQuestions}
          onQuestionClick={handleJumpToQuestion}
        />
      </div>

      {showSubmitConfirm && (
        <ConfirmModal
          title="Submit Test?"
          message="Are you sure you want to submit your test?"
          details={`You have answered ${answeredCount} out of ${questions.length} questions.\n\nUnanswered: ${questions.length - answeredCount}`}
          confirmText="Submit"
          cancelText="Continue Test"
          onConfirm={handleSubmitTest}
          onCancel={() => setShowSubmitConfirm(false)}
          loading={isSubmitting}
          variant="warning"
        />
      )}
    </div>
  );
}

export default TakeTest;
