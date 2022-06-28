

<template>
<v-btn icon @click="toggleDarkMode">
    <v-icon>mdi-theme-light-dark</v-icon>
</v-btn>
</template>

<script>
export default {
    name: "NavigationBar",
    methods: {
    toggleDarkMode: function() {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
        console.log(this.$vuetify.theme.dark);
        localStorage.setItem("darkTheme", this.$vuetify.theme.dark.toString());
    }
},
mounted() {
    const theme = localStorage.getItem("darkTheme");
    if (theme) {
        if (theme === "true") {
            this.$vuetify.theme.dark = true;
        } else {
            this.$vuetify.theme.dark = false;
        }
    } else if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
        this.$vuetify.theme.dark = true;
        localStorage.setItem(
            "darkTheme",
            this.$vuetify.theme.dark.toString()
        );
        
    }
}
}
</script>