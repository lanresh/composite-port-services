import { EntityRepository, Repository, getConnection } from 'typeorm';
import { ToolFromStoreEntity } from '@entities/tool_from_store.entity';
import { ToolFromStore } from '@interfaces/tool_from_store.interface';
import { HttpException } from '@exceptions/HttpException';
import { generateRandomCode } from '@/helpers/code_generator.helper';

@EntityRepository(ToolFromStoreEntity)
export class ToolFromStoreService extends Repository<ToolFromStoreEntity> {
  public async findAllToolsFromStore(): Promise<ToolFromStore[]> {
    try {
      const allToolsFromStore = await getConnection().query(`
        SELECT * FROM tool_from_store_entity
      `);
      return allToolsFromStore;
    } catch (error) {
      throw error;
    }
  }

  public async findToolFromStoreById(toolId: number): Promise<ToolFromStore | string> {
    try {
      const tool = await getConnection().query(
        'SELECT * FROM tool_from_store_entity WHERE id = $1',
        [toolId]
      );
      const result = tool.length ? tool[0] : undefined;
      if (!result) {
        return "No tool found with this ID.";
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  public async createToolFromStore(toolData: Partial<ToolFromStore>): Promise<ToolFromStore> {
    try {
      const toolCode = await generateRandomCode('tool_from_store_entity', 'tool_from_store_code', 'tfs');
      const connection = getConnection();
      const query = `
        INSERT INTO tool_from_store_entity(tool_from_store_code, tool_name, picked_by, picked_on, status, returned_on, project_name, project_code, request_type, comment)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *
      `;
      const result = await connection.query(query, [
        toolCode,
        toolData.tool_name,
        toolData.picked_by,
        toolData.picked_on,
        toolData.status,
        toolData.returned_on,
        toolData.project_name,
        toolData.project_code,
        toolData.request_type,
        toolData.comment,
      ]);
      return result[0];
    } catch (error) {
      throw error;
    }
  }

  public async updateToolFromStore(toolId: number, toolData: Partial<ToolFromStore>): Promise<ToolFromStore> {
    try {
        const findTool: ToolFromStore| undefined = await ToolFromStoreEntity.findOne({ where: { id: toolId } });
        if (!findTool) throw new HttpException(409,"Tool doesn't exist");
        await ToolFromStoreEntity.update(toolId, { ...toolData });

        const updateTool: ToolFromStore | undefined = await ToolFromStoreEntity.findOne({ where: { id: toolId } });
        return updateTool;

    } catch (error) {
      throw error;
    }
  }


  public async deleteToolFromStore(toolId: number): Promise<void> {
    try {
      await getConnection().query('DELETE FROM tool_from_store_entity WHERE id = $1', [toolId]);
    } catch (error) {
      throw error;
    }
  }
}
