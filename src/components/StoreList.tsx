import { HookMapType } from '../vite-env'

type MapProps = {
  hookMap:HookMapType
}

const StoreList = ({hookMap}:MapProps) => {
  const {locations,handleFocusLocation,locationFocus} = hookMap


  return (
    <div className='p-3'>
      <h1 className='mb-4 text-2xl font-bold text-center'>Tiendas</h1>
      <div className="relative flex flex-col text-white bg-gray-500 shadow-md w-90 rounded-xl bg-clip-border">
        <nav className="flex min-w-[160px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
          {
            locations?.map(({id,name})=>(
              <div 
                key={'option_'+id}
                role="button"
                className={`flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start 
                ${locationFocus== id && `bg-slate-400`}
                hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 `}
                onClick={()=>{handleFocusLocation(id)}}
                >
                {name}
              </div>
            ))
          }
          
        </nav>
      </div>
    </div>
  )
}

export default StoreList