import React from 'react';

export const Loading = () => {
    return(
        <div className="col-12">
            <span className="fa fa-spinner fa-pulse fa-1x fa-fw text-danger"></span>
            <p>Loading...</p>
        </div>
    );
};