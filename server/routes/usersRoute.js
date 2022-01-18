const router = require('express').Router();
const db = require('../models');
const validate = require('validate.js');

const constraints = {
  email: {
    email: {
      message: '^E-postadressen är i ett felaktigt format'
    },
    length: {
      minimum: 4,
      maximum: 200,
      tooShort: '^E-postadressen måste vara minst %{count} tecken lång.',
      tooLong: '^E-postadressen får inte vara mer än %{count} tecken lång.'
    }
  },
  username: {
    length: {
      minimum: 3,
      maximum: 50,
      tooShort: '^Användarnamnet måste vara minst %{count} tecken långt.',
      tooLong: '^Användarnamnet får inte vara mer än %{count} tecken långt.'
    }
  }
};

router.get('/', (req, res) => {
  db.user.findAll().then((result) => {
    res.send(result);
  });
});

router.post('/', async (req, res) => {
  const user = req.body;
  if (!user.email || !user.username) {
    res
      .status(422)
      .json({ message: 'Användarnamn och e-postadress är obligatoriskt' });
  } else {
    const existingUser = await db.user.findOne({
      where: db.sequelize.or(
        {
          email: user.email
        },
        {
          username: user.username
        }
      )
    });
    if (existingUser) {
      res
        .status(400)
        .json({ message: 'Användarnamnet eller e-postadressen är inte unik.' });
    } else {
      const invalidData = validate(user, constraints);
      if (invalidData) {
        res.status(422).json(invalidData);
      } else {
        db.user.create(user).then((result) => {
          res.send(result);
        });
      }
    }
  }
});

router.put('/', (req, res) => {
  db.user
    .update(req.body, {
      where: { id: req.body.id }
    })
    .then((result) => {
      res.send(result);
    });
});
router.delete('/', (req, res) => {
  db.user
    .destroy({
      where: { id: req.body.id }
    })
    .then(() => {
      res.json(`Inlägget raderades`);
    });
});

module.exports = router;
