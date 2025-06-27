import type { z } from "zod";
import API from "../config/APiClient";
import type { createDocumentValidation } from "../validation/document-validation";
import type { visibilityStatus } from "../constant/visibilty";

type createDocumentType = z.infer<typeof createDocumentValidation>;

export const createDocuemnt = async (data: createDocumentType) => {
  const res = await API.post("/document/createDocument", data);
  return res;
};

export const updatedDoc = async (data: {
  documentId: string;
  visibility: string;
}) => {
  const res = await API.post("/document/createDocument", data);
  return res;
};

export const removeDoc = async (documentId: string) => {
  const res = await API.post(`/document/removeDocument/${documentId}`);
  return res;
};

export type documentType = {
  content: string;
  createdAt: Date;
  documentId: string;
  id: string;
  mentions: string[];
  title: string;
  updatedAt: Date;
  userId: string;
  visibility: typeof visibilityStatus;
};

export const getAllDocuments = async (): Promise<documentType[]> => {
  return await API.get("/document/getAllDocuments");
};

export const getSingleDocuments = async (
  documentId: string | undefined
): Promise<documentType> => {
  return await API.get(`/document/getSingleDocument/${documentId}`);
};
