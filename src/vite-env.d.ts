/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_MAP_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

export type LocationMarker = {
  lat:number,
  lng:number
}
export type MarketLocationJson = {
  id:number,
  name:string,
  location:LocationMarker,
  description:string
}

export type HookMapType = {
  isLoaded: boolean,
  locations: MarketLocationJson[]|null,
  onLoad: (map:google.maps.Map)=> void,
  onUnmount: (map:google.maps.Map)=> void,
  onDragStart: ()=> void,
  drawMarkersLocations: react.MemoExoticComponent | null,
  handleFocusLocation : (location:number|null) => void
  locationFocus:number|null
}