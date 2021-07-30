<template>
    <div>
     Edit staff
     {{staff.firstname}}

    </div>
</template>

<script>
    export default {
        data() {
            return {
                staff: {}
            }
        },
        mounted(){
            this.staff = this.$route.params.staff;
        }
        
    }
</script>

<style lang="scss" scoped>

</style>