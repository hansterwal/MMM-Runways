/* global Module */

/* Magic Mirror
 * Module: MMM-Runways
 *
 * Created by Hans ter Wal
 *
 */
Module.register("MMM-runways",{

	// Default module config.
	defaults: {
		updateInterval: 10 * 60 * 1000, // every 10 minutes
		animationSpeed: 1000,
		apiBase: "https://www.lvnl.nl/umbraco/api/RunwayPlan/Get"
	},

	// Define required scripts.
	getScripts: function() {
		return ["moment.js"];
	},

	// Define required scripts.
	getStyles: function() {
		return ["runways.css","font-awesome5.css"];
	},

	// Define required translations.
	getTranslations: function() {
		return false;
	},

	// Define start sequence.
	start: function() {
		Log.info("Starting module: " + this.name);

		// Set locale.
		moment.locale(config.language);

		this.loaded = false;
		this.sendSocketNotification('CONFIG', this.config);

	},

	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");
		wrapper.className = "dimmed light small";
		wrapper.id ="runways"
		if (!this.loaded) {
			wrapper.innerHTML = this.translate("LOADING");
			
			return wrapper;
		}
		if (!this.runways) {
			wrapper.innerHTML = "No runway data";
			return wrapper;
		}

		wrapper.innerHTML = "<div><span class='icon landing'>" + this.landingRunways.join(', ') + "</div>"
		wrapper.innerHTML += "<div><span class='icon takeoff'>" + this.takeoffRunways.join(', ') + "</div>"

		return wrapper;
	},
	

	/* processData(data)
	 * Uses the received data to set the various values.
	 *
	 * argument data object - 
	 */
	processData: function(data) {

		if (!data ) {
			Log.error(self.name + ": Could not parse data");
			return;
		}

		var msg = JSON.parse(data); // converts it to a JS native object.
		this.runways = msg;
		
		let runwayMap = new Map();
		runwayMap.set("18R","Polderbaan")
		runwayMap.set("36L","Polderbaan")
		runwayMap.set("36C","Zwaneburgbaan")
		runwayMap.set("18C","Zwaneburgbaan")
		runwayMap.set("06","Kaagbaan")
		runwayMap.set("24","Kaagbaan")
		runwayMap.set("18L","Aalsmeerbaan")
		runwayMap.set("36R","Aalsmeerbaan")
		runwayMap.set("09","Buitenveldertbaan")
		runwayMap.set("27","Buitenveldertbaan")
		runwayMap.set("04","Oostbaan")
		runwayMap.set("22","Oostbaan")
		
		this.landingRunways = [runwayMap.get(msg.Landing1.trim()),runwayMap.get(msg.Landing2.trim()),runwayMap.get(msg.Landing3.trim())].filter(function(e){return e});
		this.takeoffRunways = [runwayMap.get(msg.Takeoff1.trim()),runwayMap.get(msg.Takeoff2.trim()),runwayMap.get(msg.Takeoff3.trim())].filter(function(e){return e});
		
		this.loaded = true;
		this.updateDom(this.config.animationSpeed);
	},

	socketNotificationReceived: function(notification, payload) {
    		if (notification === "STARTED") {
				this.updateDom();
			}
			else if (notification === "DATA") {
				this.loaded = true;
				this.processData(payload);
    		}
	} 	
});
