import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { CreateTodoUseCase } from './use-cases/create-todo.use-case';
import { FindAllTodosUseCase } from './use-cases/find-all-todos.use-case';
import { FindTodoByIdUseCase } from './use-cases/find-todo-by-id.use.case';
import { UpdateTodoUseCase } from './use-cases/update-todo.use-case';
import { DeleteTodoUseCase } from './use-cases/delete-todo.use-case';
@Injectable()
export class TodosService {
  constructor(
    private readonly createTodoUseCase: CreateTodoUseCase,
    private readonly findAllTodosUseCase: FindAllTodosUseCase,
    private readonly findTodoByIdUseCase: FindTodoByIdUseCase,
    private readonly updateTodoUseCase: UpdateTodoUseCase,
    private readonly deleteTodoUseCase: DeleteTodoUseCase
  ) {}
  create(createTodoDto: CreateTodoDto) {
    return this.createTodoUseCase.execute(createTodoDto);
  }

  findAll() {
    return this.findAllTodosUseCase.execute();
  }

  findById(id: string) {
    return this.findTodoByIdUseCase.execute(id);
  }

  update(id: string, updateTodoDto: UpdateTodoDto) {
    return this.updateTodoUseCase.execute(id, updateTodoDto);
  }

  delete(id: string) {
    return this.deleteTodoUseCase.execute(id);
  }
}
