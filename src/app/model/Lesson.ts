import { Slide } from './Slide';

export class Lesson {
    Id: string;
    Name: string;
    ModuleId: string;
    Description: string;
    LessonOrder: string;
    Correct: string;
    Errors: string;
    DateCompleted: string;
    Class: string;
    Completed: boolean;
    SlideCount: string;
    Sum: string;
    Slides: Slide[];
}
