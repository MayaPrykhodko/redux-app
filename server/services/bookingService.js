import { bookingRepository } from "../repositories/bookingRepository.js";

class BookingService {
  getAll() {
    const data = bookingRepository.getAll();
    if (!data){
      return null;
    }
    return data;
  }

  getAllById(userId) {
    const data = bookingRepository.getAllById({userId:userId});
    if (!data){
      return null;
    }
    return data;
  }

  findById(id) {
    const data = bookingRepository.getOne({id: id});
    if (!data){
      return null;
    }
    return data;
  }

  create(trip) {
    const data = bookingRepository.create(trip);
    if (!data){
      return null;
    }  
    return data;
  }

  update(id, update) {
    const entity = bookingRepository.getOne({id: id})
    if(entity)
    {
      const updatedEntity = bookingRepository.update(id, update);     
      return updatedEntity;
    }
    else {
      return null;
    }
  }

  delete(id) {
    const data = bookingRepository.delete(id);
    if (!data || data.length === 0){
      return null;
    }
    return data;
  }
}

const bookingService = new BookingService();

export { bookingService };