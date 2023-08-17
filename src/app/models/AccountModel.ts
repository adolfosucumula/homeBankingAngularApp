export class AccountClass {
  private id: number;
  private account: string;
  private iban: string;
  private swift: string;
  private owner: string;
  private initialBalance: string;
  private currentBalance: string;
  private currency: string;
  private isActive: boolean;
  private tableName: string;

  constructor(
    id: number = 0,
    account: string = '',
    iban: string = '',
    swift: string = '',
    owner: string = '',
    initialBalance: string = '',
    currentBalance: string = '',
    currency: string = '',
    isActive: boolean = false
    ){

    this.id = id;
    this.account = account;
    this.iban = iban;
    this.swift = swift;
    this.owner = owner;
    this.initialBalance = initialBalance;
    this.currentBalance = currentBalance;
    this.currency = currency;
    this.isActive = isActive;
    this.tableName = 'accounts';
  }


  public setTableName(tablename: string) {
    this.tableName = tablename;
  }

  public getTableName(): string {
    return this.tableName;
  }


}
