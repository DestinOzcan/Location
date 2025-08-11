import React from 'react';

interface RadiusSliderProps {
    radius: number;
    onRadiusChange: (newRadius: number) => void;
}

const RadiusSlider: React.FC<RadiusSliderProps> = ({ radius, onRadiusChange }) => {
    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onRadiusChange(Number(event.target.value));
    };

    return (
        <div className="radius-slider">
            <label htmlFor="radius">Adjust Location Radius: {radius} meters</label>
            <input
                type="range"
                id="radius"
                min="100"
                max="5000"
                step="100"
                value={radius}
                onChange={handleSliderChange}
            />
        </div>
    );
};

export default RadiusSlider;