export const calculateScore = (answers, correctAnswers) => {
  let score = 0;
  answers.forEach(ans => {
    const correct = correctAnswers.find(q => q._id.toString() === ans.questionId);
    if (correct && correct.correctOption === ans.selected) {
      score++;
    }
  });
  return score;
};
