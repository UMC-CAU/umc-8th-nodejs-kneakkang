import { StatusCodes } from "http-status-codes";
import { createReview } from "../services/review.service.js";
import { bodyToReview } from "../dtos/review.dto.js";
import { ExistStoreError } from "../errors.js";

export const handleCreateReview = async (req, res, next) => {
  /*
    #swagger.summary = '가게 리뷰 추가 API'
    #swagger.tags = ['Review']
    #swagger.description = 'store_id에 해당하는 가게에 리뷰를 작성합니다.'
    #swagger.parameters['store_id'] = {
      in: 'path',
      description: '리뷰를 추가할 가게의 ID',
      required: true,
      schema: { type: 'integer' }
    }
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/CreateReviewRequest" }
        }
      }
    }
    #swagger.responses[200] = {
      description: "리뷰 작성 성공",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/CreateReviewSuccessResponse" }
        }
      }
    }
    #swagger.responses[404] = {
      description: "가게 없음 에러",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/CommonFailResponse" }
        }
      }
    }
  */

  try {
    const { store_id } = req.params;
    const reviewData = bodyToReview(req.body, store_id);
    const result = await createReview({ ...reviewData, store_id: Number(store_id) });

    res.status(StatusCodes.OK).success(result);
  } catch (err) {
    if (err instanceof ExistStoreError) {
      res.status(StatusCodes.NOT_FOUND).error({
        errorCode: err.errorCode,
        reason: err.reason,
        data: err.data || null
      });
    } else {
      next(err);
    }
  }
};
