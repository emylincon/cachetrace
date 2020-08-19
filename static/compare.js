function getrows(size, amt){
    let charts = [];
    let table = "<table class='tab'>";
    let no = Math.ceil(size/amt);
    let k, j;
    var start, stop;
    start = 0; stop = 0;
    var w = 100/amt;
    var h = Math.floor(100/no);
    for (k=0;k<no;k++){
        table += '<tr style="width:100%">';
            for (j=start;j<amt+stop;j++){
                table += `<td style="width: ${w}%; height: ${h}%; border: 1px solid white;"><canvas id="myChart${j}" width="90%" height="80%"></canvas></td>`;
                charts.unshift(`myChart${j}`);
            }
        start += amt; stop += amt;
        table += '</tr>';
    }
    table += '</table>';
    console.log('before -> '+ table);
    return [table, charts]
}

function createTable(size){
    var goat = document.querySelector('.board');
    var table;
    var charts;
    if(size<5){
        [table, charts] = getrows(size, size);
    }
    else if (size%5==0){
        [table, charts] = getrows(size, 5);
    }
    else if (size%4==0){
        [table, charts] = getrows(size, 4);
    }
    else if (size%3==0){
        [table, charts] = getrows(size, 3);
    }
    else if (size%7==0){
        [table, charts] = getrows(size, 4);
    }
    console.log(table);
    goat.innerHTML = table;
    return charts;
}

function drawChart(mchart, title, labs, mydata){

    var ctx = document.getElementById(mchart).getContext('2d');
    var bgc = [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(0,255,0 ,0.2)',
                    'rgba(50,205,193, 0.2)',
                    'rgba(29,90,126, 0.2)',
                    'rgba(35,12,48, 0.2)'
                ];
    var bc = [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(0,255,0 ,1)',
                    'rgba(50,205,193, 1)',
                    'rgba(29,90,126, 1)',
                    'rgba(35,12,48, 1)'
                ];
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labs,
            datasets: [{
                label: title,
                data: mydata,
                backgroundColor: bgc.slice(0, labs.length),
                borderColor: bc.slice(0, labs.length),
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

function display_result(){
    var chts = createTable(result.length);
    var l = chts.length;
    let t;
    while (l>0){
        t = l-1;
        console.log(chts[t]);
        drawChart(chts[t], result[t].title, result[t].labels, result[t].dataset);  //(mchart, title, labs, data)
        l--;
    }

}

display_result();