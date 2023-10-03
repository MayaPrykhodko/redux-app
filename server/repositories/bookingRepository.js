import { BaseRepository } from "./baseRepository.js";

class BookingRepository extends BaseRepository {
  constructor() {
    super("bookings");
  }
}

const bookingRepository = new BookingRepository();

export { bookingRepository };