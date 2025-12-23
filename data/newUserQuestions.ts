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
    category: "wellbeingProfile.BODY AND ENERGY",
    categoryIcon: HumanSVG,
    questionText:
      "quizTexts.My physical health allows me to do what I want every day",
    answer: null,
  },
  {
    category: "wellbeingProfile.BODY AND ENERGY",
    categoryIcon: HumanSVG,
    questionText: "quizTexts.I feel calm and in mental balance",
    answer: null,
  },
  {
    category: "wellbeingProfile.FEELINGS AND THOUGHTS",
    categoryIcon: HumanSVG,
    questionText: "quizTexts.I feel that my life has meaning and direction",
    answer: null,
  },
  // {
  //   category: "wellbeingProfile.FEELINGS AND THOUGHTS",
  //   categoryIcon: HumanSVG,
  //   questionText: "quizTexts.Overall, I am satisfied with my life",
  //   answer: null,
  // },
  // {
  //   category: "wellbeingProfile.MEANING AND DEVELOPMENT",
  //   categoryIcon: HumanSVG,
  //   questionText: "quizTexts.I have pleasant and supportive social contacts",
  //   answer: null,
  // },
  // {
  //   category: "wellbeingProfile.MEANING AND DEVELOPMENT",
  //   categoryIcon: HumanSVG,
  //   questionText:
  //     "quizTexts.I am able to cope with daily duties and challenges",
  //   answer: null,
  // },
  // {
  //   category: "wellbeingProfile.QUALITY OF LIFE AND SAFETY",
  //   categoryIcon: HumanSVG,
  //   questionText: "quizTexts.I return to balance after difficult situations",
  //   answer: null,
  // },
  // {
  //   category: "wellbeingProfile.QUALITY OF LIFE AND SAFETY",
  //   categoryIcon: HumanSVG,
  //   questionText: "quizTexts.I feel that I have good contact with myself",
  //   answer: null,
  // },
  // {
  //   category: "wellbeingProfile.RELATIONSHIPS AND PARTICIPATION",
  //   categoryIcon: HumanSVG,
  //   questionText: "quizTexts.I feel that I have good contact with myself",
  //   answer: null,
  // },
  // {
  //   category: "wellbeingProfile.RELATIONSHIPS AND PARTICIPATION",
  //   categoryIcon: HumanSVG,
  //   questionText: "quizTexts.I feel that I have good contact with myself",
  //   answer: null,
  // },
  // {
  //   category: "wellbeingProfile.ACTION AND AUTONOMY",
  //   categoryIcon: HumanSVG,
  //   questionText: "quizTexts.I feel that I have good contact with myself",
  //   answer: null,
  // },
  // {
  //   category: "wellbeingProfile.ACTION AND AUTONOMY",
  //   categoryIcon: HumanSVG,
  //   questionText: "quizTexts.I feel that I have good contact with myself",
  //   answer: null,
  // },
  // {
  //   category: "wellbeingProfile.RESILIENCE AND SELF-TRUST",
  //   categoryIcon: HumanSVG,
  //   questionText: "quizTexts.I feel that I have good contact with myself",
  //   answer: null,
  // },
  // {
  //   category: "wellbeingProfile.RESILIENCE AND SELF-TRUST",
  //   categoryIcon: HumanSVG,
  //   questionText: "quizTexts.I feel that I have good contact with myself",
  //   answer: null,
  // },
  // {
  //   category: "wellbeingProfile.CONTACT WITH SELF AND COMMUNICATION",
  //   categoryIcon: HumanSVG,
  //   questionText: "quizTexts.I feel that I have good contact with myself",
  //   answer: null,
  // },
  // {
  //   category: "wellbeingProfile.CONTACT WITH SELF AND COMMUNICATION",
  //   categoryIcon: HumanSVG,
  //   questionText: "quizTexts.I feel that I have good contact with myself",
  //   answer: null,
  // },
];
