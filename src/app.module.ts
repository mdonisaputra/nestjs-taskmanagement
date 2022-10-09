import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks/task.entity';
import { TaskRepository } from './tasks/task.repository';

@Module({
  //imports: [TasksModule, CobaModule],
  controllers: [AppController],
  providers: [AppService],
  imports:
    [
    TasksModule,TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'backend',
      database: 'task-management',
      autoLoadEntities: true,
      synchronize:true,
    })
  ]
})
export class AppModule {}
