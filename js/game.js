class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
            if (gameState === 0) {
                player = new Player();
                var playerCountRef = await database.ref('playerCount').once("value");
                if (playerCountRef.exists()) {
                    playerCount = playerCountRef.val();
                    player.getCount();
                }
                form = new Form()
                form.display();
            }
    player1 = createSprite(200,500);
    player1.addImage("player1",player_img);
    
    player2 = createSprite(800,500);
    player2.addImage("player2", player_img);
    players=[player1,player2];

        }
    
    play(){
        
        form.hide();
        
        Player.getPlayerInfo();
        image(back_img, 0, 0, 1000, 800);
        fill("blue")
        textSize(20)
        text("First one to score 20 will be the winner!!",280,50)
        //var x =100;
        //var y=200;
        var x,y;
        var index =0;
        var disp_name=0;
        drawSprites();
        this.spawnFruits();

        for(var plr in allPlayers){
            textSize(20)
            fill("white")
            disp_name += 50
        text(allPlayers[plr].name + " : "+ allPlayers[plr].score,50,disp_name)

            index = index+1;
            x = 500-allPlayers[plr].distance;
            y=500;
           // console.log(x)
            //console.log(players);

            players[index-1].x = x;
            players[index-1].y = y;
            
            // Differentiate the main player by printing
            // the name of the player on the basket. 
           if(index===player.index){
            textSize(20);
            fill("red")
            text(allPlayers[plr].name,x-40,530)
           }

           if(allPlayers[plr].score===20){
            gameState = 3
           }
        }

        if(keyDown(RIGHT_ARROW)){
            player.distance -= 5;
            player.update();
        }
        if(keyDown(LEFT_ARROW)){
            player.distance += 5;
            player.update();
        }
        
        // Give movements for the players using arrow keys

        for (var i = 0; i < fruitGroup.length; i++) {
            if (fruitGroup.get(i).isTouching(players[player.index-1])) {
                fruitGroup.get(i).destroy();
                player.score =player.score+1;
                player.update();
                
            }
            
        }
        // Create and spawn fruits randomly
    }

    end(){
       console.log("Game Ended");
    }

    leaderboard(){
        form.hide();
        strokeWeight(3)
        stroke("red")
        fill("White")
        textSize(45)
        text("And the winner is !!",200,100)
        Player.getPlayerInfo();
        textSize(75)
        for(var plr in allPlayers){
            if(allPlayers[plr].score >= 10 ){
                text(allPlayers[plr].name,300,250);
            }
        }
    }

     spawnFruits(){
        if(frameCount%100===0){
          var rand=Math.round(random(20,980));
          var fruits=createSprite(rand,-20)
          var randFruit=Math.round(random(1,5));
          switch(randFruit){
            case 1: fruits.addImage(fruit1_img);
            break;
            case 2: fruits.addImage(fruit2_img);
            break;
            case 3: fruits.addImage(fruit3_img);
            break;
            case 4: fruits.addImage(fruit4_img);
            break;
            case 5: fruits.addImage(fruit5_img);
            break;
            default : break;
          }
          
          fruits.velocityY=2;
       fruits.lifetime=600;
       fruitGroup.add(fruits);
        }
    }
}