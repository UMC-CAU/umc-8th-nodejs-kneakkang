import { StatusCodes } from "http-status-codes";
import { createReview } from "../services/review.service.js";
import { bodyToReview } from "../dtos/review.dto.js";

export const handleCreateReview = async (req, res) => {
  /*
    #swagger.summary = '가게 리뷰 추가 API'
    #swagger.description = 'store_id에 해당하는 가게에 리뷰를 작성합니다.'
    #swagger.parameters['store_id'] = {
      in: 'path',
      description: '리뷰를 추가할 가게의 ID',
      required: true,
      type: 'integer'
    }
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              user_id: { type: "integer", example: 1 },
              content: { type: "string", example: "맛있어요! 정말 좋아요." },
              image: { type: "string", example: "image_url_here" },
              star: { type: "number", format: "float", example: 4.5 }
            }
          }
        }
      }
    }
    #swagger.responses[200] = {
      description: "리뷰 작성 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  review_id: { type: "integer", example: 17 },
                  store_id: { type: "integer", example: 2 },
                  user_id: { type: "integer", example: 1 },
                  name: { type: "string", example: "김나영" },
                  content: { type: "string", example: "맛있어요! 정말 좋아요." },
                  image: { type: "string", example: "image_url_here" },
                  star: { type: "number", format: "float", example: 4.5 }
                }
              }
            }
          }
        }
      }
    }
    #swagger.responses[404] = {
      description: "가게 없음 에러",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U007" },
                  reason: { type: "string", example: "해당 가게가 존재하지 않습니다." },
                  data: { type: "object", nullable: true, example: null }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    }
  */

  const { store_id } = req.params;
  const reviewData = bodyToReview(req.body, store_id);
  const result = await createReview({ ...reviewData, store_id: Number(store_id) });

  res.status(StatusCodes.OK).success(result);
};