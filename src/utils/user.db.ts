import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createUser = async (tgId: number, token: string) => {
  return await prisma.user.create({
    data: {
      tgId: tgId,
      token: token,
    },
  })
};
export const getUser = async (tgId: number) => {
  const user = await prisma.user.findUnique({
    where: {
      tgId: tgId
    }
  })
  return user;
};

