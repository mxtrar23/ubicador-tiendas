//create test to render App
import { render, screen, act } from '@testing-library/react';
import App from '../App';

test('renders learn react link', () => {
    render(<App />);
    act(() => { 
        screen.getByText(/Ubicador de Tiendas/i);
    })
});