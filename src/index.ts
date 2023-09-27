import { loadProject } from "./project";
import { join, relative } from "path";
import { getExportedDeclarations, walk } from "./walk";
import { consoleTable } from "./utils";

const tsconfigPath = join(import.meta.dir, "..", "tsconfig.json");
const input = relative(".", process.argv[2] || join("test", "simple-interface.ts"));

console.log(`********** Running typescript-parser **********`);
console.log(`Loading the file: ${input}`);

const { code, checker } = loadProject(tsconfigPath, input);
const loadedFilePath = relative(import.meta.dir, code.getFilePath());

console.log(`Loaded project and source file at ${loadedFilePath}`);

const exportedDeclarations = getExportedDeclarations(code);
if (!exportedDeclarations.size) console.error(`No exported declarations found in ${loadedFilePath}`);
else {
  console.log(`Found ${exportedDeclarations.size} exported declarations in ${loadedFilePath}`);

  const allExportedDeclarations = Array.from(exportedDeclarations).map(([name, [declaration]]) => declaration);

  // You can go ahead and print this with consoleTable
  const exportedDeclarationsTableData = Array.from(exportedDeclarations).map(([name, [declaration]]) => ({
    name,
    isInterface: declaration.getType().isInterface(),
    isFunction: declaration.getKindName() === "FunctionDeclaration",
    kind: declaration.getKindName(),
    fileName: relative(import.meta.dir, declaration.getSourceFile().getFilePath()),
  }));

  // consoleTable(exportedDeclarationsTableData)

  // Start walking from the exported declarations.
  allExportedDeclarations.forEach((declaration) => walk(declaration, checker));
}
