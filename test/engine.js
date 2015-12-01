/* Test the engine directly */
var should = require('chai').should(),
    scapegoat = require('../engine/our_engine'),
    get_time = scapegoat.from_api_ajax_get_time;

describe('#api_ajax_get_time', function() {
  it('calculates the current time', function() {
	var currentTime = new Date();
	get_time().time.should.contain(':');
	get_time().error.should.equal(false);
	get_time().errors.length.should.equal(0);

	currentTime = new Date();
	get_time().time.should.contain(currentTime.getHours()+":");
	get_time().error.should.equal(false);
	get_time().errors.length.should.equal(0);

	currentTime = new Date();
	get_time().time.should.contain(currentTime.getMinutes()+":");
	get_time().error.should.equal(false);
	get_time().errors.length.should.equal(0);
  });
});


