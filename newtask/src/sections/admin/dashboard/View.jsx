import React from 'react'

export const View = () => {
   return (
        <>
            <h4 className="fw-bold py-3 mb-4">Dashboard</h4>
            <div className="row">
                <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Total Users</h5>
                            <p className="card-text">1,234</p>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Total Sales</h5>
                            <p className="card-text">$56,789</p>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Active Sessions</h5>
                            <p className="card-text">256</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

