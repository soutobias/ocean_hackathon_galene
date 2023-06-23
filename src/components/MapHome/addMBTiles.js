import 'leaflet/dist/leaflet'
// import PropTypes from 'prop-types';
// import { childrenType, GridLayer } from 'react-leaflet';
import { protobuf } from '../MapHome/addVectorGridL'

export class GetMBTiles {
  constructor(url) {
    this.url = url
  }

  async getLayer() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias

    const vectorTileOptions = {
      interactive: true,
      zIndex: 9999,
      vectorTileLayerStyles: {
        mpa: function (properties, zoom) {
          const color = '#d97e00'
          return {
            weight: 0.8,
            color,
            fillColor: color,
            fillOpacity: 0.7,
            fill: false,
            zorder: 2,
          }
        },
        seagrass: function (properties, zoom) {
          const color = '#009623'
          return {
            weight: 0,
            color,
            fillColor: color,
            fillOpacity: 0.8,
            fill: true,
            zorder: 3,
          }
        },
      },
    }
    this.layer = protobuf(this.url, vectorTileOptions)
  }
}
