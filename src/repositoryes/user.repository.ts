import { prisma } from './db'

export const createUser = ( tgId: number, token: string ) => {
  return prisma.user.create({
    data: {
      tgId,
      token
    }
  });
};

export const userExists = async ( tgId: number ): Promise<boolean> => {
  const user = await prisma.user.findUnique({
    where: { tgId },
    select: {
      tgId: true
    }
  });

  return Boolean(user);
};

export const getTokenByTgId = async ( tgId: number ): Promise<string | null> => {
  const user = await prisma.user.findUnique({
    where: { tgId },
    select: {
      token: true,
    }
  });

  return user?.token ?? null;
};

