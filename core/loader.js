const { Data } = require("./data.js");
let config = new Data("data/config.json");

module.exports = (features) => {

	features.forEach(feature => {
		let data = require(`../features/${feature}`);

		data.forEach(trigger => {

			ChatLib.chat(
				JSON.stringify(trigger, true, 4)
			)

			switch(trigger.type) {
				case "none":
					register(trigger.trigger, (event) => {
						trigger.func(event);
					})
					break;
				case "display":
					const config_key = trigger.display?.config_key;

					if(trigger.display?.config_key) {
						if(!config[config_key])
							config[config_key] = {
								x: 0,
								y: 0,
								enabled: true
							};
					}

					let x = config[config_key].x || 0;
					let y = config[config_key].y || 0;

					let display = new Display()
						.setRenderLoc(x, y)

					register("tick", () => {
						config = new Data("data/config.json");
						if(!config[config_key].enabled)
							return display.clearLines();
						let x = config[config_key].x || 0;
						let y = config[config_key].y || 0;

						let lines = trigger.func();
						for(let l = 0; l < lines.length; l++) {
							display.setLine(l, lines[l]);
						}
					})
					break;
			}

		})

	})

}