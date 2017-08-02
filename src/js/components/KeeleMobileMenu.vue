<template lang="html">
    <div class="nav-wrap"
        v-if="isOpen"
    >
        <slot></slot>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isOpen: false
        }
    },

    mounted() {
        window.addEventListener('resize', this.isMobileSize);
    },

    created() {
        this.isMobileSize();
        Event.$on('menu-called', () => {
            this.isOpen = !this.isOpen
        });
    },

    methods: {
        isMobileSize: _.debounce(function() {
            if (window.matchMedia("(max-width: 480px)").matches) {
                console.log('isMobile')
                this.isOpen = true //false
            } else {
                this.isOpen = true
            }
        }, 50),
    }
}
</script>
