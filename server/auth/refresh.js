const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');

router.post('/refresh', async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ message: 'Missing refresh token' });

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN);
    const newAccessToken = jwt.sign(
      { _id: decoded._id, username: decoded.username },
      process.env.JWT_TOKEN,
      { expiresIn: '15m' }
    );

    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      sameSite: 'Strict',
    });

    res.status(200).json({ message: 'Access token refreshed' });
  } catch (err) {
    res.status(403).json({ message: 'Invalid refresh token' });
  }
});

module.exports = router;