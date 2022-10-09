import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import {v4 as uuid} from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskStatusFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Injectable()
export class TasksService {

    constructor(
    @InjectRepository(TaskRepository)
        private tasksRepository: TaskRepository,
    ) {}

    getTasks(filterDto : GetTaskStatusFilterDto) : Promise<Task[]>{
        return this.tasksRepository.getTasks(filterDto);
    }

    async showAll() {
        return await this.tasksRepository.find(); //Get allData
     }

    createTask(createTaskDto : CreateTaskDTO) : Promise<Task>{
        return this.tasksRepository.createTask(createTaskDto);
    }

    async getTaskById(id:string) : Promise<Task>{
        const found = await this.tasksRepository.findOne({
            where: {
                id: id,
            },
        });

        if (!found) {
            throw new NotFoundException('Task Not found');
        }
        return found;
    }   

    async deleteTask (id:string) : Promise<void>{
        // this.tasks = this.tasks.filter((task)=> task.id !== id); // Delete tanpa validasi
        const found =  await this.tasksRepository.delete(id);
        
        if (found.affected === 0){
            throw new NotFoundException ('Data tidak ditemukan!');
        }
    }

    async updateTask(
        id:string, title: string, description:string, status:TaskStatus, ) : Promise<Task> {
            const task = await this.getTaskById(id);
            if (title) {
                task.title = title;
            }
            if (description) { 
                task.description = description;
            }
            if (status) {
                task.status = status
            }
            return this.tasksRepository.save(task);
        }
        
    

/*  CRUD Tanpa Database  
    private tasks : Task[] = []; // bikin variabel tasks yang memanggil objek Task di model

    // getAllTask(){
    // return this.tasks;
    //}

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
    

    getAllTask() : Task []{
        return this.tasks;
    }

    getTaskWithFilters(filterDto : GetTaskStatusFilterDto) : Task []{ //filterDto = object
        const {status, search} = filterDto; 
        //deklarasi sebuah array untuk menampung nilai temporary
        let tasks = this.getAllTask();

        //seleksi kondisi
        if(status){
            tasks = tasks.filter((task) => task.status === status);
        }

        //seleksi search
        if(search){
            tasks = tasks.filter((task)=>{

                if(task.title.includes(search) || task.description.includes(search)){
                    return true;
                }
            return false;    
            });
        }

        return tasks;
    }


    createTask(createTaskDTO : CreateTaskDTO) : Task { // createTaskDTO = variabel, CreateTaskDTO = objek
        const {title, description } = createTaskDTO;

        const task : Task = {
            id:uuid(),
            title,
            description,
            status: TaskStatus.OPEN //default TaskStatus Open
        };
        this.tasks.push(task);
        return task;
    }

    getTaskById (id:string) : Task{
        //return this.tasks.find((task) => task.id === id);
        const found = this.tasks.find((task)=> task.id === id); //buat method found
        if(!found){
            throw new NotFoundException('Task tidak ditemukan');
        }

        return found;
    }

    deleteTask (id:string) : void{
        // this.tasks = this.tasks.filter((task)=> task.id !== id); // Delete tanpa validasi
        const found = this.getTaskById(id);
        this.tasks = this.tasks.filter((task)=> task.id !== found.id);
    }

    updateTaskStatus(id:string, status: TaskStatus) {
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }
*/    
}
