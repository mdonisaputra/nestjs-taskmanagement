import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { title } from 'process';
import { CreateTaskDTO } from './dto/create-task.dto';
import { query } from 'express';
import { GetTaskStatusFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';

@Controller('tasks') 
export class TasksController {
    constructor(private tasksService : TasksService){}

@Get()
getAllTask() {
    return this.tasksService.showAll();
}

@Get()
getTasks(@Query() filterDto: GetTaskStatusFilterDto) : Promise<Task[]>{
   return this.tasksService.getTasks(filterDto);
}

@Get('/:id')
getTaskById(@Param('id')id:string): Promise<Task>{
    return this.tasksService.getTaskById(id);
}

@Post()
createTask(@Body()createTaskDto: CreateTaskDTO) : Promise<Task>{
    return this.tasksService.createTask(createTaskDto);
}

@Delete('/:id')
deleteTask(@Param('id')id:string) : Promise<void>{
    return this.tasksService.deleteTask(id);
}

@Patch(':id')
updateTask(
    @Param('id') id:string,
    @Body() updateTaskDto: UpdateTaskStatusDto,) : Promise<Task>{
      const {title,description,status} = updateTaskDto;  
      return this.tasksService.updateTask(id, title, description, status);
    }

/* CRUD Tanpda Database

    //@Get()
    //getAllTasks() : Task[]{
        //return this.tasksService.getAllTask();
    //}

    //@Post()
    //createTask(@Body() body){
    //console.log('body', body);
    //createTask(@Body('title') title : string, @Body('description') description : string,): Task{
        //    console.log('title', title);
        //    console.log('description', description);
        //    return this.tasksService.createTask(title,description);
       // }
    
   
    @Get()
    getTasks(@Query() filterDto : GetTaskStatusFilterDto) : Task[]{
        if(Object.keys(filterDto).length){
            return this.tasksService.getTaskWithFilters(filterDto);
        } else {
            return this.tasksService.getAllTask();
        }
    }    
        
    @Post()    
    createTask(@Body() createTaskDTO : CreateTaskDTO) : Task{
        return this.tasksService.createTask(createTaskDTO);
    }
    
    @Get('/:id')
    getTaskById(@Param('id')
        id:string
    ) : Task {
        return this.tasksService.getTaskById(id);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id:string) : void{
        return this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id:string, // Param mengambil id pada link
        //@Body('status') status: TaskStatus, //Body mengambil status pada Body / isi data
    
        @Body() updateTaskStatusDto : UpdateTaskStatusDto,
    ) : Task {
        const {status} = updateTaskStatusDto;
        return this.tasksService.updateTaskStatus(id,status);
    }
*/
}
