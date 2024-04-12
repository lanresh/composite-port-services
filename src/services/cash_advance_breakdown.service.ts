import { EntityRepository, Repository, getConnection } from 'typeorm';
import { CashAdvanceBreakdownEntity } from '../entities/cash_advance_breakdown.entity';
import { CashAdvanceBreakdown } from '@/interfaces/cash_advance_breakdown.interface';
import { HttpException } from '@/exceptions/HttpException';
import { CashAdvanceEntity } from '@/entities/cash_advance.entity';

async function updateCashAdvanceFields(data): Promise<void> {
  const cashAdvance = await CashAdvanceEntity.findOne({ where: { request_code: data.request_code } });
  if (!cashAdvance) throw new HttpException(409, 'Cash advance not found');

  // Update amount_recorded and balance
  //const totalAmount: number = await getConnection().query('SELECT SUM(amount) FROM public.cash_advance_breakdown_entity WHERE request_code = $1', [data.request_code]); 
  cashAdvance.amount_recorded += data.amount;
  cashAdvance.balance = cashAdvance.amount_collected - cashAdvance.amount_recorded;

  // Update action_type based on balance
  if (cashAdvance.balance === 0) {
    cashAdvance.decision = 'cash retirement complete'; // don't forget to update to action_type
  } else {
    cashAdvance.decision = 'request iou'; //don't forget to update to action_type
  }

  await CashAdvanceEntity.update({ request_code: data.request_code }, cashAdvance);
}

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

    await updateCashAdvanceFields(cashAdvanceBreakdownData);

    return createCashAdvanceBreakdownData[0];
  }

  public async findAllCashAdvanceBreakdowns(): Promise<CashAdvanceBreakdown[]> {
    return await getConnection().query(
      `SELECT cb.*, CONCAT(st.firstname,' ', st.lastname) as added_by FROM public.cash_advance_breakdown_entity cb JOIN staff_entity st ON cb.added_by = st.userid`,
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

  public async findAllCashAdvanceBreakdownsByRequestCode(requestCode: string): Promise<CashAdvanceBreakdown[]> {
    return await getConnection().query(
      `SELECT cb.*, CONCAT(st.firstname,' ', st.lastname) as added_by, st.image FROM public.cash_advance_breakdown_entity cb JOIN staff_entity st ON cb.added_by = st.userid WHERE cb.request_code = $1`,
      [requestCode],
    );
  }

  public async updateCashAdvanceBreakdown(
    cashAdvanceBreakdownId: number,
    cashAdvanceBreakdownData: CashAdvanceBreakdown,
  ): Promise<CashAdvanceBreakdown> {
    await this.findCashAdvanceBreakdownById(cashAdvanceBreakdownId);
    await CashAdvanceBreakdownEntity.update({ id: cashAdvanceBreakdownId }, cashAdvanceBreakdownData);
    await updateCashAdvanceFields(cashAdvanceBreakdownData);

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
