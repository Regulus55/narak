import React from "react";
import useQuotesList from "../hooks/MockData/QuotesData";

const QuotesList = () => {
  const { data: QuotesData, error, isLoading, isSuccess } = useQuotesList();
  console.log("quotes data", QuotesData);

  return <div>QuotesList</div>;
};

export default QuotesList;
