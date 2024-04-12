import { EntityRepository, Repository, getConnection } from 'typeorm';
import { CashAdvanceEntity } from '../entities/cash_advance.entity';
import { CashAdvance } from '@/interfaces/cash_advance.interface';
import { HttpException } from '@/exceptions/HttpException';

@EntityRepository(CashAdvanceEntity)
export class CashAdvanceService extends Repository<CashAdvanceEntity> {
  public async createCashAdvance(cashAdvanceData: CashAdvance): Promise<CashAdvance> {
    const query = `INSERT INTO public.cash_advance_entity(
            project_code, project_name, cash_advance_type, request_code, staff_id, staff_name, amount_collected, amount_recorded, balance, status, purpose, bank_to, payment_method, action_type)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) ON CONFLICT (request_code) DO NOTHING RETURNING *`;

    const createCashAdvanceData: CashAdvance[] = await getConnection().query(query, [
      cashAdvanceData.project_code,
      cashAdvanceData.project_name,
      cashAdvanceData.cash_advance_type,
      cashAdvanceData.request_code,
      cashAdvanceData.staff_id,
      cashAdvanceData.staff_name,
      cashAdvanceData.amount_collected || 0,
      cashAdvanceData.amount_recorded || 0,
      cashAdvanceData.balance || 0,
      cashAdvanceData.status,
      cashAdvanceData.description,
      cashAdvanceData.bank_to,
      cashAdvanceData.payment_method,
      'return cash balance',
    ]);

    return createCashAdvanceData[0];
  }

  public async findAllCashAdvances(): Promise<CashAdvance[]> {
    return await getConnection().query('SELECT ca.*, st.image FROM public.cash_advance_entity ca JOIN staff_entity st ON ca.staff_id = st.userid');
  }

  public async findCashAdvanceById(cashId: number): Promise<CashAdvance> {
    const cashAdvances: CashAdvance[] = await getConnection().query(
      'SELECT ca.*, st.image FROM public.cash_advance_entity ca LEFT JOIN staff_entity st ON ca.action_by = st.userid WHERE cash_id = $1',
      [cashId],
    );
    if (!cashAdvances.length) throw new HttpException(409, 'Cash advance not found');

    return cashAdvances[0];
  }

  public async findCashAdvanceByProjectCode(projectCode: string): Promise<CashAdvance[]> {
    return await getConnection().query('SELECT * FROM public.cash_advance_entity WHERE project_code = $1', [projectCode]);
  }

  public async updateCashAdvance(cashId: number, cashAdvanceData: CashAdvance): Promise<CashAdvance> {
    const cashAdvance: CashAdvance = await CashAdvanceEntity.findOne({ where: { cash_id: cashId } });
    if (!cashAdvance) throw new HttpException(409, 'Cash advance not found');

    // Set the default value for the status field if it's not included in cashAdvanceData
    const updatedCashAdvanceData: CashAdvance = { ...cashAdvanceData };
    if (updatedCashAdvanceData.amount_recorded) {
      updatedCashAdvanceData.amount_recorded = cashAdvance.amount_recorded + updatedCashAdvanceData.amount_recorded;
      updatedCashAdvanceData.balance = cashAdvance.amount_collected - updatedCashAdvanceData.amount_recorded;
    }

    await CashAdvanceEntity.update({ cash_id: cashId }, updatedCashAdvanceData);
    const updatedCashAdvance: CashAdvance = await CashAdvanceEntity.findOne({ where: { cash_id: cashId } });
    return updatedCashAdvance;
  }

  public async deleteCashAdvance(cashId: number): Promise<CashAdvance> {
    const deleteCashAdvance: CashAdvance[] = await getConnection().query('DELETE FROM public.cash_advance_entity WHERE cash_id = $1 RETURNING *', [
      cashId,
    ]);
    if (!deleteCashAdvance.length) throw new HttpException(409, 'Cash advance not found');

    return deleteCashAdvance[0];
  }
}
