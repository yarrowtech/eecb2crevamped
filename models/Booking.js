// const mongoose = require('mongoose');

// const bookingSchema = new mongoose.Schema({
//   childName: String,
//   mobileNumber: String,
//   email: String,
//   state: String,
//   class: String,
//   password: String,
// }, { timestamps: true });

// module.exports = mongoose.model('Booking', bookingSchema);

// const mongoose = require("mongoose");

// const bookingSchema = new mongoose.Schema({
//   childName: {
//     type: String,
//     required: true,
//   },
//   mobileNumber: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//   },
//   class: {
//     type: String,
//     required: true,
//   },
//   state: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// });

// module.exports = mongoose.model("Booking", bookingSchema);


const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  childName: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
email: {
    type: String,
    // unique: true,
  // required: true,
  // lowercase: true,
  // trim: true,
  },
  class: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

   referralCode: {
    type: String,
    unique: true,
    required: true,
  },
  referredBy: {
    type: String, // referralCode of the referrer
    default: null,
  },
  rewardPoints: {
    type: Number,
    default: 0,
  },
  // Profile fields

  profileImage: { type: String, default: "" },
  fullName: String,
  dob: String,
  schoolName: String,
  // classGrade: String,
  rollNumber: String,
  parentContact: String,
  homeAddress: String,
  subjects: String,
  learningPreferences: String,
  goals: String,

unlockedLevels: {
    basic: { type: Boolean, default: true },
    intermediate: { type: Boolean, default: false },
    advanced: { type: Boolean, default: false }
  },
  scores: {
    basic: { type: Number, default: 0 },
    intermediate: { type: Number, default: 0 },
    advanced: { type: Number, default: 0 }
  },

  //  survey: {
  //   q1: { type: Boolean },
  //   q2: { type: Boolean },
  //   q3: { type: Boolean },
  //   q4: { type: Boolean },
  //   submittedAt: { type: Date },
  // },

  survey: {
  q1: String,
  q2: String,
  q3: String,
  q4: String,
  q5: String,
  q6: String,
  q7: String,
  q8: String,
  q9: String,
  q10: String,
  submittedAt: Date,
},

resetPasswordToken: {
  type: String,
},
resetPasswordExpires: {
  type: Date,
},

 quizResponses: [
    {
      className: String,
      question: String,
      selectedAnswer: String,
      correctAnswer: String,
      isCorrect: Boolean
    }
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  }

  
});

module.exports = mongoose.model("Booking", bookingSchema);


