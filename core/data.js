class Data {
	constructor(path) {
		this.path = `./config/ChatTriggers/modules/AkumaUtils/${path}`;
	}

	get() {
		let _obj = JSON.parse(FileLib.read(this.path));
		return new Proxy(_obj, {
			set: (obj, key, newval) => {

				obj[key] = newval;
				//ChatLib.chat(`§2[${this._path}] §a${key} §2-> §a${newval}`);
                FileLib.write(this.path, JSON.stringify(obj, true, 4));
			}
		}) 
	}
}

module.exports = {
	Data
}