export interface AccountModel {
  id: number,
  account: number,
  iban: string,
  swift: string,
  ibn: string,
  owner: string,
  initialBalance: string,
  currentBalance: string,
  currency: string,
  isActive: boolean

}
