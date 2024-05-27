import { vi } from 'vitest'
import {getMarketLocations} from '../service/fetchData'

const expectedStructure = [{
  id:expect.any(Number),
  name:expect.any(String),
  location:{
    lat:expect.any(Number),
    lng:expect.any(Number)
  },
  description:expect.any(String)
}]

describe("Service fetchData",()=>{

  test('Service returns JSON with expected structure', async () => { 
    vi.mock(JSON.stringify([
      { 
      "id": 1,
      "name": "Tienda A",
      "location": { 
        "lat": 40.712776,
        "lng": -74.005974 },
      "description": "Descripción de Tienda A" 
      },
      { 
      "id": 2,
      "name": "Tienda B",
      "location": { 
        "lat": 34.052235,
        "lng": -118.243683 },
      "description": "Descripción de Tienda B" 
      },
      { 
      "id": 3,
      "name": "Tienda C",
      "location": { 
        "lat": 41.878113,
        "lng": -87.629799 },
      "description": "Descripción de Tienda C" 
      }
    ]))
    const res = await  getMarketLocations()
  
    expect(res).toEqual(expect.arrayContaining(expectedStructure));
   })
})