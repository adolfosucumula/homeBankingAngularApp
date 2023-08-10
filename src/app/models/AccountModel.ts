export interface AccountModel {
  id: number,
  account: string,
  iban: string,
  swift: string,
  owner: string,
  ownerDoc: string,
  initialBalance: string,
  currentBalance: string,
  currency: string,
  createdAt: string,
  updatedAt: string,
  isActive: boolean

}
