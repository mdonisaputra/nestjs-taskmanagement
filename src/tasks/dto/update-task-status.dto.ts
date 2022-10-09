import { IsEmpty, IsEnum , IsNotEmpty, IsOptional} from "class-validator";
import {  TaskStatus } from "../task-status.enum";

export class UpdateTaskStatusDto{

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description : string;

    @IsEnum(TaskStatus)
    status : TaskStatus;
}