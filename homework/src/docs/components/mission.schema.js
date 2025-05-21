export const missionSchemas = {
  CreateMissionRequest: {
    type: "object",
    required: ["point", "deadline", "mission_detail"],
    properties: {
      point: { type: "integer", example: 500 },
      deadline: { type: "string", example: "D-5" },
      mission_detail: { type: "string", example: "20,000원 이상 결제 시 500P 지급" }
    }
  },
  CreateMissionSuccessResponse: {
    type: "object",
    properties: {
      resultType: { type: "string", example: "SUCCESS" },
      error: { type: "object", nullable: true, example: null },
      success: {
        type: "object",
        properties: {
          mission_id: { type: "integer", example: 12 },
          store_id: { type: "integer", example: 1 },
          point: { type: "integer", example: 500 },
          deadline: { type: "string", example: "D-5" },
          mission_detail: { type: "string", example: "20,000원 이상 결제 시 500P 지급" },
          owner_number: {
            type: "object",
            properties: {
              id: { type: "integer", example: 1 },
              number: { type: "integer", example: 711496961 },
              store_id: { type: "integer", example: 1 },
              createAt: { type: "string", format: "date-time" },
              updateAt: { type: "string", format: "date-time" }
            }
          }
        }
      }
    }
  },
  ChallengeMissionRequest: {
    type: "object",
    required: ["user_id"],
    properties: {
      user_id: { type: "integer", example: 5 }
    }
  },
  ChallengeMissionSuccessResponse: {
    type: "object",
    properties: {
      resultType: { type: "string", example: "SUCCESS" },
      error: { type: "object", nullable: true, example: null },
      success: {
        type: "object",
        properties: {
          message: { type: "string", example: "미션 도전이 성공적으로 등록되었습니다." },
          user_mission_id: { type: "integer", example: 23 }
        }
      }
    }
  },
  DuplicateMissionFailResponse: {
    type: "object",
    properties: {
      resultType: { type: "string", example: "FAIL" },
      error: {
        type: "object",
        properties: {
          errorCode: { type: "string", example: "U003" },
          reason: { type: "string", example: "이미 도전 중인 미션입니다." },
          data: {
            type: "object",
            properties: {
              user_mission_id: { type: "integer", example: 23 }
            }
          }
        }
      },
      success: { type: "object", nullable: true, example: null }
    }
  },
  ListUserMissionsSuccessResponse: {
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
                id: { type: "integer", example: 2 },
                status: { type: "boolean", example: true },
                mission: {
                  type: "object",
                  properties: {
                    point: { type: "integer", example: 500 },
                    missionDetail: { type: "string", example: "20,000원 이상 결제 시 500P 지급" }
                  }
                },
                store: {
                  type: "object",
                  properties: {
                    name: { type: "string", example: "맘스터치" }
                  }
                }
              }
            }
          },
          pagination: {
            type: "object",
            properties: {
              cursor: { type: "integer", example: 12 }
            }
          }
        }
      }
    }
  },
  ExistMissionFailResponse: {
    type: "object",
    properties: {
      resultType: { type: "string", example: "FAIL" },
      error: {
        type: "object",
        properties: {
          errorCode: { type: "string", example: "U004" },
          reason: { type: "string", example: "해당 유저의 미션이 존재하지 않습니다." },
          data: { type: "object", nullable: true, example: null }
        }
      },
      success: { type: "object", nullable: true, example: null }
    }
  },
  CompleteMissionRequest: {
    type: "object",
    properties: {
      status: { type: "boolean", example: true }
    },
    required: ["status"]
  },
  CompleteMissionSuccessResponse: {
    type: "object",
    properties: {
      resultType: { type: "string", example: "SUCCESS" },
      error: { type: "object", nullable: true, example: null },
      success: {
        type: "object",
        properties: {
          message: { type: "string", example: "미션 완료로 상태를 변경하였습니다" }
        }
      }
    }
  },
  CompleteMissionFailResponse: {
    type: "object",
    properties: {
      resultType: { type: "string", example: "FAIL" },
      error: {
        type: "object",
        properties: {
          errorCode: { type: "string", example: "U005" },
          reason: { type: "string", example: "해당 미션이 이미 완료되었습니다." },
          data: { type: "object", nullable: true, example: null }
        }
      },
      success: { type: "object", nullable: true, example: null }
    }
  }
};