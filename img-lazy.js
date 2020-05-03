(function (global) {
	global.lazyImg = lazyImg
	let imgAll = null
	function lazyImg(loadImg) {
		init(loadImg)
	}
	function init(loadImg) {
		let imgs = document.querySelectorAll("img[data-src]")
		imgAll = Array.from(imgs)
		imgs.forEach(function (item) {
			item.src = loadImg
		})
		loadAllImg(imgAll)
		bindEvent()
	}
	function loadAllImg(imgs) {
		for (let i = 0; i < imgs.length; i++) {
			if (loadOneImg(imgs[i])) {
				imgs.splice(i, 1)
				i--
			}
		}
	}
	function loadOneImg(img) {
		let rect = img.getBoundingClientRect()
		if (rect.bottom <= 0) {
			return false
		} else if (rect.top >= window.innerHeight) {
			return false
		}
		img.src = img.dataset.src
		if (img.dataset.origin) {
			img.onload = function () {
				img.src = img.dataset.origin
				img.onload = null
			}
		}
		return true
	}
	function bindEvent() {
		let timer = null
		window.onscroll = function () {
			clearTimeout(timer)
			timer = setTimeout(function () {
				loadAllImg(imgAll)
			}, 300)
		}
	}
})(this || globalThis)
