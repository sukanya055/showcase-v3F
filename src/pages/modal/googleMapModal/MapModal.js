import React from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { useState } from 'react';

const containerStyle = {
    width: '100%',
    height: '100%'
};


const MapModal = ({ userDetails,origin,destination }) => {

    const { latitude, longitude } = userDetails || {}
    const [response, setResponse] = useState(null)
    
    const directionsCallback = (res) => {
        
        if (res !== null) {
            if (res.status === 'OK') {
                setResponse(res)
            } else {
                console.log('response: ', res)
            }
        }
    }


    return (
        <div className='bg-gray-400'>
            {/* The button to open modal */}
            
            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my-modal-6" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle mb-20 lg:mb-0 ">
                <div className=" w-[300px]  md:w-[550px] lg:max-w-[770px] h-[500px] md:h-[600px] lg:h-[550px] ">
                    <label htmlFor="my-modal-6" className="btn btn-sm btn-circle mb-7">✕</label>

                    <LoadScript
                        googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}
                    >
                        <GoogleMap
                            // required
                            id='direction-example'
                            // required
                            mapContainerStyle={containerStyle}
                            // required
                            zoom={12}
                            // required
                            center={{
                                lat: latitude,
                                lng: longitude
                            }}

                        >
                            {
                                (
                                    destination !== '' &&
                                    origin !== ''
                                ) && (
                                    <DirectionsService
                                        options={{
                                            destination: destination,
                                            origin: origin,
                                            travelMode: 'DRIVING'
                                        }}
                                        // required
                                        callback={directionsCallback}

                                    />
                                )
                            }

                            {
                                response !== null && (
                                    <DirectionsRenderer
                                        // required
                                        options={{
                                            directions: response
                                        }}

                                    />
                                )
                            }
                        </GoogleMap>
                    </LoadScript>
                </div>
            </div>
        </div>

    );
};

export default MapModal;