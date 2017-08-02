<template lang="html">
    <div class="search-bar" v-if="searchActive">
        <div class="inner">
            <form action="#" method="post" class="f">
                <label>Search Keele</label>
                <div class="search-input">
                    <input type="search" placeholder="Search" />
                    <input type="submit" class="btn search-submit" value="Search">
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchActive: false
        }
    },

    created() {
        Event.$on('search-called', title => {
            this.toggleSearch();
        });
    },

    methods: {
        toggleSearch() {
            this.searchActive =! this.searchActive
        }
    }
}
</script>
