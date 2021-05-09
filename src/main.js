const $siteList = $(".siteList");
const $lastLi = $siteList.find(".last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const hashMap = xObject || [
  {
    logo: "T",
    url: "https://www.taobao.com/",
  },
  {
    logo: "J",
    url: "https://www.jd.com/",
  },
];
const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, ""); //删掉/后面的所有东西
};
const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    const $li = $(`<li>   
              <div class="site">
                <div class="logo">${node.logo}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">
                <svg class="icon">
                       <use xlink:href="#icon-close"></use>
                </svg>
                </div>
                </div>
    </li>`).insertBefore($lastLi);
    $li.on("click", () => {
      //代替a标签
      window.open(node.url);
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation(); //阻止冒泡
      hashMap.splice(index, 1);
      render(); //重新渲染一下
    });
  });
};
render();

$(".addButton").on("click", () => {
  let url = window.prompt("请问你要添加的网址是？");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    url: url,
  });
  render();
});

//页面关闭之前保存数据
window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("x", string);
};

$(document).on("keypress", (e) => {
  const { key } = e;
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});

$("input").on("keypress", (e) => {
  e.stopPropagation();
});
