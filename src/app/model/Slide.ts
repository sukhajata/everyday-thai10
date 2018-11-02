import { Media } from './Media';

export class Slide {
    Id: string;
    CategoryId: string;
    LessonId: string;
    Content_English: string;
    Content_Thai: string;
    SlideOrder: string;
    ImageFileName: string;
    AudioFileName: string;
    Instructions: string;
    LabelEnglish: string;
    MediaCount: string;
    HasAudio: boolean;
    TextToSpeak: string;
    Medias: Media[];
}