export class Task{
    //desklarasikan data yang akan ditampung bisa pakai interface atau class (tanpa ,)
    id:string
    title:string
    description:string
    status
}

export enum TaskStatus{ //untuk membuat class status, dimana status disetting default OPEN
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = "DONE",
}