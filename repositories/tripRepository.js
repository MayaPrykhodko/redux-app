import { BaseRepository } from "./baseRepository.js";

class TripRepository extends BaseRepository {
  constructor() {
    super("trips");
  }
}

const tripRepository = new TripRepository();

export { tripRepository };