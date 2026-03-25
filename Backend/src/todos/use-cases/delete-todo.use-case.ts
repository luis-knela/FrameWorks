import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { DeleteTodoRepository } from "../repository";
import { FindTodoByIdRepository } from "../repository/find-todo-by-id.todo.repository";

@Injectable()
export class DeleteTodoUseCase {
    constructor(
        private readonly DeleteTodoRepository: DeleteTodoRepository,
        private readonly FindTodoByIdRepository: FindTodoByIdRepository,
        private readonly logger: Logger
    ) {}

    async execute(id: string) {
        try {
            this.logger.log('Deleting toDo...');
            const todo = await this.FindTodoByIdRepository.findById(id);

            if (!todo) {
                throw new NotFoundException("toDo not found");
            }

            await this.DeleteTodoRepository.delete(id);
            this.logger.log('toDo deleted successfully');
            return todo;
        } catch (error) {
            this.logger.error(error);
            throw new Error("Failed to delete toDo");
        }
    }
}