// JavaScript Document

//Adds a row to the initiative tracker based on user input, and stores the input in local storage
function AddRow()
{
	var initName = $('#namein').val();
	var initInit = $('#initin').val();
	var initAC = $('#acin').val();
	var initHP = $('#hpin').val();
	var iAllInfo = "init/"+initName+'/'+initInit+'/'+initAC+'/'+initHP;
	var key = generateUUID();
	localStorage.setItem(key, iAllInfo);
	$('#myTable').find('tbody').append('<tr id='+key+'><td>'+initName+'</td><td>'+initInit+'</td><td><input class="actab" type="number" value='+initAC+'></td><td><input class="hptab" type="number" value='+initHP+' min="0"></td><td><input type="button" class="killButton" onclick="KillPC(\''+key+'\')" value="Kill"></td></tr>').trigger('update');
}

//Loads the initiative tracker, and populates it with entries from local storage, if any are present
$(document).ready(function() 
    { 
        $("#myTable").tablesorter(); 
		for (var i=0;i<localStorage.length;i++){
			var testIfInit = localStorage.getItem((localStorage.key(i))).slice(0,4);
			if (testIfInit==="init"){
				var initInfoArr = (localStorage.getItem(localStorage.key(i))).split('/');
				var key = localStorage.key(i);
				$('#myTable').find('tbody').append('<tr id='+key+'><td>'+initInfoArr[1]+'</td><td>'+initInfoArr[2]+'</td><td><input class="actab" type="number" value='+initInfoArr[3]+'></td><td><input class="hptab" type="number" value='+initInfoArr[4]+' min="0"></td><td><input type="button" class="killButton" onclick="KillPC(\''+key+'\')" value="Kill"></td></tr>').trigger('update');		
		}
    } 
	}); 

//Clears local storage of Initiatives
 function ClearTab()
 {
	var i=0;
	while (i< localStorage.length){
		if(localStorage.key(i)!== null){
			var testIfInit = localStorage.getItem((localStorage.key(i))).slice(0,4);
			if (testIfInit==="init"){
				localStorage.removeItem(localStorage.key(i));
			}else{
				i++;	
			}
		}
	}
	$('#myTable').find("tr:gt(0)").remove();
 }
 
 //Kills a player in the initiative
 function KillPC(pcid)
 {
	var conf = confirm("Are you sure you wish to delete this entry?");
	if(conf){
		var checkKind = localStorage.getItem(pcid).slice(0,4);
		if(checkKind === "init"){
			$('#myTable #'+pcid).remove();
		}else if(checkKind === "char"){
			$('#myCharTable #'+pcid).remove();
		}
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
var humanFemaleFirst = ["Izzy","Olivia","Elizabeth","Jane","Harriet","Helen","Ursula","Gemma","Katie","Emily","Catelyn","Arya","Sansa","Annabelle","Amy","Amelia","Belle","Belinda","Christina","Daria","Darla","Daisy","Emma","Beth","Hilda","Frida","Gemma","Talissa","Arya","Felicity","Rita","June","Jess","Sophie","Sophia","Erica"];
//Human Lastt Names
var humanLast = ["Jones","Smith","Taylor","Miller","Stark","Cassel","Gregor","Harris","Harriet","Johnson","Speissen","Mormont","Addleson","Porter","Kellman","Kirk","Montgomery","Jackson","Johnston","Martin","Tolkien","Wood","Hill","Castle","Townsman","Hamilton","Gregorio","Umbar","Redding"];

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
	var cAllInfo = "char/"+cName+'/'+cClass+'/'+cRace+'/'+cLvl;
	var key = generateUUID();
	localStorage.setItem(key, cAllInfo);
	$('#myCharTable').find('tbody').append('<tr id='+key+'><td>'+cName+'</td><td>'+cClass+'</td><td>'+cRace+'</td><td><input class="hptab" type="number" value='+cLvl+' min="0"></td><td><input type="button" class="killButton" onclick="KillPC(\''+key+'\')" value="Kill"></td></tr>').trigger('update');
}

//Loads the character table
	$(document).ready(function() 
    { 
        $("#myCharTable").tablesorter(); 
		for (var i=0;i< localStorage.length;i++){
			var testIfChar = localStorage.getItem((localStorage.key(i))).slice(0,4);
			if (testIfChar==="char"){
				var charInfoArr = (localStorage.getItem(localStorage.key(i))).split('/');
				var key = localStorage.key(i);
				$('#myCharTable').find('tbody').append('<tr id='+key+'><td>'+charInfoArr[1]+'</td><td>'+charInfoArr[2]+'</td><td>'+charInfoArr[3]+'</td><td><input class="hptab" type="number" value='+charInfoArr[4]+' min="0"></td><td><input type="button" class="killButton" onclick="KillPC(\''+key+'\')" value="Kill"></td></tr>').trigger('update');
			}
		}
    }); 
	
//Clears characters from local storage
function ClearChar(){ 
	var i=0;
	while (i< localStorage.length){
		if(localStorage.key(i)!== null){
			var testIfChar = localStorage.getItem((localStorage.key(i))).slice(0,4);
			if (testIfChar==="char"){
				localStorage.removeItem(localStorage.key(i));
			} else {
				i++;
			}
		}
	}
	$('#myCharTable').find("tr:gt(0)").remove();
}

//Adds all current localstorage items into an array for traversal
function createSearchArray(){
	var searchArray = [];		
	for (var i=0;i<localStorage.length;i++){
		searchArray.push(localStorage.key(i));	
	}
	return searchArray;
}

//Adds characters in the log to the Initiative table (WIP)
function ImportChars(){
	var conf = confirm("Make sure you clear any PCs from the initiative tracker before importing them to avoid duplicates!");
	if(conf){
		var keyArray = createSearchArray();
		for(var i=0;i<keyArray.length;i++){
			var testIfChar = (localStorage.getItem(keyArray[i])).slice(0,4);
			if (testIfChar === "char"){
				var charInfoArr = (localStorage.getItem(keyArray[i])).split('/');
				$('#namein').val(charInfoArr[1]);
				var charInit = prompt("Please enter initiatve for "+charInfoArr[1], "Initiative");
    			if (charInit != null) {
        			$('#initin').val(charInit);
   				}
				var charAC = prompt("Please enter AC for "+charInfoArr[1], "AC");
    			if (charAC != null) {
        			$('#acin').val(charAC);
   				}
				var charHP = prompt("Please enter HP for "+charInfoArr[1], "HP");
    			if (charHP != null) {
        			$('#hpin').val(charHP);
   				}
				AddRow();
			}
		}
	}
}


function generateUUID() {
    var d = new Date().getTime();
    if(window.performance && typeof window.performance.now === "function"){
        d += performance.now();; //use high-precision timer if available
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}