function randFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}

let prefixList = prefixes;
let suffixList = suffixes;

const prefixE = document.getElementById('prefix');
const suffixE = document.getElementById('suffix');
const checkE = document.getElementById('doesItExist');
let lastGenerated = 'themetro';

async function generateName() {
    let pre = randFromArray(prefixList);
    let suf = randFromArray(suffixList);

    // make sure we don't get prefix and suffix the same
    if(pre == suf) return generateName();
    // don't make the same one as last time
    if(`${pre}${suf}`.toLowerCase() == lastGenerated) return generateName();
    lastGenerated = `${pre}${suf}`.toLowerCase();

    // randomly downcase prefix
    if(Math.round(Math.random()) == 0) pre = pre.toLowerCase();
    // randomly upcase prefix
    if(Math.random() > 0.7) pre = pre.toUpperCase();

    // pick one side to be bolded 
    if(Math.round(Math.random()) == 0) { 
        prefixE.classList.add('bold');
        suffixE.classList.remove('bold');
    } else {
        prefixE.classList.remove('bold');
        suffixE.classList.add('bold');
    }

    // add dumb circle around non-bolded element
    suffixE.classList.remove('circle');
    prefixE.classList.remove('circle');
    if(Math.round(Math.random()) == 0) document.querySelector('h1#companyName span:not(.bold)').classList.add('circle');

    // random colour
    let r = Math.floor(Math.random()*(5));
    let g = Math.floor(Math.random()*(5));
    let b = Math.floor(Math.random()*(5));
    document.querySelector(':root').style.setProperty('--brand', `#${r}${g}${b}`);

    prefixE.innerText = pre;
    suffixE.innerText = suf;
    document.getElementById('companyName').focus();

    if(wikiCheck) {
        checkE.innerText = `Checking ${pre}${suf}...`;
        let maybeItExists = await doesItExist(pre+suf);
        if(maybeItExists) {
            checkE.innerHTML = `${pre}${suf} <a href="https://en.wikipedia.org/w/index.php?search=${pre}${suf}" target="_blank" rel="noopener noreferrer">might actually exist</a>!`;
        } else {
            checkE.innerHTML = `It doesn\'t look like ${pre}${suf} <a href="https://en.wikipedia.org/w/index.php?search=${pre}${suf}" target="_blank" rel="noopener noreferrer">exists</a> :(`;
        }
    }
}

document.body.onclick = generateName;
document.getElementById('srButton').onclick = generateName;