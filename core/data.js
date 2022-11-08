class Data {
	constructor(path) {
		this.path = `./config/ChatTriggers/modules/Project/${path}`;
		this.object = JSON.parse(
			FileLib.read(this.path)
		);
		return this.get();
	}

	get() {
		return new Proxy(this.object, {
			set: (obj, key, newval) => {

				obj[key] = newval;
                FileLib.write(this.path, JSON.stringify(obj, true, 4));
			}
		}) 
	}
}

module.exports = {
	Data
}