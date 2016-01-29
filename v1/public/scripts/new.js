console.log('Connected');

var charClass = [    
	'Barbarian',
    'Bard',
    'Druid',
    'Monk',
    'Paladin',
    'Ranger',
    'Sorcerer',
    'Warlock'
    ];

var charRace = [
	{name: 'Mountain Dwarf', STR: 2, INT: 0, WIS: 0, DEX: 0, CON: 2, CHR: 0, hp:0, ac:16, movement: 20},
	{name: 'Hill Dwarf', STR: 0, INT: 0, WIS: 1, DEX: 0, CON: 2, CHR: 0, hp:0, ac:16, movement: 20},
	{name: 'High Elf', STR: 0, INT: 1, WIS: 0, DEX: 2, CON: 0, CHR: 0, hp:0, ac:16, movement: 30},
	{name: 'Wood Elf', STR: 0, INT: 0, WIS: 1, DEX: 2, CON: 0, CHR: 0, hp:0, ac:16, movement: 30},
	{name: 'Drow Elf', STR: 0, INT: 0, WIS: 0, DEX: 2, CON: 0, CHR: 1, hp:0, ac:16, movement: 30},
	{name: 'High Elf', STR: 0, INT: 1, WIS: 0, DEX: 2, CON: 0, CHR: 0, hp:0, ac:16, movement: 20},
	{name: 'Halfling (Lightfoot)', STR: 0, INT: 0, WIS: 0, DEX: 2, CON: 0, CHR: 1, hp:0, ac:16, movement: 20},
	{name: 'Halfling (Stout)', STR: 0, INT: 0, WIS: 0, DEX: 2, CON: 1, CHR: 0, hp:0, ac:16, movement: 20},
	{name: 'Human', STR: 1, INT: 1, WIS: 1, DEX: 1, CON: 1, CHR: 1, hp:0, ac:16, movement: 30},
	{name: 'Forest Gnome', STR: 0, INT: 2, WIS: 0, DEX: 1, CON: 2, CHR: 0, hp:0, ac:16, movement: 20},
	{name: 'Rock Gnome', STR: 0, INT: 2, WIS: 0, DEX: 0, CON: 1, CHR: 0, hp:0, ac:16, movement: 20},
	{name: 'Half-Elf', STR: 0, INT: 0, WIS: 0, DEX: 0, CON: 2, CHR: 0, hp:0, ac:16, movement: 30},
	{name: 'Half-Orc', STR: 2, INT: 0, WIS: 0, DEX: 0, CON: 1, CHR: 0, hp:0, ac:16, movement: 30},
	{name: 'Tiefling', STR: 0, INT: 1, WIS: 0, DEX: 0, CON: 2, CHR: 2, hp:0, ac:16, movement: 20},
];

var newTalent = "<div class='row'>"+
				"<div class='fields'>"+
				"<div class='twelve wide field'>"+
					"<label></label>"+
					"<input type='text' placeholder='Talent'>"+
				"</div>"+
				"<div class='three wide field'>"+
					"<label></label>"+
					"<input type='text' placeholder='Modifier'>"+
				"</div>"+
				"</div>"+
			"</div>";
			
function addTalent(talents){
	var talentCount = document.querySelectorAll('.talents').length +1;
	$('#new-talents-container').append(
		"<div class='row'>"+
				"<div class='fields'>"+
				"<div class='twelve wide field'>"+
					"<label></label>"+
					"<input type='text' class='talents' placeholder='Talent' name='character[talent]["+talentCount+"]'>"+
				"</div>"+
				"<div class='three wide field'>"+
					"<label></label>"+
					"<input type='text' placeholder='Modifier'>"+
				"</div>"+
				"</div>"+
			"</div>");
}

var stats = document.querySelectorAll('.stat'),
	nameInput = document.querySelector('#name'),
	raceInput = document.querySelector('#race'),
	classInput = document.querySelector('#class');

function statRoll(){
	var rolls = [];
	var a = Math.floor(Math.random()*6) + 1,
		b = Math.floor(Math.random()*6) + 1,
		c = Math.floor(Math.random()*6) + 1,
		d = Math.floor(Math.random()*6) + 1;
	rolls.push(a,b,c,d);
	var sum = rolls.sort().splice(1).reduce(function(a,b){
		return a + b;
	});
	console.log(sum);
	return sum;
};

function updateStats(rac){
	var x = charRace[rac];
	var statArray = [x.STR,x.INT,x.WIS,x.DEX,x.CON,x.CHR];
	$(stats).removeClass('modified');
	for(var i = 0, len = stats.length; i < len; i++){
		var thisStat = statArray[i];
		if(!$(stats[i]).hasClass('modified') && thisStat > 0){
			stats[i].value = Number(stats[i].value) + thisStat;
			$(stats[i]).addClass('modified');
			console.log('ADDED ' + thisStat, stats[i]);
		} else if(thisStat <= 0){
			$(stats[i]).removeClass('modified');
		} else {
		$(stats).removeClass('modified');
		}	
	}
}


function setStatInputs(rac,cla){
	if(charRace[rac].name === 'Half-Elf'){
		$('#skillMessage').fadeIn();
	} else {
		$('#skillMessage').fadeOut();
	}
	document.querySelector('#baseMovement').value = charRace[rac].movement;

	classInput.value = charClass[cla];
	raceInput.value = charRace[rac].name;
	updateStats(rac);
};

function rollCharacter(){
	for(var i = 0, len = stats.length; i < len; i++){
		stats[i].value = statRoll();
	}
	//var cl = Math.floor(Math.random()*charClass.length);
	//var ra = Math.floor(Math.random()*charRace.length)
	//setStatInputs(ra);

};

function fillDropDowns(){
	for(var i =0, len = charRace.length; i < len; i++){
		$('#race').append(
			'<option value="'+charRace[i].name+'">'+charRace[i].name+'</option>');
	}
	for(var i = 0, len = charClass.length; i < len; i++){
		$('#class').append(
			'<option value="'+charClass[i]+'">'+charClass[i]+'</option>');
	}
}

$('document').ready(function(){
	
	$('#skillMessage').hide();

	$('#add-talent').on('click', function(){
		addTalent();
	});
	
	$('#roll-character').on('click', function(){
		rollCharacter();
	});
	
	$('.basic.test.modal')
	  .modal('setting', 'closable', false)
	  .modal('show')
	;
	
	$('.delete').on('click', function(){
		$('.ui.modal').modal('show');
	});
	

});

