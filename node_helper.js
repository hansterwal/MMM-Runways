'use strict';

/* Magic Mirror
 * Module: MMM-Runways
 *
 * Shows open runways of Schiphol airport
 * MIT Licensed.
 */

const NodeHelper = require('node_helper');
var request = require('request');
var moment = require('moment');

module.exports = NodeHelper.create({

	start: function() {
		this.started = false;
		this.config = null;
	},

	getData: function() {
		var self = this;
		
		let lvnlUrl = this.config.apiBase;
		let dateAsArray = getDateAsArrayString();
		let bodyWithDate = "[" + dateAsArray.join(',') + "]"

		request({
			url: lvnlUrl,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: bodyWithDate
			
			
		}, function (error, response, body) {
			
			if (!error && response.statusCode == 200) {
				self.sendSocketNotification("DATA", body);
				//console.log(body)
			} else {
				
				//console.log(self.name + ": Could not load runways on url:" + lvnlUrl);
			}
		});

		setTimeout(function() { self.getData(); }, this.config.updateInterval);
	},

	socketNotificationReceived: function(notification, payload) {
		var self = this;
		if (notification === 'CONFIG' && self.started == false) {
			self.config = payload;
			self.sendSocketNotification("STARTED", true);
			self.getData();
			self.started = true;
		}
	}
});
function getDateAsArrayString() {
	let d = new Date();
	let dateAsArray = new Array(5);
	dateAsArray[0] = d.getFullYear();
	dateAsArray[1] = d.getMonth() + 1;
	dateAsArray[2] = d.getDate();
	dateAsArray[3] = d.getHours();
	dateAsArray[4] = d.getMinutes();
	return dateAsArray;
}

