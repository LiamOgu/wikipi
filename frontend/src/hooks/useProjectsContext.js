import { useContext } from "react";
import { ProjectsContext } from "../contexts/projects-context";

export const useProjectsContext = () => {
  const context = useContext(ProjectsContext);

  if (!context) {
    throw new Error(
      "useProjectsContext doit être utilisé dans un ProjectsProvider"
    );
  }

  return context;
};
