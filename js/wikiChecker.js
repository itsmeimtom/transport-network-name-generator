const wikiUrl = 'https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=1&gsrsearch=';

async function doesItExist(name) {
    console.info(`Checking Existence: ${name}`);
    const wikiJson = await (await fetch(`${wikiUrl}%27${encodeURIComponent(name.toLowerCase())}%27`)).json();
    

    if(wikiJson.query) {
        // console.log(wikiJson.query.pages);
        // if(wikiJson.query.pages.length > 0)
        return true;
    }

    return false;
}

function wikiPrompt() {
    console.info('Prompting for Wiki');
    let confirmation = confirm('A request will be made to en.wikipedia.org each time a name is generated to check whether any entries for it exist.\n\nThis will be remembered until you clear browser data for this site.');

    if(confirmation) {
        console.info('Wiki Allowed');
        wikiCheck = true;
        localStorage.setItem('wiki', 'allowed');
        document.getElementById('wikiButton').style.display = 'none';
    } else {
        console.info('Wiki Cancelled');
    }
}

document.getElementById('wikiButton').onclick = wikiPrompt;

if(localStorage.getItem('wiki' == 'allowed')) {
    document.getElementById('wikiButton').style.display = 'none';
    wikiCheck = true;
}
