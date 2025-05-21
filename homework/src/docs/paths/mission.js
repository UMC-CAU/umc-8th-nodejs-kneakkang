export const missionPaths = {
  "/api/stores/{store_id}/missions": {
    post: {
      tags: ["Mission"],
      summary: "가게 미션 추가 API",
      parameters: [
        {
          name: "store_id",
          in: "path",
          required: true,
          schema: { type: "integer" },
          description: "미션을 추가할 가게 ID"
        }
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/CreateMissionRequest" }
          }
        }
      },
      responses: {
        200: {
          description: "미션 생성 성공",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CreateMissionSuccessResponse" }
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
  },
  "/api/missions/{mission_id}": {
    post: {
      tags: ["Mission"],
      summary: "미션 도전 API",
      parameters: [
        {
          name: "mission_id",
          in: "path",
          required: true,
          schema: { type: "integer" },
          description: "도전할 미션 ID"
        }
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ChallengeMissionRequest" }
          }
        }
      },
      responses: {
        200: {
          description: "도전 성공",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ChallengeMissionSuccessResponse" }
            }
          }
        },
        409: {
          description: "중복 도전 실패",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/DuplicateMissionFailResponse" }
            }
          }
        }
      }
    }
  },
  "/api/users/{userId}/missions": {
    get: {
      tags: ["Mission"],
      summary: "사용자 미션 목록 조회 API",
      description: "특정 유저의 미션 리스트를 조회합니다. status와 cursor를 쿼리 파라미터로 받을 수 있습니다.",
      parameters: [
        {
          name: "userId",
          in: "path",
          required: true,
          schema: { type: "integer" },
          description: "유저의 ID"
        },
        {
          name: "status",
          in: "query",
          required: false,
          schema: { type: "integer" },
          description: "미션 상태 (예: 1은 완료, 0은 미완료)"
        },
        {
          name: "cursor",
          in: "query",
          required: false,
          schema: { type: "integer" },
          description: "페이징 커서 - 마지막으로 조회된 미션 ID"
        }
      ],
      responses: {
        200: {
          description: "미션 목록 조회 성공",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ListUserMissionsSuccessResponse" }
            }
          }
        },
        404: {
          description: "해당 유저의 미션 없음",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ExistMissionFailResponse" }
            }
          }
        }
      }
    }
  },
  "/api/users/{userId}/missions/{missionId}": {
  patch: {
    tags: ["Mission"],
    summary: "미션 완료 처리 API",
    parameters: [
      {
        name: "userId",
        in: "path",
        required: true,
        schema: { type: "integer" },
        description: "유저 ID"
      },
      {
        name: "missionId",
        in: "path",
        required: true,
        schema: { type: "integer" },
        description: "미션 ID"
      }
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/CompleteMissionRequest" }
        }
      }
    },
    responses: {
      200: {
        description: "완료 성공",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/CompleteMissionSuccessResponse" }
          }
        }
      },
      409: {
        description: "이미 완료된 미션",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/CompleteMissionFailResponse" }
          }
        }
      }
    }
  }
}
};