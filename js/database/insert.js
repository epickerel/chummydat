var insert = (db, collectionName, item) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(collectionName, "readwrite");
    const collection = transaction.objectStore(collectionName);
    const request = collection.add(item);
    request.onsuccess = () => {
      resolve();
    };
    request.onerror = (event) => {
      // TODO: Handle duplicate key error
      resolve();
    };
  });
};
