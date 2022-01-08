import axios, { AxiosError, AxiosResponse } from "axios";
import { catchNetworkError } from "./utils";

const CURRENCY_APP_BASE_URL = "http://apilayer.net/api";
const ACCESS_KEY = "6ee8b2ea9f9e49279e323dc734dc833c";

export const getCountries = async(setLoading) => {
    const url = `${CURRENCY_APP_BASE_URL}/list?access_key=${ACCESS_KEY}`;
    try {
        console.log("LIST ALL COUNTRIES");
        console.log(url);
        const response = await axios.get(url);
        console.log("API RESPONSE DATA");
        console.log(response.status);
        console.log(response.data);
        if (response.status == 200) {
            let data = response.data;
            if (data["success"]) {
                return data["currencies"];
            }
        }
        setLoading(false);
        return {};
    } catch (error) {
        catchNetworkError(error);
        setLoading(false);
        return {};
    }
};

export const getExchangeRates = async(currencies, source, setLoading) => {
    const url = `${CURRENCY_APP_BASE_URL}/live?access_key=${ACCESS_KEY}&currencies=${currencies}&source=${source}`;
    try {
        console.log("Currencies Exchange");
        console.log(url);
        const response = await axios.get(url);
        console.log("API RESPONSE DATA");
        console.log(response.status);
        console.log(response.data);
        if (response.status == 200) {
            let data = response.data;
            if (data["success"]) {
                return data["quotes"];
            }
        }
        setLoading(false);
        return {};
    } catch (error) {
        catchNetworkError(error);
        setLoading(false);
        return {};
    }
};