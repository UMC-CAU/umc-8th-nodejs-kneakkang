import { getAllStoreReviews } from '../repositories/store.repository.js';
import { responseFromReviews } from '../dtos/store.dto.js';

export const listStoreReviews = async (storeId, cursor, limit) => {
    const reviews = await getAllStoreReviews(storeId, cursor, limit);
    return responseFromReviews(reviews);
  };