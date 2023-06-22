/* eslint-disable no-undef */
// import chroma from 'chroma-js'
import 'leaflet/dist/leaflet'

export class GetTifLayer {
  constructor(actualLayer, actualDepth, actualDate, resolution = 256) {
    this.actualLayer = actualLayer
    this.actualDepth = actualDepth
    this.actualDate = actualDate
    this.resolution = resolution
    this.url = null
    this.layer = null
  }

  async parseGeo() {
    // const scale = chroma.scale(['white', 'black']).domain([-11022, 0]);
    const baseUrl = 'https://pilot-imfe-o.s3-ext.jc.rl.ac.uk/haig-fras/wekeo/'
    this.url = `${baseUrl}${this.actualLayer}_${this.actualDepth}_${this.actualDate}.tiff`

    await fetch(this.url)
      .then(async (response) => await response.arrayBuffer())
      .then(async (arrayBuffer) => {
        await parseGeoraster(arrayBuffer).then(async (georaster) => {
          // const min = georaster.mins[0]
          // const max = georaster.maxs[0]
          // const range = georaster.ranges[0]
          // var scale = chroma.scale("Viridis");
          this.georaster = georaster
          this.layer = await new GeoRasterLayer({
            georaster,
            opacity: 0.7,
            // pixelValuesToColorFn: function(pixelValues) {
            //   var pixelValue = pixelValues[0]; // there's just one band in this raster

            //   // if there's zero wind, don't return a color
            //   if (pixelValue === 0) return null;

            //   // scale to 0 - 1 used by chroma
            //   var scaledPixelValue = (pixelValue - min) / range;

            //   var color = scale(scaledPixelValue).hex();

            //   return color;
            // },
            resolution: this.resolution,
          })
          this.layer.options.attribution = this.actualLayer
        })
      })
  }
}
