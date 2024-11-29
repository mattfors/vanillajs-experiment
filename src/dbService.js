import { openDB } from 'idb';

const dbPromise = openDB('counter-db', 1, {
  upgrade(db) {
    db.createObjectStore('counter', {
      keyPath: 'id',
      autoIncrement: true
    });
  }
});

export async function getCounter() {
  const db = await dbPromise;
  const tx = db.transaction('counter', 'readonly');
  const store = tx.objectStore('counter');
  const allCounters = await store.getAll();
  return allCounters.length ? allCounters[0].value : 0;
}

export async function saveCounter(value) {
  const db = await dbPromise;
  const tx = db.transaction('counter', 'readwrite');
  const store = tx.objectStore('counter');
  await store.put({ id: 1, value });
  await tx.done;
}
