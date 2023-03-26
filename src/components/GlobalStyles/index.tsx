import './GlobalStyles.scss';
import { ReactNode } from 'react';

interface GlobalStylesProps {
  children: ReactNode;
}

export default function GlobalStyles({ children }: GlobalStylesProps): JSX.Element {
  return <>{children}</>;
}