import {
  addMission,
  findMissionById,
  findUserMission,
  addUserMission,
  getUserMissions,
  completeUserMission,
} from '../repositories/mission.repository.js';

import { findOwnerByStoreId } from '../repositories/owner.repository.js';
import { responseFromUserMissions } from '../dtos/mission.dto.js';



  export const createMission = async (data) => {
    const { store_id, point, deadline, mission_detail } = data;
  
    // 1. store_id로 owner_number 조회
    const owner_number = await findOwnerByStoreId(store_id);
    if (!owner_number) {
      throw new Error('해당 store_id에 대한 owner가 존재하지 않습니다.');
    }
  
    const missionId = await addMission({
      store_id,
      point,
      deadline,
      mission_detail,
    });
  
    return {
      mission_id: missionId,
      store_id,
      point,
      deadline,
      mission_detail,
      owner_number,
    };
  };

  export const challengeMission = async ({ mission_id, user_id }) => {
    const mission = await findMissionById(mission_id);
    if (!mission) {
      throw new Error('해당 미션이 존재하지 않습니다.');
    }
  
    const existingChallenge = await findUserMission({ mission_id, user_id });
    if (existingChallenge) {
      throw new Error('이미 도전 중인 미션입니다.');
    }
  
    const userMissionId = await addUserMission({
        mission_id,
        user_id,
        store_id : mission.storeId,
        owner_number: mission.owner_number,
        status: true,  
        mission: {
          connect: { id: mission_id }  
        }
      });
      
  
    return { message: '미션 도전이 성공적으로 등록되었습니다.', user_mission_id: userMissionId };
  };

export const listUserMissions = async (userId, status, cursor) => {
  const missions = await getUserMissions(userId, status, cursor);
  return responseFromUserMissions(missions);
};

export const updateMissionStatus = async (userId, missionId) => {
  const updated = await completeUserMission(userId, missionId);
  if (!updated) {
    throw new Error("해당 미션이 존재하지 않거나 이미 완료됨");
  }
};
