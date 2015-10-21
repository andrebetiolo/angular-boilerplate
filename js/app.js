var app = angular.module('app', ['ngRoute']);

function getViewPath(name) {
    return 'view/' + name + '.html';
}

function loadScript(path){
  return new Promise(function(resolve, reject) {
    var script = document.createElement("script");
    script.async = "async";
    script.type = "text/javascript";
    script.src = path;
    script.onload = script.onreadystatechange = function (_, isAbort) {
      if (!script.readyState || /loaded|complete/.test(script.readyState)) {
        if (isAbort)
          reject(Error("Erro ao fazer o download do javascript"));
        else
          resolve();
      }
    };
    script.onerror = function () {reject();};
    document.querySelector("head").appendChild(script);
  });
}

function loader(arrayName){
	return {
      load: function(){
				return new Promise(function(resolve, reject) {
  				var map = arrayName.map(function(name) {
            var jsFolfer = 'js/';
  					if(name.match('class/')){
  						return loadScript(jsFolfer+name+".js");
  					}

  					if(name.match('service/')){
  						return loadScript(jsFolfer+name+".js");
  					}

  					return loadScript(jsFolfer+'controllers/'+name+".js");
  				});

  				Promise.all(map).then(function(r){
  					resolve();
  				});

				});
		}
	};
}

app.config(function($routeProvider, $locationProvider, $controllerProvider) {

	//Para registrar o controller com o pattern Lazy Laod
	app.registerCtrl = $controllerProvider.register;

    // use the HTML5 History API
    $locationProvider.html5Mode(true);

    $routeProvider
        .when('/', {
            templateUrl : getViewPath('index'),
						resolve: loader(['index'])
        })
        .when('/foo', {
            templateUrl : getViewPath('foo'),
        });
});

function isMobile(){
	return navigator.userAgent.toLowerCase().search(/(android|avantgo|blackberry|bolt|boost|cricket|docomo|fone|hiptop|mini|mobi|palm|phone|pie|up\.browser|up\.link|webos|wos)/i) != -1 ? true : false;
}

function isDesktop(){
	return !isMobile();
}

function dom(seletor){
	return document.querySelector(seletor);
}

app.controller('MainCtrl',function($scope, $http, $location, $routeParams){
    $scope.$on('$routeChangeSuccess', function(){
    	ga('send', 'pageview',{page: $location.path()});
      dom("#check-box-menu").checked = false;
    });
});
