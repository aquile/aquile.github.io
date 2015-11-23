<!doctype html>
<html>
  <head>
    <title>Getting Started Extension's Popup</title>
    <style>
      body {
		font-family: Verdana;
        min-width: 357px;
        overflow-x: hidden;
      }
    </style>
  </head>
  <body>
	<div id="canvas"><div>
	<script>
		var date = '11/06/2014';
		var canvas = document.getElementById('canvas');
		function daysLeftTo (date) {
			var days = ((new Date(date).getTime() - new Date().getTime()) / 1000 / (24 * 60 * 60));
			var hours = (days - parseInt(days)) * 24;
			var minutes = (hours - parseInt(hours)) * 60;
			var sec = (minutes - parseInt(minutes)) * 60;
			return {
				days: parseInt(days),
				hours: parseInt(hours),
				minutes: parseInt(minutes),
				sec: parseInt(sec)
			};
		}
		
		function updateCanvas() {
			var data = daysLeftTo(date);
			canvas.innerHTML  = 'Дней: <b>' + data.days + '</b> часов: <b>' + data.hours + '</b> минут: <b>' + data.minutes + '</b> секунд: <b>' + data.sec + '</b>';
		}
		
		updateCanvas();
		window.setInterval(updateCanvas, 1000);
	</script>
  </body>
</html>
