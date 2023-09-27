// I want both the ability to reference ButtonSizeNumber as well as ButtonSize
// AND to flatten the union types to their literal values
// Ideally I get something like what's in the README.md

export type ButtonSize = "small" | "medium" | "large" | ButtonSizeNumber;
export type ButtonSizeNumber = 1 | 2 | 3;
