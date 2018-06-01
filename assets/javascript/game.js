// create game object for dynamic function and object calls
var game = {

// global variables within game object
characterSelected: false,
defenderSelected: false,
enemiesDefeated: 0,

// Playable character objects
  Rei: {
    Name: "Rei",
    key: "Rei",
    HP: 120,
    AP: 8,
    CAP: 8, 
    allignment: "Jedi: ",
    imgSrc: "assets/images/jedirei.jpg",
},

  Luke: {
    Name: "Luke Skywalker",
    key: "Luke",
    HP: 100,
    AP: 5,
    CAP: 5, 
    allignment: "Jedi: ",
    imgSrc: "assets/images/lukeskywalker.jpg",
},

 Asajj: {
    Name: "Asajj-Ventress",
    key: "Asajj",
    HP: 150,
    AP: 20,
    CAP: 20, 
    allignment: "Sith: ",
    imgSrc: "assets/images/asajj.jpg",

},

 Maul: {
    Name: "Darth Maul",
    key: "Maul",
    HP: 180,
    AP: 25,
    CAP: 25, 
    allignment: "Sith: ",
    imgSrc: "assets/images/darthmaul.jpg",

},

selectedPlayer: {},
selectedDefender: {},

createYourCharacter: function (playerCharacter) {
    this.selectedPlayer.Name = playerCharacter.Name;
    this.selectedPlayer.key = playerCharacter.key;
    this.selectedPlayer.HP = playerCharacter.HP;
    this.selectedPlayer.AP = playerCharacter.AP;
    this.selectedPlayer.CAP = playerCharacter.CAP;
    this.selectedPlayer.allignment = playerCharacter.allignment;
    this.selectedPlayer.imgSrc = playerCharacter.imgSrc;
    //console.log(this.selectedPlayer);

    //Update html with selectedPlayer object properties
    $("#yourcharacterName").text(this.selectedPlayer.allignment + this.selectedPlayer.Name);
    $("#yourCharImg").attr( {src: this.selectedPlayer.imgSrc, alt: this.selectedPlayer.Name} );
    $("#yourHP").text("HP " + this.selectedPlayer.HP);
    $(".yourChar").css("display", "inline-block"); 
    game.characterSelected = true;

    //Hide selectable characters and show yourCharacter section
    $("#yourCharacter").css("display", "block");
    $("#enemiesAvailable").css("display", "block");
    $("#selectInst").css("display", "none"); 
    $(".selectCharacter").css("display", "none");

    //show remaining characters in enemiesAvailable
    if (this.selectedPlayer.Name !== "Rei") {
        $("#enemyRei").css("display", "inline-block");
        $("#ReiHP").text(game.Rei.HP);
    }

    if (this.selectedPlayer.Name !== "Luke Skywalker") {
        $("#enemyLuke").css("display", "inline-block");
        $("#LukeHP").text(game.Luke.HP);
    }

    if (this.selectedPlayer.Name !== "Asajj-Ventress") {
        $("#enemyAsajj").css("display", "inline-block");
        $("#AsajjHP").text(game.Asajj.HP);
    }

    if (this.selectedPlayer.Name !== "Darth Maul") {
        $("#enemyMaul").css("display", "inline-block");
        $("#MaulHP").text(game.Maul.HP);
    }
},

createDefender: function (enemyCharacter) {
    this.selectedDefender.Name = enemyCharacter.Name;
    this.selectedDefender.key = enemyCharacter.key;
    this.selectedDefender.HP = enemyCharacter.HP;
    this.selectedDefender.CAP = enemyCharacter.CAP;
    this.selectedDefender.allignment = enemyCharacter.allignment;
    this.selectedDefender.imgSrc = enemyCharacter.imgSrc;
    //console.log(this.selectedDefender);

    //Update html with selectedDefender object properties
    
    $("#defenderName").text(this.selectedDefender.allignment + this.selectedDefender.Name);
    $("#defenderImg").attr( {src: this.selectedDefender.imgSrc, alt: this.selectedDefender.Name} );
    $("#defenderHP").text(this.selectedDefender.HP);
    $("#defenderChar").css("display", "inline-block"); 

    //hide selected enemy in enemiesAvailable and show html containers below
    $("#gameMsg").css("display", "none");
    $("#defenderContainer").css("display", "block");
    $("#attackSection").css("display", "block");

    var selectedEnemy = "#enemy"+enemyCharacter.key;
    $(selectedEnemy).css("display", "none");
},

reset: function() {
    //clear global variables and objects
    this.characterSelected = false;
    this.defenderSelected = false;
    this.enemiesDefeated = 0;
    this.selectedPlayer= {};
    this.selectedDefender= {};
    this.characterSelected = false;

    //reset CSS
    $("#yourCharacter").css("display", "none");
    $(".yourChar").css("display", "none");
    $("#enemiesAvailable").css("display", "none");
    $(".enemyChar").css("display", "none");
    $("#attackSection").css("display", "none");
    $("#defenderContainer").css("display", "none");
    $("#defenderChar").css("display", "none");
    $("#resetButton ").css("display", "none");
    $("#characterAttackMsg").css("display", "none").text("");
    $("#enemyAttackMsg").css("display", "none").text("");

    $("#selectInst").css("display", "block"); 
    $(".selectCharacter").css("display", "inline-block");
},

}
// End game object

$(document).ready(function() {

    /*build nested object calls
    function getDescendantProp (obj, desc) {
        var arr = desc.split('.');
        while (arr.length && (obj = obj[arr.shift()]));
        return obj;
      };  Deprecated after moving to objects */

    // Select player character
    $(".selectCharacter").click(function(){
        var playerCharacterSelected = $(this).children("p.characterName").text();

        switch(playerCharacterSelected) {
            case "Jedi: Rei":
                playerCharacter = game.Rei;
                break;

            case "Jedi: Luke Skywalker":
                playerCharacter = game.Luke;
                break;

            case "Sith: Asajj-Ventress":
                playerCharacter = game.Asajj;
                break;

                
            case "Sith: Darth Maul":
                playerCharacter = game.Maul;
                break;       
        }
        
        // Select a defender
        if (game.characterSelected === false) {
            //Create playerCharacter in game object
            game.createYourCharacter(playerCharacter); 
            var bgMusic = document.getElementById('backgroundmusic');
            bgMusic.play();
            bgMusic.volume = 0.5;
            game.characterSelected = true; 
        }             
    });
    // End Select Character on click event

    //Move enemy to defender section
    $(".enemyChar").click(function(){
        var enemySelected = $(this).children("p.characterName").text();

        switch(enemySelected) {
            case "Jedi: Rei":
                enemyCharacter = game.Rei;
                break;

            case "Jedi: Luke Skywalker":
                enemyCharacter = game.Luke;
                break;

            case "Sith: Asajj-Ventress":
                enemyCharacter = game.Asajj;
                break;

                
            case "Sith: Darth Maul":
                enemyCharacter = game.Maul;
                break;       
        }

        if (game.defenderSelected === false) {
            game.createDefender(enemyCharacter);
            game.defenderSelected = true;
        } else {
            $("#gameMsg").css("display", "block").text("You must defeat your current foe first!");
        } 
    });

    // End move enemy to defender

    //Attack button
    $("#attackButton").click(function() {

        var currentEnemyHP = game.selectedDefender.HP;
        var currentPlayerHP = game.selectedPlayer.HP;

        if (currentEnemyHP > 0 && currentPlayerHP >0) {

        //Player Stats
        var playerAP = game.selectedPlayer.AP; 
        game.selectedPlayer.AP = playerAP + game.selectedPlayer.CAP;

        //Enemy status
        var newenemyHP = currentEnemyHP - playerAP;
        game.selectedDefender.HP = newenemyHP;
        var enemyCAP = game.selectedDefender.CAP;

        //Updated Stats
        var newplayerHP = currentPlayerHP - enemyCAP;
        game.selectedPlayer.HP = newplayerHP;

        //Update page
        $("#defenderHP").text(newenemyHP);
        $("#yourHP").text(newplayerHP);

        //Evaluate winning conditions
        if (newplayerHP < 1 ) {
            //If player lost
            $("#gameMsg").css("display", "block").text("You have been defeated...GAME OVER!");
            $("#characterAttackMsg").css("display", "none").text("");
            $("#enemyAttackMsg").css("display", "none").text("");
            $("#resetButton").css("display", "block"); 
        } else if (newenemyHP > 1 ) {  
            //If both players are still above 0 HPs
            $("#gameMsg").css("display", "none");
            $("#characterAttackMsg").css("display", "block").text("You attacked " + game.selectedDefender.Name + " for " + playerAP + " points of damage");
            $("#enemyAttackMsg").css("display", "block").text(game.selectedDefender.Name + " attacked you for " + game.selectedDefender.CAP + " points of damage");
        } else if (newenemyHP < 1 ) {  
            //If enemy is below 0 HPs
            $("#characterAttackMsg").css("display", "none").text("");
            $("#enemyAttackMsg").css("display", "none").text("");
            $("#defenderChar").css("display", "none");
            game.enemiesDefeated++;
                if (game.enemiesDefeated < 3) {
                    //If the player has more enemies to fight
                    $("#gameMsg").css("display", "block").text("You have defeated " + game.selectedDefender.Name + ", choose your next enemy!");
                    game.defenderSelected = false;
                } else {
                    //If the player has defeated all enemies
                    $("#gameMsg").css("display", "block").text("You Won!!!!  GAME OVER!!!");
                    $("#resetButton").css("display", "block");
                }
        }
    } else {
        // if player character or defender character have HP < 1 display error message
        $("#characterAttackMsg").css("display", "none").text("");
        $("#enemyAttackMsg").css("display", "none").text("");
        $("#gameMsg").css("display", "block").text("Don't beat a dead Tauntaun! Select a new foe!");
    }
    });

    // Reset Button
    $("#resetButton").click(function() {
        game.reset();
    });

});