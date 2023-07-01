import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

export function getAsset(assetPath: string) {
  return getDownloadURL(ref(storage, assetPath));
}
