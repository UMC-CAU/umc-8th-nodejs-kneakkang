import { StatusCodes } from "http-status-codes";
import { listStoreReviews } from "../services/store.service.js";

export const handleListStoreReviews = async (req, res, next) => {
  /*
    #swagger.summary = '가게 리뷰 목록 조회 API'
    #swagger.description = 'storeId에 해당하는 가게의 리뷰 목록을 조회합니다. cursor 기반 페이징이 가능합니다.'
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
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "integer", example: 1 },
                        name: { type: "string", example: "김나영" },
                        star: { type: "number", format: "float", example: 4.5 },
                        content: { type: "string", example: "맛있어요! 정말 좋아요." },
                        createAt: { type: "string", format: "date-time", example: "2025-05-04T23:08:34.775Z" },
                        updateAt: { type: "string", format: "date-time", example: "2025-05-04T23:08:34.775Z" }
                      }
                    }
                  },
                  pagination: {
                    type: "object",
                    properties: {
                      cursor: { type: "integer", example: 2 }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    #swagger.responses[404] = {
      description: "가게가 없거나, 리뷰가 없는 경우",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { 
                    type: "string", 
                    example: "U007", 
                    description: "U007: 존재하지 않는 가게, U008: 리뷰 없음"
                  },
                  reason: { 
                    type: "string", 
                    example: "해당 가게가 존재하지 않습니다." 
                  },
                  data: { type: "object", nullable: true, example: null }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          },
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

  const storeId = parseInt(req.params.storeId);
  const cursor = typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : undefined;
  const reviews = await listStoreReviews(storeId, cursor);

  res.status(StatusCodes.OK).success(reviews);
};
