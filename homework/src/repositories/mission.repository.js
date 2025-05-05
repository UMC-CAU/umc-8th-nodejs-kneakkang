import { prisma } from "../db.config.js";

// 미션 추가
export const addMission = async ({ store_id, point, deadline, mission_detail }) => {
  
  try {
    const mission = await prisma.mission.create({
      data: {
        storeId: store_id,
        point,
        deadline,
        missionDetail: mission_detail,
      },
    });
    return mission.id;
  } catch (err) {
    throw new Error(`미션 추가 중 오류 발생: ${err.message}`);
  }
};

// 미션 ID로 미션 + 사장 번호 조회
export const findMissionById = async (mission_id) => {
  const mission = await prisma.mission.findFirst({
    where: { id: mission_id },
    include: {
      store: {
        include: {
          owner: true, // store와 연결된 owner 조회
        },
      },
    },
  });

  if (!mission) return null;

  const ownerNumber = mission.store?.owner?.number ?? null;
  return { ...mission, owner_number: ownerNumber };
};

// 특정 유저의 특정 미션 존재 여부 조회
export const findUserMission = async ({ mission_id, user_id }) => {
  const userMission = await prisma.userMission.findFirst({
    where: {
      missionId: mission_id,
      userId: user_id,
    },
  });

  return userMission ?? null;
};

// 유저 미션 추가
export const addUserMission = async ({ mission_id, user_id, store_id, owner_number, status }) => {

  const userMission = await prisma.userMission.create({
    data: {
      missionId: mission_id,
      userId: user_id,
      storeId: store_id,
      ownerNumber: owner_number,
      status,
    },
  });

  return userMission.id;
};

// 진행중인 미션 조회
export const getUserMissions = async (userId, status, cursor) => {
  const userMissions = await prisma.userMission.findMany({
    where: {
      userId: userId,
      ...(status !== undefined && { status: Boolean(status) }),
      ...(cursor && { id: { lte: Number(cursor) } }),
    },
    orderBy: { id: "asc" },
    select: {
      id: true,
      status: true,
      mission: {
        select: {
          point: true,
          missionDetail: true,
        },
      },
      store: {
        select: {
          name: true,
        },
      },
    },
  });

  return userMissions;
};

// 미션 진행완료 누르기
export const completeUserMission = async (userId, missionId) => {
  const result = await prisma.userMission.updateMany({
    where: {
      userId: Number(userId),
      missionId: Number(missionId),
      status: true,  // 진행 중인 미션만
    },
    data: {
      status: false, // 완료 처리
    },
  });

  return result.count > 0;
};
