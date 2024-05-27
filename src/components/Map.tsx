import { GoogleMap } from '@react-google-maps/api'
import { HookMapType } from '../vite-env'

type MapProps = {
  hookMap:HookMapType
}

const Map = ({hookMap}:MapProps) => {
  const {isLoaded,onLoad,onUnmount,drawMarkersLocations,onDragStart} = hookMap
  return (
		<div data-testid='content-map'>
      {
        isLoaded ?
        <GoogleMap
          onLoad={onLoad}
          onUnmount={onUnmount}
          onDragStart={onDragStart}
          mapContainerStyle={{width:700,height:400}}
        >
          {
            drawMarkersLocations && drawMarkersLocations()
          }
        </GoogleMap>
        :
        <div className='flex justify-center items-center w-[700px] h-[400px]'>
          <h1 className='font-bold text-4xl'>Cargando ...</h1>
        </div>

      }
    </div>
  )
}

export default Map