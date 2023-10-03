import { userRepository } from "../repositories/userRepository.js";
import jwt from 'jsonwebtoken';

class UserService {

  create(user) {
    const item = userRepository.create(user);
    if (!item) {
      return null;
    }
    let token = jwt.sign({user: item}, 'your-secret-key', {
      expiresIn: '24h',
    });
    return {user: item, token:token};
  }

  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  getAll() {
    const data = userRepository.getAll();
    if (!data){
      return null;
    }

    return data;
  }

  update(id, update) {
    const entity = userRepository.getOne({id: id})
    if(entity)
    {
      const updatedEntity = userRepository.update(id, update);     
      return updatedEntity;
    }
    else {
      return null;
    }
  }

  delete(id) {
    const data = userRepository.delete(id);
    if (!data || data.length === 0){
      return null;
    }
    
    return data;
  }

}

const userService = new UserService();

export { userService };
