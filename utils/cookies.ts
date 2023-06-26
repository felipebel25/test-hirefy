import Cookies from "js-cookie"

type FormData = {
    firstName: string;
    lastName : string;
    address  : string;
    address2?: string;
    zip      : string;
    city     : string;
    country  : string;
    phone    : string;
}


export const getAddressFromCookies = (): FormData => {
    return {
        firstName: Cookies.get('firstName') || "",
        lastName: Cookies.get('lastName') || "",
        phone: Cookies.get('phone') || "",
        country: Cookies.get('country') || "COL",
        city: Cookies.get('city') || "",
        address: Cookies.get('address') || "",
        address2: Cookies.get('address2') || "",
        zip: Cookies.get('zip') || "",
    }
}
