<div align="center">
    <img src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678085-house-512.png" alt="logo" height="196">
</div>

# yyc-house-search

[![Netlify Status](https://api.netlify.com/api/v1/badges/ef409278-83c3-4900-9e20-a04178cfc4b3/deploy-status)](https://app.netlify.com/sites/yyc-house-search/deploys)

A Jamstack app to display various property information

## Getting Started


> **Prerequisites**
>
> - Redwood requires [Node.js](https://nodejs.org/en/) (>=14.19.x <=16.x) and [Yarn](https://yarnpkg.com/) (>=1.15)
> - Are you on Windows? For best results, follow our [Windows development setup](https://redwoodjs.com/docs/how-to/windows-development-setup) guide

Start by installing dependencies:

```
yarn install
```

Then fire it up:

```
yarn rw dev
```


## Credits

- [Logo](https://www.iconfinder.com/icons/299061/house_icon) by [Paomedia](https://www.iconfinder.com/paomedia)
- Various datasets from [City of Calgary’s Open Data Portal](https://data.calgary.ca)
  - [Property Assessments](https://data.calgary.ca/Government/Property-Assessments/6zp6-pxei)
  - [Residential Solar Photovoltaic (PV) System Potential](https://data.calgary.ca/Environment/Residential-Solar-Photovoltaic-PV-System-Potential/k85e-i265)
  - [Public Trees](https://data.calgary.ca/Environment/Public-Trees/tfs4-3wwa)
  - [School Locations](https://data.calgary.ca/Services-and-Amenities/School-Locations/fd9t-tdn2)
  - [Waste and Recycling Collection Schedule](https://data.calgary.ca/Services-and-Amenities/Waste-and-Recycling-Collection-Schedule/jq4t-b745)
  - [Calgary Transit Stops By Route Cross Reference](https://data.calgary.ca/Transportation-Transit/Calgary-Transit-Stops-By-Route-Cross-Reference/pm3p-838w)
- Various mapping components from City of Calgary’s Geospatial Business Solutions (GBS)
  - [Aerial Image](https://tiles.arcgis.com/tiles/AVP60cs0Q9PEA8rH/arcgis/rest/services/CurrentOrthophoto_WMASP/MapServer?cacheKey=8c58e2af64f46f91)
  - [Basemap](https://tiles.arcgis.com/tiles/AVP60cs0Q9PEA8rH/arcgis/rest/services/Calgary_Basemap/MapServer?cacheKey=831504eaa9b2633d)
  - [Geocoder](http://gis.calgary.ca/arcgis/rest/services/pub_Locators/CalgaryUniversalLocator/GeocodeServer)
