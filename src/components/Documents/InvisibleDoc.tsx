import type { documentType } from "../../api-calls/docuemnt-api";
import Document from "./Document";

const InvisibleDoc = ({
  docs,
  title,
}: {
  docs: documentType[];
  title: string;
}) => {
  return (
    <>
      {docs?.length > 0 && (
        <div className="!space-y-5">
          <h1>{title}</h1>
          <div className="!space-y-5">
            {docs?.map((doc) => (
              <Document doc={doc} key={doc.id} />
            ))}
          </div>
          <div className="border-b border-gray-400" />
        </div>
      )}
    </>
  );
};

export default InvisibleDoc;
