// import React, { useState } from 'react';
// import { GoogleMap, LoadScript } from '@react-google-maps/api';
// import PlacesAutocomplete from 'react-places-autocomplete';

// const GoogleMapsComponent = ({ onPlaceSelect, selectedPlace, onMapLoad }) => {
//   const onLoad = (map) => {
//     onMapLoad(map);
//   };

//   return (
//     <LoadScript googleMapsApiKey="AIzaSyAgPA7MgAtv71qXPRArS2KWExkM96oyYm4" libraries={['places']}>
//       <GoogleMap
//         center={{ lat: 0, lng: 0 }}
//         zoom={10}
//         onLoad={onLoad}
//       >
//         {/* Your map content goes here */}
//       </GoogleMap>
//       <PlacesAutocomplete
//         value={selectedPlace}
//         onChange={onPlaceSelect}
//       >
//         {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
//           <div>
//             <input {...getInputProps({ placeholder: 'Search for a location' })} />
//             <div>
//               {loading ? <div>Loading...</div> : null}
//               {suggestions.map((suggestion) => (
//                 <div {...getSuggestionItemProps(suggestion)}>{suggestion.description}</div>
//               ))}
//             </div>
//           </div>
//         )}
//       </PlacesAutocomplete>
//     </LoadScript>
//   );
// };

// function BookingRide() {
//   const [pickup, setPickup] = useState('');
//   const [dropoff, setDropoff] = useState('');

//   const handlePickupSelect = (place) => {
//     setPickup(place);
//   };

//   const handleDropoffSelect = (place) => {
//     setDropoff(place);
//   };

//   const handleMapLoad = (map) => {
//     // Do something with the loaded map, if needed
//   };

//   return (
//     <div>
//       <h2>Book a Ride</h2>
//       <GoogleMapsComponent
//         onPlaceSelect={handlePickupSelect}
//         selectedPlace={pickup}
//         onMapLoad={handleMapLoad}
//       />
//       <GoogleMapsComponent
//         onPlaceSelect={handleDropoffSelect}
//         selectedPlace={dropoff}
//         onMapLoad={handleMapLoad}
//       />
//       {/* Your booking form and other components */}
//     </div>
//   );
// }

// export default BookingRide;

import React from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function SimpleMap(){
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 14
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{display:"flex",justifyContent:"center"}}> 
    <div style={{ height: '400px', width: '65%'}}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent

          lat={59.955413}
          lng={30.337844}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
    </div>
  );
}