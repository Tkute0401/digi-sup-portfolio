const fs = require('fs');
const path = require('path');

const inputDirs = [
  'c:/Users/Kutet/Downloads/portfolio/digi sup portfolio/cinematic',
  'c:/Users/Kutet/Downloads/portfolio/digi sup portfolio/talking head educational'
];
const outputDir = 'c:/Users/Kutet/Downloads/portfolio/website/public/videos/all';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

let allFiles = [];

inputDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.mp4') || f.endsWith('.MOV'));
    files.forEach(f => {
      allFiles.push({
        inputPath: path.join(dir, f),
        fileName: f,
        isCinematic: dir.includes('cinematic')
      });
    });
  }
});

console.log(`Found ${allFiles.length} videos to copy.`);

for (let i = 0; i < allFiles.length; i++) {
  const file = allFiles[i];
  const safeName = file.fileName.replace(/[^a-zA-Z0-9.\-_]/g, '_');
  const prefix = file.isCinematic ? 'cinematic_' : 'talkinghead_';
  const outputPath = path.join(outputDir, prefix + safeName);
  
  if (!fs.existsSync(outputPath)) {
    console.log(`[${i+1}/${allFiles.length}] Copying: ${file.fileName}`);
    fs.copyFileSync(file.inputPath, outputPath);
  } else {
    console.log(`[${i+1}/${allFiles.length}] Skipping (already exists): ${safeName}`);
  }
}

console.log('All copy tasks complete. FFmpeg was not available, so original files were used.');
