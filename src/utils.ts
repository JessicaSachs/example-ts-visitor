export function consoleTable(data: any[]) {
  if (data.length === 0) return;

  const columns = Object.keys(data[0]);
  const columnWidths = columns.map((col) => Math.max(col.length, ...data.map((row) => String(row[col]).length)));
  const border = "+-" + columnWidths.map((width) => "-".repeat(width)).join("-+-") + "-+";
  console.log(border);
  console.log(
    `| ${columns.map((col, i) => `\x1b[31;1m${col.toUpperCase().padEnd(columnWidths[i], " ")}\x1b[0m`).join(" | ")} |`
  );
  console.log(border);
  data.forEach((row, index) => {
    console.log(`| ${columns.map((col, i) => String(row[col]).padEnd(columnWidths[i])).join(" | ")} |`);
    console.log(border);
  });
}

export function pad(level: number = 0) {
  return "  ".repeat(level);
}
