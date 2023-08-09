export interface AccountModel {
  id: number,
  account: string,
  iban: string,
  swift: string,
  owner: string,
  initialBalance: string,
  currentBalance: string,
  currency: string,
  isActive: boolean

}
