import React from 'react';

const FilterPanel = () => {
    return (
        <div className="filter-panel">
            <h2>Filter Devices</h2>
            <form>
                <div className="filter-group">
                    <label htmlFor="deviceType">Device Type:</label>
                    <select id="deviceType" name="deviceType">
                        <option value="">All</option>
                        <option value="sensor">Sensor</option>
                        <option value="camera">Camera</option>
                        <option value="actuator">Actuator</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label htmlFor="status">Status:</label>
                    <select id="status" name="status">
                        <option value="">All</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label htmlFor="location">Location:</label>
                    <input type="text" id="location" name="location" placeholder="Enter location" />
                </div>
                <button type="submit">Apply Filters</button>
            </form>
        </div>
    );
};

export default FilterPanel;