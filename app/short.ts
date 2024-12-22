import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { db } from './firebase';

const COLLECTION_NAME = 'shortLinks';

export async function createShortLink(longUrl: string): Promise<string> {
  const id = nanoid(6); // Generate a 6-character ID
  const shortLinkRef = doc(collection(db, COLLECTION_NAME), id);

  await setDoc(shortLinkRef, { longUrl });

  return id;
}

export async function getLongUrl(id: string): Promise<string | null> {
  const shortLinkRef = doc(collection(db, COLLECTION_NAME), id);
  const shortLinkDoc = await getDoc(shortLinkRef);

  if (shortLinkDoc.exists()) {
    return shortLinkDoc.data().longUrl;
  }

  return null;
}
