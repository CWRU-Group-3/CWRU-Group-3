
var countriesArr = [];

function search() {
  clearDiv();
  clearSearch();
  var countrySearch = $("#country-input").val().trim();

  const validate1 = simplyValid.default({
    schema: 'noNumbers'
  });
  const validate2 = simplyValid.default({
    schema: 'noSpecials'
  });
  var validation1 = validate1(countrySearch).isValid;
  var validation2 = validate2(countrySearch).isValid;

  if (validation1 === false || validation2 === false){
    alert('Please enter a valid country with no numbers or special characters')
    return
  }


