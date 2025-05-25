const fs = require('fs');
const csv = require('csv-parser');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

fs.createReadStream('compound.csv')
  .pipe(csv())
  .on('data', async (row) => {
    await prisma.compound.create({
      data: {
        name: row.name,
        image: row.image,
        description: row.description
      }
    });
  })
  .on('end', () => {
    console.log('CSV import complete');
  });