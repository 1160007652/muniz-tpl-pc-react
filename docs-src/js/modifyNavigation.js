window.onload = function(){
  const menuList = document.querySelectorAll(".menu .link")[0];

  menuList.forEach((item) => {
    if (item === 'API Documentation') {
      item.innerText="Wallet Modules"
    }
    if (item === 'Tutorials') {
      item.innerText="Coding Tips"
    }
    if (item === 'Tips') {
      item.innerText="Dev Tips"
    }
  });
}
