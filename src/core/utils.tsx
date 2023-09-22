export const getTotalProfit = (value: number) => {
  if(value === 0) return 0;
  return ( Math.pow(1.3, value)).toFixed(2)
}