$(function() {
    var form = layui.form;
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称字符在 1~6 位之间！'
            }
        }
    });
    initUserInfo();
    // 初始化用户信息
    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                form.val('formUserInfo', res.data);
            }
        })
    }
    // 重置
    $('#btnReset').on('click', function(e) {
        e.preventDefault();
        initUserInfo();
    });
    // 提交
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('修改用户信息成功！');
                window.parent.getUserInfo();
            }
        })
    })
})