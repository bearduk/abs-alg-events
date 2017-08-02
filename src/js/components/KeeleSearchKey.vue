<template lang="html">
    <a href="#"
        v-bind:class="{ 'tools-mobile': hiddenOnMobile }"
        v-on:click.prevent="searchCall()"
    >
        {{ keyText }}
    </a>
</template>

<script>
export default {
    data() {
        return {
            searchOpened: false,
            hiddenOnMobile: false
        }
    },

    props: {
        searchOpenText: { default: 'Search' },
        searchCloseText: { default: 'Close' },
        hideOnMobile: { default: false }
    },

    created() {
        this.isHiddenOnMobile()
    },

    methods: {
        searchCall() {
            Event.$emit('search-called');
            this.searchOpened =! this.searchOpened
        },

        isHiddenOnMobile() {
            this.hiddenOnMobile = this.hideOnMobile
        }
    },

    computed: {
        keyText() {
            if (this.searchOpened) {
                return this.searchCloseText
            } else {
                return this.searchOpenText
            }
        }
    }
}
</script>
