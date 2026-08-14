import path from "node:path";
import process from "node:process";
import { readdir, readFile, writeFile } from "node:fs/promises";

const projectRoot = process.cwd();
const publicDirectory = path.join(projectRoot, "public");
const outputPath = path.join(projectRoot, "PHOTO-INVENTORY.md");
const runtimeDirectories = ["app", "components", "data", "db", "lib"];
const imageExtensions = new Set([
  ".avif",
  ".gif",
  ".jpeg",
  ".jpg",
  ".png",
  ".webp",
]);
const codeExtensions = new Set([
  ".css",
  ".js",
  ".jsx",
  ".mjs",
  ".ts",
  ".tsx",
]);

const toPosix = (value) => value.split(path.sep).join("/");

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listFiles(entryPath)));
    } else {
      files.push(entryPath);
    }
  }

  return files;
}

function lastMatch(expression, value) {
  return [...value.matchAll(expression)].at(-1)?.[1];
}

function wordsFromIdentifier(value) {
  return value
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (letter) => letter.toUpperCase());
}

function routeFromPageFile(relativeFile) {
  if (/^app\/page\.(?:ts|tsx|js|jsx)$/.test(relativeFile)) return "/";

  const withoutPage = relativeFile
    .replace(/^app\//, "")
    .replace(/\/page\.(?:ts|tsx|js|jsx)$/, "")
    .replace(/\[(?:\.\.\.)?([^\]]+)\]/g, ":$1");

  return withoutPage ? `/${withoutPage}` : "/";
}

function describeUsage(relativeFile, contentBeforeLine) {
  if (/^app(?:\/.+)?\/page\.(?:ts|tsx|js|jsx)$/.test(relativeFile)) {
    const route = routeFromPageFile(relativeFile);
    return route === "/" ? "Homepage" : `Page ${route}`;
  }

  if (relativeFile === "app/layout.tsx") return "Site metadata and icons";

  if (relativeFile === "data/content-pages.ts") {
    const route = lastMatch(/route:\s*["']([^"']+)["']/g, contentBeforeLine);
    return route ? `Page ${route}` : "Content detail pages";
  }

  if (relativeFile === "data/leadership.ts") {
    const route = lastMatch(/route:\s*["']([^"']+)["']/g, contentBeforeLine);
    return route ? `Page ${route}` : "Leadership pages";
  }

  if (relativeFile === "data/stories.ts") {
    const slug = lastMatch(/slug:\s*["']([^"']+)["']/g, contentBeforeLine);
    return slug ? `Story /stories/${slug}` : "Seeded story pages";
  }

  if (relativeFile === "data/site.ts") {
    const dataSet = lastMatch(
      /export const\s+([A-Za-z0-9_]+)/g,
      contentBeforeLine,
    );
    return dataSet ? `Shared ${wordsFromIdentifier(dataSet)}` : "Shared site data";
  }

  if (relativeFile.startsWith("components/")) {
    return `Shared ${path.basename(relativeFile, path.extname(relativeFile))} component`;
  }

  return relativeFile;
}

async function loadOriginalPhotoMap() {
  const processScript = path.join(
    projectRoot,
    "scripts",
    "process-school-photos.mjs",
  );
  const content = await readFile(processScript, "utf8");
  const map = new Map();

  for (const match of content.matchAll(
    /\[\s*["']([^"']+\.(?:jpe?g|png))["']\s*,\s*["']([^"']+\.(?:webp|jpe?g|png))["']\s*\]/gi,
  )) {
    map.set(`/images/school/${match[2]}`, match[1]);
  }

  return map;
}

const imageFiles = (await listFiles(publicDirectory))
  .filter((file) => imageExtensions.has(path.extname(file).toLowerCase()))
  .sort((left, right) => left.localeCompare(right));

const codeFiles = (
  await Promise.all(
    runtimeDirectories.map(async (directory) => {
      const absoluteDirectory = path.join(projectRoot, directory);
      return listFiles(absoluteDirectory);
    }),
  )
)
  .flat()
  .filter((file) => codeExtensions.has(path.extname(file).toLowerCase()));

const codeDocuments = await Promise.all(
  codeFiles.map(async (file) => ({
    file,
    relativeFile: toPosix(path.relative(projectRoot, file)),
    content: await readFile(file, "utf8"),
  })),
);
const originalPhotoMap = await loadOriginalPhotoMap();

const inventory = imageFiles.map((file) => {
  const relativeFile = toPosix(path.relative(projectRoot, file));
  const websitePath = `/${toPosix(path.relative(publicDirectory, file))}`;
  const usages = [];

  for (const document of codeDocuments) {
    const lines = document.content.split(/\r?\n/);
    let contentBeforeLine = "";

    lines.forEach((line, index) => {
      contentBeforeLine += `${line}\n`;
      if (!line.includes(websitePath)) return;

      usages.push({
        label: describeUsage(document.relativeFile, contentBeforeLine),
        location: `${document.relativeFile}:${index + 1}`,
      });
    });
  }

  return {
    relativeFile,
    websitePath,
    originalFile: originalPhotoMap.get(websitePath) ?? "—",
    usages,
  };
});

const activeImages = inventory.filter((item) => item.usages.length > 0);
const unusedImages = inventory.filter((item) => item.usages.length === 0);

const activeRows = activeImages
  .map((item) => {
    const usages = item.usages
      .map((usage) => `${usage.label} (\`${usage.location}\`)`)
      .join("<br>");
    return `| \`${item.relativeFile}\` | \`${item.originalFile}\` | ${usages} |`;
  })
  .join("\n");

const unusedRows = unusedImages
  .map(
    (item) =>
      `| \`${item.relativeFile}\` | \`${item.originalFile}\` | Not referenced by the current site code |`,
  )
  .join("\n");

const report = `# Site Photo Inventory

This report is generated by \`npm run photos:audit\`. It maps files in \`public/\` to the current website code.

## Safest way to replace a photo

1. Find the photo below and check every listed usage.
2. Export the replacement using the **same exact filename and format**.
3. Replace the file inside \`public/images/school/\` or \`public/images/\`.
4. Keep school photographs at a practical web size (up to about 2400 × 1800 pixels; WebP quality around 80–85).
5. Run \`npm run photos:audit\` again, then preview the affected pages.

Replacing a shared filename changes every page that uses it. To use a different photo in only one place, add a new uniquely named file and update only the listed code location for that page.

## Summary

- ${activeImages.length} image files are referenced by the current site code.
- ${unusedImages.length} image files are not referenced by the current site code.
- Dashboard-created stories can also store image paths in the database; those dynamic records are not counted here.

## Active images

| Image file | Original supplied file | Current website usage |
|---|---|---|
${activeRows}

## Currently unused images

These files are present in the project but do not appear in the current website code. They can be reviewed, repurposed or removed later.

| Image file | Original supplied file | Status |
|---|---|---|
${unusedRows}
`;

await writeFile(outputPath, report, "utf8");
process.stdout.write(
  `Photo inventory written to ${path.relative(projectRoot, outputPath)} (${activeImages.length} active, ${unusedImages.length} unused).\n`,
);
