// Load a script with a given object name and return a promise that resolves to the object
var loadScript = async (src, objectName) => {
  const script = document.createElement("script");
  script.src = src;
  const promise = new Promise((resolve) => {
    script.onload = () => {
      const object = window[objectName];
      delete window[objectName];
      resolve(object);
    };
  });
  document.head.appendChild(script);
  return promise;
};
