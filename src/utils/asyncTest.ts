export default function asyncTest() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('11111');
    }, 2000);
  });
}
