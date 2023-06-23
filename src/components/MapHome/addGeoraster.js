/* eslint-disable no-undef */
// import chroma from 'chroma-js'
import 'leaflet/dist/leaflet'
import chroma from 'chroma-js'

export class GetTifLayer {
  constructor(
    actualLayer,
    actualDepth,
    actualDate,
    variables,
    modelTarget,
    limits,
    action,
  ) {
    this.actualLayer = actualLayer
    this.actualDepth = actualDepth
    this.actualDate = actualDate
    this.variables = variables
    this.modelTarget = modelTarget
    this.limits = limits
    this.action = action
    this.resolution = 256
    this.url = null
    this.layer = null
    this.scale = null
  }

  async parseGeo() {
    // const scale = chroma.scale(['white', 'black']).domain([-11022, 0]);
    const baseUrl = 'https://pilot-imfe-o.s3-ext.jc.rl.ac.uk/haig-fras/wekeo/'
    this.url = `${baseUrl}${this.actualLayer}_${this.actualDepth}_${this.actualDate}.tiff`

    // this.url = `${baseUrl}chl_5.0_2013-01.tiff`

    // const scale = chroma.scale(['yellow', 'red', 'black']).colors(100)

    await fetch(this.url)
      .then(async (response) => await response.arrayBuffer())
      .then(async (arrayBuffer) => {
        await parseGeoraster(arrayBuffer).then(async (georaster) => {
          this.scale = this.variables[this.actualLayer][2]

          const scale = chroma
            .scale(this.variables[this.actualLayer][3])
            .domain(this.scale)

          // this.scale = [georaster.mins[0], georaster.maxs[0]]

          // const scale = chroma
          //   .scale(['#FFFFD4', '#FE9F59', '#E0E0E0'])
          //   .domain(this.scale)
          const limits = this.limits
          const modelTarget = this.modelTarget
          const actualLayer = this.actualLayer
          const action = this.action
          this.layer = await new GeoRasterLayer({
            georaster,
            opacity: 1,
            resolution: this.resolution,
            pixelValuesToColorFn: function (values) {
              const population = values[0]
              if (!population) {
                return
              }
              if (action === 'blank layer') {
                return '#09ff00'
              }
              if (modelTarget) {
                if (limits[modelTarget]) {
                  if (limits[modelTarget][actualLayer]) {
                    if (
                      population < limits[modelTarget][actualLayer][0] ||
                      population > limits[modelTarget][actualLayer][1]
                    ) {
                      console.log(modelTarget, actualLayer, population)
                      return '#707070'
                    }
                  }
                }
              }
              if (action === 'Feature Combination') {
                return
              }
              return scale(population).hex()
            },
          })
          this.layer.options.attribution = this.actualLayer
        })
      })
  }
}
