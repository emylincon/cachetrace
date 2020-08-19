const zipf = document.querySelector('#zipf');
const nor = document.querySelector('#nor');
const noc = document.querySelector('#noc');
const csize = document.querySelector('#csize');
const errorElement  = document.querySelector('.error');

function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}

function isInt(n){
    return Number(n) === n && n % 1 === 0;
}
function check_array(mylist){
    let q;
    for (q=0;q<mylist.length;q++){
        if (isInt(mylist[q]) == false){
            return false;
        }
    }
    return true;
}
function check_csize(mylist){
    try{
        var mylist = JSON.parse(mylist);}
    catch(err){
        return false
    }
    if(Array.isArray(mylist) == false){
        return false;
    }
    else if (mylist.length >10){
        return false;
    }
    else if (check_array(mylist) == false){
        return false;
    }
    else{
        return true;
    }
}

function validate() {
    let messages = [];
    if (!isFloat(Number(zipf.value)) || zipf.value < 1){
        messages.push('<p><b>zipf value</b> must be float and greater than 1</p>');
    }
    if (!isInt(Number(nor.value))){
        messages.push('<p><b>No of request</b> must be an integer</p>');

    }
    if (!isInt(Number(noc.value))) {
        messages.push('<p><b>No of content</b> must be an integer</p>');

    }

    if (check_csize(csize.value) == false) {
    messages.push( '<p><b>Cache sizes</b> must be an array of integers with length of max 10</p>');

    }

    if (messages.length > 0) {
    errorElement.classList.toggle('error-form')
    messages.unshift('<h1>WARNING</h1>');
    errorElement.innerHTML = messages.join(' ')
    return false;

    }
    else{
        loading();
        return true;}
}
