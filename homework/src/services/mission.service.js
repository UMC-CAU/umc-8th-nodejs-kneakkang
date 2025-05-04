import { addMission } from '../repositories/mission.repository.js';
import {
    findMissionById,
    findUserMission,
    addUserMission,
  } from '../repositories/mission.repository.js';
import { findOwnerByStoreId } from '../repositories/owner.repository.js';

  export const createMission = async (data) => {
    const { store_id, point, deadline, mission_detail } = data;
  
    // 1. store_id로 owner_number 조회
    const owner_number = await findOwnerByStoreId(store_id);
    if (!owner_number) {
      throw new Error('해당 store_id에 대한 owner가 존재하지 않습니다.');
    }
  
    // 2. mission 생성
    const missionId = await addMission({
      store_id,
      point,
      deadline,
      mission_detail,
    });
  
    // 3. 응답 반환
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
      store_id: mission.store_id,
      owner_number: mission.owner_number,
      status: 0, // 도전 중
    });
  
    return { message: '미션 도전이 성공적으로 등록되었습니다.', user_mission_id: userMissionId };
  };