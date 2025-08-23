export interface Unit {
  id: string;
  title: string;
  desc: string;
  lessonIds: string[];
}

export interface Lesson {
  id: string;
  title: string;
  //types: ContentTypeEnabled;
  taskIds: string[];
}

export interface Task {
  type: ContentType | string;
  options: string[] | string[][];
  answers: string[] | string[][];
}

type ContentType = "choose" | "compare" | "fillIn" | "listen" | "speak";

//type ContentTypeEnabled = { [K in ContentType]: boolean };
