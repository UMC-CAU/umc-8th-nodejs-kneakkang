export const storeSchemas = {
  ListStoreReviewsSuccess: {
    resultType: "SUCCESS",
    error: null,
    success: {
      data: [
        {
          id: 1,
          name: "김나영",
          star: 4.5,
          content: "맛있어요! 정말 좋아요.",
          createAt: "2025-05-04T23:08:34.775Z",
          updateAt: "2025-05-04T23:08:34.775Z"
        }
      ],
      pagination: { cursor: 2 }
    }
  },
  CommonFailResponse: {
    resultType: "FAIL",
    error: {
      errorCode: "U007",
      reason: "해당 가게가 존재하지 않습니다.",
      data: null
    },
    success: null
  }
};