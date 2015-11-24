//
// The Calculator is meant to aid in simpler calculations while preparing
// oil and butter extracts of chemicals from cannabis.
//
///////////////////////////////////////////////////////////////////////////////


// LOSSES
// - THC after curing: -2 percentage points
// - THC after infusion with butter: -30%
// - THC after infusion with oil: -20%
// - Butter after infusion: -25%
// - Oil after infusion: -20%


var constants = {
   INFUSION_TYPE_BUTTER: 100,
   BUTTER_GRAMS_IN_TABLESPOON: 14.18,
   OIL_GRAMS_IN_TABLESPOON: 13.72,
   BUTTER_LOSS: .25,
   OIL_LOSS: .2,
   SUBA_LOSS_AFTER_CURING: 2,
   SUBA_LOSS_AFTER_BUTTER_INFUSION: .30,
   SUBA_LOSS_AFTER_OIL_INFUSION: .1
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
	this.subBAmountInRecipe = 0;
	this.substanceALossPercentage = 20; //default
	this.substanceBType = constants.INFUSION_TYPE_BUTTER; //butter=100,oil=1
	this.substanceBLoss = 25;
	this.subAPercentAfterInfusion = 0;
	this.subACalculatedMassPerGramForInfusion = 0;
	this.multiplier = 0;
	this.subAPerSpecificSubB = 0;
	this.step2Result = 0;
	this.step3Result = 0;
	this.step4Result = 0;
	this.step5Result = 0;
	this.step6Result = 0;
	this.step7Result = 0;
	this.step8Result = 0;
	this.step9Result = 0;
	this.shouldRound = false;
}


//
// This function returns the cured percentage amount of SubstanceA
//
Calculator.prototype.getCuredSubAPercent = function() {
	if(!this.subA_startingPercentage)
		return 0;

	if(this.substanceBType == constants.INFUSION_TYPE_BUTTER)
		this.curedSubAPercent = this.subA_startingPercentage * .7;
	else
		this.curedSubAPercent = this.subA_startingPercentage * .7;

	if(this.shouldRound)
		return this.curedSubAPercent.toFixed(2);
	else
		return this.curedSubAPercent;
};

//step 2
Calculator.prototype.getStep2 = function() {

 	this.step2Result = this.getCuredSubAPercent();

	return this.step2Result;
};
//step 3
Calculator.prototype.getStep3 = function() {

	this.step3Result = this.getStep2() * 10;

	return this.step3Result;

};
//step 4
Calculator.prototype.getStep4 = function() {
	if(!this.subA_finalMass)
		return 0;

	this.step4Result = this.getStep3() * this.subA_finalMass;

	return this.step4Result;
};
//step 5
Calculator.prototype.getStep5 = function() {
	if(!this.subB_startingMassGrams)
		return 0;
	
	var a = this.getStep4();
	this.step5Result = a / this.subB_startingMassGrams;

	return this.step5Result;
};

//step 6
Calculator.prototype.getStep6 = function() {
	var a = this.getStep5();
	if(this.substanceBType == constants.INFUSION_TYPE_BUTTER)
		var b = this.getSubBMassAfterInfusion() * constants.BUTTER_GRAMS_IN_TABLESPOON;
	else
		var b = this.getSubBMassAfterInfusion() * constants.OIL_GRAMS_IN_TABLESPOON;

	if(this.substanceBType == constants.INFUSION_TYPE_BUTTER)
		var c = (a * b) * (1 - constants.SUBA_LOSS_AFTER_BUTTER_INFUSION); 
	else
		var c = (a * b) * (1 - constants.SUBA_LOSS_AFTER_OIL_INFUSION);

	this.step6Result = c;

	return this.step6Result;
};

//step 7
Calculator.prototype.getStep7 = function(value) {
	if(!value)
		return 0;

	var a = this.getStep5();

	if(this.substanceBType == constants.INFUSION_TYPE_BUTTER)
		var b = value * constants.BUTTER_GRAMS_IN_TABLESPOON;
	else
		var b = value * constants.OIL_GRAMS_IN_TABLESPOON;

	var c = a * b;

	if(this.substanceBType == constants.INFUSION_TYPE_BUTTER)
		this.step7Result = c * (1-constants.SUBA_LOSS_AFTER_BUTTER_INFUSION);
	else
		this.step7Result = c * (1-constants.SUBA_LOSS_AFTER_OIL_INFUSION);

	return this.step7Result;
};






//
// This function returns the percentage amount of SubstanceA after infusion with SubstanceB
//
Calculator.prototype.getSubAPercentAfterInfusion = function() {
	if(!this.subA_startingPercentage || !this.substanceBLoss || !this.substanceBType)
		return 0;

	if(this.substanceBType == constants.INFUSION_TYPE_BUTTER)
		this.substanceBLoss = constants.SUBA_LOSS_AFTER_BUTTER_INFUSION;//butter
	else
		this.substanceBLoss = constants.SUBA_LOSS_AFTER_OIL_INFUSION;//oil

	this.subAPercentAfterInfusion = this.getCuredSubAPercent() * (1 - this.substanceBLoss);

	if(this.shouldRound)
		return this.subAPercentAfterInfusion.toFixed(2);
	else
		return this.subAPercentAfterInfusion;
};

//
// This function returns the cured mass amount of SubstanceA (mg) per of cannabis
//
Calculator.prototype.getCuredSubACalculatedMassPerGram = function() {
	this.curedSubACalculatedMassPerGram = this.getSubAPercentAfterInfusion() * 10;
	if(this.shouldRound)
		return this.curedSubACalculatedMassPerGram.toFixed(2);
	else
		return this.curedSubACalculatedMassPerGram;
};

//
// This function returns the mass amount of SubstanceA (mg) per of cannabis used in infusion calculation
//
Calculator.prototype.getSubACalculatedMassPerGramForInfusion = function() {
	this.subACalculatedMassPerGramForInfusion = this.getSubAPercentAfterInfusion() * 10;
	if(this.shouldRound)
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
	if(this.shouldRound)
		return this.curedSubACalculatedMass.toFixed(2);
	else
		return this.curedSubACalculatedMass;
};



//
// This function returns the SubstanceB mass amount after infusion 
//
Calculator.prototype.getSubBMassAfterInfusion = function() {
	if(!this.subB_startingMassGrams)
		return 0;

	if(this.substanceBType == constants.INFUSION_TYPE_BUTTER)
		this.substanceBLoss = constants.BUTTER_LOSS;//butter
	else
		this.substanceBLoss = constants.OIL_LOSS;//oil

	var a = (this.subB_startingMassGrams * (1-this.substanceBLoss))

	if(this.substanceBType == constants.INFUSION_TYPE_BUTTER)
		var b = constants.BUTTER_GRAMS_IN_TABLESPOON;
	else
		var b = constants.OIL_GRAMS_IN_TABLESPOON;

	this.subB_massAfterInfusion = a / b;
	if(this.shouldRound)
		return this.subB_massAfterInfusion.toFixed(2);
	else
		return this.subB_massAfterInfusion;
};


//
// This function sets the this.shouldRound property
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
		if(this.substanceBType == constants.INFUSION_TYPE_BUTTER) {
			this.subB_startingMassGrams = value * constants.BUTTER_GRAMS_IN_TABLESPOON; //entered in tablespoons and we convert to grams
		} else {
			this.subB_startingMassGrams = value * constants.OIL_GRAMS_IN_TABLESPOON;
		}
	}
};

//
// This function sets the MassResultSubB property
// 
Calculator.prototype.setSubBType = function(value) {
	if(value)
		this.substanceBType = value; //entered in tablespoons and we convert to grams
};

//
// This function sets the SubBAmountInRecipe property
// 
Calculator.prototype.setSubBAmountInRecipe = function(value) {
	if(this.substanceBType && value)
	{
		if(this.substanceBType == constants.INFUSION_TYPE_BUTTER)
			this.subBAmountInRecipe = value * constants.BUTTER_GRAMS_IN_TABLESPOON; //grams
		else
			this.subBAmountInRecipe = value * constants.OIL_GRAMS_IN_TABLESPOON; //grams
	} 
};
