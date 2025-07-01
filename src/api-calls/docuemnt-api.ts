import { z } from "zod";
import API from "../config/APiClient";
import type { visibilityType } from "../constant/visibilty";
import type { documentValidation } from "../validation/document-validation";

type createDocumentType = z.infer<typeof documentValidation>;

export const createDocument = async (data: createDocumentType) => {
  const res = await API.post("/document/createDocument", data);
  return res;
};

export const removeDoc = async (documentId: string) => {
  const res = await API.post(`/document/removeDocument/${documentId}`);
  return res;
};

type updateDocument = {
  title?: string;
  content?: string;
  mentions?: string[];
  documentId: string;
  visibility?: string | "Public" | "Private" | "Draft";
};

export const updateDoc = async (data: updateDocument) => {
  const res = await API.post(`/document/updateDoc`, data);
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
  visibility: visibilityType;
  user: {
    email: string;
    id: string;
    userName: string;
  };
};

export const getAllDocuments = async (): Promise<documentType[]> => {
  return await API.get("/document/getAllDocuments");
};

export const getSingleDocuments = async (
  documentId: string | undefined
): Promise<documentType> => {
  return await API.get(`/document/getSingleDocument/${documentId}`);
};

type notification = {
  id: string;
  title: string;
  mentionedUser: string;
  documentId: string;
  isOpen: boolean;
  createdAt: Date;
  updatedAt: Date;
};
export const getUserNotification = async (
  userName: string | undefined
): Promise<notification[]> => {
  return await API.get(`/document/userNotification/${userName}`);
};

export const openNotification = async (documentId: string) => {
  return await API.post(`/document/openNotification/${documentId}`);
};
