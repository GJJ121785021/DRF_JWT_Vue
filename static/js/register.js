

// 未采用

var vm = new Vue({

    methods: {
        on_submit: function () {
            axios.post('')
                .then(response => {
                    // 记录用户的登录状态
                    sessionStorage.clear();
                    localStorage.clear();
                    localStorage.token = response.data.token;
                    localStorage.username = response.data.username;
                    localStorage.user_id = response.data.id;
                    location.href = '/index.html';
                })
                .catch(function (e) {
                    console.log(e)
                })
        }
    }
});