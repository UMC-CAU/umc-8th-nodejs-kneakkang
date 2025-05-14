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
import { 
  MatchToStoreError,
  DuplicateMissionError,
  ExistMissionError,
  CompleteMissionError
} from "../errors.js";

  export const createMission = async (data) => {
    const { store_id, point, deadline, mission_detail } = data;
  
    const owner_number = await findOwnerByStoreId(store_id);
    
    if (!owner_number) {
      throw new MatchToStoreError('해당 store가 없습니다.', data);
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

    const existingChallenge = await findUserMission({ mission_id, user_id });
    
    if (existingChallenge) {
      throw new DuplicateMissionError('이미 도전 중인 미션입니다.', { user_mission_id: existingChallenge.id });
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

export const listUserMissions = async (user_id, status, cursor) => {
  const missions = await getUserMissions(user_id, status, cursor);

  const existingChallenge = await findUserMission({user_id: Number(user_id)});

  if (!existingChallenge) {
    throw new ExistMissionError('해당 유저의 미션이 존재하지 않습니다.')
  }
  return responseFromUserMissions(missions);
};

export const updateMissionStatus = async (user_id, mission_id) => {
  const updated = await completeUserMission(user_id, mission_id);

  const existingChallenge = await findUserMission({
  mission_id: Number(mission_id),
  user_id: Number(user_id),
});
  console.log(existingChallenge)
  if (mission_id != existingChallenge.missionId) { 
    throw new ExistMissionError('해당 유저의 미션이 존재하지 않습니다.')
  }

  if (!updated) {
    throw new CompleteMissionError("해당 미션이 이미 완료되었습니다.");
  }

  return { message: '미션 완료로 상태를 변경하였습니다' };
};
