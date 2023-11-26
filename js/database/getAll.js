var getAll = async (indexedDb, collectionName) => {
  const transaction = indexedDb.transaction(collectionName, "readonly");
  const collection = transaction.objectStore(collectionName);
  return new Promise((resolve, reject) => {
    const request = collection.getAll();
    request.onsuccess = () => {
      resolve(request.result);
    };
    request.onerror = (event) => {
      reject(event);
    };
  });
};
