import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from 'react'
import L from 'leaflet'
import { GetTifLayer } from './addGeoraster'
import { GetMBTiles } from './addMBTiles'
import { variables } from '../../data/variables'
import { yearMonths } from '../../data/yearMonths'
import { limits } from '../../data/limits'
import { GetGeoblazeValue } from './getGeoblazeValue'

// interface MapProps {
// }

interface MapHomeProps {
  selectedLayers: any
  actualLayer?: any
  actualDate: any
  layerAction?: any
  setLayerAction: any
  actualDepth: any
  setColorLegend: any
  modelTarget: any
  clickPoint: any
  setClickPoint: any
  setShowGraph: any
}

export function MapHome({
  selectedLayers,
  actualLayer,
  actualDate,
  setLayerAction,
  actualDepth,
  setColorLegend,
  modelTarget,
  clickPoint,
  setClickPoint,
  setShowGraph,
}: MapHomeProps) {
  const MAPBOX_API_KEY = import.meta.env.VITE_MAPBOX_API_KEY
  const MAPBOX_USERID = 'mapbox/satellite-v9'

  const [map, setMap] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (map) {
      setIsLoading(true)
    }
  }, [map])

  async function handleSetLatlng(e: any) {
    setClickPoint(false)
    const getGeoblazeValue = new GetGeoblazeValue(
      e.latlng,
      actualLayer,
      actualDepth,
      yearMonths,
    )
    await getGeoblazeValue.getGeoblaze().then(async function () {
      // setLoading(false)
      console.log(getGeoblazeValue.graphData)
      setShowGraph(getGeoblazeValue.graphData)
    })
    // setShowGraph(e.latlng)
  }

  useEffect(() => {
    if (clickPoint) {
      window.alert('Click on a point on the map to generate a graph')
      map.dragging.disable()
      map.on('click', handleSetLatlng)
    } else {
      if (map) {
        map.dragging.enable()
        map.off('click', handleSetLatlng)
      }
    }
  }, [clickPoint])

  async function buildAndAddLayer(actual: any) {
    if (selectedLayers === 'Favorable Conditions') {
      const getTifLayer = new GetTifLayer(
        Object.keys(variables)[0],
        actualDepth,
        yearMonths[actualDate],
        variables,
        modelTarget,
        limits,
        'blank layer',
      )
      await getTifLayer.parseGeo().then(function () {
        map.addLayer(getTifLayer.layer)
      })
      Object.keys(variables).forEach(async (variable: any) => {
        const getTifLayer = new GetTifLayer(
          variable,
          actualDepth,
          yearMonths[actualDate],
          variables,
          modelTarget,
          limits,
          selectedLayers,
        )
        await getTifLayer.parseGeo().then(function () {
          map.addLayer(getTifLayer.layer)
          setColorLegend([0, 100])
        })
      })
    } else {
      const getTifLayer = new GetTifLayer(
        actual,
        actualDepth,
        yearMonths[actualDate],
        variables,
        modelTarget,
        limits,
        null,
      )
      await getTifLayer.parseGeo().then(function () {
        map.addLayer(getTifLayer.layer)
        setColorLegend(getTifLayer.scale)
      })
    }
  }

  // function addMapLayers() {
  //   map.eachLayer(function (layer: any) {
  //     if (actualLayer === layer.options.attribution) {
  //       setLayerAction('')
  //       return false
  //     }
  //   })
  //   buildAndAddLayer(actualLayer)
  // }

  // function removeMapLayers() {
  //   map.eachLayer(function (layer: any) {
  //     if (actualLayer === layer.options.attribution) {
  //       map.removeLayer(layer)
  //       setLayerAction('')
  //     }
  //   })
  // }

  function changeMapLayers() {
    map.eachLayer(function (layer: any) {
      if (Object.keys(variables).includes(layer.options.attribution)) {
        map.removeLayer(layer)
      }
      if (layer.options.attribution === 'Posidonia oceanica') {
        map.removeLayer(layer)
      }
    })

    if (selectedLayers) {
      if (selectedLayers === 'Posidonia oceanica') {
        addMBTileLayer(['wekeoseagrass', selectedLayers])
      }
      buildAndAddLayer(selectedLayers)
      // setColorLegend([0, 100])
      setLayerAction('')
    } else {
      setColorLegend(null)
    }
  }

  useEffect(() => {
    if (map) {
      changeMapLayers()
    }
  }, [selectedLayers])

  useEffect(() => {
    if (map) {
      changeMapLayers()
    }
  }, [actualDate])

  useEffect(() => {
    if (map) {
      changeMapLayers()
    }
  }, [modelTarget])

  useEffect(() => {
    if (map) {
      changeMapLayers()
    }
  }, [actualDepth])

  // if (map) {
  //   console.log(map._layers)
  // }
  useEffect(() => {
    if (map) {
      const actual = ['MPA Layer']
      map.eachLayer(function (layer: any) {
        if (actual.includes(layer.options.attribution)) {
          return false
        }
      })
      addMBTileLayer(['wekeompa', actual[0]])
      // addMBTileLayer('wekeoseagrasspoints')
    }
  }, [isLoading])

  async function addMBTileLayer(tileName: string[]) {
    const url = `https://imfe-pilot-mbtiles.noc.ac.uk/v1/tiles/${tileName[0]}@1.0.0/{z}/{x}/{y}.mvt`
    const getMBTilesLayer = new GetMBTiles(url)
    await getMBTilesLayer.getLayer().then(async function () {
      const layer = getMBTilesLayer.layer
      if (layer) {
        layer.options.attribution = tileName[1]
        map.addLayer(layer)
        layer.on('click', async function (e: any) {
          const strContent: string[] = []
          Object.keys(e.layer.properties).forEach((c) => {
            strContent.push(
              `<p>${c}: ${
                e.layer.properties[c] === ' ' ? '--' : e.layer.properties[c]
              }</p>`,
            )
          })
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
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/${MAPBOX_USERID}/tiles/256/{z}/{x}/{y}@2x?access_token=${MAPBOX_API_KEY}`}
        />
      </MapContainer>
    </div>
  )
}
