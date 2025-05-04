// 클라이언트 요청 → 내부 서비스용 객체로 변환
export const bodyToReview = (body) => {
    return {
      user_id: body.user_id,
      name: body.name,
      content: body.content,
      image: body.image,
      star: body.star,
    };
  };
  
  // 내부 데이터 → 클라이언트 응답 형식으로 가공
  export const responseFromReview = (data) => {
    return {
      review_id: data.review_id,
      store_id: data.store_id,
      user_id: data.user_id,
      name: data.name,
      content: data.content,
      image: data.image,
      star: data.star,
      create_at: data.create_at,
      update_at: data.update_at,
    };
  };
  