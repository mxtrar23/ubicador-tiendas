import demoData from '../utils/demoExample.json'
import { MarketLocationJson } from '../vite-env'

export const getMarketLocations = async () => {
  return await demoData as MarketLocationJson[]
}