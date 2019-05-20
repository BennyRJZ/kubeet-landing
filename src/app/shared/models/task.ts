import { Timestamp } from "rxjs";

export class Task{
    $key: string;
    id: number;
    boardId: string;
    columnIndex: 1;
    description: string;
    isDraggable: true;
    name: string;
    startDate: Date;
    isVisible: boolean;
}
