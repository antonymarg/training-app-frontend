import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { storage } from './firebase';

export function getAsset(assetPath: string) {
  return getDownloadURL(ref(storage, assetPath));
}

export function uploadAsset(assetPath: string, asset: File) {
  return uploadBytes(ref(storage, assetPath), asset);
}
