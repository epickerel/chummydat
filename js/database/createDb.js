var createDb = async (app) => {
  let iddb;
  const { dbName, collections } = app.constants;
  const dbRequest = window.indexedDB.open(dbName, 2); // Why not 1? I mean, it doesn't need to make sense, right?
  dbRequest.onerror = (event) => {
    console.log("Database error: ", event.target.errorCode);
  };
  dbRequest.onupgradeneeded = (event) => {
    iddb = event.target.result;
    for (const collectionName of Object.keys(collections)) {
      const collection = iddb.createObjectStore(
        collectionName,
        collections[collectionName].init
      );
      for (const index of collections[collectionName].indexes) {
        collection.createIndex(...index);
      }
    }
  };
  dbRequest.onsuccess = (event) => {
    iddb = event.target.result;
  };
  const insert = await loadScript("js/database/insert.js", "insert");
  const getAll = await loadScript("js/database/getAll.js", "getAll");
  const deleteAll = await loadScript("js/database/deleteAll.js", "deleteAll");
  const api = {
    getAll: (collectionName) => {
      return getAll(iddb, collectionName);
    },
    insert: (collectionName, item) => {
      return insert(iddb, collectionName, item);
    },
    deleteAll: (collectionName) => {
      return deleteAll(iddb, collectionName);
    },
  };
  const promise = new Promise((resolve) => {
    if (iddb) {
      resolve(api);
    }
    dbRequest.onsuccess = (event) => {
      iddb = event.target.result;
      console.log("Database opened successfully from promise (race condition)");
      resolve(api);
    };
  });
  return promise;
};
