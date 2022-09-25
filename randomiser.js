function randFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}

const prefixE = document.getElementById('prefix');
const suffixE = document.getElementById('suffix');
let lastGenerated = 'themetro';

function generateName() {
    let pre = randFromArray(prefixes);
    let suf = randFromArray(suffixes);

    // make sure we don't get prefix and suffix the same
    if(pre == suf) return generateName();
    // don't make the same one as last time
    if(`${pre}${suf}`.toLowerCase() == lastGenerated) return generateName();
    lastGenerated = `${pre}${suf}`.toLowerCase();

    // randomly downcase prefix
    if(Math.round(Math.random()) == 0) pre = pre.toLowerCase();

    // pick one side to be bolded 
    if(Math.round(Math.random()) == 0) { 
        prefixE.classList.add('bold');
        suffixE.classList.remove('bold');
    } else {
        prefixE.classList.remove('bold');
        suffixE.classList.add('bold');
    }

    prefixE.innerText = pre;
    suffixE.innerText = suf;
}

document.body.onclick = generateName;