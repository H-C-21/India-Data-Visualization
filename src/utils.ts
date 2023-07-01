import {range} from 'd3-array';
import {scaleQuantile} from 'd3-scale';

import type GeoJSON from 'geojson';

export function updatePercentiles(
  featureCollection: GeoJSON.FeatureCollection<GeoJSON.Geometry>,
  scaler,
  accessor: (f: GeoJSON.Feature<GeoJSON.Geometry>) => number): GeoJSON.FeatureCollection<GeoJSON.Geometry> {
  const {features} = featureCollection;
 
  const scale = scaleQuantile().domain(features.flatMap(accessor)).range(range(8));
 
  return {
    type: 'FeatureCollection',
    features: features.map(f => {
      const value = scaler(f);
      const properties = {
        ...f.properties,
        value,
        percentile: scale(value)
      };
      return {...f, properties};
    })
  };
}