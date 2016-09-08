// JavaScript Document

function AddRow()
{
	var name = $('#namein').val();
	var init = $('#initin').val();
	var hp = $('#hpin').val();
    $('#myTable').find('tbody').append('<tr><td>'+name+'</td><td>'+init+'</td><td><input class="hptab" type="number" value='+hp+'></td></tr>').trigger('update');
}

$(document).ready(function() 
    { 
        $("#myTable").tablesorter(); 
    } 
); 

 function ClearTab()
 {
	$('#myTable').find("tr:gt(0)").remove(); 
 }
	

