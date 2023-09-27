import {
  ExportDeclaration,
  ExportedDeclarations,
  FunctionDeclaration,
  InterfaceDeclaration,
  ParameterDeclaration,
  PropertySignature,
  SourceFile,
  TypeChecker,
} from "ts-morph";
import { pad } from "./utils";

const RELEVANT_KINDS = [
  "FunctionDeclaration",
  "Identifier",
  "InterfaceDeclaration",
  "TypeReference",
  "TypeAliasDeclaration",
  "TypeLiteral",
  "UnionType",
  "AnyKeyword",
  "UndefinedKeyword",
  "NullKeyword",
  "BooleanKeyword",
  "NumberKeyword",
  "StringKeyword",
  "ObjectKeyword",
  "ArrayType",
  "LiteralType",
  "NumericLiteral",
  "BigIntKeyword",
  "SymbolKeyword",
  "VoidKeyword",
  "FunctionType",
  "PropertySignature",
  "Parameter",
];

const isRelevantKind = (kind: string) => RELEVANT_KINDS.includes(kind);
export function getExportedDeclarations(sourceFile: SourceFile) {
  return sourceFile.getExportedDeclarations();
}

type ArgumentType<T> = T extends (...args: infer U) => any ? U : never;

/** This was a nice attempt, but unfortunately the type.isUnion checker
 * seems to flatten literally everything... any I want to be able to represent the schema
 * inside of of `tests/types.ts`
 * */
function handleLiterals(
  declaration: ArgumentType<typeof walk>[0],
  type: ReturnType<ArgumentType<typeof walk>[0]["getType"]>,
  level: number
) {
  if (
    type.isString() ||
    type.isBoolean() ||
    type.isAny() || // TODO
    type.isUnknown() || // TODO
    type.isVoid() || // TODO
    type.isNever() || // TODO
    type.isNumber() ||
    type.isStringLiteral() ||
    type.isNumberLiteral() ||
    type.isBooleanLiteral()
  ) {
    console.log("reference?!");
    const propName = declaration?.getSymbol()?.getName();

    const value = type.getText();
    let typeToCast;

    if (type.isString() || type.isStringLiteral()) {
      typeToCast = String;
    } else if (type.isBoolean() || type.isBooleanLiteral()) {
      typeToCast = Boolean;
    } else if (type.isNumber() || type.isNumberLiteral()) {
      typeToCast = Number;
    } else {
      typeToCast = String;
    }

    console.log(`${pad(level)} DECLARATION NAME: ${propName} - ${value} - ${typeToCast.name}`);
  }
}

export function walk(
  declaration: PropertySignature | ExportedDeclarations | SourceFile | ParameterDeclaration,
  checker: TypeChecker,
  level: number = 0
) {
  const type = declaration.getType();
  const kind = declaration.getKindName();
  if (!isRelevantKind(kind)) return;

  if (declaration instanceof ExportDeclaration || declaration instanceof SourceFile) return;
  const name = declaration.getSymbol()?.getName() || type.getAliasSymbol()?.getName();
  console.log(
    `${pad(level)} KIND: ${kind} - NAME: ${name} - TEXT FROM PARENT: ${type.getText(declaration.getParent())}`
  );
  if (level === 0) console.log(`------`);
  if (kind === "InterfaceDeclaration") {
    console.log(`${pad(level)} interface ${name}`);
    const props = (declaration as InterfaceDeclaration).getProperties();
    props.forEach((property) => {
      walk(property, checker, level + 1);
    });
  } else if (declaration.getKindName() === "FunctionDeclaration") {
    console.log(`function ${name}`);
    (declaration as FunctionDeclaration).getParameters().forEach((p) => {
      console.log(`${pad(level + 1)} param ${p.getName()} - ${p.getKindName()}`);
      walk(p, checker, level + 1);
    });
  } else if (declaration.getKindName() === "TypeAliasDeclaration") {
    console.log(`${pad(level + 1)} type ${name}`);
    declaration.getChildren().forEach((c) => {
      const kind = c.getKindName();
      if (!isRelevantKind(kind)) return;
      console.log(`${pad(level + 1)} child ${kind}`);
      walk(c as ExportedDeclarations, checker, level + 1);
    });
  } else if (declaration.getKindName() === "PropertySignature") {
    console.log(`${pad(level)} ${name} - property - ${kind}`);
    declaration.getChildren().forEach((c) => {
      // No idea why Node<Node> isn't working
      walk(c, checker, level + 1);
    });
  } else if (kind === "TypeReference") {
    // I can't figure out how to look up the TypeReferences
    console.log(`${pad(level)} TYPE REFERENCE: ${name}`);
  }
}
