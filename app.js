//jshint esversion:8
document.addEventListener('DOMContentLoaded', ()=>{
    const grid = document.getElementById("grid");
    let w = 5;
    let sq = [];
    const cwd = ('file://'+(window.location.pathname)).replace('index.html', '');
    let types = ['bagel.svg','battery.svg','lollipop.svg' ];
    let wmax = 9;
    const instruction = document.getElementById('instruction');
    
    instruction.innerHTML = "<br>Get three or more items in a row and level up once you pass the 'Score To Beat.' Some levels come with new vending machine goodies! Move vending machine items left, right, up, down or diagonally one step. Start playing now!"
 
   
    const allTypes = ['bagel.svg', 'battery.svg', 'lollipop.svg','doughnut.svg', 'icecream.svg', 'tomato.svg','lollipop2.svg', 'lollipop3.svg','lollipop4.svg', 'egg.svg', 'soda.svg', 'jellybean.svg','jellybean2.svg','jellybean3.svg','jellybean4.svg','orange.svg','chips.svg', 'candycane.svg', 'coin.svg'];
    
    const footer = document.getElementsByClassName('footer')[0];
    const dt = new Date();
    const yr = dt.getFullYear();
    footer.innerHTML ="&copy; Copyright "+yr+". This game was created by Eunice. All rights reserved to Create Sense.<br> <br><a href='https://createsense.ca/'><img src ='1.svg' style='width:30px; height: 30px;'></a>";
    footer.style.fontSize = "22px";
    //create board
    let score = 0;
    let lvl = 1;
    let passingscore = 120;
    let toAdd = 3;

        function assignSrc(base, srcChng, ol){
            for(let x = 0; x < ol.length; x++){
                if(base === x){
                    srcChng.src = ol[x];
                }
            }
        }
        function check(src, ol){
            for(let x = 0; x < ol.length; x++){
                if(src === cwd+ol[x]){
                    return x;
                }
            }
            return -1;
        }
        
        
        function createBoard(){
            // sq = [];
            // grid.innerHTML = '';
            for(let i =0; i< w*w; i++){

                const square = document.createElement('div');
                square.setAttribute('draggable', true);
                let typeRand = Math.floor(Math.random()*types.length);
                square.setAttribute('id', i+':'+typeRand);
                const image = document.createElement('img');
                assignSrc(typeRand, image, types);
                image.style.display = 'inline-flex';
         
                 
                    square.style.width = "20%";
                    square.style.height = "20%";
                    image.style.width = "90%";
                    image.style.height = "90%";
              
                
                square.appendChild(image);
                square.style.textAlign = 'center';
                grid.appendChild(square);
                sq.push(square);
            }
        }
    
        function display(){
            let displayScoreBrd = document.querySelector("div.score > h3");
            let displayLvlBrd = document.querySelector("div.lvl > h3");
            let displayPsscore = document.querySelector("div.passscore > h3");
            displayScoreBrd.innerHTML = "Current Score: "+score;
            displayLvlBrd.innerHTML = "Level: "+lvl;
            displayPsscore.innerHTML = "Score to Beat: "+passingscore;
            if (score >= passingscore){
                if (lvl % 1 === 0){
                    types.push(allTypes[toAdd]);
                    if(toAdd < allTypes.length-1){
                        toAdd++;
                    }
            
                } 
                instruction.innerHTML ='Keep on going!';        
                score = 0; 
                lvl++; 
                passingscore += 10;
                levelUp();
            }
            
        }
       
        levelUp();
        function levelUp(){
            if ((sq.length === 0 || grid.innerHTML === '') && lvl > 1){
                   
                createBoard();
                
            }else 
            if (lvl === 1){
                
                createBoard();
            }
        }
    
    
        let typeDragged; 
        let type2Replace;
        let squareIdBeingDragged;
        let squareIdBeingReplaced;
        
        sq.forEach(square => square.addEventListener('dragstart', dragStart));
        sq.forEach(square => square.addEventListener('dragend', dragEnd));
        sq.forEach(square => square.addEventListener('dragover', dragOver));
        sq.forEach(square => square.addEventListener('dragenter', dragEnter));
        sq.forEach(square => square.addEventListener('dragleave', dragLeave));
        sq.forEach(square => square.addEventListener('drop', dragDrop));
        function dragStart(){
      
            squareIdBeingDragged = (this.id).split(':')[0];
            let chk = this.children[0].src; 
            typeDragged=check(chk, types);
           
    
        }
        function dragEnd(){
        
            let validMoves = [Number(squareIdBeingDragged)-1, Number(squareIdBeingDragged)-w, Number(squareIdBeingDragged)+1, Number(squareIdBeingDragged)+w];
                
            let consider = [Number(squareIdBeingDragged)-w-1, Number(squareIdBeingDragged)-w+1, Number(squareIdBeingDragged)+w-1, Number(squareIdBeingDragged)+w+1];
            let rowOfDragged = Math.floor(squareIdBeingDragged/w)+1;
            let top = createRng(w*(rowOfDragged-1)-w, -1+w*(rowOfDragged-1), 1);
            let bottom = createRng(rowOfDragged*w, (rowOfDragged*w)+w-1, 1);
            consider.forEach(function(el){
                if((top.includes(el) || bottom.includes(el)) && el >= 0){
                    validMoves.push(el);
                }
            });
            let validMove = validMoves.includes(Number(squareIdBeingReplaced));
            
        
            if(validMove && squareIdBeingReplaced ){
       
            }else if((squareIdBeingReplaced && !validMove || squareIdBeingReplaced )){
               
                assignSrc(type2Replace, sq[Number(squareIdBeingReplaced)].children[0], types);
                sq[Number(squareIdBeingReplaced)].setAttribute('id', squareIdBeingReplaced+':'+type2Replace);
                
                assignSrc(typeDragged, sq[Number(squareIdBeingDragged)].children[0], types);
                sq[Number(squareIdBeingDragged)].setAttribute('id', squareIdBeingDragged+':'+typeDragged);
            }else{
                assignSrc(type2Replace, sq[Number(squareIdBeingReplaced)].children[0], types);
                sq[Number(squareIdBeingReplaced)].setAttribute('id', squareIdBeingReplaced+':'+type2Replace);
            }
            // point = false;
        }
        function dragOver(e){
            e.preventDefault();
          
        }
        function dragEnter(e){
            e.preventDefault();
            
        }
        function dragLeave(){
     
        }
        function dragDrop(e){
            
            let chk = this.children[0].src; 
            type2Replace= check(chk,types);
            squareIdBeingReplaced = (this.id).split(":")[0];

            assignSrc(typeDragged, sq[Number(squareIdBeingReplaced)].children[0], types);
            sq[Number(squareIdBeingReplaced)].setAttribute('id', squareIdBeingReplaced+':'+typeDragged);
            
            assignSrc(type2Replace, sq[Number(squareIdBeingDragged)].children[0], types);
            sq[Number(squareIdBeingDragged)].setAttribute('id', squareIdBeingDragged+':'+type2Replace);
            
           
        }
        function moveDown(){
            for(let j = 0; j < sq.length-w-1; j++){
                if(sq[j+w].id.split(':')[1] === ''){
                    let t = sq[j].id.split(':')[1];
                    sq[j+w].setAttribute('id', (j+w)+':'+t);
                    assignSrc(t, sq[j+w].children[0], types);   
                    sq[j].children[0].src = '';
                    sq[j].setAttribute('id', (j)+":");
                }
            }
        }
        function replaceBlank(){
            for(let j = 0; j < sq.length; j++){
                if(sq[j].id.split(':')[1] ===''){
                    let typeRand = Math.floor(Math.random()*types.length);
                    sq[j].setAttribute('id', j+':'+typeRand);
                    assignSrc(typeRand, sq[j].children[0], types);
                }
            }        
        }
        function checkRowN(){
            for(let rw = w; rw >= 3; rw--){
                for (let j = 0; j < sq.length-rw+1;  j++){
                    let rowOfN=createRng(j, j+rw-1, 1);
                    let selectedType = (sq[j].id.split(':')[1]);
                    let notvalid = [];
                    for(let x = 0; x <= sq.length; x++){
                        for(let o = 1; o < rw; o++){
                            notvalid.push(x-o);
                        }
                        x+=(w-1);
                    }
                    if(notvalid.includes(j)) continue;
                    if(rowOfN.every(index => sq[index].id.split(':')[1] === selectedType && sq[index].id.split(':')[1] !== '')){
                        if (selectedType > 3){
                            score += rw + (selectedType - 3)*2;
                        }
                        score += rw;
                        rowOfN.forEach(idx => {
                            sq[idx].children[0].src = '';
                            sq[idx].setAttribute('id', (sq[idx].id.split(':')[0])+":");
                        
                        });
                    }
                    
                }
            }
        }
        function checkColumnN(){
            for(let co = w; co >= 3; co--){
                for (let j = 0; j < sq.length-((co-1)*w);  j++){
                    let colOfN =createRng(j, j+((co-1)*w), w);
                    let selectedType = (sq[j].id.split(':')[1]);
                    const isBlank ='';
                    if(colOfN.every(index => sq[index].id.split(':')[1] === selectedType && sq[index].id.split(':')[1] !== isBlank)){
                        score += co;
                        if (selectedType > 3){
                            score += co + (selectedType - 3)*2;
                        }
                       
                        colOfN.forEach(idx => {
                            sq[idx].children[0].src = '';
                            sq[idx].setAttribute('id', (sq[idx].id.split(':')[0])+":");
                            
                        });
                    }
                    
                }
            }
        }
        function checkDgLN(){
            for(let da = w; da >= 3; da--){
                for (let j = 0; j <= (sq.length-1-((w+1)*(da-1))); j++){
                    let dglOfN = createRng(j,j+(w+1)*(da-1), (w+1));
                    let selectedType = (sq[j].id.split(':')[1]);
                    if(dglOfN.every(index => sq[index].id.split(':')[1] === selectedType && sq[index].id.split(':')[1] !== '')){
                        score += da;
                        if (selectedType > 3){
                            score += da + (selectedType - 3)*2;
                        }
                       
                        dglOfN.forEach(idx => {
                            sq[idx].children[0].src = '';
                            sq[idx].setAttribute('id', (sq[idx].id.split(':')[0])+":");
                        });
                    }
                    
                }
            }
        }
        function checkDgRN(){
            
            for(let da = w; da >= 3; da--){
                for (let j = 0; j <= (w-1)+(w)*(w-da);  j++){
                    let darOfN =createRng(j, j+((da-1)*(w-1)), (w-1));
                    let selectedType = (sq[j].id.split(':')[1]);
                    const isBlank ='';
                    if(darOfN.every(index => sq[index].id.split(':')[1] === selectedType && sq[index].id.split(':')[1] !== isBlank)){
                        score += da;
                        if (selectedType > 3){
                            score += da + (selectedType - 3)*2;
                        }
                       
                        darOfN.forEach(idx => {
                            sq[idx].children[0].src = '';
                            sq[idx].setAttribute('id', (sq[idx].id.split(':')[0])+":");
                            
                        });
                    }
                    
                }
            }
        }
        function createRng(start, end, incr) {
            let retArray = [];
            for(let x = start; x <= end; x){
                retArray.push(x);
                x+=incr;
            }
            return retArray;
        }
    
    setInterval(function(){
        replaceBlank();
        display();
        moveDown();
        checkRowN();
        checkColumnN();
        checkDgLN();
        checkDgRN();
    }, 50);


});
