let pontszam; let cl; let tomb = []; let p; let current = null; let chosen = []; let end; let time; let i; let shown = false; let ablak; let sec; let min; let first = true;

function start(p,c,t,reload){
    let html = "";
    if (reload){
        document.getElementById("timer").innerHTML = "&nbsp;";
        clearInterval(i);
        i = setInterval(function(){
                sec = (t-((Math.floor(t/60))*60));
                min = (Math.floor(t/60));
                if (min < 10) min = 0 +""+ min;
                if (sec < 10) sec = 0 +""+ sec;
                document.getElementById("timer").innerHTML = min+":"+sec;
                t--;
                document.getElementById("sd").innerHTML = Math.round((pontszam/cl)*10)/10+"";
                console.log(document.getElementById("sd").innerHTML);
                if (t == -1){
                    clearInterval(i);
                    if (cl == 0)  document.getElementById("sd").innerHTML = 0;
                    ablak.showModal();
                }
            }, 1000);
    }
    if (first){
        ablak = createDialog();
        first = false;
        for (let i = 0; i < 6; i++){ tomb[i] = []; for (let j = 0; j < 10; j++){
            tomb[i][j] = 0;
            html += "<img class='none' id='"+i+"x"+j+"' onmouseover='over(\""+i+"\",\""+j+"\")' onclick='katt(\""+i+"\",\""+j+"\");' src='src/box"+tomb[i][j]+".png'>";
        }
    }
    document.getElementById("container").innerHTML = html;
    }
    time = t;
    pontszam = p;
    cl = c;
    end = false;
    document.getElementById("click").innerHTML = cl;
    document.getElementById("score").innerHTML = pontszam;
    for (let i = 0; i < 6; i++){ tomb[i] = []; for (let j = 0; j < 10; j++){
        tomb[i][j] = Math.floor(Math.random()*5+1);
        document.getElementById(i+"x"+j).setAttribute("src","src/box"+tomb[i][j]+".png");
    }
}
}
        
function katt(i, j){
    if(tomb[i][j] != 0 && tomb[i][j] == current){
        p = 0;
        let len = chosen.length-1;
        if (len > 1){
            while (len >= 0){
                document.getElementById(chosen[len]).src = "src/box0.png";
                let index = chosen[len].split("x");
                tomb[index[0]][index[1]] = 0;
                len--;
            }
            pontszam += chosen.length;
        }else{
            while (len >= 0){
                document.getElementById(chosen[len]).setAttribute("class", "red");
                len--;
            }
        }
        drop();
        fill();
        check();
        current = tomb[i][j];
        chosen = [];
        del(i, j);
        cl++;
    }
    document.getElementById("click").innerHTML = cl;
    document.getElementById("score").innerHTML = pontszam;
    //document.getElementById("sd").innerHTML = pontszam/cl;
    if (end) start(pontszam, cl, (min*60)+sec, false);
}

function over(i, j){
    current = tomb[i][j];
    chosen = [];
    for (let ii = 0; ii < 6; ii++){
        for (let jj = 0; jj < 10; jj++){
            if (document.getElementById(ii+"x"+jj).getAttribute("class") == "red"  && tomb[ii][jj] != current) document.getElementById(ii+"x"+jj).setAttribute("class", "none");
        }
    }
    del(i, j);
}

function leave(){
    for (let ii = 0; ii < 6; ii++){ for (let jj = 0; jj < 10; jj++){
            if (document.getElementById(ii+"x"+jj).getAttribute("class") == "red") document.getElementById(ii+"x"+jj).setAttribute("class","none");
        }
    }
}

function del(i, j){
    let ii = i;
    let jj = j;
    if (!(tomb[ii][jj] == current && !chosen.includes(i+"x"+j))) return;
    chosen.push(i+"x"+j);
    if (ii > 0) del(ii-1, j)
    if (jj > 0) del(i, jj-1);
    if (ii < 5) del(ii*1+1, j);
    if (jj < 9) del(i, jj*1+1);
}

function drop(){
    for (let i = 5; i >= 0; i--){ for (let j = 0; j < 10; j++){
           let k = 0;
           let x = i;
           if(tomb[x][j] == 0){
                if (x != 0){
                    while(tomb[x][j] == 0 && x > 0){
                        x--;
                        k++;  
                    }
                }
                tomb[i][j] = tomb[i-k][j];
                document.getElementById(i+"x"+j).src = "src/box"+tomb[i-k][j]+".png";
                tomb[i-k][j] = 0;
                document.getElementById((i-k)+"x"+j).src = "src/box0.png";
            }
        }
    }
}

function fill(){
    for (let i = 5; i >= 0; i--){ for (let j = 0; j < 10; j++){
            if (tomb[i][j] == 0){ 
                let v = Math.floor(Math.random()*5+1);
                tomb[i][j] = v;
                document.getElementById(i+"x"+j).src = "src/box"+v+".png";
            }
        }
    }
}

function check(){
    let n = 0;
    for (let s = 0; s < 6; s++){ for (let o = 0; o < 10; o++){
            current = tomb[s][o];
            chosen = [];
            del(s,o);
            if (chosen.length > 2){
                n++;
            }
        }
    }
    if (n == 0) end = true;
}   

function createDialog(){
    let ablak = document.createElement("dialog");
    ablak.setAttribute("class", "ablak")
    ablak.innerHTML = "Game over!<br>";
    ablak.innerHTML += "S/C: <span id='sd'></span><br>";
    let gomb = document.createElement("input");
    gomb.setAttribute("type", "button");
    gomb.setAttribute("onclick", "start("+0+","+0+","+10+",true)");
    gomb.setAttribute("value", "NEW GAME");
    gomb.addEventListener("click", e => ablak.close());
    ablak.appendChild(gomb);
    document.querySelector("body").appendChild(ablak);
    return ablak;
}