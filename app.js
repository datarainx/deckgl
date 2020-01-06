import {Deck} from '@deck.gl/core';
import {GeoJsonLayer, ArcLayer, ScatterplotLayer} from '@deck.gl/layers';
import mapboxgl from 'mapbox-gl';

// source: Natural Earth http://www.naturalearthdata.com/ via geojson.xyz
const AIR_PORTS =
  'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/website/bart-stations.json';

const INITIAL_VIEW_STATE = {
  longitude: -73.935242,
  latitude: 40.730610,
  zoom: 12,
  bearing: 0,
  pitch: 30
};

const MALE_COLOR = [0, 128, 255];
const FEMALE_COLOR = [255, 0, 128];

// Set your mapbox token here
mapboxgl.accessToken = process.env.MapboxAccessToken; // eslint-disable-line

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v9',
  // Note: deck.gl will be in charge of interaction and event handling
  interactive: false,
  center: [INITIAL_VIEW_STATE.longitude, INITIAL_VIEW_STATE.latitude],
  zoom: INITIAL_VIEW_STATE.zoom,
  bearing: INITIAL_VIEW_STATE.bearing,
  pitch: INITIAL_VIEW_STATE.pitch
});

export const deck = new Deck({
  canvas: 'deck-canvas',
  width: '100%',
  height: '100%',
  initialViewState: INITIAL_VIEW_STATE,
  controller: true,
  onViewStateChange: ({viewState}) => {
    map.jumpTo({
      center: [viewState.longitude, viewState.latitude],
      zoom: viewState.zoom,
      bearing: viewState.bearing,
      pitch: viewState.pitch
    });
  },
  layers: [
    new ScatterplotLayer({
      id: 'scatter-plot',
      data: 'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/scatterplot/manhattan.json',
      radiusScale: 10,
      radiusMinPixels: 0.5,
      getPosition: d => [d[0], d[1], 0],
      getColor: d => (d[2] === 1 ? MALE_COLOR : FEMALE_COLOR)
    })
  ]
});
