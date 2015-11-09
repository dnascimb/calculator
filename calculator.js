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

// LOSSES
// - THC after curing: -2%
// - THC after infusion with butter: -25%
// - THC after infusion with oil: -20%
// - Butter after infusion: -25%
// - Oil after infusion: -20%


var constants = {
   BUTTER_GRAMS_IN_TABLESPOON: 14.18,
   OIL_GRAMS_IN_TABLESPOON: 13.72,
   BUTTER_LOSS: .25,
   OIL_LOSS: .2,
   SUBA_LOSS_AFTER_CURING: 2,
   SUBA_LOSS_AFTER_BUTTER_INFUSION: .25,
   SUBA_LOSS_AFTER_OIL_INFUSION: .2
};
Calculator.prototype.getConstantButterLoss = function(){return constants.BUTTER_LOSS;};
Calculator.prototype.getConstantOilLoss = function(){return constants.OIL_LOSS;};
Calculator.prototype.getConstantSubALossAfterCuring = function(){return constants.SUBA_LOSS_AFTER_CURING;};
Calculator.prototype.getConstantSubALossAfterButterInfusion = function(){return constants.SUBA_LOSS_AFTER_BUTTER_INFUSION;};
Calculator.prototype.getConstantSubALossAfterOilInfusion = function(){return constants.SUBA_LOSS_AFTER_OIL_INFUSION;};

//
// Constructor
//
function Calculator() {
	this.subA_startingPercentage = 0;
	this.subA_finalMass = 0;
	this.subB_startingMassGrams = 0;
	this.substanceALossPercentage = 20; //default
	this.substanceBType = 0; //butter=0,oil=1
	this.substanceBLoss = 25;
	this.subAPercentAfterInfusion = 0;
	this.subACalculatedMassPerGramForInfusion = 0;
}


//
// This function returns the cured percentage amount of SubstanceA
//
Calculator.prototype.getCuredSubAPercent = function() {
	if(!this.subA_startingPercentage)
		return 0;
	this.curedSubAPercent = this.subA_startingPercentage - constants.SUBA_LOSS_AFTER_CURING;
	if(shouldRound)
		return this.curedSubAPercent.toFixed(2);
	else
		return this.curedSubAPercent;
};

//
// This function returns the percentage amount of SubstanceA after infusion with SubstanceB
//
Calculator.prototype.getSubAPercentAfterInfusion = function() {
	if(!this.subA_startingPercentage || !this.substanceBLoss || !this.substanceBType)
		return 0;
	//console.log("cured sub loss: " + this.substanceBLoss);
	if(this.substanceBType == 100)
		this.substanceBLoss = constants.BUTTER_LOSS;//butter
	else
		this.substanceBLoss = constants.OIL_LOSS;//oil

	this.subAPercentAfterInfusion = this.getCuredSubAPercent() * (1 - this.substanceBLoss);

	if(shouldRound)
		return this.subAPercentAfterInfusion.toFixed(2);
	else
		return this.subAPercentAfterInfusion;
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
// This function returns the mass amount of SubstanceA (mg) per of cannabis used in infusion calculation
//
Calculator.prototype.getSubACalculatedMassPerGramForInfusion = function() {
	this.subACalculatedMassPerGramForInfusion = this.getSubAPercentAfterInfusion() * 10;
	if(shouldRound)
		return this.subACalculatedMassPerGramForInfusion.toFixed(2);
	else
		return this.subACalculatedMassPerGramForInfusion;
};

//
// This function returns the cured mass amount of SubstanceA (mg)
//
Calculator.prototype.getCuredSubACalculatedMassTotal = function() {
	if(!this.subA_finalMass)
		return 0;
	this.curedSubACalculatedMass = this.getCuredSubACalculatedMassPerGram() * this.subA_finalMass;
	if(shouldRound)
		return this.curedSubACalculatedMass.toFixed(2);
	else
		return this.curedSubACalculatedMass;
};

//
// This function returns the SubstanceA (mg) mass amount per SubstanceB (g) mass amount
Calculator.prototype.getSubAMassPerSingleSubBMassUnit = function() {
	if(this.substanceBType)
	{
		var a = this.getSubACalculatedMassPerGramForInfusion();

	if(this.substanceBType == 100)
		var b = this.getSubBMassAfterInfusion() * constants.BUTTER_GRAMS_IN_TABLESPOON;
	else
		var b = this.getSubBMassAfterInfusion() * constants.OIL_GRAMS_IN_TABLESPOON;
	
	console.log("a: " + a);
	console.log("b: " + b);

	this.curedSubAMassPerSingleSubBMassUnit = a / b;
	if(shouldRound)
		return this.curedSubAMassPerSingleSubBMassUnit.toFixed(2);
	else
		return this.curedSubAMassPerSingleSubBMassUnit;
	}
	else
		return 0;
};


//
// This function returns the SubstanceA mass amount per the passed in SubstanceB mass amount 
//
Calculator.prototype.getSubAMassPerSpecificSubBMass = function(value) {
	if(!value)
		return 0;
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
	if(!this.subB_startingMassGrams)
		return 0;

	if(this.substanceBType == 100)
		this.substanceBLoss = constants.SUBA_LOSS_AFTER_BUTTER_INFUSION;//butter
	else
		this.substanceBLoss = constants.SUBA_LOSS_AFTER_OIL_INFUSION;//oil

	var a = (this.subB_startingMassGrams * (1-this.substanceBLoss))
	if(this.substanceBType == 100)
		var b = constants.BUTTER_GRAMS_IN_TABLESPOON;
	else
		var b = constants.OIL_GRAMS_IN_TABLESPOON;

	console.log("2a: " + a);
	console.log("2b: " + b);
	this.subB_massAfterInfusion = a / b;
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

	if(this.substanceBType == 100)
		this.subA_massPerServing = this.getSubAMassPerSpecificSubBMass(subB_massInTablespoons * constants.BUTTER_GRAMS_IN_TABLESPOON) / numberOfServings;
	else
		this.subA_massPerServing = this.getSubAMassPerSpecificSubBMass(subB_massInTablespoons * constants.OIL_GRAMS_IN_TABLESPOON) / numberOfServings;
		

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
		this.subA_startingPercentage = value;
};

//
// This function sets the CuredMassSubA property
// 
Calculator.prototype.setFinalSubAMass = function(value) {
	if(value)
		this.subA_finalMass = value; //grams 
};

//
// This function sets the MassResultSubB property
// 
Calculator.prototype.setMassResultSubB = function(value) {
	if(value)
	{
		if(this.substanceBType == 100)
			this.subB_startingMassGrams = value * constants.BUTTER_GRAMS_IN_TABLESPOON; //entered in tablespoons and we convert to grams
		else
			this.subB_startingMassGrams = value * constants.OIL_GRAMS_IN_TABLESPOON;
	}
};

//
// This function sets the MassResultSubB property
// 
Calculator.prototype.setSubBType = function(value) {
	//console.log("value: " + value);
	if(value)
		this.substanceBType = value; //entered in tablespoons and we convert to grams
};
