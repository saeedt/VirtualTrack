$(document).ready(function() {
	configure();
});
var result = new Object();	
var activeCar;
function configure() {	
	$(".kart").hide();		
	var buffer = [];
	buffer.push('<h4>Choose a car</h4><select id="carcombo" title="Select a car!">');
	buffer.push('<option value ="none" selected disabled hidden>Make a selection</option>');
	for (var key of Object.keys(cars)){
		buffer.push('<option value ="'+ key +'">'+ cars[key].name + '</option>');
	}
	buffer.push('</select>');
	$('#p1').append(buffer.join(''));	
	$('#carcombo').change(function() {
		activeCar = this.value;
		$('#p3').html("");
		$('#p2').html("");
		$('#results').html("");
		$('#p2').append('<h4>Car Information</h4>Car Name: '+cars[this.value].name
				+'<br> Weight: '+cars[this.value].weight+'g');	
		$(".kart").hide();
		$('#'+activeCar).show();
		var startPos = $('#'+activeCar).width();
		TweenLite.set($('#'+activeCar), {x:-startPos-250});		
		TweenMax.staggerTo($('#'+activeCar), 1, {x:80-startPos}, 0.3, showStart);		
		});
}
function showStart(){
	$('#p3').append("<h4>race</h4><button id='start' title='Start the race!' onclick='race()'>Start the race!</button>");
				
	}
function race() {
	$('#results').html("");
	$('#start').prop('disabled', true);
	var finish = $("#container").width() - $('#'+activeCar).width();
	result.t1 = cars[activeCar].m1+ (3-(4*Math.random()))*cars[activeCar].s1;
	result.t2 = cars[activeCar].m2+ (3-(4*Math.random()))*cars[activeCar].s2;
	var speed = 1 + Math.random() * 3;
	TweenLite.to($('#'+activeCar),result.t2,{x:finish,ease:Cubic.easeInOut,onComplete:dispres});	
}

function dispres() {	
	$('#start').prop('disabled', false);
	document.getElementById('start').innerText = 'Repeat the race!';
	document.getElementById('start').onclick = repeatRace;
	$('#results').append("<h4>Results</h4>10' Checkpoint Time : "+result.t1.toFixed(3)
	+" Sec.</br>13' Checkpoint Time : "+result.t2.toFixed(3)+" Sec.");
	}

function repeatRace() {	
	$('#results').html("");
	$('#start').prop('disabled', true);
	var startPos = $('#'+activeCar).width();
	TweenLite.set($('#'+activeCar), {x:-startPos-250});		
	TweenMax.staggerTo($('#'+activeCar), 1, {x:80-startPos}, 0.3, race);		
}