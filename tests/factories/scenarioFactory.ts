import client from "../../src/databases/database";

async function deleteAllData() {
  await client.$executeRaw`TRUNCATE TABLE "users" RESTART IDENTITY CASCADE`;
}

const scenarioFactory = {
  deleteAllData,
};

export default scenarioFactory;
