import { renderHook,waitFor,act } from '@testing-library/react';
import useMap from '../hook/useMap' 
import { getMarketLocations } from '../service/fetchData'
import { vi } from 'vitest'

vi.mock('../service/fetchData',async () => {
  return {// Importa la implementación real
  getMarketLocations: vi.fn(), // Mockea solo esta función
}
});

describe('useMap', () => { 
  
  test('should validate environment variables definition', () => {
    expect(import.meta.env.VITE_GOOGLE_MAP_API_KEY).toBeDefined()
  })
  
  const expectedStructure = [{
    id:expect.any(Number),
    name:expect.any(String),
    location:{
      lat:expect.any(Number),
      lng:expect.any(Number)
    },
    description:expect.any(String)
  }]
  
  test('should validate location have loaded',async () => { 

    const actual = await vi.importActual('../service/fetchData') as typeof import('../service/fetchData');
    (getMarketLocations as vi.Mock).mockImplementation(actual.getMarketLocations);

    const { result } = renderHook(() => useMap());
  
    await waitFor(() => result.current.locations !== null);
  
    expect(result.current.locations).toEqual(expect.arrayContaining(expectedStructure));
  
  })
  
  test('should validate a focus location', async () => {
    const { result } = renderHook(() => useMap());
  
    await waitFor(() => result.current.locations !== null,{interval:5000});
      
    
    if(result.current.locations){
      const firstLocation =  result.current.locations[0]
      
      act(() => {
        result.current.handleFocusLocation(firstLocation?.id)
      })
  
      await waitFor(() => {
        expect(result.current.locationFocus).toBe(firstLocation.id)
      });
      
    } else {
      console.warn('No defined locations');
    }
    
  })

test('shoul validate get a Markers componentes',async () => { 
  
  
  const { result } = renderHook(() => useMap());
  
  await waitFor(() => result.current.locations !== null,{interval:5000});

  const markers = result.current.drawMarkersLocations()
  
  expect(markers).toEqual(expect.any(Object))
  expect(markers.length).toEqual(result.current.locations?.length)

})



test('shoul de error to getlocations', async ()=>{

  (getMarketLocations as vi.Mock).mockRejectedValue('Fetch error');

  const { result } = renderHook(() => useMap());

  await waitFor(() => {
    expect(result.current.locations).toBe(null); 
  });
  
})

})

