app.filter('nombreEntier',function() {

  	return function(nombreAvecVirgules){
      return Math.round(nombreAvecVirgules);
   };
	
});
