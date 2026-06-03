import { Module } from '@nestjs/common';
import { TodosModule } from './todos/todos.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [TodosModule, AuthModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
