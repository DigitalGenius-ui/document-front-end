import { useEffect, useState } from "react";
import TextEditor from "./TextEditor";
import queryKeys from "../../constant/query-keys";
import {
  createDocuemnt,
  getSingleDocuments,
  type documentType,
} from "../../api-calls/docuemnt-api";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import type { z } from "zod";
import type { createDocumentValidation } from "../../validation/document-validation";
import useCreateData from "../../hooks/useCreateData";

const CreateDocument = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [mention, setMention] = useState<string[]>([]);

  const { submitForm, isPending } = useCreateData({
    key: [queryKeys.DOCUMENT],
    func: createDocuemnt,
  });

  const { id } = useParams();

  const { data } = useQuery<documentType>({
    queryKey: [queryKeys.DOCUMENT, id],
    queryFn: async () => await getSingleDocuments(id),
  });

  useEffect(() => {
    if (data) {
      setContent(data?.content || "");
      setTitle(data?.title || "");
    }
  }, [data]);

  const debouncedSave = useDebouncedCallback(
    async (value: z.infer<typeof createDocumentValidation>) => {
      await submitForm({
        inputData: value,
        dataMessage: "",
      });
    },
    1000
  );

  useEffect(() => {
    if (!id || !content) return;
    if (content) {
      debouncedSave({
        title,
        content,
        mentions: mention,
        documentId: id,
      });
    }
  }, [title, content, mention, debouncedSave, id]);

  return (
    <section className="bg-yellow-50 text-black text-sm">
      <TextEditor
        content={content}
        setContent={setContent}
        setMention={setMention}
        title={title}
        setTitle={setTitle}
        isPending={isPending}
      />
    </section>
  );
};

export default CreateDocument;
