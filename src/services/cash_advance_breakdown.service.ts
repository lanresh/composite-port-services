import { EntityRepository, Repository, getConnection } from 'typeorm';
import { CashAdvanceBreakdownEntity } from '../entities/cash_advance_breakdown.entity';
import { CashAdvanceBreakdown } from '@/interfaces/cash_advance_breakdown.interface';
import { HttpException } from '@/exceptions/HttpException';

@EntityRepository(CashAdvanceBreakdownEntity)
export class CashAdvanceBreakdownService extends Repository<CashAdvanceBreakdownEntity> {
  public async createCashAdvanceBreakdown(userId: string, cashAdvanceBreakdownData: CashAdvanceBreakdown): Promise<CashAdvanceBreakdown> {
    const query = `INSERT INTO public.cash_advance_breakdown_entity(
            request_code, description, amount, added_by, comment)
            VALUES ($1, $2, $3, $4, $5) RETURNING *`;

    const createCashAdvanceBreakdownData: CashAdvanceBreakdown[] = await getConnection().query(query, [
      cashAdvanceBreakdownData.request_code,
      cashAdvanceBreakdownData.description,
      cashAdvanceBreakdownData.amount,
      userId,
      cashAdvanceBreakdownData.comment,
    ]);

    return createCashAdvanceBreakdownData[0];
  }

  public async findAllCashAdvanceBreakdowns(): Promise<CashAdvanceBreakdown[]> {
    return await getConnection().query(
      'SELECT cb.*, CONCAT(st.firstname, " ", st.lastname) as added_by FROM public.cash_advance_breakdown_entity cb JOIN staff_entity st ON cb."addedBy" = st.userid',
    );
  }

  public async findCashAdvanceBreakdownById(cashAdvanceBreakdownId: number): Promise<CashAdvanceBreakdown> {
    const cashAdvanceBreakdown: CashAdvanceBreakdown[] = await getConnection().query(
      'SELECT * FROM public.cash_advance_breakdown_entity WHERE id = $1',
      [cashAdvanceBreakdownId],
    );
    if (!cashAdvanceBreakdown.length) throw new HttpException(409, 'Cash advance breakdown not found');

    return cashAdvanceBreakdown[0];
  }

  public async updateCashAdvanceBreakdown(
    cashAdvanceBreakdownId: number,
    cashAdvanceBreakdownData: CashAdvanceBreakdown,
  ): Promise<CashAdvanceBreakdown> {
    await this.findCashAdvanceBreakdownById(cashAdvanceBreakdownId);
    await CashAdvanceBreakdownEntity.update({ id: cashAdvanceBreakdownId }, cashAdvanceBreakdownData);

    const updateCashAdvanceBreakdown: CashAdvanceBreakdown = await this.findCashAdvanceBreakdownById(cashAdvanceBreakdownId);
    return updateCashAdvanceBreakdown;
  }

  public async deleteCashAdvanceBreakdown(cashAdvanceBreakdownId: number): Promise<CashAdvanceBreakdown> {
    const deletedCashAdvanceBreakdown: CashAdvanceBreakdown[] = await getConnection().query(
      'DELETE FROM public.cash_advance_breakdown_entity WHERE id = $1 RETURNING *',
      [cashAdvanceBreakdownId],
    );
    if (!deletedCashAdvanceBreakdown.length) throw new HttpException(409, 'Cash advance breakdown not found');

    return deletedCashAdvanceBreakdown[0];
  }
}
