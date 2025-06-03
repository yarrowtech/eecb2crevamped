// const express = require("express");
// const router = express.Router();
// const Booking = require("../models/Booking");


// router.post("/survey", async (req, res) => {
//   const { email, questions } = req.body;

//   if (!email || !questions) {
//     return res.status(400).json({ message: "Email and questions are required." });
//   }

//   const keys = ["q1", "q2", "q3", "q4"];
//   for (let key of keys) {
//     if (typeof questions[key] !== "boolean") {
//       return res.status(400).json({ message: `Question ${key} must be true or false.` });
//     }
//   }

//   try {
//     const user = await Booking.findOne({ email: email.toLowerCase().trim() });
//     if (!user) return res.status(404).json({ message: "User not found." });

//     user.survey = {
//       q1: questions.q1,
//       q2: questions.q2,
//       q3: questions.q3,
//       q4: questions.q4,
//       submittedAt: new Date(),
//     };

//     await user.save();

//     res.status(201).json({ message: "Survey submitted successfully." });
//   } catch (err) {
//     res.status(500).json({ message: "Error submitting survey.", error: err.message });
//   }
// });


// router.get("/survey/:email", async (req, res) => {
//   try {
//     const user = await Booking.findOne({ email: req.params.email.toLowerCase().trim() });
//     if (!user) return res.status(404).json({ message: "User not found." });

//     if (!user.survey) return res.status(404).json({ message: "Survey not submitted yet." });

//     res.json(user.survey);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching survey.", error: err.message });
//   }
// });

// module.exports = router;


// const express = require("express");
// const router = express.Router();
// const Booking = require("../models/Booking");

// // POST /api/survey - Save survey answers inside booking document
// router.post("/survey", async (req, res) => {
//   const { email, questions } = req.body;

//   if (!email || !questions) {
//     return res.status(400).json({ message: "Email and questions are required." });
//   }

//   // Validate: All questions should be non-empty strings
//   const expectedKeys = Array.from({ length: 10 }, (_, i) => `q${i + 1}`);
//   for (const key of expectedKeys) {
//     if (typeof questions[key] !== "string" || !questions[key].trim()) {
//       return res.status(400).json({ message: `Invalid answer for ${key}.` });
//     }
//   }

//   try {
//     const user = await Booking.findOne({ email: email.toLowerCase().trim() });
//     if (!user) return res.status(404).json({ message: "User not found." });

//     user.survey = {
//       ...questions,
//       submittedAt: new Date(),
//     };

//     await user.save();

//     res.status(201).json({ message: "Survey submitted successfully." });
//   } catch (err) {
//     res.status(500).json({ message: "Error submitting survey.", error: err.message });
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// POST /api/survey - Save survey answers using identifier (email or phone)
router.post("/survey", async (req, res) => {
  const { identifier, questions } = req.body;

  if (!identifier || !questions) {
    return res.status(400).json({ message: "Identifier and questions are required." });
  }

  // Validate: All 10 questions must be non-empty strings
  const expectedKeys = Array.from({ length: 10 }, (_, i) => `q${i + 1}`);
  for (const key of expectedKeys) {
    if (typeof questions[key] !== "string" || !questions[key].trim()) {
      return res.status(400).json({ message: `Invalid answer for ${key}.` });
    }
  }

  try {
    const user = await Booking.findOne({
      $or: [
        { email: identifier.toLowerCase().trim() },
        { mobileNumber: identifier.trim() },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.survey = {
      ...questions,
      submittedAt: new Date(),
    };

    await user.save();

    res.status(201).json({ message: "Survey submitted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Error submitting survey.", error: err.message });
  }
});

module.exports = router;
