declare module "esewajs" {
  export function EsewaPaymentGateway(
    amount: number,
    taxAmount: number,
    serviceCharge: number,
    deliveryCharge: number,
    productId: string | number,
    merchantId: string,
    secret: string,
    successUrl: string,
    failureUrl: string,
    paymentUrl: string,
    param1?: any,
    param2?: any
  ): Promise<any>;

  export function EsewaCheckStatus(
    amount: number,
    productId: string | number,
    merchantId: string,
    statusUrl: string
  ): Promise<any>;
}
