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
  modelName: "Client",
  tableName: "Clients",
})
export default class Client extends Model<Client> {
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
  phoneNumber: number;

  @AllowNull(false)
  @Column
  lookingForNewCar: boolean;

  @AllowNull(false)
  @CreatedAt
  @Column
  createdAt: Date;

  @AllowNull(false)
  @UpdatedAt
  @Column
  updatedAt: Date;
}
