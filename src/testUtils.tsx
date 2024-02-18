import { render as originalRender } from '@testing-library/react';
import { ReactElement } from 'react';
import { RecoilRoot } from 'recoil';

export const render = (elements: ReactElement): ReturnType<typeof originalRender> => {
  return originalRender(<RecoilRoot>{elements}</RecoilRoot>);
};
