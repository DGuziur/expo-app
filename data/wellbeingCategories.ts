import BirdSVG from "@assets/icons/Bird.svg";
import FamilySVG from "@assets/icons/Family.svg";
import GalaxySVG from "@assets/icons/Galaxy.svg";
import HearthInHandSVG from "@assets/icons/HearthInHand.svg";
import HumanSVG from "@assets/icons/human.svg";
import HumanThinkSVG from "@assets/icons/HumanThink.svg";
import SpeechBubbleSVG from "@assets/icons/SpeechBubble.svg";
import UmbrellaSVG from "@assets/icons/Umbrella.svg";
import { FunctionComponent } from "react";

export interface WellbeingCategory {
  title: string;
  icon: FunctionComponent;
  description: string;
}
export const WELLBEING_CATEGORIES: WellbeingCategory[] = [
  {
    title: "wellbeingProfile.BODY AND ENERGY",
    icon: HumanSVG,
    description: "wellbeingProfile.descriptions.BODY AND ENERGY",
  },
  {
    title: "wellbeingProfile.FEELINGS AND THOUGHTS",
    icon: HearthInHandSVG,
    description: "wellbeingProfile.descriptions.FEELINGS AND THOUGHTS",
  },
  {
    title: "wellbeingProfile.MEANING AND DEVELOPMENT",
    icon: HumanThinkSVG,
    description: "wellbeingProfile.descriptions.MEANING AND DEVELOPMENT",
  },
  {
    title: "wellbeingProfile.QUALITY OF LIFE AND SAFETY",
    icon: UmbrellaSVG,
    description: "wellbeingProfile.descriptions.QUALITY OF LIFE AND SAFETY",
  },
  {
    title: "wellbeingProfile.RELATIONSHIPS AND PARTICIPATION",
    icon: FamilySVG,
    description:
      "wellbeingProfile.descriptions.RELATIONSHIPS AND PARTICIPATION",
  },
  {
    title: "wellbeingProfile.ACTION AND AUTONOMY",
    icon: BirdSVG,
    description: "wellbeingProfile.descriptions.ACTION AND AUTONOMY",
  },
  {
    title: "wellbeingProfile.RESILIENCE AND SELF-TRUST",
    icon: GalaxySVG,
    description: "wellbeingProfile.descriptions.RESILIENCE AND SELF-TRUST",
  },
  {
    title: "wellbeingProfile.CONTACT WITH SELF AND COMMUNICATION",
    icon: SpeechBubbleSVG,
    description:
      "wellbeingProfile.descriptions.CONTACT WITH SELF AND COMMUNICATION",
  },
];
