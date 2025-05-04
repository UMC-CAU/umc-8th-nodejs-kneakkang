import { addReview } from '../repositories/review.repository.js';
import { findStoreById } from '../repositories/store.repository.js';

export const createReview = async (data) => {
    const { store_id, user_id, name, content, image, star } = data;

    const store = await findStoreById(store_id);
        if (!store) {
            throw new Error(`Store with id ${store_id} does not exist.`);
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
  