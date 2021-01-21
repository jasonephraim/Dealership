import { Query, Resolver, Arg, Mutation } from "type-graphql";
import Employee, { EmployeeInput } from "../schemas/employee";
import EmployeeModel from "../../db/models/employee";
import CarModel from "../../db/models/car";
import { v4 as uuidv4 } from "uuid";

@Resolver((of) => Employee)
export default class {
  // Create Employee

  @Mutation(() => Employee)
  createEmployee(@Arg("model") model: EmployeeInput) {
    return EmployeeModel.create({ ...model, id: uuidv4() });
  }

  // Update Employee

  @Mutation(() => Employee)
  async updateEmployee(@Arg("model") model: EmployeeInput) {
    const employeeToUpdate = await EmployeeModel.findByPk(model.id);
    return employeeToUpdate.update({ ...model, updatedAt: new Date() });
  }

  // Upsert Employee

  @Mutation(() => Employee)
  async upsertEmployee(@Arg("model") model: EmployeeInput) {
    if (!model.id) {
      model.id = uuidv4();
      model.createdAt = new Date();
    }
    const existingEmployee = await EmployeeModel.findByPk(model.id);
    if (existingEmployee) {
      model.createdAt = existingEmployee.createdAt;
    }
    await EmployeeModel.upsert({
      ...model,
      updatedAt: new Date()
    });
    return EmployeeModel.findByPk(model.id);
  }

  // Delete Employee

  @Mutation(() => Boolean)
  async deleteEmployee(@Arg("id") id: string) {
    const deleted = await EmployeeModel.destroy({ where: { id } });
    return deleted ? true : false;
  }

  // FindAll Employees

  @Query(() => [Employee])
  findEmployees() {
    return EmployeeModel.findAll();
  }

  // FindAll Employees at Dealership X

  @Query(() => [Employee])
  findEmployeesByDealership(@Arg("dealershipID") dealershipID: string) {
    return EmployeeModel.findAll({
      where: {
        dealershipID,
      },
    });
  }

  // FindOneByPK Emplyee

  @Query(() => Employee)
  findEmployeeByPk(@Arg("id") id: string) {
    return EmployeeModel.findByPk(id);
  }

  // FindAll Employees specializing in new cars <----------------- map employee ID of each 

  @Query(() => [Employee])
  async findAllEmoloyeesSpecializingInNewCars() {
    const newCarsSoldByEmployee = await CarModel.findAll({
      where: {
        isNew: true,
        sold: true,
      },
    });
    const usedCarsSoldByEmployee = await CarModel.findAll({
      where: {
        isNew: false,
        sold: true,
      },
    });
    return EmployeeModel.findAll({
      where: {
        [newCarsSoldByEmployee.employeeID]
      }
    })
  }
}

// FindAll where employee specialty is new cars at X dealership

// FindAll where employee specialty is used cars

// FindAll where employee specialty is used cars at X dealership

