import bridge from '@vkontakte/vk-bridge';

let count = 0; // начальное значение кликера

// функция, которая будет обновлять значение кликера на странице
function updateCount() {
  document.getElementById('count').textContent = count;
}

// функция, которая будет вызываться при клике на кнопку
function handleClick() {
  count += 1;
  updateCount();
  bridge.send('VKWebAppStorageSet', {'key': 'clickCount', 'value': count});
}

// загрузка сохраненного значения кликера
bridge.send('VKWebAppStorageGet', {'keys': 'clickCount'}).then((result) => {
  if (result.keys.includes('clickCount')) {
    count = Number(result.values[0]);
  }
  updateCount();
});

// добавление обработчика клика на кнопку
document.getElementById('clickButton').addEventListener('click', handleClick);

