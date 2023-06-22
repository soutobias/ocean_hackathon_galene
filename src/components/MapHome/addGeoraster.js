/* eslint-disable no-undef */
// import chroma from 'chroma-js'
import 'leaflet/dist/leaflet'
import chroma from 'chroma-js'

export class GetTifLayer {
  constructor(actualLayer, actualDepth, actualDate, resolution = 256) {
    this.actualLayer = actualLayer
    this.actualDepth = actualDepth
    this.actualDate = actualDate
    this.resolution = resolution
    this.url = null
    this.layer = null
    this.scale = null
  }

  async parseGeo() {
    // const scale = chroma.scale(['white', 'black']).domain([-11022, 0]);
    const baseUrl = 'https://pilot-imfe-o.s3-ext.jc.rl.ac.uk/haig-fras/wekeo/'
    this.url = `${baseUrl}${this.actualLayer}_${this.actualDepth}_${this.actualDate}.tiff`

    // this.url = `${baseUrl}chl_5.0_2013-01.tiff`

    // const minMax = {
    //   chl: [0.0442142405, 0.26105115749999996],
    //   phyc: [0.210064535, 1.102216925],
    //   no3: [0.3782260075, 1.798195],
    //   po4: [0.0069639635, 0.0917562975],
    //   o2: [214.82448499999998, 252.42014],
    //   ph: [7.985332625, 8.14701275],
    //   so: [37.762795499999996, 38.275695],
    //   zos: [-0.5596080000000001, -0.333068435],
    //   avg_temp_C: [13.441810909090918, 25.962853333333328],
    // }

    // const scale = chroma.scale(['yellow', 'red', 'black']).colors(100)

    await fetch(this.url)
      .then(async (response) => await response.arrayBuffer())
      .then(async (arrayBuffer) => {
        await parseGeoraster(arrayBuffer).then(async (georaster) => {
          // const min = georaster.mins[0]
          // const max = georaster.maxs[0]
          // const range = georaster.ranges[0]
          // var scale = chroma.scale("Viridis");
          const scale = chroma
            .scale(['#FFFFD4', '#FE9F59', '#E0E0E0'])
            .domain([georaster.mins[0], georaster.maxs[0]])

          this.scale = [georaster.mins[0], georaster.maxs[0]]

          this.layer = await new GeoRasterLayer({
            georaster,
            opacity: 1,
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
            pixelValuesToColorFn: function (values) {
              const population = values[0]
              if (!population) {
                return
              }
              if (population < 0) return
              return scale(population).hex()
            },
          })
          this.layer.options.attribution = this.actualLayer
        })
      })
  }
}
