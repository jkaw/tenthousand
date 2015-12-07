
var Assignment = function(){
	this.name;
	this.asset_name;
	this.type;
	this.tiles = [];
	this.contains_tile_size(tile_size) {
		for(i = 0; i < tiles.length; i ++){
			if(tiles[i].get_size() == tile_size){
				return true;
			}
		}
		return false;
	}
}
