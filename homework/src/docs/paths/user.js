export const userPaths = {
  "/api/users/signin": {
    post: {
      tags: ["User"],
      summary: "회원가입 API",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/SignUpRequest" }
          }
        }
      },
      responses: {
        200: {
          description: "가입 성공",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/SignUpSuccessResponse" }
            }
          }
        },
        400: {
          description: "가입 실패",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/SignUpFailResponse" }
            }
          }
        }
      }
    }
  }
};