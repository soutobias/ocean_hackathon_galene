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
      vectorTileLayerStyles: {
        mpa: function (properties, zoom) {
          let color = '#d97e00'
          return {
            weight: 0.8,
            color,
            fillColor: color,
            fillOpacity: 0.7,
            fill: false,
          }
        },
      },
    }
    this.layer = protobuf(this.url, vectorTileOptions)
  }
}
