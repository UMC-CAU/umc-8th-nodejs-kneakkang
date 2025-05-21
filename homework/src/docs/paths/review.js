export const reviewPaths = {
  "/api/stores/{store_id}/reviews": {
    post: {
      tags: ["Review"],
      summary: "가게 리뷰 추가 API",
      description: "store_id에 해당하는 가게에 리뷰를 추가합니다.",
      parameters: [
        {
          name: "store_id",
          in: "path",
          required: true,
          schema: { type: "integer" },
          description: "가게 ID"
        }
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/CreateReviewRequest" }
          }
        }
      },
      responses: {
        200: {
          description: "작성 성공",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CreateReviewSuccessResponse" }
            }
          }
        },
        404: {
          description: "가게 없음",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CommonFailResponse" }
            }
          }
        }
      }
    }
  }
};
