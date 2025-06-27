import { z } from "zod";

export const createDocumentValidation = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  mentions: z.string().array().optional(),
  documentId: z.string().min(1).max(26),
  visibility: z.enum(["Public", "Private", "Draft"]).optional(),
});
