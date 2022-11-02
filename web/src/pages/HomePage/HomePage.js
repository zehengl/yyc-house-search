import { useEffect, useRef } from 'react'

import { loadModules } from 'esri-loader'

import { MetaTags } from '@redwoodjs/web'

import AppLayout from 'src/layouts/AppLayout'

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
      const basemap = new TileLayer({
        url: 'https://tiles.arcgis.com/tiles/AVP60cs0Q9PEA8rH/arcgis/rest/services/Calgary_Basemap/MapServer',
      })
      const imagery = new TileLayer({
        url: 'https://tiles.arcgis.com/tiles/AVP60cs0Q9PEA8rH/arcgis/rest/services/CurrentOrthophoto_WMASP/MapServer',
        visible: false,
      })
      const map = new Map({ layers: [basemap, imagery] })

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

      const imageryLayerToggle = document.getElementById('imageryLayerToggle')
      imageryLayerToggle.addEventListener('change', () => {
        imagery.visible = imageryLayerToggle.checked
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
        const baseUrl = 'https://yyc-house-search.netlify.app'
        if (address) {
          content = `<a class="bg-white text-blue-500 font-semibold" target='_blank' href='${baseUrl}/location/${address}'>See detail.</a>`
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
        <span
          className="esri-widget"
          style={{
            top: '5.5rem',
            left: '1rem',
            position: 'absolute',
            padding: '.5rem',
            opacity: 0.8,
          }}
        >
          {' '}
          <input type="checkbox" id="imageryLayerToggle" /> Aerial Imagery{' '}
        </span>
      </AppLayout>
    </>
  )
}

export default HomePage
