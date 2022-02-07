import React from 'react'
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { useState } from 'react';
// import SelectSearch from 'react-select-search';


function ActivityCard({
    mainText,
    number,
    flex,
    inputVal,
    activity,
    matching,
    overs,
    unders,
    stockOnHand,
    backStore,
    count,
    salesFloor,
    selectStore,
    smallText,
    color,
    height
}) {
    const [selectedOption, setselectedOption] = useState(null)
    const handleChange = selectedOption => {
        // this.setState({ selectedOption });
        setselectedOption(selectedOption)
        console.log(`Option selected:`, selectedOption);
    };

    const options = [
        { value: '01231231231', label: '01231231231' },
        { value: '01231231232', label: '012312312312' },
        { value: '01231231234', label: '01231231234' },
    ];
    // const { selectedOption } = selectedOption;
    return (
        <div className="dashboard-first-col-box" style={{ flex: flex, justifyContent: 'flex-start' }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="dashboard-first-col-box-main-heading" style={{ color: color && color }}>{mainText}</span>
                {/* <Link><AddIcon htmlColor="white" /></Link> */}
            </div>
            {/* <span className="dashboard-first-col-box-main-number">{number}</span> */}
            {activity ? <textarea disabled value={inputVal} name="activity" id="activity" cols="30" rows="10" className="activity-input" />
                :
                ''
            }
            {selectStore ? <Select
                value={selectedOption}
                onChange={(e) => handleChange(e)}
                options={options}
                isSearchable={true}
                className="last-scan-select"
            /> : ''}
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                {matching ? <React.Fragment>
                    <h1 className="scaning-store-heading">Matching</h1>
                    <span className="scaning-store-heading">{matching}</span>
                </React.Fragment>
                    : ""
                }
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                {overs ? <React.Fragment>
                    <h1 className="scaning-store-heading">Overs</h1>
                    <span className="scaning-store-heading">{overs}</span>
                </React.Fragment>
                    : ""
                }
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                {unders ? <React.Fragment>
                    <h1 className="scaning-store-heading">Unders</h1>
                    <span className="scaning-store-heading">{unders}</span>
                </React.Fragment>
                    : ""
                }
            </div>
            <div style={{ width: '100%', alignItems: 'center', justifyContent: 'space-between', display: 'flex', flexWrap: 'wrap' }}>
                {stockOnHand && count ?
                    <div style={{ flex: '1', minWidth: "150px", minHeight: "170px", backgroundColor: "#2E2D2D", borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'column', margin: '10px' }}>
                        {stockOnHand ?
                            <React.Fragment>
                                <span className="scaning-store-heading" style={{ color: "#C3F432", fontWeight: 'lighter' }}>Stock on Hand</span>
                                <span className="scaning-store-heading">{stockOnHand}</span>
                            </React.Fragment> : ""}
                        {count ?
                            <React.Fragment>
                                <span className="scaning-store-heading" style={{ color: "#C3F432", fontWeight: 'lighter' }}>Count</span>
                                <span className="scaning-store-heading">{count}</span>
                            </React.Fragment> : ""}
                    </div>
                    :
                    ''
                }
                {smallText ?
                    <div style={{ flex: '1', minWidth: "150px", minHeight: "90px", backgroundColor: "#2E2D2D", borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'column', margin: '10px' }}>

                        <React.Fragment>
                            <span className="scaning-store-heading">{smallText}</span>
                            <span className="scaning-store-heading">{count}</span>
                        </React.Fragment>
                    </div>
                    : ""}
                {backStore && salesFloor ?
                    <div style={{ flex: '1', minWidth: "150px", minHeight: "170px", backgroundColor: "#2E2D2D", borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'column', margin: '10px' }}>
                        {backStore ?
                            <React.Fragment>
                                <span className="scaning-store-heading" style={{ color: "#C3F432", fontWeight: 'lighter' }}>Back Store</span>
                                <span className="scaning-store-heading">{backStore}</span>
                            </React.Fragment> : ""}
                        {salesFloor ?
                            <React.Fragment>
                                <span className="scaning-store-heading" style={{ color: "#C3F432", fontWeight: 'lighter' }}>Sales Floor</span>
                                <span className="scaning-store-heading">{salesFloor}</span>
                            </React.Fragment> : ""}
                    </div>
                    :
                    ''
                }
            </div>
        </div>
    )
}

export default ActivityCard
