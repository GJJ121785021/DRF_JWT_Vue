## DRF_JWT_Vue

使用 [djangorestframework_simplejwt](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/) 库得到jwt_token 并实现登录

- 登录后能获取两个参数，利用access就能通过认证
- 登录并记录token的逻辑在 login.js 中
- 使用token实现登录状态的Ajax请求的逻辑在 ajax_getUser.js 中(实现了access过期自动刷新的功能)
- /index/ 页面点击（查看）能在日志打印token信息，点击（访问users）能在日志打印ajax请求的信息

---
python代码实现登录
```
def login_for_jwt():
    """jwt登录"""
    session = requests.Session()
    r = requests.post("http://localhost:8000/api/token/", data={"username": "admin", "password": "admin"})
    auth = r.json().get('access')
    print(auth)
    r = requests.get("http://127.0.0.1:8000/users/", headers={'Authorization': 'Bearer ' + auth})
    print(r.text)
```



### 注：
 JWT的委托认证： --->>  verify
 
 在某些微服务架构中，身份验证由单个服务处理。其他服务委托确认用户已登录到此身份验证服务的责任。
 
 这通常意味着服务会将将从用户收到的JWT传递给身份验证服务，并在将受保护的资源返回给用户之前等待JWT有效的确认。
  
  此软件包使用验证端点支持此设置。添加以下网址格式：
  
  将令牌传递到验证端点将返回200响应，如果令牌有效，则返回令牌。否则，它将返回一个400 Bad Request（错误请求）以及一个错误，指出令牌无效的原因。
 
 $ curl -X POST -H "Content-Type: application/json" -d '{"token":"<EXISTING_TOKEN>"}' http://localhost:8000/api-token-verify/
 
 这个EXISTING_TOKEN可以使access也可以是refresh的值， 在它们两个各自的有效期内，都能成功（返回状态码200，{}），如果过期的返回401 {"detail":"Token is invalid or expired","code":"token_not_valid"}


---
python代码实现委托认证

```
# 有很多无用代码在里面，懒得删了，对照着上面看
if __name__ == '__main__':
    session = requests.Session()
    r = requests.post("http://localhost:8000/api/token/", data={"username": "admin", "password": "admin"})
    auth = r.json().get('access')
    print(auth)
    # r = requests.get("http://127.0.0.1:8000/UserInfo/", headers={'Authorization': 'Bearer ' + auth})
    time.sleep(70)
    r = requests.post("http://127.0.0.1:8000/api/token/verify/", data={'token': auth})
    print(r.status_code)
    print(r.text)
```

