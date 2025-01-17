// Package Imports
import axios, { AxiosRequestConfig } from "axios";

// Other Imports
//import { Api } from "../api";
import { RequestMethod } from "../constants/enums/RequestMethod";
import { ISession } from "../base/contracts/ISession";
import { ElavonEnvironment } from "../base/config/ElavonEnvironment";

/**
 * Class {@link Session} representing a session.
 * 
 * A session is a request to the Elavon API to create a session token.
 * The session token is a unique identifier that is generated and used to manage user sessions 
 * and maintain stateful communication between client and server.
 * 
 * The session token response is only valid for 15 minutes and can only be used once.
 * 
 * @implements {ISession}
 */
export class Session implements ISession {


    /**
     * Creates a session token which is a unique identifier that is generated and used to manage user sessions 
     * and maintain stateful communication between client and server.
     * 
     * API Reference - https://developer.elavon.com/products/hosted-payment-page/v1/api-reference#tag/Request-Session-Token/operation/session-token
     * 
     * @param data {any} The session data.
     * @returns A promise resolving to a session object or an error object.
     */
    async create(data: any) {
        try {
            const computedUrl = new URL(`hosted-payments/transaction_token`, ElavonEnvironment.getBaseUrl());
            const config: AxiosRequestConfig<any> = {
                url: computedUrl.href,
                method: RequestMethod.POST,
                params: { ...data, ssl_account_id: ElavonEnvironment.getMerchantId(), ssl_user_id: ElavonEnvironment.getMerchantUserId(), ssl_pin: ElavonEnvironment.getMerchantPIN(), ssl_vendor_id: ElavonEnvironment.getVendorId(), },
                headers: { "Content-Type": "application/json", },
            };
            const { data: sessionTokenResult } = await axios(config)
            return sessionTokenResult;
        } catch (error) {
            console.log(error)
            return { hasError: true, error: error };
        }
    }
}