import { CreateTaskDTO } from "./dto/create-task.dto";
import { Task } from "./task.entity";
import { TaskStatus } from "./task-status.enum";
import {Repository, EntityRepository, DataSource, UpdateResult} from "typeorm";
import { GetTaskStatusFilterDto } from "./dto/get-tasks-filter.dto";
import { Injectable } from "@nestjs/common";
import { UpdateTaskStatusDto } from "./dto/update-task-status.dto";


//Promise = Future => dirunning setelah berhasil
@Injectable()
export class TaskRepository extends Repository<Task>{
    //tasksRepository: any;
    //filter: any;
   constructor(private dataSource: DataSource)
    {
       super(Task, dataSource.createEntityManager());
    }

    async createTask(createTaskDto : CreateTaskDTO) : Promise<Task>{
        const {title, description} = createTaskDto;

        const task = await this.create({
            title,
            description,
            status: TaskStatus.OPEN
        });

        await this.save(task);
        return task;
    }

    async getTasks(filterDto:GetTaskStatusFilterDto) : Promise<Task[]>{
        const {status, search} = filterDto;
        const query = this.createQueryBuilder('task');

        if(status){
            query.andWhere('task.status = :status', {status});
        }

        if(search){
            query.andWhere(
                'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
                {search: `%${search}%`},
            );

            const tasks = await query.getMany();
            return tasks;
        }
    }
}