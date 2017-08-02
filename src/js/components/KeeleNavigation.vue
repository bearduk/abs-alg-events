<template lang="html">
    <nav
        v-bind:class="{ 'menu--active' : menuActive }"
    >
        <ul>
            <slot></slot>
        </ul>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            menuActive: false,
            primaryLinks: []
        }
    },

    created() {
        this.primaryLinks = this.$children;
        Event.$on('primary-link-clicked', title => {
            this.updateActive(title)
            this.menuActive = !this.menuActive
        });

        Event.$on('return-to-main-clicked', () => {
            this.menuActive = !this.menuActive
            this.closeAll();
        });
    },

    mounted() {
        window.addEventListener('resize', this.resizeWindow);
    },

    methods: {
        updateActive(title) {
            this.primaryLinks.forEach((primaryLink) => {
                if (primaryLink.title == title &! primaryLink.active) {
                    primaryLink.active = true;
                } else {
                    primaryLink.active = false;
                }
            });
        },

        closeAll() {
            this.primaryLinks.forEach((primaryLink) => {
                if (!primaryLink.active) {
                    primaryLink.active = false;
                }
            });
        },

        resizeWindow: _.debounce(function() {
            this.primaryLinks.forEach((primaryLink) => {
                if (primaryLink.active) {
                    let title = primaryLink.title;
                    // Switch open nav off
                    this.updateActive(title);
                    Event.$emit('resize', title);
                }
            });
            Event.$emit('browser-resize');
        }, 50),
    }
}
</script>
