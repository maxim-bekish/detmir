Общее:

SPA приложение на React/TypeScript
Использует React Router для маршрутизации
State менеджмент с помощью Redux Toolkit и RTK Query
Стилизация компонентов с использованием Sass
Страницы:

Products - отображает список товаров из магазина
CardProduct - отображает информацию о конкретном товаре
Basket - отображает корзину пользователя
Orders - отображает список заказов пользователя
Компоненты:

Header:

Логотип, меню навигации, badge с количеством товаров в корзине
Использует хук useAddBasket для получения данных о корзине
ProductItem:

Отображает карточку одного товара на странице Products
Кнопка "В корзину" добавляет товар через хук useAddBasket
CardProduct:

Получает данные текущего товара через RTK Query хук useGetCardQuery
Позволяет добавить товар в корзину через AddToBasket
AddToBasket:

Управляет количеством товара при добавлении в корзину
Обновляет корзину в Redux store и на сервере через postBasketUpdate
CheckoutButton:

Отображает кнопку оформления заказа из корзины
Делает запрос на оформление заказа postCheckoutBasket
OrderItem:

Отображает информацию об одном заказе на странице Orders
Хуки:

useAddBasket - предоставляет функции для работы с корзиной

useUpdateBasket - обновляет данные корзины на сервере и в Redux

useGetProductsQuery - получает список товаров с сервера

useGetCardQuery - получает данные конкретного товара

useGetOrdersQuery - получает список заказов пользователя

useUpdateBasket - возвращает функцию updateBasketItems.
настройка updateBasketItems: получает 2 аргумента array, config.
array: {
id: string; -- если array[0].id === "null" корзина очищается.
quantity: number;
}[],
config: {
addOrReplaceBasket: boolean; -- если флаг true заменяет полностью корзину на array, если false - добавляет элементы к корзине корзины
addOrReplaceItem: boolean; -- если true заменяет количество элемента на quantity, если false - увеличивает количество на quantity
}

Redux:

store состоит из slice для корзины, товаров, заказов и модальных окон

Компоненты получают данные через хуки и Redux selectors

Данные обновляются через Redux actions и RTK Query мутации
