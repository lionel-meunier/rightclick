angular.module('RightClick', []);
angular.module('RightClick').directive("ngRightClick", ['$parse',
	function($parse) {
		return {
			compile: function($element, attr) {
				document.oncontextmenu = function(e) {
					if (e.target.hasAttribute('ng-right-click') ||
						e.target.hasAttribute('data-ng-right-click')) {
						return false;
					}
					return true;
				};
				var fn = $parse(attr['ngRightClick']);
				return function(scope, element, attr) {
					element.on('mousedown', function(event) {
						if (event.button === 2) {
							scope.$apply(function() {
								fn(scope, {
									$event: event
								});
							});
						}
					});
				};
			}

		}
	}
]);