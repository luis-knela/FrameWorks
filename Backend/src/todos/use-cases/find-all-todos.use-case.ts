import { Injectable, Logger } from "@nestjs/common";
import { FindAlltodosRepository } from "../repository";

@Injectable()
export class FindAllTodosUseCase {
    constructor(
        private readonly findAllTodosRepository: FindAlltodosRepository,
        private readonly logger: Logger
    ) {}

    async execute() {
        try {
            this.logger.log('Finding all toDos...');
            const todos = await this.findAllTodosRepository.findAll();
            this.logger.log('toDos found successfully');
            return todos;
        } catch (error) {
            this.logger.error(error);
            throw new Error("Failed to find all toDos");
        }
    }
}