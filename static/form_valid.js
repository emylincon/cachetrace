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

function form_refresh(ems){
    let g ;
    for (g=0; g<ems.length; g++){
        ems[g].style.border =  "";
    }
}

function validate() {
    let messages = [];
    var nor = document.querySelector('#nor');
    var csize = document.querySelector('#csize');
    var zipf = document.querySelector('#zipf');
    var noc = document.querySelector('#noc');
    var upp = {'zipf': 10, 'nor': 200000, 'noc': 50000};

    if (zipf){
        form_refresh([nor, csize, zipf, noc]);

        if (!isFloat(Number(zipf.value)) || zipf.value < 1){
            messages.push('<p><b>zipf value</b> must be float and greater than 1</p>');
            zipf.style.border =  "2px solid #FF6347";
        }

        else if (zipf.value > upp['zipf']){
            messages.push('<p><b>zipf value</b> must be float between 1 and 10</p>');
            zipf.style.border =  "2px solid #FF6347";
        }

        if (!isInt(Number(noc.value))) {
            messages.push('<p><b>No of content</b> must be an integer</p>');
            noc.style.border =  "2px solid #FF6347";
        }
        else if (noc.value > upp['noc']){
            messages.push(`<p><b>No of content</b> must be less than ${upp['noc']}</p>`);
            noc.style.border =  "2px solid #FF6347";
        }
    }

    else{
        form_refresh([nor, csize]);

        let file = document.querySelector('#file');
        if (!file.value){
            messages.push('<p>Please select a CSV FIle or switch to Zipf');
            }
        else{
            messages = messages.concat(verify_file(file.files[0]));
            }

        }


    if (!isInt(Number(nor.value))){
            messages.push('<p><b>No of request</b> must be an integer</p>');
            nor.style.border =  "2px solid #FF6347";

        }
    else if (nor.value > upp['nor']){
            messages.push(`<p><b>No of request</b> must be less than ${upp['nor']}</p>`);
            nor.style.border =  "2px solid #FF6347";
        }

    if (check_csize(csize.value) == false) {
        messages.push( '<p><b>Cache sizes</b> must be an array of integers with length of max 10</p>');
        csize.style.border =  "2px solid #FF6347";

        }

    if (messages.length > 0) {
        errorElement.classList.add('error-form');
        messages.unshift('<h1>WARNING</h1>');
        errorElement.innerHTML = messages.join(' ');
        return false;

    }
    else{
        document.querySelector('#bart').classList.toggle('progress-bar');
        return true;}
}


var change = 0;

function change_form(){
    var form = document.querySelector('.input-fields');
    if (change == 0){
        change = 1;
        form.innerHTML = `<input type='file' onchange="file_label()" class="input" id='file' name='file' value='' placeholder="upload">
        <span onclick='upload_click()' class='upload'><span class="material-icons">add</span>&nbsp;UPLOAD CSV</span>
    <input type='text' class="input" id='nor' name='nor' value='' placeholder="No of Requests" required>
    <input type='text' class="input" id='csize' name='csize' value='' placeholder="Cache Sizes [Comma seperated values | 5, 7]" required>  `;
    }
    else if (change == 1){
        change = 0;
        form.innerHTML = `<input type='text' class="input" id='zipf' name='zipf' value='' placeholder="Zipf" required>
    <input type='text' class="input" id='noc' name='noc' value='' placeholder="No of Content" required>
    <input type='text' class="input" id='nor' name='nor' value='' placeholder="No of Requests" required>
    <input type='text' class="input" id='csize' name='csize' value='' placeholder="Cache Sizes [Comma seperated values | 5, 7]" required>`;
    }

}


function upload_click(){
    document.querySelector('#file').click();
}

function file_size(size){
    var max_size = 1*1024*1024;
    if (size > max_size){return false;}
    else{return true}
}

function check_filename(name){
    var names = name.split('.')
    if (names.slice(-1) == 'csv'){
        return true;
    }
    else{
        return false;
    }
}

function verify_file(file){
    var messages = [];
    if (!file_size(file.size)){
        messages.push('<p>Maximum file limit is 1MB</p>');
    }
    if(!check_filename(file.name)){
        messages.push('<p>Only CSV files are allowed</p>');
    }
    return messages;

}

function file_label(){
    let file = document.querySelector('#file');
    let btn = document.querySelector('.upload');
    if (file.value){
        let messages = verify_file(file.files[0]);
        if (messages.length > 0){
            errorElement.classList.add('error-form');
            messages.unshift('<h1>WARNING</h1>');
            errorElement.innerHTML = messages.join(' ');
        }
        else{
            btn.innerHTML = `<span class="material-icons">text_snippet</span>&nbsp;${file.files[0].name}`;
            btn.style.background = 'white';
            btn.style.color = 'blue';
            errorElement.classList.remove('error-form');
            errorElement.innerHTML = '';
        }



    }

}

function my_warning(){
    var err = document.querySelector('.err-p');
    if (err){
        errorElement.classList.add('error-form');
    }
}

my_warning();