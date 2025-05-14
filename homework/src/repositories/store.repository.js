import { prisma } from "../db.config.js";

export const findStoreById = async (store_id) => {
  const store = await prisma.store.findUnique({
    where: { id: store_id },
  });

  return store;
};
  
export const getAllStoreReviews = async (storeId, cursor) => {
    const reviews = await prisma.review.findMany({
      select: { id: true, name : true, star : true, content : true, createAt : true, updateAt : true },
      where: { storeId: storeId, ...(cursor && { id: { lte: cursor } }) }, // cursor가 있을 때만 필터
      orderBy: { id: "asc" },
    });
  
    return reviews;
  };

export const findStoreReview = async (store_id) => {
  const reviews = await prisma.review.findFirst({
    where: {
      storeId: store_id,
    },
  });
  return reviews ?? null;
};
