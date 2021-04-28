const mongoose = require('mongoose');
const _ = require('underscore');

let LinkModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const LinkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  url: {
    type: String,
    required: true,
    trim: true,
  },
  desc: {
    type: String,
    required: true,
    trim: true,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

LinkSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  url: doc.url,
  desc: doc.desc,
});

LinkSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return LinkSchema.find(search).select('name url desc').lean().exec(callback);
};

LinkModel = mongoose.model('Link', LinkSchema);

module.exports.LinkModel = LinkModel;
module.exports.LinkSchema = LinkSchema;
