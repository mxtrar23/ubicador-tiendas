import { useState,useCallback, useEffect } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { HookMapType, MarketLocationJson } from "../vite-env";
import { getMarketLocations } from "../service/fetchData";
import Marker from "../components/Marker";

const useMap = () :HookMapType => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY
  })
  
  const [map, setMap] = useState<google.maps.Map|null>(null)
  const [locations, setLocations] = useState<MarketLocationJson[]|null>(null)
  const [locationFocus, setLocationFocus] = useState<number|null>(null)

  const onLoad = useCallback(function callback(map:google.maps.Map) {
    
    map.setOptions({
      zoom:3,
      center:{lat:40.656954,lng:-102.000412} 
    })

    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback() {
    setMap(null)
  }, [])

  const onDragStart = useCallback(function callback() {
    setLocationFocus(null)
  }, [])

  
  const getLocations = async () => {
    try {
      return await getMarketLocations()
    } catch (error) {
      console.log(error);
      return null
    }
  }

  const drawMarkersLocations = ()=>{
    return locations && locations.map(
      (location,index)=>
        <Marker
        key={index}
        data={location}
        />
      ) 
  }

  const handleFocusLocation = (id:number|null) => {
    setLocationFocus(id)
  }
  
  const loadInitial = async () =>{
    setLocations(await getLocations())
  }
  useEffect(() => {
    loadInitial()
  }, [])

  useEffect(() => {

    locationFocus && map?.setOptions({
      zoom:5,
      center:locations?.find(l=>l.id == locationFocus)?.location
    })
  }, [locationFocus, locations, map])


  

  return {
    isLoaded,
    locations,
    locationFocus,
    onLoad,
    onUnmount,
    drawMarkersLocations,
    handleFocusLocation,
    onDragStart
  }
}

export default useMap