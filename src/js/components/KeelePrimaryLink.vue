<template lang="html">
    <li>
        <a href="#"
            v-on:click.prevent="switchNav(title)"
            v-bind:class="{ 'link--active' : active }"
        >
            {{ title }}
        </a>
        <a href="#" class="mobile--more"
            v-if="isMobile"
            v-on:click.prevent="switchNav(title)"
        >
            >
        </a>
        <ul v-if="active">
            <li v-if="isMobile">
                <a href="#"
                    v-on:click.prevent="returnToMain"
                >
                    GO BACK
                </a>
            </li>
            <li v-if="isMobile">
                <a href="#">
                    {{ title }}
                </a>
            </li>
            <slot></slot>
            <li class="link--more" v-if="revealMore">
                <a href="#"
                    v-on:click.prevent="toggleRevealMore"
                >
                    <span v-if="revealedMore">More V</span>
                    <span v-else>Close ^</span>
                </a>
            </li>
        </ul>
    </li>
</template>

<script>
export default {
    data() {
        return {
            secondaryLinks: [],
            active: false,
            revealMore: false,
            revealedMore: false,
            fullHeight: 0,
            singleHeight: 0,
            isMobile: false,
        }
    },

    props: {
        title: { required: true },
        link: { default: '#' },
        isActive: { default: false }
    },

    created() {
        this.secondaryLinks = this.$children
        this.isMobile = this.isMobileSize()

        Event.$on('resize', title => {
            this.getMenuWidth(title)
        });

        Event.$on('browser-resize', () => {
            this.isMobile = this.isMobileSize()
        });
    },

    methods: {
        switchNav(title) {
            Event.$emit('primary-link-clicked', title);
            this.getMenuWidth(title);
        },

        calculateMenuWidth(container) {
            let innerMenuItems = container.querySelectorAll('ul li'),
                menuWidth = 0;

            innerMenuItems.forEach(function(innerMenuItem){
                menuWidth += innerMenuItem.offsetWidth;
            })

            return menuWidth;
        },

        calculateBarWidth(container) {
            let bar = container.querySelector('ul'),
                barWidth = bar.offsetWidth;

            return barWidth;
        },

        calculateSubnavHeight(container) {
            let fullHeight = container.querySelector('ul').offsetHeight;

            return fullHeight;
        },

        hideOverflow(container) {
            let singleHeight = container.querySelector('ul li').offsetHeight;

            return singleHeight
        },

        isRevealMoreNeeded(barWidth, menuWidth) {
            return menuWidth >= barWidth
        },

        manageSubnavHeight() {
            let vm = this
            this.$nextTick( function() {
                let subnav = vm.$el.querySelector('ul');
                if (this.revealedMore) {
                    subnav.style.height = this.singleHeight + 'px';
                } else {
                    subnav.style.height = this.fullHeight + 'px';
                }
            }.bind(vm));
        },

        getMenuWidth() {
            let vm = this

            if (!this.isMobileSize()) {
                this.$nextTick( function() {
                    let el = vm.$el;

                    if (this.active) {
                        let barWidth = this.calculateBarWidth(el),
                            menuWidth = this.calculateMenuWidth(el);

                        vm.revealMore = vm.isRevealMoreNeeded(barWidth, menuWidth);

                        // Toggle the revealMore so that overflow is hidden on open
                        if (vm.revealMore) {
                            vm.revealedMore = true;
                            vm.manageSubnavHeight();
                        }
                    }

                    if (vm.active && vm.revealMore) {
                        vm.fullHeight = vm.calculateSubnavHeight(el)
                        vm.singleHeight = vm.hideOverflow(el);
                    }

                }.bind(vm));
            }
        },

        isMobileSize: _.debounce(function() {
            if (window.matchMedia("(max-width: 768px)").matches) {
                return true
            } else {
                return false
            }
        }, 50),

        toggleRevealMore() {
            this.revealedMore = !this.revealedMore;
            this.manageSubnavHeight();
        },

        returnToMain() {
            Event.$emit('return-to-main-clicked');
            _.delay(() => {
                this.active = false;
            }, 1000);
        }
    },
}
</script>
