export class UserModel {
  private id: number;
  private fullname: string;
  private username: string;
  private email: string;
  private telephone: number;
  private password: string;
  private role: string;
  private isActive: boolean;
  private createdAt: string;
  private updatedAt: string;
  public tableName = "users";

  constructor(
    id: number,
    fullname: string,
    username: string,
    email: string,
    telephone: number,
    password: string,
    role: string,
    isActive: boolean,
    createdAt: string,
    updatedAt: string
    ){

      this.id = id;
      this.fullname = fullname;
      this.username = username;
      this.email = email;
      this.telephone = telephone;
      this.password = password
      this.role = role;
      this.isActive = isActive;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
  }


  public setTableName(tablename: string) {
    this.tableName = tablename;
  }

  public getTableName(): string {
    return this.tableName;
  }

  public isPasswordMatch(confirmPassword: string){
    return this.password == confirmPassword;
  }


}

