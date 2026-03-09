import 'dotenv/config';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { generateAllFeatureContent } from '../services/content-generation.service';

async function main() {
  console.log('Generating feature content...');
  const startTime = Date.now();

  const content = await generateAllFeatureContent();

  const outputPath = join(process.cwd(), 'lib', 'generated', 'features.json');
  await writeFile(outputPath, JSON.stringify(content, null, 2));

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`Generated ${Object.keys(content).length} features in ${elapsed}s`);
  console.log(`Output: ${outputPath}`);
}

main().catch((error) => {
  console.error('Generation failed:', error);
  process.exit(1);
});
