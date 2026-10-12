import { Transaction } from "@/shared/interface";
import axiosService from "@/shared/lib/axios/config";



export class PaymentService {


    static getTransactions () {
        return axiosService.get<Transaction[]>("/payment/transactions").then(res => res.data)
    }

    static createInvoice (amount: number) {
        return axiosService.post<{invoice_link: string}>(`payment/stars/create`, {amount: amount}).then(res => res.data)
    }
}