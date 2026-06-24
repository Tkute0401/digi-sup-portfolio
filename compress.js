const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const inputDirs = [
  'c:/Users/Kutet/Downloads/portfolio/digi sup portfolio/cinematic',
  'c:/Users/Kutet/Downloads/portfolio/digi sup portfolio/talking head educational'
];
const outputDir = 'c:/Users/Kutet/Downloads/portfolio/website/public/videos/compressed';

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

console.log(`Found ${allFiles.length} videos to compress.`);

for (let i = 0; i < allFiles.length; i++) {
  const file = allFiles[i];
  const safeName = file.fileName.replace(/[^a-zA-Z0-9.\-_]/g, '_'); // sanitize filename
  const prefix = file.isCinematic ? 'cinematic_' : 'talkinghead_';
  const outputPath = path.join(outputDir, prefix + safeName);
  
  if (fs.existsSync(outputPath)) {
    console.log(`[${i+1}/${allFiles.length}] Skipping (already exists): ${safeName}`);
    continue;
  }
  
  console.log(`[${i+1}/${allFiles.length}] Compressing: ${file.fileName}`);
  
  // Scale so the largest dimension is 1080 (maintains aspect ratio). 
  // crf 28 is high compression, preset veryfast to save time.
  const cmd = `ffmpeg -i "${file.inputPath}" -vf "scale='min(1080,iw)':'min(1080,ih)':force_original_aspect_ratio=decrease" -vcodec libx264 -crf 28 -preset veryfast -c:a aac -b:a 128k -y "${outputPath}"`;
  
  try {
    execSync(cmd, { stdio: 'inherit' });
  } catch (err) {
    console.error(`Error compressing ${file.fileName}`, err.message);
  }
}

console.log('All compression tasks complete.');
