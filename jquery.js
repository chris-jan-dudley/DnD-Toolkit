// JavaScript Document


//Keeps count of the number of times "Add" is clicked for tracking initiatve
function clickCounter() {
    if(typeof(Storage) !== "undefined") {
        if (localStorage.clickcount) {
            localStorage.clickcount = Number(localStorage.clickcount)+1;
        } else {
            localStorage.clickcount = 1	;
        }
}
}

//Adds a row to the initiative tracker based on user input, and stores the input in local storage
function AddRow()
{
	clickCounter();
	var name = $('#namein').val();
	var init = $('#initin').val();
	var hp = $('#hpin').val();
    $('#myTable').find('tbody').append('<tr><td>'+name+'</td><td>'+init+'</td><td><input class="hptab" type="number" value='+hp+' min="0"></td></tr>').trigger('update');
	localStorage.setItem("entry"+String(localStorage.clickcount)+"name",String(name));
	localStorage.setItem("entry"+String(localStorage.clickcount)+"i",String(init));
	localStorage.setItem("entry"+String(localStorage.clickcount)+"hp",String(hp));

}

//Loads the initiative tracker, and populates it with entries from local storage, if any are present
$(document).ready(function() 
    { 
        $("#myTable").tablesorter(); 
		for (var i=1;i<= Number(localStorage.clickcount);i++){
		var nam = localStorage.getItem("entry"+String(i)+"name");
		var int = localStorage.getItem("entry"+String(i)+"i");
		var hp1 = localStorage.getItem("entry"+String(i)+"hp");
		$('#myTable').find('tbody').append('<tr><td>'+nam+'</td><td>'+int+'</td><td><input class="hptab" type="number" value='+hp1+' min="0"></td></tr>').trigger('update');
		}
    } 
); 

//Clears local storage
 function ClearTab()
 {
	$('#myTable').find("tr:gt(0)").remove(); 
	localStorage.clear();
 }
 

//Tavern Name Nouns
var tavernN = ["King","Queen","Cock","Dwarf","Elf","Orc","Goblin","Hobbit","Giant","Axe","Sword","Mace","Club","Castle","Keep","Tavern","Inn","Demon","Devil","Horse","Stallion","Bear","Hobgoblin","Gnome","Galleon","Cauldron","Lute","Harp","Fiddle","Plough","Silence","Privy","Minstrel","Shite"];
//Tavern Name Adjectives
var tavernA = ["Big","Drunken","Moist","Hearty","Sturdy","Mighty","Dank","Royal","Sticky","Tasty","Towering","Leaky","Little","Noble","Unfortunate","Grim","Magic","Lucky","Smelly","Rowdy","Randy","Spicy","Ploughing","Silent","Oily","Holy"];

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
	

