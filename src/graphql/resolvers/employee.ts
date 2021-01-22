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
    return EmployeeModel.create({
      ...model,
      id: uuidv4(),
    });
  }

  // Update Employee

  @Mutation(() => Employee)
  async updateEmployee(@Arg("model") model: EmployeeInput) {
    const employeeToUpdate = await EmployeeModel.findByPk(model.id);
    return employeeToUpdate.update({ ...model });
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
      updatedAt: new Date(),
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

  // FindAll Employees specializing in new cars

  @Query(() => [Employee])
  async findAllEmoloyeesSpecializingInNewCars() {
    const allEmployees = await EmployeeModel.findAll();
    const newCarEmployees = [];

    allEmployees.forEach(async (employee) => {
      const employeeCars = await CarModel.findAll({
        where: { employeeID: employee.id },
      });
      let employeeNewCars = 0;
      let employeeUsedCars = 0;
      employeeCars.forEach((car) => {
        car.isNew === false ? ++employeeUsedCars : ++employeeNewCars;
      });
      if (employeeNewCars > employeeUsedCars) {
        newCarEmployees.push(employee);
      }
    });

    return newCarEmployees;
  }

  // FindAll where employee specialty is new cars at X dealership

  @Query(() => [Employee])
  async findAllEmoloyeesSpecializingInNewCarsAtDealership(
    @Arg("dealershipID") dealershipID: string
  ) {
    const allEmployees = await EmployeeModel.findAll({
      where: {
        dealershipID,
      },
    });
    const newCarEmployees = [];

    allEmployees.forEach(async (employee) => {
      const employeeCars = await CarModel.findAll({
        where: { employeeID: employee.id },
      });
      let employeeNewCars = 0;
      let employeeUsedCars = 0;
      employeeCars.forEach((car) => {
        car.isNew === false ? ++employeeUsedCars : ++employeeNewCars;
      });
      if (employeeNewCars > employeeUsedCars) {
        newCarEmployees.push(employee);
      }
    });

    return newCarEmployees;
  }

  // FindAll where employee specialty is used cars

  @Query(() => [Employee])
  async findAllEmoloyeesSpecializingInUsedCars() {
    const allEmployees = await EmployeeModel.findAll();
    const usedCarEmployees = [];

    allEmployees.forEach(async (employee) => {
      const employeeCars = await CarModel.findAll({
        where: { employeeID: employee.id },
      });
      let employeeNewCars = 0;
      let employeeUsedCars = 0;
      employeeCars.forEach((car) => {
        car.isNew === false ? ++employeeUsedCars : ++employeeNewCars;
      });
      if (employeeNewCars < employeeUsedCars) {
        usedCarEmployees.push(employee);
      }
    });

    return usedCarEmployees;
  }

  // FindAll where employee specialty is used cars at X dealership

  @Query(() => [Employee])
  async findAllEmoloyeesSpecializingInUsedCarsAtDealership(
    @Arg("dealershipID") dealershipID: string
  ) {
    const allEmployees = await EmployeeModel.findAll({
      where: {
        dealershipID,
      },
    });
    const usedCarEmployees = [];

    allEmployees.forEach(async (employee) => {
      const employeeCars = await CarModel.findAll({
        where: { employeeID: employee.id },
      });
      let employeeNewCars = 0;
      let employeeUsedCars = 0;
      employeeCars.forEach((car) => {
        car.isNew === false ? ++employeeUsedCars : ++employeeNewCars;
      });
      if (employeeNewCars < employeeUsedCars) {
        usedCarEmployees.push(employee);
      }
    });

    return usedCarEmployees;
  }
}
