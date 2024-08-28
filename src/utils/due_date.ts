export async function calculateDueDate(rentPayment: string) {
  const today = new Date();
  let dueDate: Date;

  switch (rentPayment) {
    case 'yearly':
      dueDate = new Date(today.setFullYear(today.getFullYear() + 1));
      break;
    case 'monthly':
      dueDate = new Date(today.setMonth(today.getMonth() + 1));
      break;
    case 'quarterly':
      dueDate = new Date(today.setMonth(today.getMonth() + 3));
      break;
    default:
      dueDate = today;
  }

  return dueDate.toISOString().split('T')[0];
}
