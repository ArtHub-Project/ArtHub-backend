import {Prisma} from "@prisma/client"

export const DATA_USER_SELECT: Prisma.UserSelect = {
  id: true,
  name: true,
  username: true,
  registeredAt: true,
}
