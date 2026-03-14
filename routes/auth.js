const router = require('express').Router();
const passport = require('../config/passport');

/*
 Start GitHub authentication
*/
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

/*
 GitHub callback after login
*/
router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/'
  }),
  (req, res) => {
    res.json({
      message: 'GitHub authentication successful',
      user: req.user
    });
  }
);

/*
 Logout route
*/
router.get('/logout', (req, res) => {
  req.logout(function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Logged out successfully' });
  });
});

router.get('/me', (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  res.json({
    message: 'Authenticated user',
    user: req.user
  });
});

module.exports = router;