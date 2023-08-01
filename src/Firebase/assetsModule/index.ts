import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { storage } from '../firebase';

function getAsset(assetPath: string) {
  return getDownloadURL(ref(storage, assetPath));
}

function uploadAsset(assetPath: string, asset: File) {
  return uploadBytes(ref(storage, assetPath), asset);
}

export const assetsModule = {
  getAsset,
  uploadAsset,
};
