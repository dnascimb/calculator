//
// The Calculator is meant to aid in simpler calculations while preparing
// oil and butter extracts of chemicals from specific plants.
//
///////////////////////////////////////////////////////////////////////////////

shouldRound = false;

// - create a conversion table with this + pic:
// 1 stick = 8 tbsp
// 1 tbsp = 3 tsp
// 1 tbsp (volume) = 14.18 g (mass)
// 1 tsp (volume) = 4.72666667 g (mass)

//
// Constructor
//
function Calculator() {
	this.opsa = 0;
	this.cmsa = 0;
	this.mrsc = 0;
}
//
// Constructor
//
function Calculator(subA_startingPercentage, subA_finalMass, subB_startingMass) {
	this.opsa = subA_startingPercentage; //whole number
	this.cmsa = subA_finalMass; //grams
	this.mrsc = subB_startingMass * 14.18; //entered in tablespoons and we convert to grams
}

//
// This function returns the cured percentage amount of SubstanceA
//
Calculator.prototype.getCuredSubAPercent = function() {
	if(!this.opsa)
		return 0;
	this.curedSubAPercent = this.opsa * .7;
	if(shouldRound)
		return this.curedSubAPercent.toFixed(2);
	else
		return this.curedSubAPercent;
};

//
// This function returns the cured mass amount of SubstanceA (mg) per of cannabis
//
Calculator.prototype.getCuredSubACalculatedMassPerGram = function() {
	this.curedSubACalculatedMassPerGram = this.getCuredSubAPercent() * 10;
	if(shouldRound)
		return this.curedSubACalculatedMassPerGram.toFixed(2);
	else
		return this.curedSubACalculatedMassPerGram;
};

//
// This function returns the cured mass amount of SubstanceA (mg)
//
Calculator.prototype.getCuredSubACalculatedMassTotal = function() {
	this.curedSubACalculatedMass = this.getCuredSubACalculatedMassPerGram() * this.cmsa;
	if(shouldRound)
		return this.curedSubACalculatedMass.toFixed(2);
	else
		return this.curedSubACalculatedMass;
};

//
// This function returns the SubstanceA (mg) mass amount per SubstanceB (g) mass amount
Calculator.prototype.getSubAMassPerSingleSubBMassUnit = function() {
	var a = this.getCuredSubACalculatedMassPerGram();
	var b = this.getSubBMassAfterInfusion() * 14.18;
	this.curedSubAMassPerSingleSubBMassUnit = a / b;
	if(shouldRound)
		return this.curedSubAMassPerSingleSubBMassUnit.toFixed(2);
	else
		return this.curedSubAMassPerSingleSubBMassUnit;
};


//
// This function returns the SubstanceA mass amount per the passed in SubstanceB mass amount 
//
Calculator.prototype.getSubAMassPerSpecificSubBMass = function(value) {
	if(!value)
		return 0;
	console.log("value: " + value);
	this.curedSubAMassPerCertainAmountofSubBMass = this.getSubAMassPerSingleSubBMassUnit() * value;
	if(shouldRound)
		return this.curedSubAMassPerCertainAmountofSubBMass.toFixed(2);
	else
		return this.curedSubAMassPerCertainAmountofSubBMass;
};

//
// This function returns the SubstanceB mass amount after infusion 
//
Calculator.prototype.getSubBMassAfterInfusion = function() {
	if(!this.mrsc)
		return 0;
	this.subB_massAfterInfusion = (this.mrsc * .75) / 14.18; // stored as grams then converted to tablespoons
	if(shouldRound)
		return this.subB_massAfterInfusion.toFixed(2);
	else
		return this.subB_massAfterInfusion;
};

//
// This function returns the SubstanceA mass amount per the passed in SubstanceB mass amount 
//
Calculator.prototype.getSubAMassPerNumberOfServings = function(subB_massInTablespoons, numberOfServings) {
	if(!subB_massInTablespoons || !numberOfServings)
		return 0;
	console.log("subB_massInTablespoons: " + subB_massInTablespoons);
	console.log("numberOfServings: " + numberOfServings);
	this.subA_massPerServing = this.getSubAMassPerSpecificSubBMass(subB_massInTablespoons * 14.18) / numberOfServings;
	if(shouldRound)
		return this.subA_massPerServing.toFixed(2);
	else
		return this.subA_massPerServing;
};


//
// This function sets the shouldRound property
// http://stackoverflow.com/questions/28814585/how-to-check-if-type-is-boolean
Calculator.prototype.setShouldRound = function(value) {
	if(({}).toString.call(value).match(/\s([a-zA-Z]+)/)[1].toLowerCase())
		this.shouldRound = value;
};

//
// This function sets the OriginalPercentageSubA property
// 
Calculator.prototype.setOriginalPercentageSubA = function(value) {
	if(value)
		this.opsa = value;
};

//
// This function sets the CuredMassSubA property
// 
Calculator.prototype.setFinalSubAMass = function(value) {
	if(value)
		this.cmsa = value; //grams 
};

//
// This function sets the MassResultSubB property
// 
Calculator.prototype.setMassResultSubB = function(value) {
	if(value)
		this.mrsc = value * 14.18; //entered in tablespoons and we convert to grams
};
