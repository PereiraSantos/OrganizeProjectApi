export interface Task {
    id?: number;
    name: string;
    description: string;
    idCategory: number;
    idProject: number;
    status: number;
    creation?: Date;
}