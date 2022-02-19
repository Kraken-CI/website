import React from 'react';

const Screen = ({img}) => (
    <a href={'/img/' + img} target="blank">
    <img
        src={'/img/' + img}
        style={{
            boxShadow: '0 10px 10px 5px #777',
            marginBottom: '30px'
        }}
    /></a>
);

export default Screen;
