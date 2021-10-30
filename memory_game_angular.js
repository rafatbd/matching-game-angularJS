var app = angular.module('myApp', ['ngSanitize']);

function random(limit){
	return Math.floor(Math.random() * limit); 
}

//Tauler aleatori memory game:
function initial_cards(n){
	let i = 0;	
	let cards = new Array(n).fill(0).map((element,index)=>i).map((e,i)=>Math.floor(i/2)+1);
	cards.forEach((e,i,a)=> { 
		let p = random(n); 
		let aux = a[p]; 
		a[p] = a[i]; 
		a[i] = aux;
	});
	return cards;
}

function carta(num) {
  this.src = num + '.svg';
  this.girat = false;
  this.trobat = false;
}

app.controller('myCtrl', function($scope, $timeout, $interval) {
	$scope.temps = 0;
	$scope.timer = 0;
	$scope.moviment = 0;
	$scope.numMoviment = $scope.moviment + " moviments fets";
	$scope.ordre = "primera";
  	$scope.primeraCarta;
  	$scope.segonaCarta;
  	$scope.comptador = 0;
  	$scope.cartes = initial_cards(8);
  	var cartes_girades = 0;
  	var idTemporitzador = 0;
	$scope.temporitzador = function() {
    	console.log("Interval occurred");
    	$scope.temps += 1;
		$scope.timer = $scope.temps + " segons jugats";

	}
  	$scope.cards = [
		[
		  new carta($scope.cartes[0]),
		  new carta($scope.cartes[1]),
		  new carta($scope.cartes[2]),
		  new carta($scope.cartes[3])
		],
		[
		  new carta($scope.cartes[4]),
		  new carta($scope.cartes[5]),
		  new carta($scope.cartes[6]),
		  new carta($scope.cartes[7])
		]
  	];
	console.log($scope.cards);

  	$scope.girarCarta = function(card) {
		if ($scope.ordre === "primera") {
			card.girat = true;
			cartes_girades += 1;
			$scope.primeraCarta = card;
			$scope.ordre = "segona";
			console.log($scope.primeraCarta.src);
			if (cartes_girades === 1 && $scope.comptador < 4) {
  	  			console.log("Primera carta girada del tauler, iniciem el temps !!!!!!!!");
  	  			idTemporitzador = $interval($scope.temporitzador, 1000);
  	  		}	
		}
		else if ($scope.ordre === "segona") {
			card.girat = true;
			$scope.segonaCarta = card;
			console.log($scope.segonaCarta.src);
			if ($scope.primeraCarta.src === $scope.segonaCarta.src) {
			  console.log("Dos cartes Iguals");
			  $scope.ordre = "primera";
			  $scope.trobat = true;
			  $scope.primeraCarta.trobat = true;
			  $scope.comptador += 1;
				if ($scope.comptador === 4) {
				  console.log("Has guanyat la partida!");
				  $interval.cancel(idTemporitzador); 
				  $scope.missatge = "<strong>Has guanyat la partida!</strong>";
				}
			  console.log($scope.comptador);
			}
			if ($scope.primeraCarta.src !== $scope.segonaCarta.src) {
			  console.log("No trobat");
			  $timeout(function() {
				$scope.primeraCarta.girat = false;
				$scope.segonaCarta.girat = false;
			  }, 200);
			  $scope.ordre = "primera";
			  console.log($scope.ordre);
			}
			$scope.moviment += 1;
			$scope.numMoviment = $scope.moviment + " moviments fets";
		}
	};
});
