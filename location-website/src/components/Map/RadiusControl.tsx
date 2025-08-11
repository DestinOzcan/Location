import React, { useState } from 'react';

interface RadiusControlProps {
    radius: number;
    setRadius: (radius: number) => void;
}

const RadiusControl: React.FC<RadiusControlProps> = ({ radius, setRadius }) => {
    const handleRadiusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRadius(Number(event.target.value));
    };

    return (
        <div className="radius-control">
            <label htmlFor="radius">Radius: {radius}m</label>
            <input
                id="radius"
                type="range"
                min="100"
                max="5000"
                step="100"
                value={radius}
                onChange={handleRadiusChange}
            />
        </div>
    );
};

export default RadiusControl;