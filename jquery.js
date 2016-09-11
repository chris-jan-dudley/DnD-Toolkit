// JavaScript Document

//Adds a row to the initiative tracker based on user input, and stores the input in local storage
function AddRow()
{
	var initName = $('#namein').val();
	var initInit = $('#initin').val();
	var initAC = $('#acin').val();
	var initHP = $('#hpin').val();
	var iAllInfo = initName+'/'+initInit+'/'+initAC+'/'+initHP;
	var key = "entry"+initName;
	localStorage.setItem(key, iAllInfo);
	$('#myTable').find('tbody').append('<tr id='+key+'><td>'+initName+'</td><td>'+initInit+'</td><td><input class="actab" type="number" value='+initAC+'></td><td><input class="hptab" type="number" value='+initHP+' min="0"></td><td><input type="button" class="killButton" onclick="KillPC(\''+key+'\')" value="Kill"></td></tr>').trigger('update');
	$('#namein').text("");
	$('#initin').text("");
	$('#acin').text('');
	$('#hpin').text('');
}

//Loads the initiative tracker, and populates it with entries from local storage, if any are present
$(document).ready(function() 
    { 
        $("#myTable").tablesorter(); 
		for (var i=0;i<localStorage.length;i++){
			var testIfInit = (localStorage.key(i)).slice(0,4);
			if (testIfInit==="entr"){
				var initInfoArr = (localStorage.getItem(localStorage.key(i))).split('/');
				var key = "entry"+initInfoArr[0];
				$('#myTable').find('tbody').append('<tr '+key+'><td>'+initInfoArr[0]+'</td><td>'+initInfoArr[1]+'</td><td><input class="actab" type="number" value='+initInfoArr[2]+'></td><td><input class="hptab" type="number" value='+initInfoArr[3]+' min="0"></td><td><input type="button" class="killButton" onclick="KillPC(\''+key+'\')" value="Kill"></td></tr>').trigger('update');		
		}
    } 
	}
); 

//Clears local storage of Initiatives
 function ClearTab()
 {
	for (var i=0;i< localStorage.length;i++){
			var testIfInit = (localStorage.key(i)).slice(0,4);
			if (testIfInit==="entr"){
				localStorage.removeItem(localStorage.key(i));
			}
	}
	$('#myTable').find("tr:gt(0)").remove();
 }
 
 //Kills a player in the initiative
 function KillPC(pcid)
 {
	var conf = confirm("Are you sure you wish to delete this entry?");
	if(conf){$('#myTable #'+pcid).remove();
	localStorage.removeItem(pcid);}
 }
 
//Tavern Name Nouns
var tavernN = ["King","Queen","Cock","Dwarf","Elf","Orc","Goblin","Hobbit","Giant","Axe","Sword","Mace","Club","Castle","Keep","Tavern","Inn","Demon","Devil","Horse","Stallion","Bear","Hobgoblin","Gnome","Galleon","Cauldron","Lute","Harp","Fiddle","Plough","Silence","Privy","Minstrel","Shite","Shaft","Bow","Arrow","Sloop","Pirate","Crown","Jewel","Lion","Bear","Hawk","Duckling"];

//Tavern Name Adjectives
var tavernA = ["Big","Drunken","Moist","Hearty","Sturdy","Mighty","Dank","Royal","Sticky","Tasty","Towering","Leaky","Little","Noble","Unfortunate","Grim","Magic","Lucky","Smelly","Rowdy","Randy","Spicy","Ploughing","Silent","Oily","Holy","Unholy","Gritty","Naughty","Sneaky","Lusty","Crusty","Pretty","Giddy"];

//Generates a tavern name of form Adjective and Noun
function TavernAN(){
var tavA = tavernA[Math.floor((Math.random() * tavernA.length))];
var tavN = tavernN[Math.floor((Math.random() * tavernN.length))];
$("#tav_name").text("The "+tavA+" "+tavN);	
}

//Generates a tavern name of form Noun and Noun
function TavernNN(){
var tavN1 = tavernN[Math.floor((Math.random() * tavernN.length))];
var tavN2 = tavernN[Math.floor((Math.random() * tavernN.length))];
if (tavN1===tavN2) {
	TavernNN();
} else if(tavN1 === "Tavern" || tavN1 === "Inn" || tavN2 === "Tavern" || tavN2 === "Inn"){
	TavernNN();
} else if(tavN1.length > 5){
	TavernNN();
}else{
$("#tav_name").text("The "+tavN1+" and "+tavN2);
}
}

//Human Male First Names
var humanMaleFirst = ["Kris","Flavius","Alex","Harold","George","Gregory","Percival","Tiber","Reginald","Ainsley","John","Samuel","Samwell","Robert","Brandon","Hodor","Mikhail","Mike","Adam","Nathan","Norbert","Harry","Joshua","Swen","Gary","Grant","Hubert","Aaron","Alfred","Antony","Arden","Augustus","Andrea","Albert","Arthur","Bern","Barney","Bart","Brian","Bob","Benjamin","Benjen","Boris","Bruce","Buck","Bill","Byron"];
//Human Female First Names
var humanFemaleFirst = ["Izzy","Olivia","Elizabeth","Jane","Harriet","Helen","Ursula","Gemma","Katie","Emily","Catelyn","Arya","Sansa","Annabelle","Amy","Amelia","Belle","Belinda","Christina","Daria","Darla","Daisy",""];
//Human Lastt Names
var humanLast = ["Jones","Smith","Taylor","Miller","Stark","Cassel","Gregor","Harris","Harriet","Johnson","Speissen","Mormont","Addleson"];

//NPC Name generator
function NPCGen(){
	var selectedGender = $('#genderSel').val();
		if(selectedGender==="Male")
		{
			var nameF = humanMaleFirst[Math.floor((Math.random() * humanMaleFirst.length))];
			var nameS = humanLast[Math.floor((Math.random() * humanLast.length))];
			$("#npcName").text(nameF+" "+nameS);
		} else if(selectedGender==="Female")
		{
			var nameF = humanFemaleFirst[Math.floor((Math.random() * humanFemaleFirst.length))];
			var nameS = humanLast[Math.floor((Math.random() * humanLast.length))];
			$("#npcName").text(nameF+" "+nameS);
		}
}

//Adds Characters to table
function AddChar()
{
	var cName = $('#charNameIn').val();
	var cClass = $('#charClassIn').val();
	var cRace = $('#charRaceIn').val();
	var cLvl = $('#charLvlIn').val();
	var cAbbr = cName.slice(0,3);
	var cAllInfo = cName+'/'+cClass+'/'+cRace+'/'+cLvl;
	localStorage.setItem("char"+cAbbr, cAllInfo);
	$('#myCharTable').find('tbody').append('<tr><td>'+cName+'</td><td>'+cClass+'</td><td>'+cRace+'</td><td><input class="hptab" type="number" value='+cLvl+' min="0"></td></tr>').trigger('update');
}

//Loads the character table
	$(document).ready(function() 
    { 
        $("#myCharTable").tablesorter(); 
		for (var i=0;i< localStorage.length;i++){
			var testIfChar = (localStorage.key(i)).slice(0,4);
			if (testIfChar==="char"){
				var charInfoArr = (localStorage.getItem(localStorage.key(i))).split('/');
				$('#myCharTable').find('tbody').append('<tr><td>'+charInfoArr[0]+'</td><td>'+charInfoArr[1]+'</td><td>'+charInfoArr[2]+'</td><td><input class="hptab" type="number" value='+charInfoArr[3]+' min="0"></td></tr>').trigger('update');
			}
		}
    }); 
	
//Clears characters from local storage
function ClearChar(){ 
	for (var i=0;i< localStorage.length;i++){
			var testIfChar = (localStorage.key(i)).slice(0,4);
			if (testIfChar==="char"){
				localStorage.removeItem(localStorage.key(i));
			}
	}
	$('#myCharTable').find("tr:gt(0)").remove();
}


