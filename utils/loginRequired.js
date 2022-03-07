import { User } from '../models/user.js';

const loginRequired = async (req, res, next) => {
  if (!req.session || !req.session.userId) {
    return res.status(403).json({
      message: 'You should be logged in to access this data',
    });
  }

  req.user = await User.findById(req.session.userId);
  if (!req.user) {
    return res.status(403).json({ message: 'This userID does not exist' });
  }

  next();
};

export default loginRequired;
