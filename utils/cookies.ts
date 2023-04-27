import { shippingAddress } from "context/cart/CartProvider"
import Cookies from "js-cookie"

export const getAddressFromCookies = (): shippingAddress => {
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
