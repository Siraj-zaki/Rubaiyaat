import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';

export default function Card({ mainText, number, flex, height }) {
    return (
        <div className="dashboard-first-col-box" style={{ flex: flex ? flex : 1, height: height }} >
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="dashboard-first-col-box-main-heading">{mainText}</span>
                <Link><AddIcon htmlColor="white" /></Link>
            </div>
            <span className="dashboard-first-col-box-main-number">{number}</span>
        </div>
    );
}
