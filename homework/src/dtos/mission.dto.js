// 클라이언트 요청(body) → 내부 Mission 객체로 변환
export const bodyToMission = (body, store_id) => {
    return {
      store_id: Number(store_id),
      point: Number(body.point),
      deadline: body.deadline,
      mission_detail: body.mission_detail,
    };
  };
  
  // Mission 생성 후 응답 형식
export const responseFromMission = ({ mission_id, store_id, point, deadline, mission_detail, owner_number }) => {
    return {
      mission_id,
      store_id,
      point,
      deadline,
      mission_detail,
      owner_number
    };
  };