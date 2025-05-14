import { StatusCodes } from "http-status-codes";
import { createMission } from '../services/mission.service.js';
import { bodyToMission, responseFromMission } from '../dtos/mission.dto.js';
import { challengeMission } from '../services/mission.service.js';
import { listUserMissions } from '../services/mission.service.js';
import { updateMissionStatus } from "../services/mission.service.js";

export const handleCreateMission = async (req, res) => {
  const { store_id } = req.params;

  // body + store_id → Mission 데이터 구성
  const mission = bodyToMission(req.body, store_id);

  // 서비스 로직 호출
  const result = await createMission(mission);

  res.status(StatusCodes.OK).success(result);
};

export const handleChallengeMission = async (req, res) => {
    const { mission_id } = req.params;
    const { user_id } = req.body;

    const result = await challengeMission({ mission_id: Number(mission_id), user_id });
    res.status(StatusCodes.OK).success(result);
  };

export const handleListUserMissions = async (req, res, next) => {
      const userId = parseInt(req.params.userId);
      const status = req.query.status ? parseInt(req.query.status) : undefined;
      const cursor = typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : undefined;

      const userMissions = await listUserMissions(userId, status, cursor);
      res.status(StatusCodes.OK).success(userMissions);
};

export const handleCompleteUserMission = async (req, res) => {
  const { userId, missionId } = req.params;
  const result = await updateMissionStatus(userId, missionId);
  
  res.status(StatusCodes.OK).success(result);
};
