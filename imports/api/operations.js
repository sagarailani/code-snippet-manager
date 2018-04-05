import { Meteor } from 'meteor/meteor';

import { Mongo } from 'meteor/mongo';

import { check } from 'meteor/check';

export const Codes = new Mongo.Collection('codes_data');

if(Meteor.isServer) {

	Meteor.publish('codes_data',() => {
		return Codes.find({
			coder: Meteor.userId()
		});
	});
}


Meteor.methods({

	// Inserting Text into files and saving onto the database
	'insert_code'(obj) {

		Codes.insert({
			code: obj.text,
			filename: obj.filename,
			folder: obj.foldername,
			createdAt: new Date(),
			coder: Meteor.userId(),
			username: Meteor.user().username
		});			
	}


});