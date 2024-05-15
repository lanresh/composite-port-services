import { EntityRepository, Repository, getConnection } from 'typeorm';
import { InventoryEntity } from '@entities/inventory.entity';
import { InventoryTypeEntity } from '@/entities/inventory_type.entity';
import { Inventory } from '@interfaces/inventory.interface';
import { InventoryType } from '@/interfaces/inventory_type.interface';
import { HttpException } from '@/exceptions/HttpException';
import { generateRandomCode } from '@/helpers/code_generator.helper';

@EntityRepository(InventoryEntity)
export class InventoryService extends Repository<InventoryEntity> {
  public async findAllInventory(): Promise<Inventory[]> {
    const query = `
    SELECT inv.*, 
           concat(st.firstname,' ', st.lastname) as CreatedByName, 
           concat(ut.firstname,' ', ut.lastname) as UpdatedByName 
    FROM inventory_entity inv 
    JOIN staff_entity st ON inv.created_by = st.userid 
    LEFT JOIN staff_entity ut ON inv.updated_by = ut.userid
  `;
    return getConnection().query(query);
  }

  public async findInventoryById(inventoryId: number): Promise<Inventory | string> {
    try {
      const inventory = await getConnection().query('SELECT inv.*, concat(st.firstname, " ", st.lastname) as created_by FROM inventory_entity inv JOIN staff_entity st ON inv.created_by = st.userid WHERE inventory_id = $1', [inventoryId]);
      const result = inventory.length ? inventory[0] : undefined;
      if (!result) {
        return 'No inventory found with this ID.';
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  public async createInventory(userId: string, inventoryData: Partial<Inventory>): Promise<Inventory> {
    try {
      const inventory_code = await generateRandomCode('inventory_entity', 'inventory_code', 'inv');
      const connection = getConnection();
      const query = `
        INSERT INTO inventory_entity(inventory_code, name, type, unit_price, quantity, total_price, total_quantity, remaining_quantity, created_by, comment)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *
      `;
      const result = await connection.query(query, [
        inventory_code,
        inventoryData.name,
        inventoryData.type,
        inventoryData.unit_price,
        inventoryData.quantity,
        inventoryData.total_price,
        inventoryData.total_quantity,
        inventoryData.remaining_quantity,
        userId,
        inventoryData.comment,
      ]);
      return result[0];
    } catch (error) {
      throw error;
    }
  }

  public async updateInventory(userId: string, inventoryId: number, inventoryData: Partial<Inventory>): Promise<Inventory> {
    try {
      const findInventory: Inventory = await InventoryEntity.findOne({ where: { inventory_id: inventoryId } });
      if (!findInventory) throw new Error("Inventory doesn't exist");

      await InventoryEntity.update(inventoryId, { ...inventoryData, updated_by: userId });

      const updateInventory: Inventory = await InventoryEntity.findOne({ where: { inventory_id: inventoryId } });
      return updateInventory;
    } catch (error) {
      throw new error();
    }
  }

  public async deleteInventory(inventoryId: number): Promise<void> {
    try {
      const findInventory: Inventory = await getConnection().query('SELECT * FROM inventory_entity WHERE inventory_id = $1', [inventoryId]);
      if (!findInventory) throw new HttpException(409, 'Inventory not found');

      await getConnection().query('DELETE FROM inventory_entity WHERE inventory_id = $1', [inventoryId]);
    } catch (error) {
      throw error;
    }
  }

  public async getAllInventoryTypes(): Promise<InventoryType[]> {
    try {
      const types: InventoryType[] = await getConnection().query('SELECT DISTINCT type FROM inventory_type_entity');
      return types;
    } catch (error) {
      throw error;
    }
  }

  public async getInventoryByType(type: string): Promise<InventoryType[]> {
    try {
      const inventoryType: InventoryType[] = await getConnection().query(
        `SELECT type, description, quantity, unit_price FROM inventory_type_entity WHERE type = $1`,
        [type],
      );
      if (!inventoryType.length) throw new HttpException(409, 'No inventory type found');
      return inventoryType;
    } catch (error) {
      throw error;
    }
  }
}
