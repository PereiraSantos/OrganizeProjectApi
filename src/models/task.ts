export interface Task {
    id?: number;
    name: string;
    description: string;
    idCategory: number;
    status: number;
    creation?: Date;
}