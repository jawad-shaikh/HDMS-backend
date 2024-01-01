const prisma = require('../../config/database.config');

const deleteAllDataFromAllTables = async () => {
  try {
    const result = await prisma.$queryRaw`SHOW TABLES;`;
    const tableNames = result.map((row) => Object.values(row)[0]);

    const transactions = [];

    transactions.push(prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 0;`);

    for (const tableName of tableNames) {
      transactions.push(prisma.$executeRawUnsafe(`TRUNCATE \`${tableName}\``));
    }

    transactions.push(prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 1;`);

    await prisma.$transaction(transactions);

    console.log('Deleted data successfully.');
  } catch (error) {
    console.log('Could not delete data.');
  }
};

deleteAllDataFromAllTables();
