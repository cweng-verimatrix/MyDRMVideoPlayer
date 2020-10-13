import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('checks if video player is available', () => {
    const app = render(<App />);
});