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
  },
  "/api/users/me": {
  patch: {
    tags: ["User"],
    summary: "회원 정보 수정 API",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/UpdateUserRequest" }
        }
      }
    },
    responses: {
      200: {
        description: "회원 정보 수정 성공",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/UserUpdateSuccessResponse" }
          }
        }
      },
      500: {
        description: "서버 오류",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/DefaultErrorResponse" }
          }
        }
      }
    }
  }
}
};