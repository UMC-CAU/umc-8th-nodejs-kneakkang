import { createMission } from '../services/mission.service.js';
import { bodyToMission, responseFromMission } from '../dtos/mission.dto.js';
import { challengeMission } from '../services/mission.service.js';

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