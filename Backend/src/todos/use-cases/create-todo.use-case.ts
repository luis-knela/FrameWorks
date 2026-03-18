import { Logger } from "@nestjs/common";
import { CreateTodoRepository } from "../repository";
import { CreateTodoDto } from "../dto/create-todo.dto";

export class CreateTodoUseCase {
    constructor(
        private readonly createTodoRepository: CreateTodoRepository,
        private readonly logger: Logger
    ) {}

    async execute(data: CreateTodoDto) {
        try {
            this.logger.log('Creating todo...');
            const todo = await this.createTodoRepository.create(data);
            this.logger.log('Todo created successfully');
            return todo;
        } catch (error) {
            this.logger.error(error);
            throw new Error("Failed to create todo");
        }
    }
}