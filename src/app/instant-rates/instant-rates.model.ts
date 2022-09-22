
export class InstantRates{
  id: number;
  purchaseInvoiceNo: string;
  invoiceDate: string;
  companyName: string;
  manualInvoiceNo: string;
  quotation: string;
  currency:string;
  dueDate: string;
  customer: string;
  exchangeRate: number;
  type: any;
  origin : any;
  destination: any;
  narration:any;
  totalFirstRow:any;
  totalSecondRow :any;
  grandTotal:any;

  constructor(instantRates) {
    {
      this.id = instantRates.id || this.getRandomID();
      this.origin = instantRates.origin || "";
      this.destination = instantRates.destination || "";
      // this.companyName = instantRates.companyName || "";
      // this.manualInvoiceNo = instantRates.manualInvoiceNo || "";
      // this.quotation = instantRates.quotation || "";
      // this.currency = instantRates.currency || "";
      // this.dueDate = instantRates.dueDate || "";
      // this.customer = instantRates.customer || "";
      // this.exchangeRate = instantRates.exchangeRate || "";
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }


}