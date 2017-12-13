/*
Simple jQuery Slideshow
Author: Chris Skinner
Website: http://www.chrisskinner.co

-- Expand the slideshow by just adding new img tags in slideshow.html

--	As long as the next and previous slideshow buttons have the id's of 'next' and 'prev', respectively, you can change them to what ever you like. img, span, div button or otherwise.

-- To stop the automatic slideshow comment or out or remove setInterval(function(){moveImg()}, 4000);

*/

$(document).ready(function() {
		
		// get the total number of images
		var images = $('#photos img');

		// set up list that will display the dots based on number of images
		var output = '<ul id="dots">';

		// create dots while adding classes to both the dots list and the images
		for (var i = 0; i < images.length; i++) {
			// if its the first item 
			if (i === 0) {

				// add a class of current to the image and selected to the dots list + numeric class so we can link the dots list and images 
				$('#photos img').eq(i).addClass('current 1');
				output += '<li class="selected 1">';

			} else {

				// else just add numeric class
				$('#photos img').eq(i).addClass(i);
				output += '<li class="'+[i+1]+'">';
			}

			// close out the list item
			output += '</li>';
		}

		// end list
		output += '</ul>';

		// add the list below the images
		$('#photos').after(output);

		// set up the listeners for button and dot clicks
		$('#next').click(newImg);
		$('#prev').click(newImg);
		$('#dots li').click(selectImg);

		// timer fade - currently set to 4 seconds
		setInterval(function(){moveImg()}, 4000);
	});
	
	function selectImg() {
		
		// remove the selected class
		$('#dots li.selected').removeClass('selected');

		// grab the remaining class - which in this case is a numeric value
		var q = this.className;

		// match 0 based array but decrementing numeric value
		q--;

		// set the current photo and dot
		var oCurPhoto = $('#photos img.current');
		var oNxtPhoto = $('#photos img').eq(q);


		// add the class selected to the new dot
		$(this).addClass('selected');

		// remove the current class from the current image and add animation
		oCurPhoto.removeClass('current').addClass('previous');
		oNxtPhoto.css({opacity: 0.0}).addClass('current').animate({opacity: 1.0}, 1000,
			function(){
				oCurPhoto.removeClass('previous');
			});

	}

	function newImg() {
		
		// Get the id of the button that was pushed - this way we only use one function with conditional statements  
		var oChangePhoto = this.id;

		var oCurDot = $('#dots li.selected').removeClass('selected');
		var oCurPhoto = $('#photos img.current');

		// depending on button pushed show next / previous image and change dot class
		if (oChangePhoto == 'next') {
			
			// set the next photo and dot items to the next in the list
			var oNxtPhoto = oCurPhoto.next();
			var oNxtDot = oCurDot.next();

			// if there are no more list items go to the first
			if (oNxtPhoto.length == 0) {
				oNxtPhoto = $('#photos img:first');
				oNxtDot = $('#dots li:first');
			}

		} else if (oChangePhoto == 'prev') {

			// set the next photo and dot items to the previous in the list
			var oNxtPhoto = oCurPhoto.prev();
			var oNxtDot = oCurDot.prev();
			if (oNxtPhoto.length == 0) {

				// if there are no more list items go to the last item
				oNxtPhoto = $('#photos img:last');
				oNxtDot = $('#dots li:last');
			}
		};
		
		// add the class selected to the new dot
		oNxtDot.addClass('selected');

		// remove the current class from the current image and add animation
		oCurPhoto.removeClass('current').addClass('previous');
		oNxtPhoto.css({opacity: 0.0}).addClass('current').animate({opacity: 1.0}, 1000,
			function(){
				oCurPhoto.removeClass('previous');
			});
	}

	function moveImg(){
		var oCurDot = $('#dots li.selected').removeClass('selected');
		var oCurPhoto = $('#photos img.current');
		var oNxtPhoto = oCurPhoto.next();
		var oNxtDot = oCurDot.next();
		if (oNxtPhoto.length == 0) {
			oNxtPhoto = $('#photos img:first');
			oNxtDot = $('#dots li:first');
		}
		oNxtDot.addClass('selected');
		oCurPhoto.removeClass('current').addClass('previous');
		oNxtPhoto.css({opacity: 0.0}).addClass('current').animate({opacity: 1.0}, 1000,
			function(){
				oCurPhoto.removeClass('previous');
			});
	}
