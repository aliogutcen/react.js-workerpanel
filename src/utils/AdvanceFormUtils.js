export const options = [
  { value: "EMERGENCY_SITUATIONS", label: "Emergency Situations" },
  { value: "TEMPORARY_CASH_SHORTAGE", label: "Temporary Cash Shortage" },
  { value: "PRE_PLANNED_EXPENSES", label: "Pre Planned Expenses" },
];

export const maxAdvance = (convertedSalary) => convertedSalary * 3;

export const handleSelectChange = (e, setSelectedCurrency, setAdvances) => {
  const selectedCurrency = e.target.value;
  setSelectedCurrency(selectedCurrency);
  setAdvances((prev) => ({ ...prev, currency: selectedCurrency }));
};

export const handleInputChange = (
  e,
  maxAdvance,
  setErrorMessage,
  setAdvance,
  setAdvances
) => {
  let inputVal = e.target.value;

  if (inputVal > maxAdvance) {
    inputVal = maxAdvance;
    setErrorMessage(
      "The value you entered exceeds the max advance. The value is set to the max advance value."
    );
  } else {
    setErrorMessage("");
  }
  setAdvance(inputVal);
  setAdvances((prev) => ({ ...prev, advanceAmount: inputVal }));
};

export const handleSubmit = (e, advances, hideModal, AdvanceService) => {
  e.preventDefault();
  AdvanceService.createAdvance(advances).then(
    () => {
      alert("başarılı");
      window.location.replace("/advance");
    },
    () => {}
  );
  hideModal();
};
