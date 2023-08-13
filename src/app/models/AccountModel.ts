export interface AccountModel {
  id: number,
  account: number,
  iban: string,
  swift: string,
  owner: string,
  ownerDoc: number,
  initialBalance: string,
  currentBalance: string,
  currency: string,
  createdAt: string,
  updatedAt: string,
  isActive: boolean

}
