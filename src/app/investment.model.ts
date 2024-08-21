export type PreInvestData = {
  initialInvestment: number
  annualInvestment: number,
  expectedReturn: number,
  duration: number,
}

export type InvestResultData = {
  year: number,
  interest: number,
  valueEndOfYear:number,
  annualInvestment: number,
  totalInterest: number,
  totalAmountInvested: number
}
