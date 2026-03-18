import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/databases/prisma.database";

@Injectable()
export class deletetodoRepository {
    constructor(private readonly prisma: PrismaService) {}

    async execute(id: string) {
        return await this.prisma.todo.delete({where: {id}});
    }
}