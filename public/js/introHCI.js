'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);
}

$("#introHCI.js").click(function(e) {

	$.get("/project/", addProjectDetails);
})

$("#colorBtn").click(function(e) {
	$.get("/palette", randomizeColors);
	console.log()	
})

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
	// Prevent following the link
	e.preventDefault();

	// Get the div ID, e.g., "project3"
	var projectID = $(this).closest('.project').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = projectID.substr('project'.length);
	$.get("/project/" + idNumber, callProject);

	console.log("User clicked on project " + idNumber);
}

function callProject(result) {
	
	
	var divToReplace = "#project" + result.id
	var parent = $(".container").find(divToReplace).find(".details")
	

	var projectHTML = '<a href="#" class="thumbnail">' +
    '<img src="' + result['image'] + '" class="detailsImage">' +
    '<p>' + result['title'] + '</p>' +
    '<p><small>' + result['date'] +
    '</small></p></a>'; 

	parent.html(projectHTML)
}

/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(result) {
	var colors = result['colors']["hex"]
	console.log(colors)
	console.log(colors[2])
	$('body').css('background-color', colors[0]);
$('.thumbnail').css('background-color', colors[1]);
$('h1, h2, h3, h4, h5, h5').css('color', colors[2]);
$('p').css('color', colors[3]);
$('.project img').css('opacity', .75);
}