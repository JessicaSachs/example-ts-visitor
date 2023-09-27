import { ButtonSize } from "./types";

export interface ButtonProps {
  /**
   * The size of the button
   */
  size: ButtonSize;
  /**
   * The color of the button
   */
  color: "primary" | "secondary";
  /**
   * The label of the button
   */
  label: string;
  /**
   * The onClick event
   */
  onClick: () => void;
  onClickWithoutJsDoc?: () => void;
}

export type SimpleNumberLiteralUnion = 1 | 2 | 3;
export type UnionMixed = SimpleNumberLiteralUnion | undefined;
export type UnionTwoDupe = SimpleNumberLiteralUnion | 2 | undefined;
export type UnionThree = SimpleNumberLiteralUnion | 3 | undefined;
export type UnionFourStringLiteral = UnionThree | "constant" | undefined;
export type Undefined = undefined;
export type Maybe<T> = T | undefined;
export type ComplexMixedType = Maybe<ButtonProps | void | 1.5 | typeof Date>;

export function bar(
  props1: ButtonProps = {
    size: "small",
    color: "primary",
    label: "foo",
    onClick: () => {},
  },
  props2: ButtonProps,
  props3: any,
  // @ts-expect-error Yeah yeah, I'm not casting any explicitly
  props4,
  props5: any = {},
  props6 = { defaultBooleanValue: true },
  props7: SimpleNumberLiteralUnion,
  props8: () => void = () => {},
  props9: () => SimpleNumberLiteralUnion = () => 1,
  props10: () => SimpleNumberLiteralUnion,
  props11 = () => 1,
  props12: UnionMixed,
  props13: UnionTwoDupe,
  props14: UnionThree,
  props15: UnionFourStringLiteral,
  props16?: UnionFourStringLiteral,
  props17?: UnionFourStringLiteral | "foo",
  props18?: Maybe<SimpleNumberLiteralUnion>,
  props19?: Undefined,
  props20?: { propName: SimpleNumberLiteralUnion } = { propName: 1 },
  props201?: { propName: SimpleNumberLiteralUnion; nested: { propName: SimpleNumberLiteralUnion } } = {
    propName: 1,
    nested: { propName: 2 },
  },
  props202: { propName: SimpleNumberLiteralUnion; nested: { union: 1 | 2 | 3 } },
  props203: { readonly propName: SimpleNumberLiteralUnion; nested: { literal: 1 } },
  props21?: 1 = 1,
  props22?: "stringLiteralWithDefault" = "stringLiteralWithDefault",
  props23?: "stringLiteralInArrayWithDefault"[] = ["stringLiteralInArrayWithDefault"],
  props24?: Array<"stringLiteralInArrayWithDefault"> = ["stringLiteralInArrayWithDefault"],
  props25?: RegExp = /myRegexp/g,
  props26?: "A" | "B" = "A",
  props27?: boolean = true,
  props28?: number = 1,
  props29?: string = "foo",
  props30?: symbol = Symbol("symbolValue"),
  props31?: bigint = BigInt(1),
  props32?: object = {},
  props33?: object = { propName: "anyValue" }
) {
  const button = document.createElement("button");
  return button;
}
