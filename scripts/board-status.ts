/// <reference types="bun" />
// Moves an issue to a column of the dev-website-2026 board (project 1), adding it to the
// board first if it isn't there. Columns are looked up by name each run, so a column the
// owner adds later (HITL) works without editing this file. Names match case-insensitively.
//
//   bun run board-status <issue-number> <column>     e.g. bun run board-status 29 In progress

const OWNER = "jpyepez";
const REPO = "jpyepez/dev-website-2026";
const PROJECT_NUMBER = "1";
const PROJECT_ID = "PVT_kwHOAJXAFM4Bn-u2";
const STATUS_FIELD_ID = "PVTSSF_lAHOAJXAFM4Bn-u2zhmg3qw";

export const USAGE = "Usage: bun run board-status <issue-number> <column>  (e.g. 29 \"In progress\")";

export type StatusOption = { id: string; name: string };

export function parseArgs(args: string[]): { issue: number; column: string } {
  const [issue = "", ...rest] = args;
  const column = rest.join(" ").trim();
  if (!/^[1-9]\d*$/.test(issue) || column === "") throw new Error(USAGE);
  return { issue: Number(issue), column };
}

export function findOption(options: StatusOption[], column: string): StatusOption {
  const wanted = column.trim().toLowerCase();
  const option = options.find((o) => o.name.toLowerCase() === wanted);
  if (!option) {
    const valid = options.map((o) => o.name).join(", ");
    throw new Error(`No column named "${column}" on the board. Valid columns: ${valid}.`);
  }
  return option;
}

function gh(args: string[]): string {
  const run = Bun.spawnSync(["gh", ...args], { stdout: "pipe", stderr: "pipe" });
  if (run.exitCode !== 0) throw new Error(`gh ${args[0]} ${args[1]} failed:\n${run.stderr.toString().trim()}`);
  return run.stdout.toString().trim();
}

function statusOptions(): StatusOption[] {
  const { fields } = JSON.parse(
    gh(["project", "field-list", PROJECT_NUMBER, "--owner", OWNER, "--format", "json"]),
  ) as { fields: { id: string; options?: StatusOption[] }[] };
  const status = fields.find((f) => f.id === STATUS_FIELD_ID);
  if (!status?.options) throw new Error(`Status field ${STATUS_FIELD_ID} not found on project ${PROJECT_NUMBER}.`);
  return status.options;
}

if (import.meta.main) {
  try {
    const { issue, column } = parseArgs(process.argv.slice(2));
    const option = findOption(statusOptions(), column);
    const url = `https://github.com/${REPO}/issues/${issue}`;
    const item = gh(["project", "item-add", PROJECT_NUMBER, "--owner", OWNER, "--url", url, "--format", "json", "--jq", ".id"]);
    gh([
      "project", "item-edit", "--project-id", PROJECT_ID, "--id", item,
      "--field-id", STATUS_FIELD_ID, "--single-select-option-id", option.id,
    ]);
    console.log(`#${issue} → ${option.name}`);
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
}
