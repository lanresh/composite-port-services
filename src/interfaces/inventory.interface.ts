export interface Inventory {
  inventory_id: number;
  inventory_code: string;
  name: string;
  type: string;
  unit_price: number;
  quantity: number;
  total_price: number;
  total_quantity: number;
  remaining_quantity: number;
  created_by: string;
  updated_by: string;
  comment: string;
}
