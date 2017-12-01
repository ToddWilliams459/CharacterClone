const models = require('../models');
const Character = models.Character;


const makerPage = (req, res) => {
  Domo.DomoModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'AN erro occured' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), domos: docs });
  });
};

const makeCharacter = (req, res) => {
  const CharacterData = {
    bodySrc: req.body.bodySrc,
    leftLegSrc: req.body.leftLegSrc,
    rightLegSrc: req.body.rightLegSrc,
    leftArmSrc: req.body.leftArmSrc,
    rightArmSrc: req.body.rightArmSrc ,
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

  return charPromise;
};

const getDomos = (request, response) => {
  const req = request;
  const res = response;

  return Domo.DomoModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }
    return res.json({ domos: docs });
  });
};


module.exports.makerPage = makerPage;
module.exports.getDomos = getDomos;
module.exports.makeCharacter = makeCharacter;
