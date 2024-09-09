import { writable } from "svelte/store";

export const user = writable(JSON.parse(sessionStorage.getItem("loggedUser")));

user.subscribe((value) => {
    sessionStorage.setItem("loggedUser", JSON.stringify(value));
});
