const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnalyticsEventSchema = new Schema({
  eventName: { type: String, required: true },
  properties: { type: Schema.Types.Mixed, default: {} },
  timestamp: { type: Date, default: Date.now }
});

const AnalyticsEvent = mongoose.model('AnalyticsEvent', AnalyticsEventSchema);

module.exports = AnalyticsEvent;
