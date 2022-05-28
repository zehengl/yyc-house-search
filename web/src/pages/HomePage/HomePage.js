import { Link, routes } from '@redwoodjs/router'
import { useEffect, useRef } from 'react'

import AppLayout from 'src/layouts/AppLayout'
import { MetaTags } from '@redwoodjs/web'
import { loadModules } from 'esri-loader'

const HomePage = () => {
  const mapRef = useRef()

  useEffect(() => {
    loadModules(
      [
        'esri/Map',
        'esri/layers/TileLayer',
        'esri/views/MapView',
        'esri/widgets/Search',
        'esri/tasks/Locator',
      ],
      {
        css: true,
      }
    ).then(([Map, TileLayer, MapView, Search, Locator]) => {
      const map = new Map()

      const basemap = new TileLayer({
        url: 'https://tiles.arcgis.com/tiles/AVP60cs0Q9PEA8rH/arcgis/rest/services/Calgary_Basemap/MapServer',
      })

      map.layers.add(basemap)

      const view = new MapView({
        container: mapRef.current,
        map: map,
        center: [-114.08529, 51.05011],
        zoom: 11,
      })
      const search = new Search({
        sources: [
          {
            locator: new Locator({
              url: 'http://gis.calgary.ca/arcgis/rest/services/pub_Locators/CalgaryUniversalLocator/GeocodeServer',
            }),
            singleLineFieldName: 'SingleLine',
            name: 'City of Calgary Geocoding Service',
            placeholder: 'Please type your address',
            maxResults: 3,
            maxSuggestions: 6,
            suggestionsEnabled: true,
            minSuggestCharacters: 0,
          },
        ],
        includeDefaultSources: false,
        view: view,
      })
      view.ui.add(search, 'top-right')

      view.on('click', (evt) => {
        search.clear()
        view.popup.clear()

        if (search.activeSource) {
          const geocoder = search.activeSource.locator
          const params = {
            location: evt.mapPoint,
          }
          geocoder.locationToAddress(params).then(
            (response) => {
              const address = response.address
              showPopup(address, evt.mapPoint)
            },
            () => {
              showPopup(null, evt.mapPoint)
            }
          )
        }
      })

      const showPopup = (address, pt) => {
        let title, content

        if (address) {
          content = `<strong>TBD</strong>`
          title = address
        } else {
          content = null
          title = 'No address found for this location'
        }
        view.popup.open({
          title: title,
          content: content,
          location: pt,
        })
      }

      return () => {
        if (view) {
          view.container = null
        }
      }
    })
  })

  return (
    <>
      <AppLayout>
        <MetaTags title="Home" description="Home page" />
        <div style={{ height: '100vh' }} ref={mapRef} />
      </AppLayout>
    </>
  )
}

export default HomePage
