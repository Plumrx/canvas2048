
// 初始化画布
let canvas = document.getElementById('game2048');
let context = canvas.getContext('2d');

canvas.height = 360;
canvas.width = 360;

// 全局变量 卡片数据
let data = [];
let score;
let n = 4;

function restart () {
  // 初始化数据列表
  for (let i = 0; i < n; i++) {
    data[i] = [];
    for (let j = 0; j < n; j++) {
      data[i][j] = 0;
    }
  }
  // data = [
  //   [0, 2, 2, 2],
  //   [2, 0, 0, 2],
  //   [0, 2, 2, 2],
  //   [2, 0, 2, 2]
  // ];

  let dataResult = [
    [4, 4, 4, 4],
    [0, 0, 2, 4],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];

  score = 0;

  // 添加两张卡片
  addCard();
  addCard();
  refresh();
}

// 添加卡片
function addCard () {
  // 获取空卡片数组
  let emptyCards = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (data[i][j] === 0) {
        emptyCards.push([i, j]);
      }
    }
  }
  // 随机挑选一个空卡片 获取该卡片数组索引
  let index = Math.floor(Math.random() * emptyCards.length);
  // 填充该卡片 产生一个 2 或 4 的卡片 其中 4 出现的概率为 0.1
  let value = Math.random() < 0.9 ? 2 : 4;
  if (emptyCards.length > 0) {
    data[emptyCards[index][0]][emptyCards[index][1]] = value;
  }

  // 刷新
  refresh();

  if (emptyCards.length === 1 && isGameover()) {
    setTimeout(function () {
      window.alert('游戏结束');
    }, 0);
  }
}

// 游戏结束检测
function isGameover () {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - 1; j++) {
      if (data[i][j] == data[i][j + 1]) { return false; }
    }
  }
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < n - 1; i++) {
      if (data[i][j] == data[i + 1][j]) { return false; }
    }
  }
  return true;
}

// 移动卡片
function move (direction) {
  switch (direction) {
    case 8:
      // 向上滑动
      for (let j = 0; j < n; j++) {
        for (let s = 0; s < n - 1; s++) {
          for (let i = 0; i < n - 1; i++) {
            if (data[i][j] == 0) {
              if (data[i + 1][j] != 0) {
                [data[i][j], data[i + 1][j]] = [data[i + 1][j], data[i][j]];
              }
            }
          }
        }
        for (let i = 0; i < n - 1; i++) {
          if (data[i][j] == data[i + 1][j]) {
            data[i][j] = 2 * data[i + 1][j];
            data[i + 1][j] = 0;
          }
        }
        for (let s = 0; s < n - 1; s++) {
          for (let i = 0; i < n - 1; i++) {
            if (data[i][j] == 0) {
              if (data[i + 1][j] != 0) {
                [data[i][j], data[i + 1][j]] = [data[i + 1][j], data[i][j]];
              }
            }
          }
        }
      }
      break;
    case 2:
      // 向下滑动
      for (let j = 0; j < n; j++) {
        for (let s = 0; s < n - 1; s++) {
          for (let i = n - 1; i > 0; i--) {
            if (data[i][j] == 0) {
              if (data[i - 1][j] != 0) {
                [data[i][j], data[i - 1][j]] = [data[i - 1][j], data[i][j]];
              }
            }
          }
        }
        for (let i = n - 1; i > 0; i--) {
          if (data[i][j] == data[i - 1][j]) {
            data[i][j] *= 2;
            data[i - 1][j] = 0;
          }
        }
        for (let s = 0; s < n - 1; s++) {
          for (let i = 3; i > 0; i--) {
            if (data[i][j] == 0) {
              if (data[i - 1][j] != 0) {
                [data[i][j], data[i - 1][j]] = [data[i - 1][j], data[i][j]];
              }
            }
          }
        }
      }
      break;
    case 4:
      // 向左滑动
      for (let i = 0; i < n; i++) {
        for (let s = 0; s < n - 1; s++) {
          for (let j = 0; j < n - 1; j++) {
            if (data[i][j] == 0) {
              if (data[i][j + 1] != 0) {
                [data[i][j], data[i][j + 1]] = [data[i][j + 1], data[i][j]];
              }
            }
          }
        }
        for (let j = 0; j < n - 1; j++) {
          if (data[i][j] == data[i][j + 1]) {
            data[i][j] = 2 * data[i][j + 1];
            data[i][j + 1] = 0;
          }
        }
        for (let s = 0; s < n - 1; s++) {
          for (let j = 0; j < n - 1; j++) {
            if (data[i][j] == 0) {
              if (data[i][j + 1] != 0) {
                [data[i][j], data[i][j + 1]] = [data[i][j + 1], data[i][j]];
              }
            }
          }
        }
      }
      break;
    case 6:
      // 向右滑动(...)
      for (let i = 0; i < n; i++) {
        for (let s = 0; s < n - 1; s++) {
          for (let j = n - 1; j > 0; j--) {
            if (data[i][j] == 0) {
              if (data[i][j - 1] != 0) {
                [data[i][j], data[i][j - 1]] = [data[i][j - 1], data[i][j]];
              }
            }
          }
        }
        for (let j = n - 1; j > 0; j--) {
          if (data[i][j] == data[i][j - 1]) {
            data[i][j] *= 2;
            data[i][j - 1] = 0;
          }
        }
        for (let s = 0; s < n - 1; s++) {
          for (let j = n - 1; j > 0; j--) {
            if (data[i][j] == 0) {
              if (data[i][j - 1] != 0) {
                [data[i][j], data[i][j - 1]] = [data[i][j - 1], data[i][j]];
              }
            }
          }
        }
      }
      break;
  }

  addCard();
  refresh();

  document.getElementById('hide').style.display = 'none';
}

// 刷新界面
function refresh () {
  // 绘制卡片
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      switch (data[i][j]) {
        case 0:
          context.fillStyle = '#E6F1FC';
          break;
        case 2:
          context.fillStyle = '#CFE4F9';
          break;
        case 4:
          context.fillStyle = '#B8D9F6';
          break;
        case 8:
          context.fillStyle = '#A1CAF3';
          break;
        case 16:
          context.fillStyle = '#8ABDF0';
          break;
        case 32:
          context.fillStyle = '#73B0ED';
          break;
        case 64:
          context.fillStyle = '#5CA3EA';
          break;
        case 128:
          context.fillStyle = '#4596E7';
          break;
        case 256:
          context.fillStyle = '#2E89E4';
          break;
        case 512:
          context.fillStyle = '#1C7CDC';
          break;
        case 1024:
          context.fillStyle = '#196FC5';
          break;
        case 2048:
          context.fillStyle = '#1662AE';
          break;
        case 4096:
          context.fillStyle = '#135597';
          break;
        case 8192:
          context.fillStyle = '#104880';
          break;
        case 16384:
          context.fillStyle = '#0D3B69';
          break;
        default:
          context.fillStyle = '#0A2E52';
          break;
      }
      context.fillRect(85 * j + 15, 85 * i + 15, 75, 75);
    }
  }

  context.font = '20px Georgia';
  context.fillStyle = '#FFF';
  context.textAlign = 'center';
  context.textBaseline = 'middle';

  // 绘制卡片数字
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      // 若卡片数字为0, 则不绘制
      if (data[i][j] == 0) continue;
      context.fillText(data[i][j], 15 + 37.5 + 85 * j, 15 + 37.5 + 85 * i, 70);
    }
  }

  // 刷新分数
  document.getElementById('score').innerHTML = score;
}

function load () {
  document.addEventListener('touchstart', touch, false);
  document.addEventListener('touchend', touch, false);

  // 触摸开始位置, 推移量
  let startX, startY, offsetX, offsetY;

  function touch (event) {
    event = event || window.event;

    switch (event.type) {
      case 'touchstart':
        startX = event.touches[0].clientX;
        startY = event.touches[0].clientY;
        break;
      case 'touchend':
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
    }
  }
}

window.addEventListener('load', load, false);

// 避免长按菜单
document.querySelector('body').addEventListener('touchmove', function (e) {
  e.preventDefault();
});

// 键盘监听
document.onkeydown = function (event) {
  // eslint-disable-next-line
  let e = event || window.event || arguments.callee.caller.arguments[0]
  if (e && (e.keyCode == 38 || e.keyCode == 87)) { // 上 / W
    move(8);
  }
  if (e && (e.keyCode == 40 || e.keyCode == 83)) { // 下 / S
    move(2);
  }
  if (e && (e.keyCode == 37 || e.keyCode == 65)) { // 左 / A
    move(4);
  }
  if (e && (e.keyCode == 39 || e.keyCode == 68)) { // 右 / D
    move(6);
  }
};

restart();
