// const express = require("express");
// const router = express.Router();
// const Booking = require("../models/Booking");

// const {
//   class1BasicQuestions,
//   class1IntermediateQuestions,
//   class1AdvancedQuestions
// } = require("../data/questions");

// GET /api/questions?class=class1&level=basic
// router.get("/questions", (req, res) => {
//   const { class: className, level } = req.query;

//   if (className === "class1") {
//     if (level === "basic") return res.json(class1BasicQuestions);
//     if (level === "intermediate") return res.json(class1IntermediateQuestions);
//     if (level === "advanced") return res.json(class1AdvancedQuestions);
//   }

//   return res.status(404).json({ error: "Questions not found." });
// });

// POST /api/submit
// router.post("/submit", async (req, res) => {
//   const { email, answers, class: className, level } = req.body;

//   let questions = [];
//   if (className === "class1") {
//     if (level === "basic") questions = class1BasicQuestions;
//     if (level === "intermediate") questions = class1IntermediateQuestions;
//     if (level === "advanced") questions = class1AdvancedQuestions;
//   }

//   if (questions.length === 0) {
//     return res.status(400).json({ error: "Invalid class or level." });
//   }

  // Calculate score
//   let score = 0;
//   questions.forEach((q, index) => {
//     if (answers[index] === q.answer) score++;
//   });

//   const percentage = (score / questions.length) * 100;

//   try {
//     const user = await Booking.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found." });
//     }

    // Update score
    // user.scores[level] = score;

//     // Unlock next level if score is >= 80%
//     if (level === "basic" && percentage >= 80) user.unlockedLevels.intermediate = true;
//     if (level === "intermediate" && percentage >= 80) user.unlockedLevels.advanced = true;

//     await user.save();

//     res.json({
//       message: "Quiz submitted successfully.",
//       score,
//       total: questions.length,
//       percentage,
//       unlockedLevels: user.unlockedLevels
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// });

// module.exports = router;


// const express = require("express");
// const router = express.Router();
// const Booking = require("../models/Booking");

// const {
//   class1BasicQuestions,
//   class1IntermediateQuestions,
//   class1AdvancedQuestions
// } = require("../data/questions");


// router.get("/quiz/:classId/:level", (req, res) => {
//   const { classId, level } = req.params;

//   if (classId === "class1") {
//     if (level === "basic") return res.json(class1BasicQuestions);
//     if (level === "intermediate") return res.json(class1IntermediateQuestions);
//     if (level === "advanced") return res.json(class1AdvancedQuestions);
//   }

//   return res.status(404).json({ error: "Questions not found." });
// });


// router.post("/submit", async (req, res) => {
//   const { email, answers, class: className, level } = req.body;

//   let questions = [];
//   if (className === "class1") {
//     if (level === "basic") questions = class1BasicQuestions;
//     if (level === "intermediate") questions = class1IntermediateQuestions;
//     if (level === "advanced") questions = class1AdvancedQuestions;
//   }

//   if (questions.length === 0) {
//     return res.status(400).json({ error: "Invalid class or level." });
//   }


//   let score = 0;
//   questions.forEach((q, index) => {
//     if (answers[index] === q.answer) score++;
//   });

//   try {
//     const user = await Booking.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found." });
//     }

    
//     user.scores[level] = score;


//     const now = new Date();
//     const createdAt = new Date(user.createdAt);
//     const timeDiff = now - createdAt;

//     const TEN_MINUTES = 1000 * 60 * 10;
//     const FIFTEEN_MINUTES = 1000 * 60 * 15;

//     if (timeDiff >= TEN_MINUTES && !user.unlockedLevels.intermediate) {
//       user.unlockedLevels.intermediate = true;
//     }

//     if (timeDiff >= FIFTEEN_MINUTES && !user.unlockedLevels.advanced) {
//       user.unlockedLevels.advanced = true;
//     }

//     await user.save();

//     res.json({
//       message: "Quiz submitted successfully.",
//       score,
//       total: questions.length,
//       unlockedLevels: user.unlockedLevels,
//       minutesUntilIntermediate: Math.max(0, 10 - Math.floor(timeDiff / 60000)),
//       minutesUntilAdvanced: Math.max(0, 15 - Math.floor(timeDiff / 60000))
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// });

// module.exports = router;



// const express = require("express");
// const router = express.Router();
// const Booking = require("../models/Booking");

// const {
//   class1BasicQuestions,
//   class1IntermediateQuestions,
//   class1AdvancedQuestions,
//   class2BasicQuestions,
//   class2IntermediateQuestions,
//   class2AdvancedQuestions,
//   class3BasicQuestions,
//   class3IntermediateQuestions,
//   class3AdvancedQuestions
// } = require("../data/questions");


// function getQuestions(classId, level) {
//   const questionsMap = {
//     class1: {
//       basic: class1BasicQuestions,
//       intermediate: class1IntermediateQuestions,
//       advanced: class1AdvancedQuestions
//     },
//     class2: {
//       basic: class2BasicQuestions,
//       intermediate: class2IntermediateQuestions,
//       advanced: class2AdvancedQuestions
//     },
//     class3: {
//       basic: class3BasicQuestions,
//       intermediate: class3IntermediateQuestions,
//       advanced: class3AdvancedQuestions
//     }
//   };

//   return questionsMap[classId]?.[level] || [];
// }


// router.get("/quiz/:classId/:level", (req, res) => {
//   const { classId, level } = req.params;
//   const questions = getQuestions(classId, level);

//   if (questions.length === 0) {
//     return res.status(404).json({ error: "Questions not found." });
//   }

//   return res.json(questions);
// });


// router.post("/submit", async (req, res) => {
//   const { email, answers, class: className, level } = req.body;

//   const questions = getQuestions(className, level);
//   if (questions.length === 0) {
//     return res.status(400).json({ error: "Invalid class or level." });
//   }

 
//   let score = 0;
//   questions.forEach((q, index) => {
//     if (answers[index] === q.answer) score++;
//   });

//   try {
//     const user = await Booking.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found." });
//     }


//     user.scores[level] = score;


//     const now = new Date();
//     const createdAt = new Date(user.createdAt);
//     const timeDiff = now - createdAt;

//     const TEN_MINUTES = 1000 * 60 * 10;
//     const FIFTEEN_MINUTES = 1000 * 60 * 15;

//     if (timeDiff >= TEN_MINUTES && !user.unlockedLevels.intermediate) {
//       user.unlockedLevels.intermediate = true;
//     }

//     if (timeDiff >= FIFTEEN_MINUTES && !user.unlockedLevels.advanced) {
//       user.unlockedLevels.advanced = true;
//     }

//     await user.save();

//     res.json({
//       message: "Quiz submitted successfully.",
//       score,
//       total: questions.length,
//       unlockedLevels: user.unlockedLevels,
//       minutesUntilIntermediate: Math.max(0, 10 - Math.floor(timeDiff / 60000)),
//       minutesUntilAdvanced: Math.max(0, 15 - Math.floor(timeDiff / 60000))
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// });

// module.exports = router;


// const express = require("express");
// const router = express.Router();
// const Booking = require("../models/Booking");

// const {
//   class1BasicMath,
//   class1BasicScience,
//   class1BasicEnglish,
//   class1IntermediateMath,
//   class1IntermediateScience,
//   class1IntermediateEnglish,
//   class1AdvancedMath,
//   class1AdvancedScience,
//   class1AdvancedEnglish,
//   class2BasicMath,
//   class2BasicScience,
//   class2BasicEnglish,
//   class2IntermediateMath,
//   class2IntermediateScience,
//   class2IntermediateEnglish,
//   class2AdvancedMath,
//   class2AdvancedScience,
//   class2AdvancedEnglish,
//   class3BasicMath,
//   class3BasicScience,
//   class3BasicEnglish,
//   class3IntermediateMath,
//   class3IntermediateScience,
//   class3IntermediateEnglish,
//   class3AdvancedMath,
//   class3AdvancedScience,
//   class3AdvancedEnglish
// } = require("../data/questions");


// function getQuestions(classId, level, subject) {
//   const questionsMap = {
//     class1: {
//       basic: {
//         math: class1BasicMath,
//         science: class1BasicScience,
//         english: class1BasicEnglish
//       },
//       intermediate: {
//         math: class1IntermediateMath,
//         science: class1IntermediateScience,
//         english: class1IntermediateEnglish
//       },
//       advanced: {
//         math: class1AdvancedMath,
//         science: class1AdvancedScience,
//         english: class1AdvancedEnglish
//       }
//     },
//     class2: {
//       basic: {
//         math: class2BasicMath,
//         science: class2BasicScience,
//         english: class2BasicEnglish
//       },
//       intermediate: {
//         math: class2IntermediateMath,
//         science: class2IntermediateScience,
//         english: class2IntermediateEnglish
//       },
//       advanced: {
//         math: class2AdvancedMath,
//         science: class2AdvancedScience,
//         english: class2AdvancedEnglish
//       }
//     },
//     class3: {
//       basic: {
//         math: class3BasicMath,
//         science: class3BasicScience,
//         english: class3BasicEnglish
//       },
//       intermediate: {
//         math: class3IntermediateMath,
//         science: class3IntermediateScience,
//         english: class3IntermediateEnglish
//       },
//       advanced: {
//         math: class3AdvancedMath,
//         science: class3AdvancedScience,
//         english: class3AdvancedEnglish
//       }
//     }
//   };

//   return questionsMap[classId]?.[level]?.[subject] || [];
// }


// router.get("/quiz/:classId/:level/:subject", (req, res) => {
//   const { classId, level, subject } = req.params;
//   const questions = getQuestions(classId, level, subject);

//   if (questions.length === 0) {
//     return res.status(404).json({ error: "Questions not found." });
//   }

//   return res.json(questions);
// });


// router.post("/submit", async (req, res) => {
//   const { email, answers, class: className, level, subject } = req.body;

//   const questions = getQuestions(className, level, subject);
//   if (questions.length === 0) {
//     return res.status(400).json({ error: "Invalid class, level, or subject." });
//   }

 
//   let score = 0;
//   questions.forEach((q, index) => {
//     if (answers[index] === q.answer) score++;
//   });

//   try {
//     const user = await Booking.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found." });
//     }

    
//     user.scores = user.scores || {};
//     user.scores[level] = score;

//     user.unlockedLevels = user.unlockedLevels || {};
//     const now = new Date();
//     const createdAt = new Date(user.createdAt);
//     const timeDiff = now - createdAt;

//     const TEN_MINUTES = 1000 * 60 * 10;
//     const FIFTEEN_MINUTES = 1000 * 60 * 15;

//     if (timeDiff >= TEN_MINUTES && !user.unlockedLevels.intermediate) {
//       user.unlockedLevels.intermediate = true;
//     }

//     if (timeDiff >= FIFTEEN_MINUTES && !user.unlockedLevels.advanced) {
//       user.unlockedLevels.advanced = true;
//     }

//     await user.save();

//     res.json({
//       message: "Quiz submitted successfully.",
//       score,
//       total: questions.length,
//       unlockedLevels: user.unlockedLevels,
//       minutesUntilIntermediate: Math.max(0, 10 - Math.floor(timeDiff / 60000)),
//       minutesUntilAdvanced: Math.max(0, 15 - Math.floor(timeDiff / 60000))
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// });

// module.exports = router;



// const express = require("express");
// const router = express.Router();
// const Booking = require("../models/Booking");

// Import questions directly from questions.js
// const { class1, class2, class3 } = require("../data/questions");

// A function to get the questions based on the classId
// function getQuestions(classId) {
//   const questionsMap = {
//     class1: class1,
//     class2: class2,
//     class3: class3
//   };

//   return questionsMap[classId] || [];
// }

// router.get("/quiz/:classId", (req, res) => {
//   const { classId } = req.params;
//   const questions = getQuestions(classId);

//   if (questions.length === 0) {
//     return res.status(404).json({ error: "Questions not found." });
//   }

//   return res.json(questions);
// });

// router.post("/submit", async (req, res) => {
//   const { email, answers, class: className } = req.body;

//   // Get the questions for the given class
//   const questions = getQuestions(className);
//   if (questions.length === 0) {
//     return res.status(400).json({ error: "Invalid class." });
//   }

//   try {
//     const user = await Booking.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found." });
//     }

    // No need to store score anymore
    // Simply respond that the submission was successful

//     res.json({
//       message: "Quiz submitted successfully.",
//       totalQuestions: questions.length
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// Import questions directly from questions.js
const { class5, class6, class7, class8,class9,class10,class11,class12 } = require("../data/questions");

// A function to get the questions based on the classId
function getQuestions(classId) {
  const questionsMap = {
    class5: class5,
    class6: class6,
    class7: class7,
    class8: class8,
    class9: class9,
    class10: class10,
    class11: class11,
    class12: class12
  };

  return questionsMap[classId] || [];
}


// Utility: Shuffle array using Fisher-Yates algorithm
function shuffleArray(array) {
  const shuffled = [...array]; // Clone array to avoid mutation
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// router.get("/quiz/:classId", (req, res) => {
//   const { classId } = req.params;
//   const questions = getQuestions(classId);

//   if (questions.length === 0) {
//     return res.status(404).json({ error: "Questions not found." });
//   }

//   return res.json(questions);
// });


// GET /quiz/:classId - Fetch shuffled questions for a class
router.get("/quiz/:classId", (req, res) => {
  const { classId } = req.params;
  const questions = getQuestions(classId);

  if (questions.length === 0) {
    return res.status(404).json({ error: "Questions not found." });
  }

  const shuffledQuestions = shuffleArray(questions);
  return res.json(shuffledQuestions);
});

// router.post("/submit", async (req, res) => {
//   const { email, answers, class: className } = req.body;


//   const questions = getQuestions(className);
//   if (questions.length === 0) {
//     return res.status(400).json({ error: "Invalid class." });
//   }

//   try {
//     const user = await Booking.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found." });
//     }



//     res.json({
//       message: "Quiz submitted successfully.",
//       totalQuestions: questions.length
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// });

router.post("/submit", async (req, res) => {
  // const { email, answers, class: className } = req.body;
  const { identifier, answers, class: className } = req.body;


   if (!identifier || !answers || !className) {
    return res.status(400).json({ message: "Identifier, class, and answers are required." });
  }

  const questions = getQuestions(className);
  if (questions.length === 0) {
    return res.status(400).json({ error: "Invalid class." });
  }

  try {
    // const user = await Booking.findOne({ email });
    const user = await Booking.findOne({
      $or: [
        { email: identifier.toLowerCase().trim() },
        { mobileNumber: identifier.trim() }
      ]
    });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Build quiz responses
    const quizResponses = questions.map((q, index) => {
      const selectedAnswer = answers[index]; // assuming answer array follows same order
      return {
        className,
        question: q.question,
        selectedAnswer,
        correctAnswer: q.answer,
        isCorrect: selectedAnswer === q.answer
      };
    });

    // Store responses to user profile
    user.quizResponses = quizResponses;
    await user.save();

    res.json({
      message: "Quiz submitted and answers saved successfully.",
      totalQuestions: questions.length,
      correctAnswers: quizResponses.filter(r => r.isCorrect).length
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


module.exports = router;

