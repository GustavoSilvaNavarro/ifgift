/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { render, screen } from '@testing-library/react';
import { create } from 'react-test-renderer';

import { Header } from '../Components/Header/Header';

describe('Header Component Tests', () => {
  test('Header Component should match Snapshot', () => {
    const headerTree = create(<Header />).toJSON();

    expect(headerTree).toMatchSnapshot();
  });

  test('Logo Image should be rendered in the document', () => {
    render(<Header />);

    const img = screen.getByRole('img') as HTMLImageElement;

    expect(img.src).toContain(
      'https://static.wixstatic.com/media/3dbed1_4a14f7c810ff4d40ae1be96c5c171caa~mv2.png/v1/fill/w_541,h_168,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/ifGift.png'
    );
  });
});
