const router = require('express').Router();
const { UserDetail } = require('../../models');
const withAuth = require('../../utils/auth');

// POST route to create a UserDetail record
router.post('/', withAuth, async (req, res) => {
  try {
    const newUserDetail = await UserDetail.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newUserDetail);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE route to delete a UserDetail record
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const userDetailData = await UserDetail.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!userDetailData) {
      res.status(404).json({ message: 'No user detail found with this id!' });
      return;
    }

    res.status(200).json(userDetailData);
  } catch (err) {
    res.status(500).json(err); 
  }
});

// PUT route to update a UserDetail record
router.put('/:id', withAuth, async (req, res) => {
  try {
    const userDetailData = await UserDetail.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!userDetailData) {
      res.status(404).json({ message: 'No user detail found with this id!' });
      return;
    }

    res.status(200).json(userDetailData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;