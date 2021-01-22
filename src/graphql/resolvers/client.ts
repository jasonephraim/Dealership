import { Query, Resolver, Arg, Mutation } from "type-graphql";
import Client, { ClientInput } from "../schemas/Client";
import ClientModel from "../../db/models/Client";
import CarModel from "../../db/models/car";
import { v4 as uuidv4 } from "uuid";

@Resolver((of) => Client)
export default class {
  // Create Client

  @Mutation(() => Client)
  createClient(@Arg("model") model: ClientInput) {
    return ClientModel.create({
      ...model,
      id: uuidv4(),
    });
  }

  // Update Client

  @Mutation(() => Client)
  async updateClient(@Arg("model") model: ClientInput) {
    const ClientToUpdate = await ClientModel.findByPk(model.id);
    return ClientToUpdate.update({ ...model });
  }

  // Upsert Client

  @Mutation(() => Client)
  async upsertClient(@Arg("model") model: ClientInput) {
    if (!model.id) {
      model.id = uuidv4();
      model.createdAt = new Date();
    }
    const existingClient = await ClientModel.findByPk(model.id);
    if (existingClient) {
      model.createdAt = existingClient.createdAt;
    }
    await ClientModel.upsert({
      ...model,
      updatedAt: new Date(),
    });
    return ClientModel.findByPk(model.id);
  }

  // Delete Client

  @Mutation(() => Boolean)
  async deleteClient(@Arg("id") id: string) {
    const deleted = await ClientModel.destroy({ where: { id } });
    return deleted ? true : false;
  }

  // FindAll Clients

  @Query(() => [Client])
  findClients() {
    return ClientModel.findAll();
  }

  // FindAll Clients at Dealership X

  @Query(() => [Client])
  async findAllClientsAtDealership(@Arg("dealershipID") dealershipID: string) {
    const carsSoldByDealer = await CarModel.findAll({
      where: {
        dealershipID,
      },
    });
    const clientsOfDealership = [
      ...new Set(carsSoldByDealer.map((item) => item.clientID)),
    ];
    return clientsOfDealership;
  }

  // FindOneByPK Client

  @Query(() => Client)
  findClientByPk(@Arg("id") id: string) {
    return ClientModel.findByPk(id);
  }

  // FindAll Clients looking for new car

  @Query(() => [Client])
  findClientsLookingForNewCar() {
    return ClientModel.findAll({
      where: {
        lookingForNewCar: true,
      },
    });
  }

  // FindAll Clients looking for used car

  @Query(() => [Client])
  findClientsLookingForUsedCar() {
    return ClientModel.findAll({
      where: {
        lookingForNewCar: false,
      },
    });
  }
}
