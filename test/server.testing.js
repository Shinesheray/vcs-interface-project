let expect = require("chai").expect;
let request = require("request");

describe("api call test type of response", function () {
  describe("api test response code", function () {
    it("status", function (done) {
      //set timeout for api call
      this.timeout(9000);
      request(
        "http://localhost:3001/user/github/repo/shinesheray",
        function (error, response, body) {
          expect(response).to.be.a("object");
          done();
        }
      );
    });
    it("response", function (done) {
      //set timeout for api call
      this.timeout(5000);
      request(
        "http://localhost:3001/user/github/repo/shinesheray",
        function (error, response, body) {
          expect(response.statusCode).to.equal(200);
          done();
        }
      );
    });
  });
});
