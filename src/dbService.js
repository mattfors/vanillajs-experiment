import { openDB } from 'idb';

const dbPromise = openDB('counter-db', 1, {
  upgrade(db) {
    db.createObjectStore('counter', {
      keyPath: 'id',
      autoIncrement: true
    });
  }
});

let sessionId = null;

export async function getCounter() {
  const db = await dbPromise;
  const tx = db.transaction('counter', 'readonly');
  const store = tx.objectStore('counter');
  const allCounters = await store.getAll();
  return allCounters.reduce((sum, record) => sum + record.value, 0);
}

export async function saveCounter(value) {
  const db = await dbPromise;
  const tx = db.transaction('counter', 'readwrite');
  const store = tx.objectStore('counter');
  const timestamp = new Date().toISOString();

  if (sessionId === null) {
    sessionId = await store.add({ value, lastUpdate: timestamp });;
  } else {
    const record = await store.get(sessionId);
    record.value = value;
    record.lastUpdate = timestamp;
    await store.put(record);
  }

  await tx.done;
}

export async function getAllCounters() {
  const db = await dbPromise;
  const tx = db.transaction('counter', 'readonly');
  const store = tx.objectStore('counter');
  return await store.getAll();
}

export async function deleteCounter(id)  {
  const db = await dbPromise;
  console.log('deleteCounter', id);
  const tx = db.transaction('counter', 'readwrite');
  const store = tx.objectStore('counter');
  await store.delete(Number(id));
  await tx.done;

}
