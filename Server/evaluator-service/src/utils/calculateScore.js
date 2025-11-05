export const calculateScore = (answers, correctAnswers) => {
  let score = 0;
  console.log("\n🔍 === SCORING DEBUG ===");
  console.log("📝 Total answers received:", answers.length);
  console.log("📚 Total correct answers:", correctAnswers.length);
  
  answers.forEach((ans, index) => {
    console.log(`\n--- Question ${index + 1} ---`);
    console.log("Answer data:", JSON.stringify(ans));
    
    const correct = correctAnswers.find(q => q._id.toString() === ans.questionId);
    
    if (correct) {
      console.log("✅ Found question in DB");
      console.log("   Question ID:", correct._id.toString());
      console.log("   Correct answer index:", correct.correctOptionIndex, "(type:", typeof correct.correctOptionIndex + ")");
      console.log("   User selected index:", ans.selectedIndex, "(type:", typeof ans.selectedIndex + ")");
      console.log("   Match?", correct.correctOptionIndex === ans.selectedIndex);
      
      if (correct.correctOptionIndex === ans.selectedIndex) {
        score++;
        console.log("   ✅ CORRECT! Score++");
      } else {
        console.log("   ❌ WRONG!");
      }
    } else {
      console.log("❌ Question not found in DB!");
    }
  });
  
  console.log("\n🎯 Final Score:", score, "/", answers.length);
  console.log("===================\n");
  return score;
};
