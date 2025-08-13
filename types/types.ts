export interface Unit {
  id: string;
  title: string;
  desc: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  types: ContentTypeEnabled;
  content: Content[];
}

export interface Content {
  type: ContentType | string;
  options: string[] | string[][];
  answers: string[] | string[][];
}

type ContentType = "choose" | "compare" | "fillIn" | "listen" | "speak";

type ContentTypeEnabled = { [K in ContentType]: boolean };
