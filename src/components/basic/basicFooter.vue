<template>
    <div class="footer">
        <img class="login_footer" src="../../assets/image/logo-white.png"/>
        <div class="login_footer_p"><i class="iconfont">&#xea0a;</i></div>
    </div>
</template>

<script>
    export default {
        name: "basicFooter"

    };
</script>

<style scoped>
    .footer {
        height: 100px;
        background-color: rgb(0, 74, 113);
    }

    .login_footer {
        max-width: 200px;
        max-height: 50px;
        margin: 1em 0 0 0;
    }

    .login_footer_p {
        color: #FFF;
        font-size: 14px;
        margin: 5px 0 0 0;
    }
</style>
