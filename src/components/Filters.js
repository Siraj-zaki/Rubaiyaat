import React from 'react'
import BasicTextFields from "./Input";
import Select from "react-select";
import { DatePicker, Radio, Space } from 'antd';
const { RangePicker } = DatePicker;
export default function Filters({
    siteFilter,
    statusFilter,
    zoneFilter,
    departmentFilter,
    assetEPCFilter,
    categoryCodeFilter,
    categoryNameFilter,
    subCategoryCodeFilter,
    subCategoryNameFilter,
    Odoo_TagFilter,
    ownerNameFilter,
    descriptionFilter,
    assetStatusFilter,
    creationDateFilter,
    modificationDateFilter,
    sitesOption,
    statusOption,
    zoneOption,
    departmentOption,
    site_Value,
    status_Value,
    zone_Value,
    department_Value,
    assetEPC_Value,
    Odoo_Tag_Value,
    ownerName_Value,
    description_Value,
    assetStatus_Value,
    creationDate_Value,
    modificationDate_Value,
    site_changeHandler,
    status_changeHandler,
    zone_changeHandler,
    department_changeHandler,
    assetEPC_changeHandler,
    Odoo_Tag_changeHandler,
    ownerName_changeHandler,
    description_changeHandler,
    assetStatus_changeHandler,
    creationDate_changeHandler,
    modificationDate_changeHandler,
    categoryCode_changeHandler,
    categoryName_changeHandler,
    subCategoryCode_changeHandler,
    subCategoryName_changeHandler,
    categoryCodeOption,
    categoryNameOption,
    subCategoryCodeOption,
    subCategoryNameOption,
    categoryCode_Value,
    categoryName_Value,
    subCategoryCode_Value,
    subCategoryName_Value,
    children

}) {
    const customStyles = {
        control: (base, state) => ({
            ...base,
            background: "transparent",
            backgroundColor: 'transparent',
            height: 33,
            marginTop: 10,
            color: 'white',
            // zIndex: 312312312312312

        }),
        menu: base => ({
            ...base,
            // override border radius to match the box
            borderRadius: 0,
            // kill the gap
            marginTop: 0,
            background: 'transparent',
            zIndex: 312312312312312,
        }),
        menuList: base => ({
            ...base,
            // kill the white space on first and last option
            padding: 0,
            background: 'gray',
            zIndex: 312312312312312

        }),
        multiValueRemove: base => ({
            ...base,
            color: 'black'
        }),
        input: base => ({
            ...base,
            color: 'white',
        }),
        menuList: base => ({
            ...base,
            backgroundColor: 'black'
        }),

        option: (provided, state) => ({
            ...provided,
            color: state.isFocused ? "black" : 'white',
            zIndex: 312312312312312
        }),
        singleValue: (provided, state) => {
            const opacity = state.isDisabled ? 0.5 : 1;
            const transition = 'opacity 300ms';

            return { ...provided, opacity, transition, color: "white" };
        },
    };

    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'transparent', minHeight: 50, marginTop: 10, position: 'relative' }}>
            <form style={{ width: '50%', margin: 20, marginBottom: 0, display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: 0, flexDirection: 'column' }}  >
                {
                    siteFilter &&
                    <Select
                        value={site_Value}
                        onChange={site_changeHandler}
                        options={sitesOption}
                        isMulti={true}
                        isSearchable={true}
                        placeholder={"Site"}
                        className="last-scan-select-2"
                        styles={customStyles}
                    />}
                {
                    departmentFilter &&
                    <Select
                        value={department_Value}
                        onChange={department_changeHandler}
                        isMulti={true}
                        options={departmentOption}
                        isSearchable={true}
                        placeholder={"Department"}
                        className="last-scan-select-2"
                        styles={customStyles}
                    />
                }
                {
                    zoneFilter &&
                    <Select
                        value={zone_Value}
                        onChange={zone_changeHandler}
                        options={zoneOption}
                        isMulti={true}
                        isSearchable={true}
                        placeholder={"Zone"}
                        className="last-scan-select-2"
                        styles={customStyles}
                    />
                }
                {
                    statusFilter &&
                    <Select
                        value={status_Value}
                        onChange={status_changeHandler}
                        options={statusOption}
                        isMulti={true}
                        isSearchable={true}
                        placeholder={"Status"}
                        className="last-scan-select-2"
                        styles={customStyles}
                    />}
                {
                    categoryCodeFilter &&
                    <Select
                        value={categoryCode_Value}
                        onChange={categoryCode_changeHandler}
                        options={categoryCodeOption}
                        isMulti={true}
                        isSearchable={true}
                        placeholder={"Category Code"}
                        className="last-scan-select-2"
                        styles={customStyles}
                    />
                }
                {
                    categoryNameFilter &&
                    <Select
                        value={categoryName_Value}
                        onChange={categoryName_changeHandler}
                        options={categoryNameOption}
                        isMulti={true}
                        isSearchable={true}
                        placeholder={"Category Name"}
                        className="last-scan-select-2"
                        styles={customStyles}
                    />
                }


                {
                    descriptionFilter &&
                    <BasicTextFields
                        margin={10}
                        placeholder="Description"
                        name="Description"
                        value={description_Value}
                        onChangeEvent={description_changeHandler}
                    />
                }

                {
                    ownerNameFilter &&
                    <BasicTextFields
                        margin={10}
                        placeholder="Owner_name"
                        name="Owner_name"
                        value={ownerName_Value}
                        onChangeEvent={ownerName_changeHandler}
                    />
                }
            </form>
            <div style={{ width: '1px', height: '100%', backgroundColor: 'white', position: 'absolute' }}></div>
            <form style={{ width: '50%', margin: 20, marginBottom: 0, display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: 0, flexDirection: 'column' }}  >
                {children}
                {
                    subCategoryCodeFilter &&
                    <Select
                        value={subCategoryCode_Value}
                        onChange={subCategoryCode_changeHandler}
                        options={subCategoryCodeOption}
                        isMulti={true}
                        isSearchable={true}
                        placeholder={"Sub Category Code"}
                        className="last-scan-select-2"
                        styles={customStyles}
                    />
                }
                {
                    subCategoryNameFilter &&
                    <Select
                        value={subCategoryName_Value}
                        onChange={subCategoryName_changeHandler}
                        options={subCategoryNameOption}
                        isMulti={true}
                        isSearchable={true}
                        placeholder={"Sub Category Name"}
                        className="last-scan-select-2"
                        styles={customStyles}
                    />
                }
                {
                    assetEPCFilter &&
                    <BasicTextFields
                        margin={10}
                        name="EPC"
                        placeholder={"EPC"}
                        value={assetEPC_Value}
                        onChangeEvent={assetEPC_changeHandler}
                    />
                }
                {
                    Odoo_TagFilter &&
                    <BasicTextFields
                        margin={10}
                        name="Serial Number"
                        placeholder={"Serial Number"}
                        value={Odoo_Tag_Value}
                        onChangeEvent={Odoo_Tag_changeHandler}
                    />
                }
                {
                    assetStatusFilter &&
                    null
                    // <BasicTextFields
                    //     margin={10}
                    //     name="Asset Status"
                    //     placeholder={"Asset Status"}
                    //     value={assetStatus_Value}
                    //     onChangeEvent={assetStatus_changeHandler}
                    // />
                }
                {
                    creationDateFilter &&
                    <DatePicker
                        value={creationDate_Value}
                        placeholder={"Created Date"}
                        className="input-mat-1"
                        style={{
                            border: '1px solid white',
                            borderRadius: 5,
                            height: 37,
                            marginTop: 10,
                            fontWeight: 'lighter'
                        }}
                        size={'large'}
                        format={"YYYY-MM-DD"}
                        onChange={creationDate_changeHandler}
                    />
                }
                {
                    modificationDateFilter &&
                    <DatePicker
                        value={modificationDate_Value}
                        placeholder={"Modification Date"}
                        className="input-mat-1"
                        style={{
                            border: '1px solid white',
                            borderRadius: 5,
                            height: 37,
                            marginTop: 10,
                            fontWeight: 'lighter'
                        }}
                        size={'large'}
                        format={"YYYY-MM-DD"}
                        onChange={modificationDate_changeHandler}
                    />
                }
            </form>
        </div>
    )
}
