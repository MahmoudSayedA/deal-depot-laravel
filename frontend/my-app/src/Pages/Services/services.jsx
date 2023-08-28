import React from 'react';
import Cover from '../../Component/cover';

const Services = (props) => (
    <div>
        <Cover/>
        {props.children}
    </div>
    );
    
export default Services;