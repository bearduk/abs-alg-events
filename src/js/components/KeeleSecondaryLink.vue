<template lang="html">
    <li>
        <a href="#">{{ title }}</a>
    </li>
</template>

<script>
export default {
    props: {
        title: { required: true },
        link: { default: '#' }
    },
}
</script>
