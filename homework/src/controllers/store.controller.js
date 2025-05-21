import { StatusCodes } from "http-status-codes";
import { listStoreReviews } from "../services/store.service.js";
import { ExistStoreError, ExistReviewError } from "../errors.js";

export const handleListStoreReviews = async (req, res, next) => {
  /*
    #swagger.summary = '가게 리뷰 목록 조회 API'
    #swagger.description = 'storeId에 해당하는 가게의 리뷰 목록을 조회합니다. cursor 기반 페이징이 가능합니다.'
    #swagger.tags = ['Store']
    #swagger.parameters['storeId'] = {
      in: 'path',
      description: '조회할 가게의 ID',
      required: true,
      type: 'integer'
    }
    #swagger.parameters['cursor'] = {
      in: 'query',
      description: '이전 페이지의 마지막 리뷰 ID (페이징 커서)',
      required: false,
      type: 'integer'
    }
    #swagger.responses[200] = {
      description: "리뷰 목록 조회 성공",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/ListStoreReviewsSuccess" }
        }
      }
    }
    #swagger.responses[404] = {
      description: "가게가 없거나, 리뷰가 없는 경우",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/CommonFailResponse" },
          examples: {
            "존재하지 않는 가게": {
              value: {
                resultType: "FAIL",
                error: {
                  errorCode: "U007",
                  reason: "해당 가게가 존재하지 않습니다.",
                  data: null
                },
                success: null
              }
            },
            "리뷰 없음": {
              value: {
                resultType: "FAIL",
                error: {
                  errorCode: "U008",
                  reason: "해당 가게에 등록된 리뷰가 없습니다.",
                  data: null
                },
                success: null
              }
            }
          }
        }
      }
    }
  */

  try {
    const storeId = parseInt(req.params.storeId);
    const cursor = typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : undefined;
    const reviews = await listStoreReviews(storeId, cursor);

    res.status(StatusCodes.OK).success(reviews);
  } catch (err) {
    if (err instanceof ExistStoreError || err instanceof ExistReviewError) {
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