export interface TaskV1 {
    id: number;
    title: string;
    description: string;
    type: string;
}

export interface TasksV2 {
    id: number;
    title: string;
    tasks: {title: string, description: string}[];
}

export interface Task{
    title: string,
    description: string
}