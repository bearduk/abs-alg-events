<template lang="html">
    <a href="#"
        v-on:click.prevent="mobileMenuCall()"
    >
        =
    </a>
</template>

<script>
export default {
    data() {
        return {
            menuOpened: false
        }
    },

    methods: {
        mobileMenuCall() {
            Event.$emit('menu-called');
            this.menuOpened =! this.menuOpened
        }
    },
}
</script>
