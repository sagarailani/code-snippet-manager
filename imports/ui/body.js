import { Template } from 'meteor/templating';

import { Mongo } from 'meteor/mongo';

import { Meteor } from 'meteor/meteor';
 
import './body.html';

import { Codes } from '../api/operations.js';

Template.body.onCreated(() => {
	Meteor.subscribe('codes_data');
});


Template.body.helpers({

	getCodes() {
		return Codes.find({});
	}

});

Template.body.events({

	'submit .save'(event) {

		//Prevent Default browser form submit
		event.preventDefault();

		const target = event.target; // Here the element on which the event is set, is fetched
		const code = target.snippet.value; // here the value of textarea is extracted
		const filename = target.title.value;
		const folder = target.folder.value;

		let obj = {
			text: code,
			filename: filename,
			foldername: folder
		};
		Meteor.call('insert_code',obj);
	},

	'click .getFileContent'(event) {
		const filename = event.target.childNodes[1].nodeValue;			
		let text = Codes.findOne({'filename': filename});
		console.log(text);
		document.getElementById("text").innerText = text.code;
	}

});