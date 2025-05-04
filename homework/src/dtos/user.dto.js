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
  const birthDate = new Date(user.birth);
  const formattedBirth = birthDate.toISOString().split('T')[0];

  return {
    email: user.email,
    name: user.name,
    gender: user.gender,
    birth: formattedBirth,
    address: user.address || "",
    detailAddress: user.detailAddress || "",
    phoneNumber: user.phoneNumber,
    preferences: preferences || [],
  };
};


