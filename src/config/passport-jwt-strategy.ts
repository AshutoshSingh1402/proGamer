import passport from 'passport';
import { Strategy as jwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { UserService } from '../services/user/user.service';
import { ENV } from './env';

const jwtOptions: StrategyOptions = {
  secretOrKey: ENV.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}

passport.use(new jwtStrategy(jwtOptions, async function (payload, done) {
  const userService = new UserService();
  try {
    const user = await userService.getById(payload.userId);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (e) {
    return done(e, false);
  }
}))
export default passport;
