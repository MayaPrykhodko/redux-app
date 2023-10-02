import { tripRepository } from "../repositories/tripRepository.js";

class TripService {
  getAll() {
    const data = tripRepository.getAll();
    if (!data){
      return null;
    }
    return data;
  }

  findById(id) {
    const data = tripRepository.getOne({id: id});
    if (!data){
      return null;
    }
    return data;
  }

  create(trip) {
    const data = tripRepository.create(trip);
    if (!data){
      return null;
    }  
    return data;
  }

  update(id, update) {
    const entity = tripRepository.getOne({id: id})
    if(entity)
    {
      const updatedEntity = tripRepository.update(id, update);     
      return updatedEntity;
    }
    else {
      return null;
    }
  }

  delete(id) {
    const data = tripRepository.delete(id);
    if (!data || data.length === 0){
      return null;
    }
    return data;
  }
}

const tripService = new TripService();

export { tripService };