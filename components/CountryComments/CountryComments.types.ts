import { Dispatch, SetStateAction } from "react";

export interface ICountryCommentsProp {
  hasNewComment: boolean;
  setHasNewComment: Dispatch<SetStateAction<boolean>>;
}
