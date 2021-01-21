import {
  Table,
  Column,
  Model,
  Unique,
  PrimaryKey,
  AllowNull,
  IsUUID,
} from "sequelize-typescript";

@Table({
  modelName: "Dealership",
  tableName: "Dealerships",
})

export default class Dealership extends Model<Dealership> {
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
  location: string;

  @AllowNull(false)
  @Column
  phoneNumber: number;
}
