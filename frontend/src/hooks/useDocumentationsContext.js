import { useContext } from "react";
import { DocumentationsContext } from "../context/documentations-context";

export const useDocumentationsContext = () => {
  const context = useContext(DocumentationsContext);

  if (!context) {
    throw new Error(
      "useDocumentationsContext doit être utilisé dans un DocumentationsProvider"
    );
  }

  return context;
};
