$(function() {
    // 获取用户信息
    getUserInfo();
    // 退出
    $('#btnLogout').on('click', function() {
        layer.confirm('是否确认退出登录?', { icon: 3, title: '提示' }, function(index) {
            localStorage.removeItem('token');
            location.href = '/login.html';
            layer.close(index);
        });
    })
})

function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message);
            }
            // 获取用户名和头像
            renderAvatar(res.data);
        }
    })
}
// 获取用户名和头像
function renderAvatar(user) {
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        var frist = name[0].toUpperCase();
        $('.text-avatar').html(frist).show();
    }
}