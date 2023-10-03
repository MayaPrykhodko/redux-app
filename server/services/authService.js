import { LoginError } from "../middlewares/validation.middleware.error.js";
import { userService } from "./userService.js";
import jwt from 'jsonwebtoken';


class AuthService {
  login(userData) {
    const user = userService.search(userData);
    if (!user) {
      throw new LoginError();
    }
    let token = jwt.sign({user: user}, 'your-secret-key', {
      expiresIn: '24h',
    });
    return {user:user, token:token};
  }
}

const authService = new AuthService();

export { authService };