import { ObjectId } from "mongodb";

export type JustifyContent =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly";

export type AlignItems =
  | "stretch"
  | "flex-start"
  | "flex-end"
  | "center"
  | "baseline";

export type Color = {
  red: number;
  green: number;
  blue: number;
};

export type Obj = {
  _id: string;
  x: number;
  y: number;
  width: number;
  height: number;

  backgroundColor: Color;

  isFlex: boolean;
  justifyContent: JustifyContent;
  alignItems: AlignItems;
  rowGap: number;
  columnGap: number;

  children: string[];
};
