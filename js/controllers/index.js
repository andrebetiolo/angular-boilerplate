function trocaTracoPorEspaco(string) {
	return string.replace(/-/g, ' ');
}

app.registerCtrl('IndexCtrl',function($scope, $q){
	$scope.formataTitulo = function(titulo){
		return trocaTracoPorEspaco(titulo);
	};

	$scope.nomesDosBolos = function(){
		$scope.bolos = ["Milho-com-Requeijão","Maça-com-Nozes","Tapioca"];
	}();
});
