let score = JSON.parse(localStorage.getItem('score'));
        if (score === null){
            score ={
            wins:0,
            losses:0,
            ties:0
            }; 
        };
        
        updateScore();
        let isautoplay = false;
        let intervalId;
        let Autoplay = document.getElementById("Autoplay");
        function autoplay(){            
                // Add event listener to the button
                Autoplay.addEventListener("click", function() {
                // Change the button text content
                Autoplay.textContent = "Stop Autoplay";
                });
            if(!isautoplay){                
                intervalId = setInterval(function(){
                    const PlayerMove = ComputerMove();
                    GamePlay(PlayerMove);
                },1000);
                isautoplay = true;                
            }
            else{
                clearInterval(intervalId);
                isautoplay = false;
            }
        }
        function GamePlay(PlayerMove){
            let result = '';
            const ComputerPick = ComputerMove()
            if(PlayerMove === 'scissors'){
                if(ComputerPick == 'rock'){
                    result = 'You Lose';
                }
                else if(ComputerPick == 'paper'){
                    result = 'You Won';
                }
                else if(ComputerPick == 'scissors'){
                    result = 'Tie';
                }
            }
            else if(PlayerMove === 'paper'){
                if(ComputerPick == 'rock'){
                    result = 'You Won';
                }
                else if(ComputerPick == 'paper'){
                    result = 'Tie';
                }
                else if(ComputerPick == 'scissors'){
                    result = 'You Lose';
                }
            }
            else if(PlayerMove === 'rock'){
                if(ComputerPick == 'rock'){
                    result = 'Tie';
                }
                else if(ComputerPick == 'paper'){
                    result = 'You Lose';
                }
                else if(ComputerPick == 'scissors'){
                    result = 'You Won';
                }
            }
            if(result==='You Won'){
                score.wins += 1;
            }
            else if(result==='You Lose'){
                score.losses += 1;
            }
            else if(result === 'Tie'){
                score.ties += 1;
            }
            localStorage.setItem('score',JSON.stringify(score));
            updateScore();
            document.querySelector('.js-result').innerHTML = result;
            document.querySelector('.js-move').innerHTML = `You <img class="move-icon" src="images/${PlayerMove}-emoji.png" alt="">, Computer <img class="move-icon" src="images/${ComputerPick}-emoji.png" alt="">`
      
        }
         function updateScore(){
            document.querySelector('.js-Score').innerHTML = `wins: ${score.wins}, losses: ${score.losses}, ties: ${score.ties}`
        }
        function ComputerMove(){
            const randomNumber = Math.random();
            let computerPick = '';
            if(randomNumber>=0 && randomNumber<1/3){
                computerPick = 'rock';                        
            }
            else if(randomNumber>=1/3 && randomNumber<2/3){
                computerPick = 'paper';
            }
            else if(randomNumber>=2/3 && randomNumber<1){
                computerPick = 'scissors'
            }
            return computerPick;
        }