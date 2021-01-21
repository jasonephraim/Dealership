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
  modelName: "Car",
  tableName: "Cars",
})
export default class Car extends Model<Car> {
  @IsUUID(4)
  @PrimaryKey
  @AllowNull(false)
  @Unique
  @Column
  id: string;

  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Column
  doors: number;

  @AllowNull(false)
  @Column
  automatic: boolean;

  @AllowNull(false)
  @Column
  isNew: boolean;

  @AllowNull(false)
  @Column
  price: number;

  @AllowNull(false)
  @Column
  miles: number;

  @AllowNull(false)
  @Column
  dealershipID: string;

  @AllowNull(false)
  @Column
  clientID: string;

  @AllowNull(true)
  @Column
  employeeID: string;

  @AllowNull(false)
  @Column
  sold: boolean;

  @AllowNull(false)
  @CreatedAt
  @Column
  createdAt: Date;

  @AllowNull(false)
  @UpdatedAt
  @Column
  updatedAt: Date;
}
