var skills = document.getElementsByClassName('skill');
var left = document.getElementsByClassName('left');
var right = document.getElementsByClassName('right');

var startSkill = function() {
	for(var i=0;i<skills-1;i++){
		skills[i].addEventListener('mouseover',function(){
			event.target.className += "rightcircle"
		},true)
	}
}




