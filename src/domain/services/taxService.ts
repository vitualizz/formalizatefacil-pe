export const calculateIGV = (amount: number): number => {
  const IGV_RATE = 0.18;
  return parseFloat((amount * IGV_RATE).toFixed(2));
};

export const formatCurrency = (amount: number): string => {
  return `S/ ${amount.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};
