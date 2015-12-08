/* Test the ui */
var assert = require('assert'),
    test = require('selenium-webdriver/testing'),
    webdriver = require('selenium-webdriver');

test.describe('10,000 over Iowa web page', function() {
	var driver;

	before(function(){});
	after(function(){});

	beforeEach(function(){
    	driver = new webdriver.Builder().
					withCapabilities(webdriver.Capabilities.chrome()).
					build();
	});

	afterEach(function(){
		driver.quit();
	});
	
	test.it('should load', function() {
		driver.get('http://localhost:8080/ui/test.html');

		driver.wait(function() {
			return driver.getTitle().then(function(title) {
   				return title === '10,000 Over Iowa';
 			});
		}, 1500);

	});
});

test.describe('api_ajax_get_time', function() {
	var driver;

	before(function(){});
	after(function(){});

	beforeEach(function(){
    	driver = new webdriver.Builder().
					withCapabilities(webdriver.Capabilities.chrome()).
					build();
	});

	afterEach(function(){
		driver.quit();
	});

	test.it('should return test values', function() {

	driver.get('http://localhost:8080/ui/test.html').then(function() {
		driver.findElement(webdriver.By.css('div#api_ajax_get_time_box button')).then(function(button){
			button.click().then(function(){
				driver.findElement(webdriver.By.css("div#api_ajax_get_time_box div#response pre")).then(function(response){
					response.getText().then(function(text){
						obj = JSON.parse(text);
						var a = (obj.error == false);
						assert.equal(a,true);
						var b = (obj.errors.length == 0);
						assert.equal(b,true);
						var c = (obj.time == "10101010");
						assert.equal(c,true);
					});
				});
			});
		});
	});
  });
});


