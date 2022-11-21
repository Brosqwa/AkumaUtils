const { TextComponentJSON } = require("./utils/json_text_component.js");
const { Data } = require("./core/data.js");
let config = new Data("data/config.json");

const btnIcon = "§3[§b▬§3]§f§l ";
const cmdIcon = "§5[§d/§5]§f§l ";

function d(b) {
	if(b) return "§atrue";
	return "§cfalse";
}

const close = {
	text: "\n§4✖ §cClose",
	command: "/akumautils exit",
	hover: "§cClick to close"
}
const prev_page = {
	text: "§3« §bGo Back",
	command: "/akumautils config",
	hover: "§bClick to go back"
}

function configPage(key, fn) {
	let _c = config.get();
	let c = Object.entries(_c[key]);

	let ret = [];
	c.forEach(v => {
		switch(v[0]) {
			case "enabled":
				ret.push(`§fEnabled: §b${d(v[1])}`);
				ret.push({
					text: " §aToggle Feature",
					command: `/akumautilsconfig ${key} toggle`,
					hover: "§bClick to toggle feature"
				});
				ret.push(" ");
				break;
			case "x":
				ret.push(`§fDisplay X: §b${v[1]}`);
				ret.push({
					text: " §7Click to change",
					scmd: `/akumautilsconfig ${key} int x `,
					hover: "§7Click to change"
				});
				ret.push(" ");
				break;
			case "y":
				ret.push(`§fDisplay Y: §b${v[1]}`);
				ret.push({
					text: " §7Click to change",
					scmd: `/akumautilsconfig ${key} int y `,
					hover: "§7Click to change"
				});
				ret.push(" ");
				break;
		}
	})
	ret.pop();
	return new TextComponentJSON([
		"",
		`§4§lAkuma§f§lUtils §7- §f Config: ${fn}`,
		" ",
		...ret,
		close,
		prev_page
	]).chain();
}

let cmenu = null;

function cmd(args) {
	if(!args)
		return cmd("main");

	switch(args[0]) {
		case "exit":
			cmenu = null;
			break;
		default:
			cmenu = "main";
			new TextComponentJSON([
				"",
				"§4§lAkuma§f§lUtils §7- §f Main Page",
				" ",
				{
					text: btnIcon + "Configuration",
					command: "/akumautils config",
					hover: "§aClick to open the config"
				},
				{
					text: btnIcon + "Features",
					command: "/akumautils features",
					hover: "§aClick to open the features guide"
				},
				close
			]).setID(5050).chain().send();
	
			break;		
		
		case "config":
			cmenu = "config";
			new TextComponentJSON([
				"",
				"§4§lAkuma§f§lUtils §7- §fConfig",
				" ",
				{
					text: btnIcon + "Key Amount Display",
					command: "/akumautils config:key_amount_display",
					hover: "§bClick to open"
				},
				{
					text: btnIcon + "Lucky Tracker",
					command: "/akumautils config:lucky_tracker",
					hover: "§bClick to open"
				},
				{
					text: btnIcon + "Next Mine Upgrade Display",
					command: "/akumautils config:next_mine_upgrade_display",
					hover: "§bClick to open"
				},
				{
					text: btnIcon + "Pets Display",
					command: "/akumautils config:pets_display",
					hover: "§bClick to open"
				},
				{
					text: btnIcon + "Pickaxe XP Display",
					command: "/akumautils config:pickaxe_xp_display",
					hover: "§bClick to open"
				},
				{
					text: btnIcon + "Player Miner Display",
					command: "/akumautils config:player_miner_display",
					hover: "§bClick to open"
				},
				{
					text: btnIcon + "RPG Ammo Display",
					command: "/akumautils config:rpg_ammo_display",
					hover: "§bClick to open"
				},
				close,
				{
					text: "§3« §bGo Back",
					command: "/akumautils main",
					hover: "§bClick to go back"
				}
			]).setID(5050).chain().send();
			break;
		case "config:key_amount_display":
			cmenu = "config:key_amount_display";
			configPage("key_amount_display", "Key Amount Display").setID(5050).send();
			break;
		case "config:lucky_tracker":
			cmenu = "config:lucky_tracker";
			configPage("lucky_tracker", "Lucky Tracker").setID(5050).send();
			break;
		case "config:next_mine_upgrade_display":
			cmenu = "config:next_mine_upgrade_display";
			configPage("next_mine_upgrade_display", "Next Mine Upgrade Display").setID(5050).send();
			break;
		case "config:pets_display":
			cmenu = "config:pets_display";
			configPage("pets_display", "Pets Display").setID(5050).send();
			break;
		case "config:pickaxe_xp_display":
			cmenu = "config:pickaxe_xp_display";
			configPage("pickaxe_xp_display", "Pickaxe XP Display").setID(5050).send();
			break;
		case "config:player_miner_display":
			cmenu = "config:player_miner_display";
			configPage("player_miner_display", "Player Miner Display").setID(5050).send();
			break;
		case "config:rpg_ammo_display":
			cmenu = "config:rpg_ammo_display";
			configPage("rpg_ammo_display", "RPG Ammo Display").setID(5050).send();
			break;

		case "features":
			cmenu = "features";
			new TextComponentJSON([
				"",
				"§4§lAkuma§f§lUtils §7- §f Features",
				" ",
				"§f§lKey Amount Display",
				" §7Shows the amount of keys you have on each key in /keys",
				" ",
				"§f§lLucky Tracker",
				" §7Tracks everything you get from the Lucky enchant",
				" ",
				"§f§lNext Mine Upgrade Display",
				" §7Shows when your mine will upgrade",
				" ",
				"§f§lPets Display",
				" §7Shows all of the pets in your inventory, if they're active/inactive/recharging and when they'll recharge",
				" ",
				"§f§lPickaxe XP Display",
				" §7Shows how close your pickaxe is to the next level",
				" ",
				"§f§lPlayer Miner Display",
				" §7Shows a timer for the player miner and tells you if it's mining, charging or charged",
				" ",
				"§f§lRPG Ammo Display",
				" §7Shows how much ammo the rpg that you're holding has (hidden if you're not holding an rpg)",
				"",
				close,
				{
					text: "§3« §bGo Back",
					command: "/akumautils main",
					hover: "§bClick to go back"
				}
			]).setID(5050).chain().send();




	}
}
module.exports = { cmd, cc };

function cc(args) {

	let ft = args[0];
	let action = args[1];
	let c = config.get();
	let key;
	let val;

	switch(action) {
		case "toggle":
			c[ft].enabled = !c[ft].enabled;
			FileLib.write("./config/ChatTriggers/modules/AkumaUtils/data/config.json", JSON.stringify(c, true, 4));
			break;
		case "int":
			key = args[2];
			nval = parseFloat(args[3]);
			c[ft][key] = nval;
			FileLib.write("./config/ChatTriggers/modules/AkumaUtils/data/config.json", JSON.stringify(c, true, 4));
			break;
	}
	

}

register("step", () => {
	if(!cmenu) return;
	cmd([cmenu]);
})