import { StatusCodes } from "http-status-codes";
import { listStoreReviews } from "../services/store.service.js";

export const handleListStoreReviews = async (req, res, next) => {
    const storeId = parseInt(req.params.storeId);
    const cursor = typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : undefined;
    
    const reviews = await listStoreReviews(storeId, cursor);
    res.status(StatusCodes.OK).json({ reviews });
  };