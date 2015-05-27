/**
 * UserCircleController
 *
 * @description :: Server-side logic for managing Usercircles
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	createCircle: function (req, res) {
		var ownerId = req.param('userId');
		var friendId = req.param('friendId');
		var status = req.param('status');

		var jsonObj = {ownerId:ownerId, friendId:friendId, status:status};
		console.log(jsonObj);
		User.find ({"id":friendId}, function(err, users) {
			if (users.length > 0) {
				var friendInfo = users[0];
				console.log(friendInfo);
				UserCircle.create(jsonObj, function(err, circle) {
					console.log(err);
					console.log(circle);
					if (err) {
						res.end(JSON.stringify({success:error}));
					}else {
						res.end(JSON.stringify({success:"YES", circle:circle, friendInfo:friendInfo}));
					}
				});
			} else {
				res.end(JSON.stringify({success:"Friend does not exist."}));
			}
		});
	  },
	myCircles: function (req, res) {
		  var ownerId = req.param('userId');
		  UserCircle.find({$or:[{ownerId:ownerId}, {friendId:ownerId}]}, function(err, circles) {
				res.end(JSON.stringify(circles));
			});
	  },
	updateCircleStatus: function (req, res) {
		  var circleId = req.param('circleId');
		  var status = req.param('status');

		  UserCircle.find({id:circleId}, function(err, circles) {
			  if (circles.length > 0) {
				  var circle = circles[0];
				  circle.status = status;
				  UserCircle.update({id:circle.id}, circle).exec(function (err, result) {
							console.log(err);
							console.log(result);
							if (err == null)
							{
								res.end(JSON.stringify(result[0]));
							}
							else
							{
								res.end('{"status":"failed"}');
							}
						});
			  } else {
				  res.end(JSON.stringify({success:"Circle does not exist."}));
			  }
		  });
	  }
};

