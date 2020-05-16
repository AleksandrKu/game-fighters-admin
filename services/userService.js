const { UserRepository } = require('../repositories/userRepository');

class UserService {
  // TODO: Implement methods to work with user
  create(data) {
    const user = UserRepository.create(data);
    return user;
  }

  update(id, data) {
    const user = UserRepository.update(id, data);
    return user;
  }

  search(search) {
    const user = UserRepository.getOne(search);
    if (!user) return 'User not found';
    const userResponse = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
    };
    return userResponse;
  }

  getAll() {
    const users = UserRepository.getAll();
    if (!users) return [];
    const usersResponse = users.map(user => ({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      }));
    return usersResponse;
  }

  delete(id) {
    const deleteUser = UserRepository.delete(id);
    if (Array.isArray(deleteUser) && !deleteUser.length) {
      return 'User not found';
    }
    return 'User deleted';
  }
}

module.exports = new UserService();