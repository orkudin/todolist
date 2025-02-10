export interface Todo {
    id: string;
    title: string;
    description?: string;
    status: 'in_plans' | 'in_progress' | 'completed';
}