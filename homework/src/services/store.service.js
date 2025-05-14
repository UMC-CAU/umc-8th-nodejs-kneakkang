import { 
  getAllStoreReviews,
  findStoreById, 
  findStoreReview
} from '../repositories/store.repository.js';
import { responseFromReviews } from '../dtos/store.dto.js';
import { 
  ExistStoreError,
  ExistReviewError 
} from '../errors.js';

export const listStoreReviews = async (storeId, cursor) => {
    const reviews = await getAllStoreReviews(storeId, cursor);
    const existingStore = await findStoreById(Number(storeId));
    const existingReview = await findStoreReview(Number(storeId))
    
    if (!existingStore) {
        throw new ExistStoreError('해당 가게가 존재하지 않습니다.')
      }

    if (!existingReview) {
      throw new ExistReviewError('해당 가게에 리뷰가 존재하지 않습니다.')
    }

    return responseFromReviews(reviews);
  };