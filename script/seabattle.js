'use strict'

var l = console.log,
	gameStarted = false,
	boots = [4, 3, 2, 1],
	compField = document.querySelector('table[data-name="computer"]'),	
	playerField = document.querySelector('table[data-name="player"]');


placeBoats(compField);
placeBoats(playerField, 1);


function placeBoats(field, show){
	// arrange boats at playground 

		//copy of boats arr
		var thisBoats = boots.slice().reverse(),

			//max length of boat
			currentLength = thisBoats.length,
			
			//maxRow
			maxRow = field.rows.length, 

			//maxCell
			maxCell = field.rows[0].cells.length,

			//boat positions
			boatsPosition = {},

			//live boats
			boatsLive = [];


		//available td
		var	available = {};
		[].forEach.call(field.querySelectorAll('td'), td => {
			var num = +('' + (td.parentElement.sectionRowIndex + 1) + (td.cellIndex + 1))
			available[ num ] = true;
		});
		//l(available)


		for(var i = 0; i < thisBoats.length; i++){
			var count = thisBoats[i];

			for(var j = 0; j < count; j++){
				placeBoat(currentLength);
			}

			currentLength--
		}

		//if not correct positions
		if(boatsPosition[NaN]){
			placeBoats.apply(null, [].slice.call(arguments))
			return
		}

	////////////////////////////////	


	//add eventlisteners
	
		if(!show){ // no click on player field

			field.addEventListener('click', (e) => {
				var td = e.target;

				if(td.nodeName != 'TD') return
				if(td.classList.contains('open')) return	


				td.classList.add('open');

				if(checkTd(td)){
					td.classList.add('dead-boat');
				} else {
					td.classList.add('no-boat');
				}

				l(boatsLive.length);
			})

		}

	////////////////////////////////	




	//if show flag => show boats
	if(show) showAll()




	function placeBoat(length){
		var groups = [];

		while(groups.length == 0){
			//get num from available tds
			var num = +Object.keys(available)[ Math.round(Math.random() * (Object.keys(available).length - 1)) ];

			//create avalible position groups
			groups = createGroups(num, length);
		}

		//choose group, place boat, remove from available
		var randomGroupNum = Math.round(Math.random() * (groups.length - 1)),
			group = groups[randomGroupNum];

		group.forEach( num => {
			boatsPosition[num] = true;

			var row = +num.toString()[0],
				cell = +num.toString()[1];

			//add to live boat
			boatsLive.push(num);


			//make everething around not available
			for(var i = -1 ; i < 2; i++){

				if(row + i < 1) continue

				for(var j = -1; j < 2; j++){

					if(cell + j < 1) continue

					var numForDisable = '' + (row + i) + (cell + j);

					if(available[+numForDisable]) delete available[+numForDisable];
				}
			}
		})




		function createGroups(num, length){
			var horisontalGroups = [],
				verticalGroups = [],
				numRow = +num.toString()[0],
				numCell = +num.toString()[1];

			if(length == 1){
				return [[num]]
			}

			//horisontal
			horisontalMarker : for(var i = numRow - (length - 1); i < numRow + (length - 1); i++){
				var group = [];

				if(i > 0 && i < maxRow + 1){

					for(var j = 0; j < length; j++){
						var groupElem = '' + (i + j)+ numCell;
						groupElem = +groupElem;

						//if not available - > continue
						if(!available[groupElem]) continue horisontalMarker

						group.push(groupElem)
					}

				}

				if(group.length == length) horisontalGroups.push(group);
			}

			//vertical
			verticalMarker : for(var i = numCell - (length - 1); i < numCell + (length - 1); i++){
				var group = [];

				if(i > 0 && i < maxCell + 1){
					
					for(var j = 0; j < length; j++){
						var groupElem = '' + numRow + (i+j);
						groupElem = +groupElem;

						//if not available - > continue
						if(!available[groupElem]) continue verticalMarker

						group.push(+groupElem)
					}

				}

				if(group.length == length) verticalGroups.push(group);
			}

			//combine arrays and return
			var allGroups = horisontalGroups.concat(verticalGroups);
			/*
			if(allGroups.length == 0){
				return
			}*/

			return allGroups
		}
	}

	function checkTd(td){
		var num = '' + (td.parentElement.sectionRowIndex + 1) + (td.cellIndex + 1);
		num = +num;
		
		if(boatsPosition[num]){
			boatsLive.splice(boatsLive.indexOf(num), 1);
			return true
		}

		return false
	}

	function showAll(){
		for(var num in boatsPosition){
			var cell = +num.toString()[1] - 1, 
				row = +num.toString()[0] - 1;

			field.rows[row].cells[cell].classList.add('boat-show')	
		}

	}
}


//phase 1
/////////



