import { prisma } from "../db.config.js";

// 리뷰 추가
export const addReview = async ({ store_id, user_id, name, content, image, star }) => {
  try {
    const review = await prisma.review.create({
      data: {
        storeId: store_id,
        userId: user_id,
        name: name,
        content: content,
        image: image,
        star: star,
      },
    });
    return review.id;
  } catch (err) {
    throw new Error(`리뷰 추가 중 오류 발생: ${err}`);
  }
};
