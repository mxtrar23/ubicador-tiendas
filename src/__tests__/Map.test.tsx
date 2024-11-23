import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { HookMapType } from '../vite-env'
import Map from '../components/Map'

vi.mock('@react-google-maps/api',()=>({
    GoogleMap:({children})=>{children},
    useJsApiLoader:()=>({
        isLoaded:true
    })
}))

describe('Map', () => {
    
    it('should render', () => {
        const hookMap = vi.fn(() :HookMapType => ({
            isLoaded: true,
            locations: null,
            onLoad: vi.fn(),
            onUnmount: vi.fn(),
            onDragStart: vi.fn(),
            drawMarkersLocations: null,
            handleFocusLocation : vi.fn(),
            locationFocus :null
        }))

        render(<Map hookMap={hookMap()}/>)
        waitFor(() => expect(hookMap).toHaveBeenCalled())
        expect(screen.getByTestId('content-map')).toBeDefined()
    })

    it('should get daw markers', async () => {
        const hookMap = vi.fn(() :HookMapType => ({
            isLoaded: true,
            locations: null,
            onLoad: vi.fn(),
            onUnmount: vi.fn(),
            onDragStart: vi.fn(),
            drawMarkersLocations: vi.fn(()=>(<span>mis marcadores</span>)),
            handleFocusLocation : vi.fn(),
            locationFocus :null
        }))
        
        render(<Map hookMap={hookMap()}/>)
        waitFor(() => {
            expect(hookMap).toHaveBeenCalled()
            expect(screen.getByText('mis marcadores')).toBeDefined()
        })
    })
})