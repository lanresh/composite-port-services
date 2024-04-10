// import { getConnection } from 'typeorm';

import { getConnection } from 'typeorm';

export async function generateRandomCode(tableName: string, columnName: string, codeName: string): Promise<string> {
  while (true) {
    const randomNumber = Math.floor(0 + Math.random() * 90000);
    const generatedCode = `${codeName}-${randomNumber}`;

    const whereCondition = { [columnName]: generatedCode };
    const existingRecord = await getConnection().getRepository(tableName).findOne({ where: whereCondition });

    if (!existingRecord) {
      return generatedCode;
    }
  }
}
