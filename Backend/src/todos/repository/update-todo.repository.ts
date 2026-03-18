import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/databases/prisma.database";
import { UpdateTodoDto } from "../dto/update-todo.dto";

@Injectable()
export class UpdateTodoRepository {
    constructor(private readonly prisma: PrismaService) {}

    async execute(data: UpdateTodoDto) {
    return await this.prisma.todo.update({where: data});
    }
}