const mongoose = require("mongoose");

const analyticSchema = new mongoose.Schema(
  {
    currentUrl: {
      type: String,
      required: true,
    },
    fcp: {
      type: Number,
      required: true,
    },
    ttfb: {
      type: Number,
      required: true,
    },
    DOMLoadTime: {
      type: Number,
      required: true,
    },
    windowLoadTime: {
      type: Number,
      required: true,
    },
    analyticsStartTime: {
      type: Date,
      required: true,
    },
    files: [
      {
        fileName: {
          type: String,
          required: true,
        },
        fileType: {
          type: String,
          required: true,
        },
        fileLoadTime: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Analytic = mongoose.model("Analytic", analyticSchema);

module.exports = Analytic;
