var deleteAll = async (db, collectionName) => {
  const transaction = db.transaction(collectionName, "readwrite");
  const collection = transaction.objectStore(collectionName);
  return new Promise((resolve, reject) => {
    const request = collection.clear();
    request.onsuccess = () => {
      resolve();
    };
    request.onerror = (event) => {
      reject(event);
    };
  });
};
