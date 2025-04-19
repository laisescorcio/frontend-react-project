import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "O email é obrigatório").email("Email inválido"),
  password: z
    .string()
    .min(1, "A senha é obrigatória")
    .min(6, "A senha precisa ter pelo menos 6 caracteres"),
});

export type LoginData = z.infer<typeof loginSchema>;
