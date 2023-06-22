import {
  MapContainer,
  TileLayer,
  WMSTileLayer,
  LayersControl,
  Pane,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from 'react'
import L from 'leaflet'
import { GetMBTiles } from './addMBTiles'

// interface MapProps {
// }

export function MapHome() {
  const MAPBOX_API_KEY = import.meta.env.VITE_MAPBOX_API_KEY
  const MAPBOX_USERID = 'mapbox/satellite-v9'

  const [map, setMap] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (map) {
      setIsLoading(true)
    }
  }, [map])

  if (map) {
    console.log(map._layers)
  }
  useEffect(() => {
    if (map) {
      addMBTileLayer()
    }
  }, [isLoading])

  async function addMBTileLayer() {
    const url =
      'https://imfe-pilot-mbtiles.noc.ac.uk/v1/tiles/wekeompa@1.0.0/{z}/{x}/{y}.mvt'
    const getMBTilesLayer = new GetMBTiles(url)
    await getMBTilesLayer.getLayer().then(async function () {
      const layer = getMBTilesLayer.layer
      if (layer) {
        layer.options.attribution = 'MPA Layer'
        map.addLayer(layer)
        layer.on('click', async function (e: any) {
          const strContent: string[] = []
          Object.keys(e.layer.properties).forEach((c) => {
            console.log(c)
            strContent.push(
              `<p>${c}: ${
                e.layer.properties[c] === ' ' ? '--' : e.layer.properties[c]
              }</p>`,
            )
          })
          console.log('xxxx')
          console.log(strContent.join(''))
          L.popup({ maxWidth: 200 })
            .setLatLng(e.latlng)
            .setContent(strContent.join(''))
            .openOn(map)
        })
      }
    })
  }

  return (
    <div>
      <MapContainer
        style={{ height: '100vh', width: '100vw' }}
        center={[43, 10]}
        zoom={9}
        maxZoom={30}
        minZoom={2}
        scrollWheelZoom={true}
        zoomControl={false}
        ref={setMap}
      >
        <LayersControl>
          <LayersControl.BaseLayer name="OSM">
            <Pane name="OSM" style={{ zIndex: -1 }}>
              <TileLayer
                attribution={'© OpenStreetMap'}
                maxZoom={30}
                url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'}
              />
            </Pane>
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer checked name="Satellite">
            <Pane name="Satellite" style={{ zIndex: -1 }}>
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/${MAPBOX_USERID}/tiles/256/{z}/{x}/{y}@2x?access_token=${MAPBOX_API_KEY}`}
              />
            </Pane>
          </LayersControl.BaseLayer>
          <LayersControl.Overlay checked name="Special Areas of Conservation">
            <WMSTileLayer
              attribution="Special Areas of Conservation"
              url="https://mpa-ows.jncc.gov.uk/mpa_mapper/wms?"
              params={{
                service: 'WMS',
                request: 'GetMap',
                version: '1.3.0',
                layers: 'sac_mc_full',
                format: 'image/png',
                transparent: true,
                width: 256,
                height: 256,
              }}
              opacity={1}
              zIndex={9999}
            />
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="Marine Conservation Zones">
            <WMSTileLayer
              attribution="Marine Conservation Zones"
              url="https://mpa-ows.jncc.gov.uk/mpa_mapper/wms?"
              params={{
                service: 'WMS',
                request: 'GetMap',
                version: '1.3.0',
                layers: 'mcz',
                format: 'image/png',
                transparent: true,
                width: 256,
                height: 256,
              }}
              opacity={1}
              zIndex={9998}
            />
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </div>
  )
}
