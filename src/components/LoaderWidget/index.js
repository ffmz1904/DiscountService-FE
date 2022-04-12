import React from 'react';
import {Dimmer, Image, Loader, Segment} from "semantic-ui-react";
import './styles.scss';

const LoaderWidget = () => {
    return (
       <div id="LoaderWidget">
           <Segment>
               <Dimmer active>
                   <Loader />
               </Dimmer>
           </Segment>
       </div>
    );
};

export default LoaderWidget;