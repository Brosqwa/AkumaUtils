const { Data } = require("./data.js");
let config = new Data("data/config.json").get();

function onAkuma() {
	let lastln = ChatLib.removeFormatting(Scoreboard.getLines(true)[0]);
	let firstln = ChatLib.removeFormatting(Scoreboard.getTitle());
	return !!lastln.match(/store\.(.+)\.net/) && !!firstln.match(/AkumaMC/);
}

module.exports = (features) => {

	features.forEach(feature => {
		let data = require(`../features/${feature}`);

		data.forEach(trigger => {

			switch(trigger.type) {
				case "none":
					register(trigger.trigger, (event) => {
						if(!onAkuma()) return;
						try {
							trigger.func(event);
						} catch(err) {
							ChatLib.chat(err);
						}
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

					if(trigger.display?.bg_type)
						display.setBackground(trigger.display?.bg_type);
					if(trigger.display?.bg_color)
						display.setBackgroundColor(trigger.display?.bg_color);

					register("tick", () => {
						if(!onAkuma()) return display.setShouldRender(false);
						config = new Data("data/config.json").get();
						if(!config[config_key].enabled)
							return display.setShouldRender(false);
						let x = config[config_key].x || 0;
						let y = config[config_key].y || 0;
						display.setShouldRender(true);
						display.setRenderLoc(x, y);
						display.clearLines()

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