import { Injectable, Logger } from "@nestjs/common";
import { FindTodoByIdRepository } from "../repository";

@Injectable()
export class FindTodoByIdUseCase {
    constructor(
        private readonly findTodoByIdRepository: FindTodoByIdRepository,
        private readonly logger: Logger
    ) {}

    async execute(id: string) {
        try {
            this.logger.log('Finding toDo by ID...');
            const todo = await this.findTodoByIdRepository.findById(id);
            this.logger.log('toDo found successfully');
            return todo;
        } catch (error) {
            this.logger.error(error);
            throw new Error("Failed to find toDo by ID");
        }
    }
}