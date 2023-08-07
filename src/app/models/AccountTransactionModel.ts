import { AccountModel } from "./AccountModel";

export interface AccountTransactionModel {
  id: number,
  account: AccountModel,
  transaction: string,
  amount: string,
  regist_date: string,
  operator: string
}
