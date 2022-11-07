import { render, screen } from '@testing-library/react';
import HomePage from '../src/pages/index.jsx';
import '@testing-library/jest-dom';

describe('Home Page', () => {
    it('The page render successfully', () => {
        const home = render(<HomePage />);

        expect(home.container).toBeInTheDocument();
    });
    it('Title render succesfully', () => {
        render(<HomePage />);
        const title = screen.getByText('Informação jurídica.');

        expect(title).toBeInTheDocument();
    }); 
});