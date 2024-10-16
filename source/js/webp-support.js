const testWebP = (callback) => {
  const webP = new Image();
  webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';

  webP.onload = () => {
    callback(webP.height === 2);
  };

  webP.onerror = () => {
    callback(webP.height === 2);
  };
};

const isSupportClass = (support) => {
  const className = support === true ? 'webp' : 'no-webp';
  document.body.classList.add(className);
};

const initWebpSupport = () => {
  testWebP(isSupportClass);
};

export default initWebpSupport;
