import { renderHook,waitFor } from '@testing-library/react';
import useMap from '../hook/useMap' 

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

const { result } = renderHook(() => useMap());
test('should validate location have loaded',async () => { 

  await waitFor(() => result.current.locations !== null);

  expect(result.current.locations).toEqual(expect.arrayContaining(expectedStructure));

})

test('should validate a focus location', async () => {

  await waitFor(() => result.current.locations !== null,{interval:5000});
    
  
  if(result.current.locations){
    const firstLocation =  result.current.locations[0]

    result.current.handleFocusLocation(firstLocation?.id)
  
    await waitFor(() => result.current.locationFocus !== null,{interval:5000,timeout:5000});
  
    expect(result.current.locationFocus).toBe(firstLocation.id)
  } else {
    console.warn('No defined locations');
  }
  
})
