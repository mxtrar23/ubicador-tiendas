import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Marker from '../components/Marker'
import { MarketLocationJson } from '../vite-env'

vi.mock('@react-google-maps/api',()=>({
    InfoWindowF: vi.fn(({ children, onCloseClick }) => <div><button onClick={onCloseClick}>Cerrar</button>{children}</div>),
    MarkerF: vi.fn(({ title, children, onClick }) => <div><button onClick={onClick}>{title}</button>{children}</div>),
}))

describe('Marker', () => {
    it('should render', () => {

        const data: MarketLocationJson = {
            id: 1,
            description: 'test',
            location: { lat: 0, lng: 0 },
            name: 'test',
        }
        const { container } = render(<Marker data={data} />)
        expect(container).toMatchSnapshot()
    })

    it('should render Marker', async () => {
        const data: MarketLocationJson = {
            id: 1,
            description: 'mi descripcion',
            location: { lat: 0, lng: 0 },
            name: 'mi titulo',
        }
        render(<Marker data={data} />)

        const openBotton = screen.getByText(data.name)

        fireEvent(openBotton, new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
        }))

        await waitFor(() => {
            screen.getByText(data.description)
        })

        const closeBotton = screen.getByText('Cerrar')

        fireEvent(closeBotton, new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
        }))


        waitFor(() => {
            expect(screen.getAllByText(data.description)).toBeNull();
        })

    })


})