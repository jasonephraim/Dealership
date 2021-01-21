import {
  Table,
  Column,
  Model,
  Unique,
  PrimaryKey,
  AllowNull,
  IsUUID,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";

@Table({
  modelName: "Employee",
  tableName: "Employees",
})
export default class Employee extends Model<Employee> {
  @IsUUID(4)
  @PrimaryKey
  @AllowNull(false)
  @Unique
  @Column
  id: string;

  @AllowNull(false)
  @Column
  firstName: string;

  @AllowNull(false)
  @Column
  lastName: string;

  @AllowNull(false)
  @Column
  age: number;

  @AllowNull(false)
  @Column
  phoneNumber: number;

  @AllowNull(false)
  @Column
  dealershipID: string;

  @AllowNull(false)
  @CreatedAt
  @Column
  createdAt: Date;

  @AllowNull(false)
  @UpdatedAt
  @Column
  updatedAt: Date;
}
