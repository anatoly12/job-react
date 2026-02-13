const mongoose = require('mongoose');

const { Schema } = mongoose;

const AnalyticsEventSchema = new Schema({
  name: { type: String, required: true },
  data: { type: Schema.Types.Mixed, default: {} },
  createdAt: { type: Date, default: Date.now },
}, {
  minimize: false,
});

module.exports = mongoose.model('AnalyticsEvent', AnalyticsEventSchema);
