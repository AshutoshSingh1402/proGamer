import passport from '../config/passport-jwt-strategy';

export const jwtAuthenticator = passport.authenticate('jwt', { session: false });
