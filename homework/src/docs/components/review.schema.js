export const reviewSchemas = {
  CreateReviewRequest: {
    type: "object",
    properties: {
      user_id: { type: "integer", example: 1 },
      content: { type: "string", example: "맛있어요! 정말 좋아요." },
      image: { type: "string", example: "https://cdn.example.com/image.jpg" },
      star: { type: "number", format: "float", example: 4.5 }
    },
    required: ["user_id", "content", "star"]
  },
  CreateReviewSuccessResponse: {
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
          image: { type: "string", example: "https://cdn.example.com/image.jpg" },
          star: { type: "number", format: "float", example: 4.5 }
        }
      }
    }
  },
  CommonFailResponse: {
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
};
