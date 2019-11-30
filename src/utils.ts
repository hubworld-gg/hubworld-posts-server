const promisify = (foo: any): Promise<any> =>
  new Promise((resolve, reject) => {
    foo((error: any, result: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });

export { promisify };
