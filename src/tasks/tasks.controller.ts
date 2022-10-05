import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { title } from 'process';
import { CreateTaskDTO } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService : TasksService){}

    @Get()
    getAllTasks() : Task[]{
        return this.tasksService.getAllTask();
    }

    /*
    @Post()
    //createTask(@Body() body){
        //console.log('body', body);
        createTask(
            @Body('title') title : string,
            @Body('description') description : string,
        ): Task{
            console.log('title', title);
            console.log('description', description);
            return this.tasksService.createTask(title,description);
        }
    */    
    @Post()    
    createTask(@Body() createTaskDTO : CreateTaskDTO) : Task{
        return this.tasksService.createTask(createTaskDTO);
    } 
}
