
const formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
    // return console.log([year, month, day].join('-'))
}
export const FilterFunction = (params) => {
    let data =
        params?.data?.filter(item =>
            (!params?.filters?.site_Value ? true : params?.filters?.site_Value.find((element => item?.siteId?.site_name.includes(element.label))))
            &&
            (!params?.filters?.zone_Value ? true : params?.filters?.zone_Value.find((element => item?.zoneId?.zone_name.includes(element.label))))
            &&
            (!params?.filters?.department_Value ? true : params?.filters?.department_Value.find((element => item?.departementId?.departement_name.includes(element.label))))
            &&
            (!params?.filters?.assetEPC_Value ? true : item?.asset_EPC.includes(params?.filters?.assetEPC_Value))
            &&
            (!params?.filters?.Odoo_Tag_Value ? true : item?.serialNumber.includes(params?.filters?.Odoo_Tag_Value))
            &&
            (!params?.filters?.ownerName_Value ? true : item?.ownerName.includes(params?.filters?.ownerName_Value))
            &&
            (!params?.filters?.description_Value ? true : item?.description.includes(params?.filters?.description_Value))
            &&
            (!params?.filters?.assetStatus_Value ? true : item?.assetStatus.includes(params?.filters?.assetStatus_Value))
            &&
            (!params?.filters?.createdAt ? true : formatDate(item?.createdAt) >= formatDate(params?.filters?.createdAt) && formatDate(item?.createdAt) <= formatDate(params?.filters?.createdAt))
            &&
            (!params?.filters?.updatedAt ? true : formatDate(item?.updatedAt) >= formatDate(params?.filters?.updatedAt) && formatDate(item?.updatedAt) <= formatDate(params?.filters?.updatedAt))
        )
    return data
}

// { siteFilter,
//     zoneFilter,
//     FilterData = [
//         {
//             siteId: { site_name: "siraj" },
//             zoneId: { zone_name: "siraj_zone" },
//         },
//         {
//             siteId: { site_name: "sirajTwo" },
//             zoneId: { zone_name: "siraj_zoneTwo" },
//         }
//     ],
//     departmentFilter,
//     assetEPCFilter,
//     Odoo_TagFilter,
//     ownerNameFilter,
//     descriptionFilter,
//     assetStatusFilter,
//     creationDateFilter,
//     modificationDateFilter, }