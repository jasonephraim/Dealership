import { DealershipInput } from "./../schemas/dealership";
import { Query, Resolver, Arg, Mutation } from "type-graphql";
import Car, { CarInput } from "../schemas/car";
import CarModel from "../../db/models/car";
import { v4 as uuidv4 } from "uuid";

@Resolver((of) => Car)
export default class {
  @Mutation(() => Car)

  // Create Car
  createCar(@Arg("model") model: CarInput) {
    return CarModel.create({ id: uuidv4(), ...model });
  }

  // Update Car

  @Mutation(() => Car)
  async updateCar(@Arg("model") model: CarInput) {
    const carToUpdate = await CarModel.findByPk(model.id);
    return carToUpdate.update({ ...model, updatedAt: new Date() });
  }

  // Upsert Car

  @Mutation(() => Car)
  async upsertCar(@Arg("model") model: CarInput) {
    if (!model.id) {
      model.id = uuidv4();
      model.createdAt = new Date();
    }
    const existingCar = await CarModel.findByPk(model.id);
    if (existingCar) {
      model.createdAt = existingCar.createdAt;
    }
    await CarModel.upsert({
      ...model,
      updatedAt: new Date(),
    });
    return CarModel.findByPk(model.id);
  }

  // Delete Car

  @Mutation(() => Boolean)
  async deleteCar(@Arg("id") id: string) {
    const deleted = await CarModel.destroy({ where: { id } });
    return deleted ? true : false;
  }

  //Find all Cars

  @Query(() => [Car])
  findAllCars() {
    return CarModel.findAll();
  }

  // Find all Cars not sold

  @Query(() => [Car])
  findAllCarsNotSold() {
    return CarModel.findAll({
      where: {
        sold: false,
      },
    });
  }

  // Find all Cars at X Dealership

  @Query(() => [Car])
  findAllCarsAtDealership(@Arg("dealershipID") dealershipID: string) {
    return CarModel.findAll({
      where: {
        dealershipID,
      },
    });
  }

  // Find all Cars not sold at X Dealership

  @Query(() => [Car])
  findAllNotSoldCarsAtDealership(@Arg("dealershipID") dealershipID: string) {
    return CarModel.findAll({
      where: {
        dealershipID,
        sold: false,
      },
    });
  }

  // Find one Car by PK

  @Query(() => Car)
  findCarById(@Arg("id") id: string) {
    return CarModel.findByPk(id);
  }

  // Find all Cars where price is less than X and not sold

  @Query(() => [Car])
  async findUnsoldCarsLessThanPrice(@Arg("price") price: number) {
    const availableCars = await CarModel.findAll({
      where: {
        sold: false,
      },
    });
    return availableCars.findAll({
      where: {
        price > availableCars.price,
      },
    });
  }

  // FindAll Cars where condition is new and not sold

  @Query(() => [Car])
  findUnsoldNewCars() {
    return CarModel.findAll({
      where: {
        isNew: true,
        sold: false,
      },
    });
  }

  // FindAll Cars where condition is used and not sold

  @Query(() => [Car])
  findUnsoldUsedCars() {
    return CarModel.findAll({
      where: {
        isNew: false,
        sold: false,
      },
    });
  }

  // FindAll Cars where miles less than x and not sold

  @Query(() => [Car])
  findUnsoldCarsByMileage(@Arg("miles") miles: number) {
    return CarModel.findAll({
      where: {
        miles: { miles > CarModel.miles },
        sold: false,
      },
    });
  }

  // FindAll Cars where client is X and sold

  @Query(() => [Car])
  getSoldCarsByclientID(@Arg("clientID") clientID: string) {
    return CarModel.findAll({
      where: {
        clientID,
        sold: true,
      },
    });
  }

  // FindAll Cars where employee is X and sold

  @Query(() => [Car])
  getSoldCarsByemployeeID(@Arg("employeeID") employeeID: string) {
    return CarModel.findAll({
      where: {
        employeeID,
        sold: true,
      },
    });
  }
}
