const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const { register, login, getUser } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/user', auth, getUser);

module.exports = router;