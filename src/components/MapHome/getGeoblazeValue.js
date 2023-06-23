import geoblaze from 'geoblaze'
import 'leaflet/dist/leaflet'
import proj4 from 'proj4'

export class GetGeoblazeValue {
  constructor(coords, actualLayer, actualDepth, yearMonths) {
    this.coords = coords
    this.actualLayer = actualLayer
    this.actualDepth = actualDepth
    this.yearMonths = yearMonths
    this.graphData = []
    this.url = null
  }

  async getGeoblaze() {
    const latlng3857 = proj4('EPSG:4326', 'EPSG:3857').forward([
      this.coords.lng,
      this.coords.lat,
    ])
    await this.yearMonths.forEach(async (yearMonth, idx) => {
      if (
        this.actualDepth !== '5.0' &&
        idx > this.yearMonths.indexOf('2021-05')
      ) {
        this.url = null
      } else {
        const baseUrl =
          'https://pilot-imfe-o.s3-ext.jc.rl.ac.uk/haig-fras/wekeo/'
        this.url = `${baseUrl}${this.actualLayer}_${this.actualDepth}_${yearMonth}.tiff`
        const georaster = await geoblaze.parse(this.url)
        const value = await geoblaze.identify(georaster, [
          latlng3857[0],
          latlng3857[1],
        ])
        const [year, month] = yearMonth.split('-')
        this.graphData.push({
          x: new Date(parseInt(year), parseInt(month), 1),
          y: value[0],
        })
      }
    })
  }
}
