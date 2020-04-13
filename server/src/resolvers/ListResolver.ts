import { Resolver, Query, Mutation, Arg, Int, Args } from "type-graphql";
import { List } from "../entities/List";
import { CreateListArgs } from "../types/CreateListArgs";
import { getRepository } from "typeorm";

@Resolver(List)
export class ListResolver {
  @Query(() => [List])
  async lists(): Promise<List[]> {
    return await getRepository(List)
      .createQueryBuilder("list")
      .leftJoinAndSelect("list.tasks", "tasks")
      .orderBy("list.id", "ASC")
      .addOrderBy("tasks.id", "ASC")
      .getMany();
  }

  @Mutation(() => List)
  async createList(@Args() args: CreateListArgs): Promise<List> {
    const list = await List.create(args).save();
    list.tasks = [];

    return list;
  }

  @Mutation(() => Boolean)
  async deleteLists(@Arg("ids", () => [Int]) ids: number[]): Promise<boolean> {
    try {
      await List.delete(ids);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
