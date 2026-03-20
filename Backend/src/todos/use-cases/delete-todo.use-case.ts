import { Injectable, Logger } from "@nestjs/common";
import { DeleteTodoRepository } from "../repository";

@Injectable()
export class DeleteTodoUseCase {
    constructor(
        private readonly DeleteTodoRepository: DeleteTodoRepository,
        private readonly logger: Logger
    ) {}

    async execute(id: string) {
        try {
            this.logger.log('Deleting id...');
            const todo = await this.DeleteTodoRepository.delete(id);
            this.logger.log('Id deleted successfully');
            return todo;
        } catch (error) {
            this.logger.error(error);
            throw new Error("Failed to delete id");
        }
    }
}