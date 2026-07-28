import path from "node:path";
import process from "node:process";
import { mkdir } from "node:fs/promises";
import sharp from "sharp";

const sourceDirectory = process.argv[2];

if (!sourceDirectory) {
  throw new Error(
    "Provide the directory containing the supplied IMG_*.jpg photographs.",
  );
}

const outputDirectory = path.resolve("public/images/school");

const photos = [
  ["IMG_0459.jpg", "creative-arts-masks.webp"],
  ["IMG_0258.jpg", "senior-students-community.webp"],
  ["IMG_4147.jpg", "museum-learning-trip.webp"],
  ["IMG_2073.jpg", "early-years-fruit-learning.webp"],
  ["IMG_2574.jpg", "student-portrait.webp"],
  ["IMG_0718.jpg", "chess-club.webp"],
  ["IMG_2254.jpg", "netball-training.webp"],
  ["IMG_0328.jpg", "school-event-leadership.webp"],
  ["IMG_0131.jpg", "basketball-team.webp"],
  ["IMG_0158.jpg", "early-years-taekwondo.webp"],
  ["IMG_0225.jpg", "campus-assembly.webp"],
  ["IMG_9632.jpg", "outdoor-study.webp"],
  ["IMG_2935.jpg", "sports-day-community.webp"],
  ["IMG_6553.jpg", "careers-day.webp"],
  ["IMG_1597.jpg", "swimming-competition.webp"],
  ["IMG_0046.jpg", "swimming-training.webp"],
  ["IMG_3081.jpg", "cycling-club.webp"],
];

await mkdir(outputDirectory, { recursive: true });

for (const [sourceName, outputName] of photos) {
  const sourcePath = path.join(sourceDirectory, sourceName);
  const outputPath = path.join(outputDirectory, outputName);

  await sharp(sourcePath)
    .rotate()
    .resize({
      width: 2400,
      height: 1800,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: 84, effort: 4 })
    .toFile(outputPath);

  process.stdout.write(`${sourceName} -> ${outputName}\n`);
}
