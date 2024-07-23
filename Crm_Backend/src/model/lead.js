const mongoose = require('mongoose');

const keyValueSchema = new mongoose.Schema({
  key: { type: String, required: true },
  value: { type: mongoose.Schema.Types.Mixed, required: true }
});

const leadSchema = new mongoose.Schema({
  data: [keyValueSchema]
}, { timestamps: true });

const Lead = mongoose.model('Lead', leadSchema);

module.exports = Lead;
