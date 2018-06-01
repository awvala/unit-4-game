// create game object for dynamic function and object calls
var game = {

// global variables within game object
selectedCharacterKey: "",
characterSelected: false,
defenderSelected: false,
enemiesDefeated: 0,
resetToggle: false,

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


}
// End game object

$(document).ready(function() {

    //build nested object calls
    function getDescendantProp (obj, desc) {
        var arr = desc.split('.');
        while (arr.length && (obj = obj[arr.shift()]));
        return obj;
      };

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

        var playerAP = game.selectedPlayer.AP;
        //var playerCAP = game.selectedPlayer.CAP;
        //var oldenemyHP = game.selectedDefender.HP;
        var newenemyHP = game.selectedDefender.HP - game.selectedPlayer.AP;

        var enemyCAP = game.selectedDefender.CAP;
        var newplayerHP = game.selectedPlayer.HP - game.selectedDefender.CAP;

        //calculate enemy hp
        $("#defenderHP").text(newenemyHP);
        //calculate new attack strength
        game.selectedPlayer.AP = game.selectedPlayer.AP + game.selectedPlayer.CAP;

        //calculate playerHP
        game.selectedPlayer.HP = newplayerHP;
        $("#yourHP").text(game.selectedPlayer.HP);
        //evaluate player HP
        //evaluate enemy hp
        //update system messages
        $("#characterAttackMsg").text("You attacked " + game.selectedDefender.Name + " for " + playerAP + " points of damage");
        $("#enemyAttackMsg").text(game.selectedDefender.Name + " attacked you for " + game.selectedDefender.CAP + " points of damage");
    });




});