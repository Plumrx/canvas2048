
// 初始化画布
var canvas = document.getElementById("game2048");
var context = canvas.getContext('2d');

canvas.height = 360;
canvas.width = 360;

// 绘制卡片
for (var i = 0; i < 4; i++) {
	for (var j = 0; j < 4; j++) {
		context.rect(85*j + 15, 85*i + 15, 75, 75);
	}
}

// 全局变量 卡片数据
var data = new Array;

function restart() {
	// 初始化数据列表
	for (var i = 0; i < 4; i++) {
		data[i] = new Array;
		for (var j = 0; j < 4; j++) {
			data[i][j] = 0;
		}
	}

	// 添加两张卡片
	addCard();
	addCard();
	refresh();

}

// 添加卡片
function addCard() {
	// 获取空卡片数组
	var emptyCards = new Array;
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (data[i][j] == 0) {
				emptyCards.push([i,j]);
			}
		}
	}
	// 随机挑选一个空卡片 获取该卡片数组索引
	var index = Math.floor(Math.random() * emptyCards.length);
	// 填充该卡片
	data[emptyCards[index][0]][emptyCards[index][1]] = 2;

	if (emptyCards.length == 1 && isGameover()) {
		alert('游戏结束');
		return;
	}

	// 刷新
	refresh();
}

// 游戏结束检测
function isGameover() {
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			if (data[i][j] == data[i][j + 1])
				return false;
		}
	}
	for (var j = 0; j < 3; j++) {
		for (var i = 0; i < 3; i++){
			if (data[i][j] == data[i + 1][j])
				return false;
		}
	}
	return true;
}

// 移动卡片
function move(direction) {
	var movedCards = 0;
	switch (direction) {
		case 8:
			// 向上滑动
			for (var j = 0; j < 4; j++) {
				var colCards = 0; // 该列已有卡片数量
				for (var i = 0; i < 4; i++) {
					// 如果该位置为空 跳过本次遍历
					if (data[i][j] == 0) continue;
					// 如果该卡片上方没有其他卡片 则移至顶部
					if (colCards == 0) {
						data[colCards][j] = data[i][j];
						if (i != 0) {
							data[i][j] = 0;
							movedCards++;
						}
						colCards++;
						continue;
					}
					// 如果该卡片数字与上方卡片数字一致 则合并
					if (data[colCards - 1][j] == data[i][j]) {
						data[colCards - 1][j] *= 2;
						data[i][j] = 0;
						colCards++;
						movedCards++;
						continue;
					}
					// 如果当前位置位于该列顶部 则判定为不可再移动 跳过本次遍历
					if (i - colCards == 0) {
						colCards++;
						continue;
					} else {
						// 将当前位置卡片置于该列顶部
						data[colCards][j] = data[i][j];
						data[i][j] = 0;
						colCards++;
						movedCards++;
					}
				}
			}
			break;
		case 2:
			// 向下滑动
			for (var j = 0; j < 4; j++) {
				var colCards = 0; // 该列已有卡片数量
				for (var i = 3; i >= 0; i--) {
					// 如果该位置为空 跳过本次遍历
					if (data[i][j] == 0) continue;
					// 如果该卡片下方没有其他卡片 则移至底部
					if (colCards == 0) {
						data[3 - colCards][j] = data[i][j];
						if (i != 3) {
							data[i][j] = 0;
							movedCards++;
						}
						colCards++;
						continue;
					}
					// 如果该卡片数字与上方卡片数字一致 则合并
					if (data[4 - colCards][j] == data[i][j]) {
						data[4 - colCards][j] *= 2;
						data[i][j] = 0;
						colCards++;
						movedCards++;
						continue;
					}
					// 如果当前位置位于该列顶部 则判定为不可再移动 跳过本次遍历
					if (i + colCards - 3 == 0) {
						colCards++;
						continue;
					} else {
						// 将当前位置卡片置于该列顶部
						data[3 - colCards][j] = data[i][j];
						data[i][j] = 0;
						colCards++;
						movedCards++;
					}
				}
			}
			break;
		case 4:
			// 向左滑动
			for (var i = 0; i < 4; i++) {
				var colCards = 0; // 该列已有卡片数量
				for (var j = 0; j < 4; j++) {
					// 如果该位置为空 跳过本次遍历
					if (data[i][j] == 0) continue;
					// 如果该卡片上方没有其他卡片 则移至顶部
					if (colCards == 0) {
						data[i][colCards] = data[i][j];
						if (j != 0) {
							data[i][j] = 0;
							movedCards++;
						}
						colCards++;
						continue;
					}
					// 如果该卡片数字与上方卡片数字一致 则合并
					if (data[i][colCards - 1] == data[i][j]) {
						data[i][colCards - 1] *= 2;
						data[i][j] = 0;
						colCards++;
						movedCards++;
						continue;
					}
					// 如果当前位置位于该列顶部 则判定为不可再移动 跳过本次遍历
					if (j - colCards == 0) {
						colCards++;
						continue;
					} else {
						// 将当前位置卡片置于该列顶部
						data[i][colCards] = data[i][j];
						data[i][j] = 0;
						colCards++;
						movedCards++;
					}
				}
			}
			break;
		case 6:
			// 向右滑动
			for (var i = 0; i < 4; i++) {
				var rowCards = 0; // 该行已有卡片数量
				for (var j = 3; j >= 0; j--) {
					// 如果该位置为空 跳过本次遍历
					if (data[i][j] == 0) continue;
					// 如果该卡片下方没有其他卡片 则移至底部
					if (rowCards == 0) {
						data[i][3 - rowCards] = data[i][j];
						if (j != 3) {
							data[i][j] = 0;
							movedCards++;
						}
						rowCards++;
						continue;
					}
					// 如果该卡片数字与上方卡片数字一致 则合并
					if (data[i][4 - rowCards] == data[i][j]) {
						data[i][4 - rowCards] *= 2;
						data[i][j] = 0;
						rowCards++;
						movedCards++;
						continue;
					}
					// 如果当前位置位于该列顶部 则判定为不可再移动 跳过本次遍历
					if (j + rowCards - 3 == 0) {
						rowCards++;
						continue;
					} else {
						// 将当前位置卡片置于该列顶部
						data[i][3 - rowCards] = data[i][j];
						data[i][j] = 0;
						rowCards++;
						movedCards++;
					}
				}
			}
			break;
		default:
			break;
	}
	// 本次移动有效则添加两张卡片
	if (movedCards != 0) {
		addCard();
		refresh();
	}
}

// 刷新界面
function refresh() {

	context.fillStyle = "#B8D9F6";
	context.fill();

	context.font = "20px Georgia";
	context.fillStyle = "#FFF";
	context.textAlign = "center";
	context.textBaseline = "middle";

	// 绘制卡片数字
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			// 若卡片数字为0, 则不绘制
			if (data[i][j] == 0) continue;
			context.fillText(data[i][j], 15+37.5 + 85*j, 15+37.5 + 85*i, 70);
		}
	}
}

function load() {
	document.addEventListener('touchstart', touch, false);
	document.addEventListener('touchend', touch, false);

	// 触摸开始位置, 推移量
	var startX, startY, offsetX, offsetY;

	function touch(event) {
		var event = event || window.event;

		switch (event.type) {
			case "touchstart":
				startX = event.touches[0].clientX;
				startY = event.touches[0].clientY;
				break;
			case "touchend":
				offsetX = event.changedTouches[0].clientX - startX;
				offsetY = event.changedTouches[0].clientY - startY;
				// 误触容错 只有滑动距离超过50px才触发
				if (Math.abs(offsetX) < 50 && Math.abs(offsetY) < 50) {
					break;
				}
				if (Math.abs(offsetX) > Math.abs(offsetY)) {
					if (offsetX > 0) {
						move(6);
					} else {
						move(4);
					}
				} else {
					if (offsetY > 0) {
						move(2);
					} else {
						move(8);
					}

				}
			default:
				// statements_def
				break;
		}
	}

}

window.addEventListener('load', load, false);

restart();