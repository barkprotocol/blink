/**
 * Calculates the bid weight based on the bid amount and vesting period.
 * 
 * @param amount - The bid amount in BARK tokens
 * @param vestingPeriod - The vesting period in months
 * @returns The calculated bid weight
 */
export function calculateBidWeight(amount: number, vestingPeriod: number): number {
    // The bid weight is calculated as the product of the amount and a factor based on the vesting period
    // The factor is (1 + vestingPeriod / 12) to give more weight to longer vesting periods
    return amount * (1 + vestingPeriod / 12);
  }
  
  /**
   * Formats a number to a string with thousands separators and a specified number of decimal places.
   * 
   * @param num - The number to format
   * @param decimalPlaces - The number of decimal places to show (default is 2)
   * @returns The formatted number as a string
   */
  export function formatNumber(num: number, decimalPlaces: number = 2): string {
    return num.toLocaleString('en-US', {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    });
  }
  
  /**
   * Calculates the effective APR (Annual Percentage Rate) based on the bid weight and vesting period.
   * 
   * @param bidWeight - The calculated bid weight
   * @param vestingPeriod - The vesting period in months
   * @returns The calculated APR as a percentage
   */
  export function calculateEffectiveAPR(bidWeight: number, vestingPeriod: number): number {
    // This is a simplified APR calculation and may need adjustment based on the exact tokenomics
    const annualizedWeight = bidWeight * (12 / vestingPeriod);
    const apr = ((annualizedWeight / bidWeight) - 1) * 100;
    return Math.max(0, apr); // Ensure APR is not negative
  }
  
  