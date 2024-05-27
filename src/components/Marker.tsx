import { InfoWindowF, MarkerF } from '@react-google-maps/api'
import { MarketLocationJson } from '../vite-env'
import { useState } from 'react'
import icon from '../assets/marker.webp'

type MarkerProps = {
  data :MarketLocationJson
}
const Marker = ({data}:MarkerProps) => {
  const [showInfo, setShowInfo] = useState<boolean>(false)
  const {description,location,name} = data
  return (
    <>
      <MarkerF 
        icon={icon}
        position={location}
        title={name}
        onClick={()=>setShowInfo(true)}
        /> 
      {showInfo && <InfoWindowF
        position={location} 
        onCloseClick={()=>setShowInfo(false)}
        >
        <div className='w-full p-3 flex flex-row gap-2 text-black'>
          <div className='flex'>
            <img className='object-scale-down w-10 h-10' src={icon}/>
          </div>
          <div className='flex flex-col'>
            <h1 className='text-bold text-red-600 text-xl'>{name}</h1>
            <p >{description}</p>
          </div>
        </div>
      </InfoWindowF>}
    </>
  )
}

export default Marker