new Vue({
    el: '#app',
    data: {},
    methods: {
        showlog: function () {
            console.log('refresh:', sessionStorage.getItem('refresh'));
            console.log('access:', sessionStorage.getItem('access'));
        },
        getuser: function () {
            let that = this;
            console.log('getuser被调用');
            axios
                .get('/users/', {headers: {Authorization: 'Bearer ' + sessionStorage.getItem('access')}})
                .then(response => console.log(response.data))
                .catch(function (error) {
                    console.log(error);
                    that.refresh_token();
                })
        },
        refresh_token: function () {
            let that = this;
            console.log('refresh_token被调用');
            axios
                .post('/api/token/refresh/', {'refresh': sessionStorage.getItem('refresh')})
                .then(function (response) {
                    sessionStorage.setItem('access', response.data.access);
                    that.getuser()
                })
                .catch(function (error) {
                    console.log(error);
                    window.location.href = '/login/'
                });
        },
    }
});