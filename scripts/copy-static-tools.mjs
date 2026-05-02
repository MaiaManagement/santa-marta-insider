import { cp, mkdir } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const source = path.join(root, 'tools');
const destination = path.join(root, 'out', 'tools');

await mkdir(path.dirname(destination), { recursive: true });
await cp(source, destination, { recursive: true, force: true });
