
export interface Bank {
  name: string;
  code: string;
  country: string;
}

export const banks: Bank[] = [
  // United States
  { name: "JPMorgan Chase Bank", code: "CHASUS33", country: "US" },
  { name: "Bank of America", code: "BOFAUS3N", country: "US" },
  { name: "Wells Fargo Bank", code: "WFBIUS6S", country: "US" },
  { name: "Citibank", code: "CITIUS33", country: "US" },
  { name: "U.S. Bank", code: "USBKUS44", country: "US" },
  { name: "PNC Bank", code: "PNCCUS33", country: "US" },
  { name: "Goldman Sachs Bank", code: "GSABUSS1", country: "US" },
  { name: "TD Bank", code: "NRTHUS33", country: "US" },
  { name: "Capital One Bank", code: "COINUS44", country: "US" },
  { name: "HSBC Bank USA", code: "MRMDUS33", country: "US" },
  
  // United Kingdom
  { name: "Barclays Bank", code: "BARCGB22", country: "GB" },
  { name: "HSBC UK Bank", code: "HBUKGB4B", country: "GB" },
  { name: "Lloyds Bank", code: "LOYDGB2L", country: "GB" },
  { name: "NatWest Bank", code: "NWBKGB2L", country: "GB" },
  { name: "Santander UK", code: "ABBYGB2L", country: "GB" },
  { name: "TSB Bank", code: "TSBSGB2A", country: "GB" },
  { name: "Metro Bank", code: "MYMNGB2L", country: "GB" },
  { name: "Nationwide Building Society", code: "NAIAGB21", country: "GB" },
  
  // Canada
  { name: "Royal Bank of Canada", code: "ROYCCAT2", country: "CA" },
  { name: "Toronto-Dominion Bank", code: "TDOMCATTTOR", country: "CA" },
  { name: "Bank of Nova Scotia", code: "NOSCCATT", country: "CA" },
  { name: "Bank of Montreal", code: "BOFMCAM2", country: "CA" },
  { name: "Canadian Imperial Bank of Commerce", code: "CIBCCATT", country: "CA" },
  { name: "National Bank of Canada", code: "BNDCCAMMINT", country: "CA" },
  
  // Australia
  { name: "Commonwealth Bank of Australia", code: "CTBAAU2S", country: "AU" },
  { name: "Australia and New Zealand Banking Group", code: "ANZBAU3M", country: "AU" },
  { name: "Westpac Banking Corporation", code: "WPACAU2S", country: "AU" },
  { name: "National Australia Bank", code: "NATAAU3303M", country: "AU" },
  
  // Germany
  { name: "Deutsche Bank", code: "DEUTDEFF", country: "DE" },
  { name: "Commerzbank", code: "COBADEFF", country: "DE" },
  { name: "DZ Bank", code: "GENODEFF", country: "DE" },
  { name: "UniCredit Bank", code: "HYVEDEMM", country: "DE" },
  
  // France
  { name: "BNP Paribas", code: "BNPAFRPP", country: "FR" },
  { name: "Crédit Agricole", code: "AGRIFRPP", country: "FR" },
  { name: "Société Générale", code: "SOGEFRPP", country: "FR" },
  { name: "Crédit Mutuel", code: "CMCIFR2A", country: "FR" },
  
  // Japan
  { name: "Mitsubishi UFJ Financial Group", code: "BOTKJPJT", country: "JP" },
  { name: "Sumitomo Mitsui Banking Corporation", code: "SMBCJPJT", country: "JP" },
  { name: "Mizuho Bank", code: "MHCBJPJT", country: "JP" },
  
  // Singapore
  { name: "DBS Bank", code: "DBSSSGSG", country: "SG" },
  { name: "Oversea-Chinese Banking Corporation", code: "OCBCSGSG", country: "SG" },
  { name: "United Overseas Bank", code: "UOVBSGSG", country: "SG" },
  
  // India
  { name: "State Bank of India", code: "SBININBB", country: "IN" },
  { name: "HDFC Bank", code: "HDFCINBB", country: "IN" },
  { name: "ICICI Bank", code: "ICICINBB", country: "IN" },
  { name: "Axis Bank", code: "AXISINBB", country: "IN" },
  
  // Indonesia
  { name: "Bank Mandiri", code: "BMRIIDJA", country: "ID" },
  { name: "Bank Central Asia", code: "CENAIDJA", country: "ID" },
  { name: "Bank Rakyat Indonesia", code: "BRINIDJA", country: "ID" },
  { name: "Bank Negara Indonesia", code: "BNINIDJA", country: "ID" },
  { name: "Bank CIMB Niaga", code: "BNIAIDJA", country: "ID" },
  { name: "Bank Danamon", code: "BDMNIDJA", country: "ID" },
  { name: "Bank Permata", code: "BBBAIDJA", country: "ID" },
  { name: "Bank BTPN", code: "BTPNIDJA", country: "ID" },
  { name: "Bank Maybank Indonesia", code: "MBBEIDJA", country: "ID" },
  { name: "Bank OCBC NISP", code: "NISPIDJA", country: "ID" },
  
  // Nigeria
  { name: "First Bank of Nigeria", code: "FBNINGLA", country: "NG" },
  { name: "Guaranty Trust Bank", code: "GTBINGLA", country: "NG" },
  { name: "United Bank for Africa", code: "UNAFNGLA", country: "NG" },
  { name: "Access Bank", code: "ABNGNGLA", country: "NG" },
  { name: "Zenith Bank", code: "ZEIBNGLA", country: "NG" },
  
  // South Africa
  { name: "Standard Bank of South Africa", code: "SBZAZAJJ", country: "ZA" },
  { name: "FirstRand Bank", code: "FIRNZAJJ", country: "ZA" },
  { name: "ABSA Bank", code: "ABSAZAJJ", country: "ZA" },
  { name: "Nedbank", code: "NEDSZAJJ", country: "ZA" },
  
  // Brazil
  { name: "Banco do Brasil", code: "BRASBRRJ", country: "BR" },
  { name: "Itaú Unibanco", code: "ITAUBRSP", country: "BR" },
  { name: "Bradesco", code: "BBDEBRSP", country: "BR" },
  { name: "Santander Brasil", code: "SANDBRRJ", country: "BR" },
];
