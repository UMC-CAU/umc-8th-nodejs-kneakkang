import { StatusCodes } from "http-status-codes";
import { createReview } from '../services/review.service.js'; 
import { bodyToReview } from '../dtos/review.dto.js';

export const handleCreateReview = async (req, res) => {
    const { store_id } = req.params;
    const reviewData = bodyToReview(req.body, store_id);
    const result = await createReview({ ...reviewData, store_id: Number(store_id) });
    
    res.status(StatusCodes.OK).success(result);
  };
  