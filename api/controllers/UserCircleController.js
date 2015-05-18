/**
 * UserCircleController
 *
 * @description :: Server-side logic for managing Usercircles
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	create: function (req, res) {
		var ownerId = req.param('userId');
		var invitedId = req.param('invitedId');
		var circleNumber = req.param('circleNumber');

		var jsonObj = {ownerId:ownerId, invitedId:invitedId, circleNumber:circleNumber};
		var fbId = req.body.fbId;
		var findQuery = '{"fbId":"' + fbId + '"}';

		var userInfo;
		var getUserPhotos = function () {
			UserPhotos.find({"userId":userInfo.id}, function(err, photos) {
				userInfo.photos = photos;
				res.end(JSON.stringify(userInfo));
			});
		}

		User.find ({"fbId":fbId}, function(err, users) {
			if (users.length > 0) {
				userInfo = users[0];
				getUserPhotos();
			} else {
				User.create(req.body, function(err, user) {
					console.log(err);
					userInfo = user;
					getUserPhotos();
				});
			}
		});
	  },
};

