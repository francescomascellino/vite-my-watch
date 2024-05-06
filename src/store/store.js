import { defineStore } from "pinia";

const colorsList = ["red", "blue", "white", "green", "yellow"];

export const useWatchStore = defineStore("watch", {

    // INITIAL STATE
    state: () => ({
        count: 0,
        steps: ["face", "hands", "strap", "loop", "save", "buy"],
        color: "#563d7c",
        parts: [
            {
                name: "face",
                color: "",
            },
            {
                name: "hands",
                color: "",
            },
            {
                name: "strap",
                color: "",
            },
            {
                name: "loop",
                color: "",
            }
        ]
    }),
    getters: {
        getAvailableColors: () => colorsList,

    },
    actions: {
        setColor(newColor) {
            this.color = newColor;
        }
    },
});