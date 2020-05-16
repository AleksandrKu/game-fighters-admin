const UserService = require('./userService');

class AuthService {
  login(userData) {
    try {
      const user = UserService.search(userData);
      if (!user) throw Error();
      const userRequest = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      };
      return userRequest;
    } catch (err) {
      throw Error('User not found');
    }
  }
}

module.exports = new AuthService();