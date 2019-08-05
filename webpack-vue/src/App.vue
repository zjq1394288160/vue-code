<template>
    <div>
        <div>image</div>
        <div class="img-wrapper">
            <img :src="img">
        </div>
    </div>
</template>

<script>
    import img from './assets/logo.png'
    export default {
        data() {
            return {
                img: img
            }
        }
    }
</script>

<style lang="scss">
.img-wrapper{
    width: 200px;
    height: 200px;
    img{
        width: 100%;
        height: 100%;
    }
}
</style>