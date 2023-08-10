import { MouseEvent, TouchEvent } from 'react';

export type TouchOrMouseEvent = TouchEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>;
