export const storePaths = {
  "/api/stores/{storeId}/reviews": {
    get: {
      tags: ["Store"],
      summary: "가게 리뷰 목록 조회 API",
      description: "storeId에 해당하는 가게의 리뷰 목록을 조회합니다. cursor 기반 페이징이 가능합니다.",
      parameters: [
        {
          name: "storeId",
          in: "path",
          required: true,
          schema: { type: "integer" },
          description: "조회할 가게의 ID"
        },
        {
          name: "cursor",
          in: "query",
          required: false,
          schema: { type: "integer" },
          description: "이전 페이지의 마지막 리뷰 ID (페이징 커서)"
        }
      ],
      responses: {
        200: {
          description: "리뷰 목록 조회 성공",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ListStoreReviewsSuccess" }
            }
          }
        },
        404: {
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
      }
    }
  }
};