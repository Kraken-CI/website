import React from 'react';

const Screen = ({img}) => (
    <img
        src={'/img/' + img}
        style={{
            boxShadow: '0 10px 10px 5px #777',
            marginBottom: '30px'
        }}
    />
);

export default Screen;
