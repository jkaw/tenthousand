var should = require('chai').should(),
    scapegoat = require('../engine'),
    get_time = scapegoat.get_time;

describe('#get_time', function() {
  it('calculates the current time', function() {
	var currentTime = new Date();
	get_time().should.contain(':');
	currentTime = new Date();
	get_time().should.contain(currentTime.getHours()+":");
	currentTime = new Date();
	get_time().should.contain(currentTime.getMinutes()+":");
  });
});
