const { Router } = require('express');
const router = Router();

const { getActivity, createActivity } = require('../controllers/activity');

router.get('/activities', getActivity);
router.post('/activity', createActivity);

module.exports = router;