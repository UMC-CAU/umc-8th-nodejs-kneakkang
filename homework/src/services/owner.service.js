import { findOwnerByStoreId } from '../repositories/owner.repository.js';

export const getOwnerByStoreId = async (store_id) => {
  const owner = await findOwnerByStoreId(store_id);
  if (!owner) {
    throw new Error(`해당 store_id(${store_id})에 대한 owner가 존재하지 않습니다.`);
  }
  return owner;
};
