import { StatusCodes } from "http-status-codes";
import { createMission } from '../services/mission.service.js';
import { bodyToMission } from '../dtos/mission.dto.js';
import { challengeMission } from '../services/mission.service.js';
import { listUserMissions } from '../services/mission.service.js';
import { updateMissionStatus } from "../services/mission.service.js";
import { MatchToStoreError } from "../errors.js";
import { DuplicateMissionError } from "../errors.js";
import { ExistMissionError } from "../errors.js";
import { CompleteMissionError } from "../errors.js";

export const handleCreateMission = async (req, res, next) => {
  /*
    #swagger.summary = '가게 미션 추가 API'
    #swagger.tags = ['Mission']
    #swagger.parameters['store_id'] = {
      in: 'path',
      required: true,
      schema: { type: 'integer' },
      description: '미션을 추가할 가게 ID'
    }
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/CreateMissionRequest" }
        }
      }
    }
    #swagger.responses[200] = {
      description: "미션 생성 성공",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/CreateMissionSuccessResponse" }
        }
      }
    }
    #swagger.responses[404] = {
      description: "해당 가게 없음",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/CommonFailResponse" }
        }
      }
    }
  */
  try {
    const { store_id } = req.params;
    const mission = bodyToMission(req.body, store_id);
    const result = await createMission(mission);
    res.status(StatusCodes.OK).success(result);
  } catch (err) {
    if (err instanceof MatchToStoreError) {
      res.status(StatusCodes.NOT_FOUND).error({
        errorCode: err.errorCode,
        reason: err.reason,
        data: err.data || null
      });
    } else {
      next(err);
    }
  }
};

export const handleChallengeMission = async (req, res, next) => {
  /*
    #swagger.summary = '미션 도전 API'
    #swagger.tags = ['Mission']
    #swagger.description = '사용자가 특정 미션에 도전합니다.'
    #swagger.parameters['mission_id'] = {
      in: 'path',
      required: true,
      schema: { type: 'integer' },
      description: '도전할 미션 ID'
    }
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/ChallengeMissionRequest" }
        }
      }
    }
    #swagger.responses[200] = {
      description: "미션 도전 성공",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/ChallengeMissionSuccessResponse" }
        }
      }
    }
    #swagger.responses[409] = {
      description: "이미 도전 중인 미션",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/DuplicateMissionFailResponse" }
        }
      }
    }
  */

  try {
    const { mission_id } = req.params;
    const { user_id } = req.body;

    const result = await challengeMission({ mission_id: Number(mission_id), user_id });
    res.status(StatusCodes.OK).success(result);
  } catch (err) {
    if (err instanceof DuplicateMissionError) {
      res.status(StatusCodes.CONFLICT).error({
        errorCode: err.errorCode,
        reason: err.reason,
        data: err.data || null
      });
    } else {
      next(err);
    }
  }
};

export const handleListUserMissions = async (req, res, next) => {
  /*
    #swagger.summary = '사용자 미션 목록 조회 API'
    #swagger.tags = ['Mission']
    #swagger.description = '특정 유저의 미션 리스트를 조회합니다. status와 cursor를 쿼리 파라미터로 받을 수 있습니다.'
    #swagger.parameters['userId'] = {
      in: 'path',
      description: '유저의 ID',
      required: true,
      schema: { type: 'integer' }
    }
    #swagger.parameters['status'] = {
      in: 'query',
      description: '미션 상태 (예: 1은 완료, 0은 미완료)',
      required: false,
      schema: { type: 'integer' }
    }
    #swagger.parameters['cursor'] = {
      in: 'query',
      description: '페이징 커서 - 마지막으로 조회된 미션 ID',
      required: false,
      schema: { type: 'integer' }
    }
    #swagger.responses[200] = {
      description: "미션 목록 조회 성공",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/ListUserMissionsSuccessResponse" }
        }
      }
    }
    #swagger.responses[404] = {
      description: "해당 유저의 미션 없음",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/ExistMissionFailResponse" }
        }
      }
    }
  */

  try {
    const userId = parseInt(req.params.userId);
    const status = req.query.status ? parseInt(req.query.status) : undefined;
    const cursor = typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : undefined;

    const userMissions = await listUserMissions(userId, status, cursor);
    res.status(StatusCodes.OK).success(userMissions);
  } catch (err) {
    if (err instanceof ExistMissionError) {
      res.status(StatusCodes.NOT_FOUND).error({
        errorCode: err.errorCode,
        reason: err.reason,
        data: err.data || null
      });
    } else {
      next(err);
    }
  }
};

export const handleCompleteUserMission = async (req, res, next) => {
  /*
    #swagger.summary = '미션 상태 완료 처리 API'
    #swagger.tags = ['Mission']
    #swagger.description = '특정 사용자의 특정 미션을 완료 상태로 변경합니다.'
    #swagger.parameters['userId'] = {
      in: 'path',
      description: '유저의 ID',
      required: true,
      schema: { type: 'integer' }
    }
    #swagger.parameters['missionId'] = {
      in: 'path',
      description: '미션 ID',
      required: true,
      schema: { type: 'integer' }
    }
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/CompleteMissionRequest" }
        }
      }
    }
    #swagger.responses[200] = {
      description: "미션 완료 처리 성공",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/CompleteMissionSuccessResponse" }
        }
      }
    }
    #swagger.responses[409] = {
      description: "이미 완료된 미션",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/CompleteMissionFailResponse" }
        }
      }
    }
  */

  try {
    const { userId, missionId } = req.params;
    const result = await updateMissionStatus(userId, missionId);
    res.status(StatusCodes.OK).success(result);
  } catch (err) {
    if (err instanceof CompleteMissionError) {
      res.status(StatusCodes.CONFLICT).error({
        errorCode: err.errorCode,
        reason: err.reason,
        data: err.data || null
      });
    } else {
      next(err);
    }
  }
};