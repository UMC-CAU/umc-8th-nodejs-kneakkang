import { StatusCodes } from "http-status-codes";
import { createMission } from '../services/mission.service.js';
import { bodyToMission, responseFromMission } from '../dtos/mission.dto.js';
import { challengeMission } from '../services/mission.service.js';
import { listUserMissions } from '../services/mission.service.js';
import { updateMissionStatus } from "../services/mission.service.js";

export const handleCreateMission = async (req, res) => {
  const { store_id } = req.params;

  try {
    // body + store_id → Mission 데이터 구성
    const mission = bodyToMission(req.body, store_id);

    // 서비스 로직 호출
    const result = await createMission(mission);

    // 응답 포맷으로 변환하여 전송
    res.status(201).json(responseFromMission(result));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const handleChallengeMission = async (req, res) => {
    const { mission_id } = req.params;
    const { user_id } = req.body;
  
    try {
      const result = await challengeMission({ mission_id: Number(mission_id), user_id });
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

export const handleListUserMissions = async (req, res, next) => {
      const userId = parseInt(req.params.userId);
      const status = req.query.status ? parseInt(req.query.status) : undefined;
      const cursor = typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : undefined;

      const userMissions = await listUserMissions(userId, status, cursor);
      res.status(StatusCodes.OK).json({ userMissions });
};

export const handleCompleteUserMission = async (req, res) => {
  const { userId, missionId } = req.params;

  try {
    await updateMissionStatus(userId, missionId);
    res.status(StatusCodes.OK).json({ message: "미션 완료 처리됨" });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};
