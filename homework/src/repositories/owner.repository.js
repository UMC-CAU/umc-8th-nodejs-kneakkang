import { prisma } from "../db.config.js";

// owner_number로 owner 조회
export const findOwnerByNumber = async (number) => {
  return await prisma.owner.findUnique({
    where: {
      number: number,
    },
  });
};

// store_id로 owner_number를 조회하는 함수
export const findOwnerNumberByStoreId = async (store_id) => {
  const owner = await prisma.owner.findFirst({
    where: {
      store_id: store_id,
    },
    select: {
      number: true,
    },
  });
  return owner ? owner.number : null;
};

// store_id로 owner 조회
export const findOwnerByStoreId = async (store_id) => {
  return await prisma.owner.findFirst({
    where: {
      store_id: store_id,
    },
  });
};
