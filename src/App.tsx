import Map from './components/Map'
import StoreList from './components/StoreList'
import useMap from './hook/useMap'

function App() {
  const hookMap = useMap()

  return (
    <div className='flex h-screen'>
     <div className='m-auto'>
      <h1 className='text-gray-400 text-3xl text-center font-bold '>
        Ubicador de Tiendas
      </h1>
      <div className='flex gap-5 bg-gray-700 pr-5 mt-4'>
        <Map hookMap={hookMap}/>
        <StoreList hookMap={hookMap}/>
      </div>
     </div>
    </div>
  )
}

export default App
