import { StatusCodes } from "http-status-codes";
import { createMission } from '../services/mission.service.js';
import { bodyToMission } from '../dtos/mission.dto.js';
import { challengeMission } from '../services/mission.service.js';
import { listUserMissions } from '../services/mission.service.js';
import { updateMissionStatus } from "../services/mission.service.js";

export const handleCreateMission = async (req, res) => {
  /*
    #swagger.summary = '가게 미션 추가 API'
    #swagger.description = 'store_id에 해당하는 가게에 미션을 생성합니다.'
    #swagger.parameters['store_id'] = {
      in: 'path',
      description: '미션을 추가할 가게의 ID',
      required: true,
      type: 'integer'
    }
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["point", "deadline", "mission_detail"],
            properties: {
              point: { type: "integer", example: 500 },
              deadline: { type: "string", example: "D-5" },
              mission_detail: { type: "string", example: "20,000원 이상 결제 시 500P 지급" }
            }
          }
        }
      }
    }
    #swagger.responses[200] = {
      description: "미션 생성 성공",
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
                      createAt: { type: "string", format: "date-time", example: "2025-05-05T08:08:20.008Z" },
                      updateAt: { type: "string", format: "date-time", example: "2025-05-05T08:08:20.008Z" }
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
      description: "해당 가게 없음",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U002" },
                  reason: { type: "string", example: "해당 store가 없습니다." },
                  data: {
                    type: "object",
                    properties: {
                      store_id: { type: "integer", example: 2 },
                      point: { type: "integer", example: 500 },
                      deadline: { type: "string", example: "D-5" },
                      mission_detail: { type: "string", example: "20,000원 이상 결제 시 500P 지급" }
                    }
                  }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    }
  */

  const { store_id } = req.params;
  const mission = bodyToMission(req.body, store_id);
  const result = await createMission(mission);

  res.status(StatusCodes.OK).success(result);
};

export const handleChallengeMission = async (req, res) => {
  /*
    #swagger.summary = '미션 도전 API'
    #swagger.description = '사용자가 특정 미션에 도전합니다.'
    #swagger.parameters['mission_id'] = {
      in: 'path',
      description: '도전할 미션의 ID',
      required: true,
      type: 'integer'
    }
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["user_id"],
            properties: {
              user_id: { type: "integer", example: 5 }
            }
          }
        }
      }
    }
    #swagger.responses[200] = {
      description: "미션 도전 성공",
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
                  message: { type: "string", example: "미션 도전이 성공적으로 등록되었습니다." },
                  user_mission_id: { type: "integer", example: 23 }
                }
              }
            }
          }
        }
      }
    }
    #swagger.responses[409] = {
      description: "이미 도전 중인 미션",
      content: {
        "application/json": {
          schema: {
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
          }
        }
      }
    }
  */

  const { mission_id } = req.params;
  const { user_id } = req.body;

  const result = await challengeMission({ mission_id: Number(mission_id), user_id });
  res.status(StatusCodes.OK).success(result);
};

export const handleListUserMissions = async (req, res, next) => {
  /*
    #swagger.summary = '사용자 미션 목록 조회 API'
    #swagger.description = '특정 유저의 미션 리스트를 조회합니다. status와 cursor를 쿼리 파라미터로 받을 수 있습니다.'
    #swagger.parameters['userId'] = {
      in: 'path',
      description: '유저의 ID',
      required: true,
      type: 'integer'
    }
    #swagger.parameters['status'] = {
      in: 'query',
      description: '미션 상태 (예: 1은 완료, 0은 미완료)',
      required: false,
      type: 'integer'
    }
    #swagger.parameters['cursor'] = {
      in: 'query',
      description: '페이징 커서 - 마지막으로 조회된 미션 ID',
      required: false,
      type: 'integer'
    }
    #swagger.responses[200] = {
      description: "미션 목록 조회 성공",
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
          }
        }
      }
    }
    #swagger.responses[404] = {
      description: "해당 유저의 미션 없음",
      content: {
        "application/json": {
          schema: {
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
          }
        }
      }
    }
  */

  const userId = parseInt(req.params.userId);
  const status = req.query.status ? parseInt(req.query.status) : undefined;
  const cursor = typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : undefined;

  const userMissions = await listUserMissions(userId, status, cursor);
  res.status(StatusCodes.OK).success(userMissions);
};

export const handleCompleteUserMission = async (req, res) => {
  /*
    #swagger.summary = '미션 상태 완료 처리 API'
    #swagger.description = '특정 사용자의 특정 미션을 완료 상태로 변경합니다.'
    #swagger.parameters['userId'] = {
      in: 'path',
      description: '유저의 ID',
      required: true,
      type: 'integer'
    }
    #swagger.parameters['missionId'] = {
      in: 'path',
      description: '미션 ID',
      required: true,
      type: 'integer'
    }
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: { type: "boolean", example: false }
            }
          }
        }
      }
    }
    #swagger.responses[200] = {
      description: "미션 완료 처리 성공",
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
                  message: { type: "string", example: "미션 완료로 상태를 변경하였습니다" }
                }
              }
            }
          }
        }
      }
    }
    #swagger.responses[409] = {
      description: "이미 완료된 미션",
      content: {
        "application/json": {
          schema: {
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
        }
      }
    }
  */

  const { userId, missionId } = req.params;
  const result = await updateMissionStatus(userId, missionId);
  
  res.status(StatusCodes.OK).success(result);
};