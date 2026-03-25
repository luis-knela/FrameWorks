import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { UpdateTodoDto } from "../dto/update-todo.dto";
import { UpdateTodoRepository } from "../repository";
import { FindTodoByIdRepository } from "../repository/find-todo-by-id.todo.repository";

@Injectable()
export class UpdateTodoUseCase {
    constructor(
        private readonly updateTodoRepository: UpdateTodoRepository,
        private readonly FindTodoByIdRepository: FindTodoByIdRepository,
        private readonly logger: Logger
    ) {}

    async execute(id: string, data: UpdateTodoDto) {
        try {
            const todo = await this.FindTodoByIdRepository.findById(id);

            if (!todo) {
                throw new NotFoundException("toDo not found");
            }

            this.logger.log('Updating toDo...');
            await this.updateTodoRepository.update(id, data);
            this.logger.log('toDo updated successfully');
            return todo;
        } catch (error) {
            this.logger.error(error);
            throw new Error("Failed to update toDo");
        }
    }
}