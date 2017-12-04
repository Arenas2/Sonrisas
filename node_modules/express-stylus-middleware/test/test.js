'use strict';

var express = require('express'),
		request = require('supertest'),
		stylus = require('../');

function finishSpec(done) {
	return function (err, res) {
		if (err) {
			done.fail(err);
		} else {
			done();
		}
	}
}

describe('Express-stylus middleware', function() {
	beforeEach(function() {
		this.app = express();
		this.app.use(stylus(__dirname + '/fixtures'));
	});

	it('should return valid CSS', function(done) {
		request(this.app)
			.get('/valid.css')
			.expect(200)
			.expect('Content-Type', /css/)
			.expect(/color: #dc143c/)
			.end(finishSpec(done));
	});

	it('should return valid CSS with autoprefix', function(done) {
		this.app = express();
		this.app.use(stylus(__dirname + '/fixtures', { autoprefixer: true }));

		request(this.app)
			.get('/valid.css')
			.expect(200)
			.expect('Content-Type', /css/)
			.expect(/display: -ms-flexbox/)
			.end(finishSpec(done));
	});

	it('should respond with 404 if file not found', function(done) {
		request(this.app)
			.get('/another.css')
			.expect(404)
			.end(finishSpec(done));
	});

	it('should respond with 500 if file is invalid', function(done) {
		request(this.app)
			.get('/invalid.css')
			.expect(500)
			.end(finishSpec(done));
	});

	it('should ignore methods except GET and HEAD', function(done) {
		request(this.app)
			.post('/valid.css')
			.expect(404)
			.end(finishSpec(done));
	})
});
