import { Project } from "ts-morph";

export function loadProject(tsconfigPath: string, inputPath: string) {
  const project = new Project({ tsConfigFilePath: tsconfigPath });
  const code = project.getSourceFile(inputPath);
  if (!code) throw new Error(`Could not load file at ${inputPath}`);
  const checker = project.getTypeChecker();
  return { code, checker, project };
}
