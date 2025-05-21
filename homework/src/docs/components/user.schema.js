export const userSchemas = {
  SignUpRequest: {
    type: "object",
    properties: {
      email: { type: "string", example: "kny2387@gmail.com" },
      name: { type: "string", example: "김나영" },
      gender: { type: "string", example: "여성" },
      birth: { type: "string", format: "date", example: "2002-09-07" },
      address: { type: "string", example: "서울시 관악구" },
      detailAddress: { type: "string", example: "신림동" },
      phoneNumber: { type: "string", example: "010-1234-1234" },
      preferences: {
        type: "array",
        items: { type: "number" },
        example: [1, 2, 5]
      }
    },
    required: ["email", "name", "gender", "birth", "address", "phoneNumber"]
  },
  SignUpSuccessResponse: {
    resultType: "SUCCESS",
    error: null,
    success: {
      $email: "kny2387@gmail.com",
      $name: "김나영",
      preferCategory: ["한식", "일식", "디저트"]
    }
  },
  SignUpFailResponse: {
    resultType: "FAIL",
    error: {
      $errorCode: "U001",
      $reason: "이미 존재하는 이메일입니다.",
      data: null
    },
    success: null
  }
};