import { prisma } from "../db.config.js";
import { responseFromUser } from "../dtos/user.dto.js";
import { DuplicateUserEmailError } from "../errors.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
} from "../repositories/user.repository.js";

export const userSignUp = async (data) => {
  const joinUserId = await addUser({
    email: data.email,
    name: data.name,
    gender: data.gender,
    birth: new Date(data.birth),
    address: data.address,
    detailAddress: data.detailAddress,
    phoneNumber: data.phoneNumber,
  });

  if (joinUserId === null) {
    throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", data);
  }

  for (const preference of data.preferences) {
    await setPreference(joinUserId, preference);
  }

  const user = await getUser(joinUserId);
  console.log("User data:", user);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser({ user, preferences });
};

export const updateUserInfo = async (userId, data) => {
  const updated = await prisma.user.update({
    where: { id: userId },
    data: {
      name: data.name,
      gender: data.gender,
      phoneNumber: data.phoneNumber,
      birth: new Date(data.birth),
      address: data.address,
      detailAddress: data.detailAddress,
    },
  });
  return updated;
};