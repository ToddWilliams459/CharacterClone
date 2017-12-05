const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let CharacterModel = {};

// mongoose.Types.ObjectID is a function that
// converts string ID to real mongo ID

const convertId = mongoose.Types.ObjectId;

const CharacterSchema = new mongoose.Schema({
  bodySrc: {
    type: String,
    required: true,
  },

  leftArmSrc: {
    type:  String,
    required: true,
  },

  rightArmSrc: {
    type: String,
    required: true,
  },

  leftLegSrc: {
    type: String,
    required: true,
  },

  rightLegSrc: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
});

CharacterSchema.statics.toAPI = (doc) => ({
  bodySrc: doc.bodySrc,
  leftArmSrc: doc.leftArmSrc,
  rightArmSrc: doc.rightArmSrc,
  leftLegSrc: doc.leftLegSrc,
  rightLegSrc: doc.rightLegSrc,
});


CharacterSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return CharacterModel.find(search).select(
    'bodySrc leftArmSrc rightArmSrc leftLegSrc rightLegSrc').exec(callback);
};

CharacterModel = mongoose.model('Character', CharacterSchema);

module.exports.CharacterModel = CharacterModel;
module.exports.CharacterSchema = CharacterSchema;
