export function validateUpload(file, maxSize) {
  if (!file || !file.name || !Number.isFinite(file.size)) throw new Error('Choose a file to upload');
  if (file.size === 0) throw new Error('The file is empty');
  if (file.size > maxSize) throw new Error('The file exceeds the 20 MB upload limit');
}
