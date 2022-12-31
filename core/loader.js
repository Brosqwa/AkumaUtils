const { Data } = require("./data.js");
let config = new Data("data/config.json").get();

function onAkuma() {
	let lastln = ChatLib.removeFormatting(Scoreboard.getLines(true)[0]);
	let firstln = ChatLib.removeFormatting(Scoreboard.getTitle());
	return !!lastln.match(/store\.(.+)\.net/) && !!firstln.match(/AkumaMC/);
}

function noneFn(fn) {
	if(!onAkuma()) return;
	try {
		return fn;
	} catch(err) {
		ChatLib.chat(err);
	}
}

module.exports = (features) => {

	features.forEach(feature => {
		let data = require(`../features/${feature}`);

		data.forEach(trigger => {
			switch(trigger.type) {
				case "none":
					register(trigger.trigger, noneFn(trigger.func));
					break;
				case "display":
					const config_key = feature;

					let x = config[config_key].x || 0;
					let y = config[config_key].y || 0;

					let display = new Display()
						.setRenderLoc(x, y)

					if(trigger.display?.bg_type)
						display.setBackground(trigger.display?.bg_type);
					if(trigger.display?.bg_color)
						display.setBackgroundColor(trigger.display?.bg_color);

					register("step", () => {
						display.clearLines();
						if(!onAkuma() || !config[config_key].enabled) return;

						config = new Data("data/config.json").get();
						let x = config[config_key].x || 0;
						let y = config[config_key].y || 0;

						display.setRenderLoc(x, y);

						let lines = trigger.func();
						display.addLines(lines);
					}).setFps(1)
					break;
					
			}
		})

	})

}