// Dark Mode 点击
function switchDarkMode() {
  if ($('body').hasClass('dark')) {
    $('#dark').html('<i class="iconfont icon-sun"></i>');
    $('#mdark').html('<i class="iconfont icon-sun"></i>');
    $('body').removeClass("dark");
    localStorage.setItem('noDark', '1');
    localStorage.setItem('dark', '0');
  } else {
    $('#dark').html('<i class="iconfont icon-moon"></i>'); 
    $('#mdark').html('<i class="iconfont icon-moon"></i>'); 
    $('body').addClass('dark');
    localStorage.setItem('dark', '1');
    localStorage.setItem('noDark', '0');
  }
}