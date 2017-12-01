const models = require('../models');
const Character = models.Character;


const makerPage = (req, res) => {
  Character.DomoModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'AN erro occured' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), characters: docs });
  });
};

const makeCharacter = (req, res) => {
  const CharacterData = {
    bodySrc: req.body.bodySrc,
    leftLegSrc: req.body.leftLegSrc,
    rightLegSrc: req.body.rightLegSrc,
    leftArmSrc: req.body.leftArmSrc,
    rightArmSrc: req.body.rightArmSrc,
    owner: req.session.account._id,
  };

  const newCharacter = new Character.CharacterModel(CharacterData);

  const characterPromise = newCharacter.save();

  characterPromise.then(() => res.json({ redirect: '/maker' }));

  characterPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Char already exists.' });
    }

    return res.status(400).json({ error: 'An error occured' });
  });

  return characterPromise;
};

const getCharacters = (request, response) => {
  const req = request;
  const res = response;

  return Character.CharacterModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }
    return res.json({ characters: docs });
  });
};


module.exports.makerPage = makerPage;
module.exports.getCharacters = getCharacters;
module.exports.makeCharacter = makeCharacter;
