import { Injectable } from '@nestjs/common';
import { TaskStatus, Task } from './task.model';
import {v4 as uuid} from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    private tasks : Task[] = []; // bikin variabel tasks yang memanggil objek Task

    getAllTask(){
        return this.tasks;
    }

    /*
    createTask(title:string, description:string) : Task{
        const task : Task = {
            id:uuid(),
            title,
            description,
            status: TaskStatus.OPEN //default TaskStatus Open
        };
        this.tasks.push(task);
        return task;
    }
    */

    createTask(createTaskDTO : CreateTaskDTO) : Task { // createTaskDTO = variabel, CreateTaskDTO = objek
        const {
            title, description
        } = createTaskDTO;

        const task : Task = {
            id:uuid(),
            title,
            description,
            status: TaskStatus.OPEN //default TaskStatus Open
        };
        this.tasks.push(task);
        return task;
    }
}
