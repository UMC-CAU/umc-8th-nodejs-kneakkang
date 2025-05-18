import { addReview } from '../repositories/review.repository.js';
import { findStoreById } from '../repositories/store.repository.js';
import { ExistStoreError } from '../errors.js';

export const createReview = async (data) => {
    const { store_id, user_id, name, content, image, star } = data;

    const store = await findStoreById(store_id);
        if (!store) {
            throw new ExistStoreError(`해당 가게가 존재하지 않습니니다.`);
    }
  
    const reviewId = await addReview({
      store_id,
      user_id,
      name,
      content,
      image,
      star,
    });
  
    return { 
        review_id: reviewId,
        store_id,
        user_id,
        name,
        content,
        image,
        star
    };
  };
  