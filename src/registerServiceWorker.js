// В продакшене мы регистрируем сервис-воркера для обслуживания ресурсов из локального кеша.
// Это позволяет приложению загружаться быстрее
// при последующих посещениях в рабочей среде и дает ему возможность работать в автономном режиме.
// Однако это также означает, что разработчики (и пользователи)
// будут видеть развернутые обновления только при посещении страницы «N+1»

const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    // [::1] — адрес локального хоста IPv6.
    window.location.hostname === "[::1]" ||
    // 127.0.0.1/8 считается локальным хостом для IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export default function register() {
  if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
    // Конструктор URL доступен во всех браузерах, поддерживающих SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location);
    if (publicUrl.origin !== window.location.origin) {
      // Наш сервис-воркер не будет работать,
      // если PUBLIC_URL находится в другом источнике.
      // с чего обслуживается наша страница.
      return;
    }

    window.addEventListener("load", () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // Это работает на локальном хосте.
        // Проверка, существует ли сервис-воркер или нет.
        checkValidServiceWorker(swUrl);

        // Добавьте дополнительное ведение журнала на локальный хост,
        // указывая разработчикам на документация сервис-воркера.
        navigator.serviceWorker.ready.then(() => {
          console.log(
            "Это веб-приложение обслуживается кэшем — сначала сервисным работником. Чтобы узнать больше, посетите ..."
          );
        });
      } else {
        // Не является локальным хостом. Просто регистрируем сервис-воркера
        registerValidSW(swUrl);
      }
    });
  }
}

function registerValidSW(swUrl) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        installingWorker.onstatechange = () => {
          if (installingWorker.state === "installed") {
            if (navigator.serviceWorker.controller) {
              // К этому моменту старый контент будет удален и свежий контент будет добавлен в кеш.
              // Показываю "Доступен новый контент; Пожалуйста, обновите страницу!"
              console.log("Доступен новый контент; Пожалуйста, обновите страницу!");
            } else {
              // На данный момент все предварительно кэшировано.
              // Показываю «Контент кэшируется для использования в автономном режиме».
              console.log("Контент кэшируется для использования в автономном режиме.");
            }
          }
        };
      };
    })
    .catch(error => {
      console.error("Ошибка при регистрации:", error);
    });
}

function checkValidServiceWorker(swUrl) {
  // Проверка, можно ли найти сервис-воркера. Если нет перезагрузить страницу.
  fetch(swUrl)
    .then(response => {
      // Проверка, что сервис-воркер существует и что мы действительно получаем JS-файл.
      if (
        response.status === 404 ||
        response.headers.get("content-type").indexOf("javascript") === -1
      ) {
        // Сервис-воркер не найден. Наверное другое приложение. Перезагрузите страницу.
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Обнаружен сервис-воркер. Действуем как обычно.
        registerValidSW(swUrl);
      }
    })
    .catch(() => {
      console.log(
        "Интернет-соединение не найдено. Приложение работает в автономном режиме."
      );
    });
}

export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}
