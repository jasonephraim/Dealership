import { Query, Resolver, Arg, Mutation } from "type-graphql";
import Dealership, { DealershipInput } from "../schemas/dealership";
import DealershipModel from "../../db/models/dealership";
import { v4 as uuidv4 } from "uuid";

@Resolver((of) => Dealership)
export default class {
  @Mutation(() => Dealership)

  // Create for dealership
  createDealership(@Arg("model") model: DealershipInput) {
    return DealershipModel.create({
      ...model,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  // Update for dealership

  @Mutation(() => Dealership)
  async updateDealership(@Arg("model") model: DealershipInput) {
    const dealershipToUpdate = await DealershipModel.findByPk(model.id);
    return dealershipToUpdate.update({ ...model, updatedAt: new Date() });
  }

  // Upsert for dealership

  @Mutation(() => Dealership)
  async upsertDealership(@Arg("model") model: DealershipInput) {
    if (!model.id) {
      model.id = uuidv4();
      model.createdAt = new Date();
    }
    const existingDealership = await DealershipModel.findByPk(model.id);
    if (existingDealership) {
      model.createdAt = existingDealership.createdAt;
    }
    await DealershipModel.upsert({
      ...model,
      updatedAt: new Date(),
    });
    return DealershipModel.findByPk(model.id);
  }

  // Delete for dealership

  @Mutation(() => Boolean)
  async deleteDealership(@Arg("id") id: string) {
    const deleted = await DealershipModel.destroy({ where: { id } });
    return deleted ? true : false;
  }

  // FindAll for dealership

  @Query(() => [Dealership])
  findAllDealerships() {
    return DealershipModel.findAll();
  }

  // FindOneByPk for dealership

  @Query(() => Dealership)
  findDealershipByPK(@Arg("id") id: string) {
    return DealershipModel.findByPk(id);
  }

  // FindOne where SOMETHING

  @Query(() => [Dealership])
  findDealershipByAnyField(@Arg("model") model: DealershipInput) {
    return DealershipModel.findOne({
      where: {
        id: model.id,
        name: model.name,
        location: model.location,
        phoneNumber: model.phoneNumber,
      },
    });
  }
}
