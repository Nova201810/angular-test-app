export function generateUniqId() {
  const arr = new Uint32Array(3);
  window.crypto.getRandomValues(arr);
  return (performance.now().toString(36)+Array.from(arr).map(item => item.toString(36)).join("")).replace(/\./g,"");
};