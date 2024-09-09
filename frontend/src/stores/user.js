import { writable } from "svelte/store";

export const user = writable(JSON.parse(sessionStorage.getItem("loggedUser")));

user.subscribe((value) => {
    if (value) {
        sessionStorage.setItem("loggedUser", JSON.stringify(value));
    } else {
        sessionStorage.removeItem("loggedUser");
    }
});
