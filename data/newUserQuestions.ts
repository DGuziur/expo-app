import HumanSVG from "@assets/icons/human.svg";
import { ComponentType } from "react";

export const IntroQuestionAnswers: {
  answerText: string;
  pointsValue: number;
}[] = [
  {
    answerText: "0 → zupełnie się nie zgadzam",
    pointsValue: 0,
  },
  {
    answerText: "1 → nie zgadzam się",
    pointsValue: 1,
  },
  {
    answerText: "2 → trochę się nie zgadzam",
    pointsValue: 2,
  },
  {
    answerText: "3 → trochę się zgadzam",
    pointsValue: 3,
  },
  {
    answerText: "4 → zgadzam się",
    pointsValue: 4,
  },
  {
    answerText: "5 → całkowicie się zgadzam",
    pointsValue: 5,
  },
];

export interface IntroQuestion {
  category: string;
  categoryIcon: ComponentType<any>;
  questionText: string;
  answer: null | number;
}

export const IntroQuestions: IntroQuestion[] = [
  {
    category: "CIAŁO I ENERGIA",
    categoryIcon: HumanSVG,
    questionText:
      "Moje zdrowie fizyczne pozwala mi robić to, co chcę na co dzień",
    answer: null,
  },
  {
    category: "CIAŁO I ENERGIA",
    categoryIcon: HumanSVG,
    questionText:
      "Moje zdrowie fizyczne pozwala mi robić to, co chcę na co dzień",
    answer: null,
  },
  {
    category: "CIAŁO I ENERGIA",
    categoryIcon: HumanSVG,
    questionText:
      "Moje zdrowie fizyczne pozwala mi robić to, co chcę na co dzień",
    answer: null,
  },
  {
    category: "CIAŁO I ENERGIA",
    categoryIcon: HumanSVG,
    questionText:
      "Moje zdrowie fizyczne pozwala mi robić to, co chcę na co dzień",
    answer: null,
  },
  {
    category: "CIAŁO I ENERGIA",
    categoryIcon: HumanSVG,
    questionText:
      "Moje zdrowie fizyczne pozwala mi robić to, co chcę na co dzień",
    answer: null,
  },
];
