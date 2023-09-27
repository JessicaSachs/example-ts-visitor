type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps {
  size: ButtonSize;
  color: "primary" | "secondary";
  label: string;
  radius: 1 | 2.5 | 2 | 3;
  onClick: () => void;
}

export function bar(
  props1: ButtonProps = {
    size: "small",
    color: "primary",
    label: "foo",
    onClick: () => { },
    radius: 2.5
  }
) {
  const button = document.createElement("button");
  return button;
}
