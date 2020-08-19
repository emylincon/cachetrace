var i =0; // Start point
var images = ['static/cache_trace/Slide1.PNG', 'static/cache_trace/Slide2.PNG', 'static/cache_trace/Slide3.PNG', 'static/cache_trace/Slide4.PNG', 'static/cache_trace/Slide5.PNG'];
var time = 3000;

// Change Image
function changeImg(){
    var node = document.querySelector('.slide-node');
    if (node){
        document.slider.src = images[i];

        if(i < images.length - 1){
            i++;
        } else {
        i= 0;
        }
    }
    setTimeout('changeImg()', time);
}

function loading() {
  const load = document.createElement('div');
  load.className = 'ring';
  load.classId = 'ring';
  load.innerHTML = `
    processing<div class='ringer'></div>
  `;
  var display = document.querySelector('.display');
  display.innerHTML = '';
  display.appendChild(load);
}

function unloading(){
    var x;
    x = document.querySelector('.display');
    if (x.innerHTML){
       x.innerHTML = "<img name='slider' class='slide-node' width='100%' height='100%'>";}

}

window.onload = changeImg;


