'use strict'

var l = console.log,
	gameStarted = false,
	boots = [4, 3, 2, 1],
	compField = document.querySelector('table[data-name="computer"]'),	
	playerField = document.querySelector('table[data-name="player"]');


placeBoats(compField);
//placeBoats(playerField);


function placeBoats(field){
	
	//copy of boats arr
	var thisBoats = boots.slice().reverse(),

		//max length of boat
		currentLength = thisBoats.length,
		
		//maxRow
		maxRow = field.rows.length, 

		//maxCell
		maxCell = field.rows[0].cells.length;

	//available td
	var	available = {};
	[].forEach.call(field.querySelectorAll('td'), td => {
		var num = +('' + (td.parentElement.sectionRowIndex + 1) + (td.cellIndex + 1))
		available[ num ] = true;
	});


	l(available)


	for(var i = 0; i < thisBoats.length; i++){
		var count = thisBoats[i];

		for(var j = 0; j < count; j++){
			placeBoat(currentLength);
		}

		currentLength--
	}


	function placeBoat(length){
		//get num from available tds
		var num = +Object.keys(available)[ Math.round(Math.random() * (Object.keys(available).length - 1)) ]
		//l(num)
		
		var groups = createGroups(num, length);


		function createGroups(num, length){
			var horisontalGroups = [],
				verticalGroups = [],
				numRow = +num.toString()[0],
				numCell = +num.toString()[1];

			//l(numRow, ' : ', numCell)


			//horisontal
			for(var i = numRow - (length - 1); i < numRow + (length - 1); i++){
				var group = [];

				if(i > 0 && i < maxRow + 1){

					for(var j = 0; j < length; j++){
						var groupElem = '' + (i + j)+ numCell;
						group.push(+groupElem)
					}

				}

				if(group.length == length) horisontalGroups.push(group);
			}

			//vertical
			for(var i = numCell - (length - 1); i < numCell + (length - 1); i++){
				var group = [];

				if(i > 0 && i < maxCell + 1){
					
					for(var j = 0; j < length; j++){
						var groupElem = '' + numRow + (i+j);
						group.push(+groupElem)
					}

				}

				if(group.length == length) verticalGroups.push(group);
			}

			l(horisontalGroups)
		}
	}
}


//phase 1
/////////



