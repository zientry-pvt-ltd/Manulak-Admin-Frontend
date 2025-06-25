/* eslint-disable @typescript-eslint/no-restricted-imports */
import type { Action } from "@reduxjs/toolkit";
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";

import type { AppDispatch, RootState } from "../index";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppDispatchAll = () => {
  const dispatch = useAppDispatch();
  return (actions: Action[]) => {
    actions.forEach((action) => dispatch(action));
  };
};
