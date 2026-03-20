import { Injectable, Logger } from "@nestjs/common";
import { UpdateTodoDto } from "../dto/update-todo.dto";
import { UpdateTodoRepository } from "../repository";

@Injectable()
export class UpdateTodoUseCase {
    constructor(
        private readonly updateTodoRepository: UpdateTodoRepository,
        private readonly logger: Logger
    ) {}

    async execute(id: string, data: UpdateTodoDto) {
        try {
            this.logger.log('Updating todo...');
            const todo = await this.updateTodoRepository.update(id, data);
            this.logger.log('Todo updated successfully');
            return todo;
        } catch (error) {
            this.logger.error(error);
            throw new Error("Failed to update todo");
        }
    }
}