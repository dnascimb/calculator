//
// The Calculator is meant to aid in simpler calculations while preparing
// oil and butter extracts of chemicals from specific plants.
//
///////////////////////////////////////////////////////////////////////////////

shouldRound = false;
curedSubAPercent = 0;
curedSubAMass = 0;
curedSubAMassPerSubBMass = 0;
curedSubAMassPerCertainAmountofSubBMass = 0;

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
function Calculator(original_percentage_sub_a, cured_mass_sub_a, mass_result_sub_b) {
	this.opsa = original_percentage_sub_a;
	this.cmsa = cured_mass_sub_a;
	this.mrsc = mass_result_sub_b;
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
// This function returns the cured mass amount of SubstanceA
//
Calculator.prototype.getCuredSubAMass = function() {
console.log("(getCuredSubAMass) this.cmsa: " + this.cmsa
	+ " curedSubAPercent: " + curedSubAPercent);
	if(!this.cmsa || !this.curedSubAPercent)
		return 0;
	this.curedSubAMass = this.cmsa * this.curedSubAPercent * 10;
	if(shouldRound)
		return this.curedSubAMass.toFixed(2);
	else
		return this.curedSubAMass;
};

//
// This function returns the SubstanceA mass amount per SubstanceB mass amount
//
Calculator.prototype.getSubAMassPerSubBMass = function() {
	console.log("(getSubAMassPerSubBMass) this.curedSubAMass: " + this.curedSubAMass
	+ " this.mrsc: " + this.mrsc);
	if(!this.curedSubAMass || !this.mrsc)
		return 0;
	this.curedSubAMassPerSubBMass = this.curedSubAMass / this.mrsc;
	if(shouldRound)
		return this.curedSubAMassPerSubBMass.toFixed(2);
	else
		return this.curedSubAMassPerSubBMass;
};


//
// This function returns the SubstanceA mass amount per the passed in SubstanceB mass amount 
//
Calculator.prototype.getSubAMassPerSpecificSubBMass = function(value) {
	console.log("(getSubAMassPerSpecificSubBMass) value: " + value
	+ " this.curedSubAMassPerSubBMass: " + this.curedSubAMassPerSubBMass);
	if(!this.curedSubAMassPerSubBMass || !value)
		return 0;
	this.curedSubAMassPerCertainAmountofSubBMass = this.curedSubAMassPerSubBMass * value;
	if(shouldRound)
		return this.curedSubAMassPerCertainAmountofSubBMass.toFixed(2);
	else
		return this.curedSubAMassPerCertainAmountofSubBMass;
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
Calculator.prototype.setCuredMassSubA = function(value) {
	if(value)
		this.cmsa = value;
};

//
// This function sets the MassResultSubB property
// 
Calculator.prototype.setMassResultSubB = function(value) {
	if(value)
		this.mrsc = value;
};
