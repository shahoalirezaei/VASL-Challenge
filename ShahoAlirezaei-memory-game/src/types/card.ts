import type { IconProps } from "phosphor-react";

export interface Card {
  id: number;
  icon: React.FC<IconProps>; 
  isFlipped: boolean;
  isMatched: boolean;
}
