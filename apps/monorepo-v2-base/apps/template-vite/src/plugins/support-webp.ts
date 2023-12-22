/**
 * @author 🌈MARS <wangdaoo@yeah.net>
 * @desc 📝 支持 webp，添加 webp 类名。在 css 中使用，实现图片替换
 * @copyright 🤝In me the tiger sniffs the rose.
 */

// 建议：图片大小超过 50kb 时，使用 webp 格式
function check_webp_feature(feature: any, callback: any) {
  const kTestImages: any = {
    lossy: 'UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA',
    lossless: 'UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==',
    alpha:
      'UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==',
    animation:
      'UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA',
  };
  const img = new Image();
  img.onload = function () {
    const result = img.width > 0 && img.height > 0;
    callback(feature, result);
  };
  img.onerror = function () {
    callback(feature, false);
  };
  img.src = 'data:image/webp;base64,' + kTestImages[feature];
}

check_webp_feature('lossy', function (type: any, support: any) {
  if (support) {
    document.getElementsByTagName('html')[0].classList.add('webp');
  } else {
    document.getElementsByTagName('html')[0].classList.add('no-webp');
  }
});
