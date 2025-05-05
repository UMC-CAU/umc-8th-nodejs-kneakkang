export const bodyToUser = (body) => {
  const birth = new Date(body.birth); // birth를 Date 객체로 변환

  return {
    email: body.email,
    name: body.name,
    gender: body.gender,
    birth, // Date 객체로 반환
    address: body.address || "",
    detailAddress: body.detailAddress || "",
    phoneNumber: body.phoneNumber,
    preferences: body.preferences,
  };
};

export const responseFromUser = ({ user, preferences }) => {
  const preferFoods = preferences.map(
    (preference) => preference.foodCategory.name
  );

  return {
    email: user.email,
    name: user.name,
    preferCategory: preferFoods,
  };
};


