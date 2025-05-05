import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const categories = [
    '한식', '일식', '중식', '양식', '치킨', '분식',
    '고기／구이', '도시락', '야식', '패스트푸드', '디저트', '아시안푸드'
  ];

  for (const name of categories) {
    await prisma.foodCategory.create({ data: { name } });
  }
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
