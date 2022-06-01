export default async () => {
  await global.__MONGOD__.stop();
};
