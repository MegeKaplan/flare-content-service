import z from "zod"

export const validateBody = (dto: z.ZodType, body: object) => {
  return dto.safeParse(body).success
}
