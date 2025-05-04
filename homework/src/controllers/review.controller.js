import { createReview } from '../services/review.service.js'; // review.service.js에서 createReview를 가져온다.

export const handleCreateReview = async (req, res) => {
    const { store_id } = req.params;
    const reviewData = req.body;
  
    try {
      const result = await createReview({ ...reviewData, store_id: Number(store_id) });
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  