async function addLocationToLists() {
    console.info('Fetching Location');
    const ipInfoData = await (await fetch('https://ipinfo.io/json')).json();
    
    if(!ipInfoData || ipInfoData.error) return console.error(ipInfoData);

    if(ipInfoData.city) {
        console.info('We have a city!');
        prefixList.push(ipInfoData.city);
        suffixList.push(ipInfoData.city);
    } else if (ipInfoData.region) {
        console.info('We have a region!');
        suffixList.push(ipInfoData.region);
        suffixList.push(ipInfoData.region);
    } else if (ipInfoData.country) {
        console.info('We have a country!');
        suffixList.push(ipInfoData.country);
        suffixList.push(ipInfoData.country);
    } else {
        console.info('We have no IP location information :(');
    }
}

function locationPrompt() {
    console.info('Prompting for Location');
    let confirmation = confirm('A request will be made to ipinfo.io and your location (city, region or country) will be used when generating the names.');

    if(confirmation) {
        console.info('Location Allowed');
        addLocationToLists();
        document.getElementById('locationButton').style.display = 'none';
    } else {
        console.info('Location Cancelled');
    }
}

document.getElementById('locationButton').onclick = locationPrompt;
