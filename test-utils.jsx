import React from 'react';
import { render } from '@testing-library/react';
import { ParallaxProvider } from 'react-scroll-parallax';

/**
 * Makes testing easier by wrapping all children in Parallax Provider needed for all pages and customizes the render method.
 *
 * Import this render and other methods in your test files instead of importing from @testing-library/react
 *
 * See more information at: https://testing-library.com/docs/react-testing-library/setup/
 */

// Needed to fix warning for resize observer in the ParallaxContoller
// https://github.com/recharts/recharts/issues/3029#issuecomment-1307676140
global.ResizeObserver = jest.fn().mockImplementation(() => {
    return {
        observe: jest.fn(),
        disconnect: jest.fn(),
        unobserve: jest.fn(),
    };
});

const AllTheProviders = ({ children }) => {
    return <ParallaxProvider>{children}</ParallaxProvider>;
};

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
