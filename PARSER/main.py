import asyncio
import logging
from aiogram import Bot, Dispatcher, types, F
from aiogram.enums import ParseMode
from aiogram.filters import CommandStart, Command
from aiogram.utils.markdown import hbold
from aiogram.fsm.state import default_state, State, StatesGroup
from aiogram.fsm.storage.memory import MemoryStorage
from aiogram.fsm.context import FSMContext
from aiogram.types.reply_keyboard_remove import ReplyKeyboardRemove
from aiogram.methods import SendMessage

from configuration.backend import Parser, User, NewConnection, get_id_link, get_nearest_obj
from configuration.config import token
from configuration.states import CurrentState
from configuration.keyboard import Start_ShowKeyboard, ShopsCallback, Shops_ShowKeyboard, Shops_SelectKeyboard, ProductsCallback, Product_ChooseVar, Product_Select, Product_Remove, InformationCallback, Information_Clear

not_selected_city = 'Вы не указали магазин :('

storate = MemoryStorage()

dp = Dispatcher()

"""
Start
"""
@dp.message(CommandStart())
async def command_start_handler(message: types.Message, state: FSMContext) -> None:
	user = User(message.from_user.id, connection_main)
	await user.load_data()

	if (user.GetCity() is None):
		await message.answer("Привет! Я - бот, который поможет тебе следить за изменением цен на продукты!\n"
					"Для старта, нам необходимо определить город и магазин, цены из которого мы будем анализировать\n"
					"\nЕсли тебе лень - ты можешь нажать волшебную кнопку 'Определить магазин'", reply_markup=Start_ShowKeyboard())
		await state.set_state(CurrentState.first_start)
		return
	
	if (user.GetStore() is None):
		await message.answer("Привет! Я - бот, который поможет тебе следить за изменением цен на продукты!\n"
					"Для старта, нам необходимо определить город и магазин, цены из которого мы будем анализировать\n"
					"\nЕсли тебе лень - ты можешь нажать волшебную кнопку 'Определить магазин'", reply_markup=Start_ShowKeyboard())
		await state.set_state(CurrentState.first_start)
		return


	if await user.CheckProds() == False:
		await message.answer(text="На данный момент у Вас пустой список мониторинга. Давайте приступим к его наполнению\n"
							"Вы можете добавить готовую корзину, либо самостоятельно заполнить ее /add",
						reply_markup=Product_ChooseVar())
		return	

	await message.answer("Привет! Ты уже заполнял(а) данные, проверить можно с помощью команды: /info")

"""
Called then user choose after start
"""
@dp.message(CurrentState.first_start)
async def UserStart(message: types.Message, state: FSMContext):

	if message.location is None:

		await message.answer("Хорошо, напишите Ваш город:", reply_markup=ReplyKeyboardRemove())
		await state.set_state(CurrentState.write_country)
		return 
	
	city_find = get_nearest_obj(user_coords=(message.location.latitude, message.location.longitude), objects=cities)
	if (city_find == -1):

		await message.reply('Что-то пошло не так, вероятно поблизости нет Ленты. Напиши название города, где есть Лента', parse_mode='html')
		await state.set_state(CurrentState.write_country)
		return
	
	shops = parser.GetStores(city_find['id'])

	nearest_store = get_nearest_obj(user_coords=(message.location.latitude, message.location.longitude), objects=shops)
	if (nearest_store == -1):

		await message.reply(f"Не могу определить ближайший магазин! Напиши название города, где есть Лента:", reply_markup=ReplyKeyboardRemove())
		await state.set_state(CurrentState.write_country)
		return 
	
	await message.reply( 
		text = f"Ближайший к Вам магазин <b>Лента</b> находится на <b>{nearest_store['name']}</b> в <b>{nearest_store['distance']} км</b> от Вас, хотите отслеживать товары данного магазина?",
		reply_markup=Shops_SelectKeyboard(nearest_store['id']), 
		parse_mode="html"
	)


"""
Called the user write him city
"""
@dp.message(CurrentState.write_country)
async def UserWriteCountry(message: types.Message, state: FSMContext):
	if (len(message.text) < 3):
		await message.reply("Для поиска необходимо ввести <b>мнимум три символа</b>", parse_mode='html')
		return
	find_stores = []
	for i in all_stores:
		if message.text.lower() in i['name'].lower():
			find_stores.append(i)

	if len(find_stores) > 0:
		await message.reply(f"Результаты поиска по запросу <b>{message.text}</b>", reply_markup=Shops_ShowKeyboard(find_stores), parse_mode='html')

	else:
		await message.reply(f'Результаты по запросу <b>{message.text}</b> отсутствуют. Попробуйте указать другой город', parse_mode='html')
		return

@dp.callback_query(ShopsCallback.filter())
async def Shops_OnFinishSelect(
		callback: types.CallbackQuery, 
		callback_data: ShopsCallback,
		state: FSMContext
):
	user = User(callback.from_user.id, connection_main)
	await user.load_data()

	try:
		await callback.message.delete_reply_markup(callback.inline_message_id)
	except Exception as e:
		print(e)

	await state.set_state(default_state)
		
	match callback_data.action:

		case "select":
			data = parser.GetShopById(callback_data.value)
			
			await callback.message.edit_text(f"Вы выбрали магазин, расположенный по адресу: {data['cityName']}, {data['address']}", reply_markup=Shops_SelectKeyboard(data['id']))

		case "decline":
			
			await callback.message.answer("Вы отказались от предложенного варианта. Хорошо, напишите Ваш город:")
			await state.set_state(CurrentState.write_country)

		case "accept":
			await user.SetStore(callback_data.value)

			data = parser.GetShopById(callback_data.value)
			await user.SetCity(data['cityKey'])

			defaultTime = user.getDefaultTime()

			msg = f"Вы подтвердили выбор магазина. Текущая периодичность мониторинга цен Вашей корзины: <b>{defaultTime // 60} ч. {defaultTime % 60} мин.</b>"
			await callback.message.answer(msg)
			
			if await user.CheckProds() == False:
				await callback.message.answer(text="Теперь, когда основная настройка завершена, приступим к наполнению списка продуктов для мониторинга\n\n"
									"Вы можете добавить готовую корзину, либо самостоятельно заполнить ее",
								reply_markup=Product_ChooseVar())

		case _:
			await callback.message.answer(f"Произошла неизвестная ошибка. Попробуйте снова")

"""
Set user time to check
"""
@dp.message(Command("settime"))
async def UserSetTime(message: types.Message):
	
	converted = message.text.split()
	if(len(converted) < 2):
		return await message.reply("Поддерживаются только цифры\nИспользуйте /settime [время в минутах]")

	if (converted[1].isnumeric() == False):
		return await message.reply("Поддерживаются только цифры\nИспользуйте /settime [время в минутах]")

	time = int(converted[1])

	if (time < 30 or time > 600):
		return await message.reply("Слишком часто, используйте от 30 до 600 минут")

	user = User(message.from_user.id, connection_main)
	await user.load_data()
	await message.answer(f"Вы установили время проверки Вашей корзины: {time} мин")
	await user.setTime(time)

	if await user.CheckProds() == False:
		await message.answer(text="Теперь, когда основная настройка завершена, приступим к наполнению нашей корзины\n"
							"Вы можете добавить готовую корзину, либо самостоятельно заполнить ее",
						reply_markup=Product_ChooseVar())
"""
Products callback
"""
@dp.callback_query(ProductsCallback.filter())
async def Products_OnFinishSelect(
		callback: types.CallbackQuery, 
		callback_data: ProductsCallback,
		state: FSMContext
):
	user = User(callback.from_user.id, connection_main)
	await user.load_data()

	try:
		await callback.message.delete_reply_markup(callback.inline_message_id)
	except Exception as e:
		print(e)

	match callback_data.action:

		case "default":

			await callback.message.answer("Вы заполнили свою корзину стандартным набором")
			
			data = parser.GetDefaultProducts(user.GetStore())

			for i in data:
				await user.AddProd(i)

		case "decline":
			await callback.message.answer("Вы выбрали самостоятельно заполнение корзины\nИспользуйте команду /add для добавления товара")
			await state.set_state(default_state)

		case "add":

			product = parser.GetProduct(user.GetStore(), callback_data.value)
			if (product['status'] == "ok"):
				await callback.message.answer(f"Вы успешно добавили <b>{product['name']}</b> в корзину для отслеживания", parse_mode='html')
				await user.AddProd(product)
			else:
				await callback.message.answer("При добавлении товара произошла ошибка")
		
		case "no_add":
			await callback.message.answer("Вы отказались от добавления товара")

		case "remove":
			await user.DeleteProd(callback_data.value)
			product = parser.GetProduct(user.GetStore(), callback_data.value)
			if (product['status'] == 'ok'):
				await callback.message.answer(f"Вы удалили из корзины <b>{product['name']}</b>", parse_mode='html')
			else:
				await callback.message.answer("Вы успешно удалили товар из корзины")


		case _:
			await callback.message.answer("Произошла неизвестная ошибка. Попробуйте снова")

"""
/add to products
"""
@dp.message(Command("add"))
async def UserAddProduct(message: types.Message):
	user = User(message.from_user.id, connection_main)
	await user.load_data()

	if user.GetStore() is None:
		return await message.reply(not_selected_city)

	link_finder = get_id_link(message.text)
	if(len(link_finder) == 0):
		return await message.reply('Некорректно передана ссылка на товар\nИспользуйте /add [ссылка]')

	product = parser.GetProduct(user.GetStore(), link_finder[0])
	if (product['status'] != 'ok'):
		await message.reply("Мы не смогли получить данные по данному товару")

	if await user.HaveProd(product['id']) == True:
		await message.reply("В Вашей корзине уже есть такой продукт")


	await message.answer_photo(photo=product['image']['fullSize'].split('?')[0])
	await message.reply(f"Вы действительно желаете добавить <b>{product['name']}</b> в список отслеживания?", parse_mode='html', reply_markup=Product_Select(product['id']))

@dp.message(Command("info"))
async def UserShowInfo(message: types.Message):

	user = User(message.from_user.id, connection_main)
	await user.load_data()
	
	store = parser.GetShopById(user.GetStore())
	defaultTime = user.getDefaultTime()
	time = user.getTime()

	prods_info = ""

	for index, prod in enumerate(await user.GetProds()):
		prods_info += f'{index + 1}. <a href="{prod[4]}">{prod[3]}</a>\n'

	if len(prods_info) < 1:
		prods_info = "Отсутствуют"

	await message.reply(f'🏪 <b>ОТСЛЕЖИВАЕМЫЙ МАГАЗИН:</b>\n\n{store["cityName"]}, {store["name"]}\n\n🍍 <b>ОТСЛЕЖИВАЕМЫЕ ТОВАРЫ:</b>\n\n{prods_info}\n\n'
						f'⏱️ <b>ОПОВЕЩЕНИЯ</b>\n\nКаждые <b>{defaultTime // 60} ч. {defaultTime % 60} мин.</b> (следующее через <b>{time // 60} ч. {time % 60} мин.</b>)',
						parse_mode='html',
						reply_markup=Information_Clear())


@dp.callback_query(InformationCallback.filter())
async def Information_OnFinishSelect(
		callback: types.CallbackQuery, 
		callback_data: InformationCallback,
		state: FSMContext
):
	user = User(callback.from_user.id, connection_main)
	await user.load_data()

	try:
		await callback.message.delete_reply_markup(callback.inline_message_id)
	except Exception as e:
		print(e)

	match callback_data.action:

		case "clear":

			await callback.message.answer("Вы очистили свой список отслеживания\nДля добавления товаров используйте /add")
			await user.ClearProds()

		case "change":
			await callback.message.answer("Выберите варианта поиска магазина", reply_markup=Start_ShowKeyboard())
			await state.set_state(CurrentState.first_start)

		case "edit":
			prods = await user.GetProds()
			for n, i in enumerate(prods):
				await callback.message.answer(
								f'{n + 1}. <a href="{i[4]}">{i[3]}</a>\n'
								f'Стоимость - {i[5]} ({i[6]}) руб', parse_mode='html', reply_markup=Product_Remove(i[2]))

		case _:
			await callback.message.answer("Произошла неизвестная ошибка. Попробуйте снова")



async def NewSletter(time_sleep, bot: Bot):
	while True:
		await update_users(bot)
		await asyncio.sleep(time_sleep)

async def notify_users(bot: Bot, id):
	user = User(id, connection_main)

	await user.load_data()

	data = await user.GetProds()

	if data is None:
		return

	counter = {'1': 1, '2': 1, '3': 1, '4': 1}
	product_stand = ''
	product_upper = ''
	product_lower = ''
	product_lost = ''

	for i in data:

		product = parser.GetProduct(user.GetStore(), i[2])
		if (product['status'] != 'ok'):
			continue

		if (product['price'] < 1.0):
			product_lost = product_lost + f'{counter['1']}. {product['name']}\n'
			counter['1'] = counter['1'] + 1
			continue
			
		if (product['price'] != i[5]):

			changed_proc = ((i[5] / product['price']) * 100) - 100
			changed_real = (i[5] - product['price'])

			if (product['price'] < i[5]):
				product_lower = product_lower + f'{counter['2']}. {product['name']}\nНовая цена {product['price']} (-<b>{changed_proc:.1f}%, -{changed_real:.2f}💰)</b>\n'
				counter['2'] = counter['2'] + 1
			else:
				product_upper = product_upper + f'{counter['3']}. {product['name']}\nНовая цена {product['price']} (+<b>{abs(changed_proc):.1f}%, +{abs(changed_real):.2f}💰)</b>\n'
				counter['3'] = counter['3'] + 1
		
		else:
			product_stand = product_stand + f'{counter['4']}. {product['name']}\n'
			counter['4'] = counter['4'] + 1

		await connection_main.get_pool()
		await connection_main.insert(f'UPDATE products_list SET regularPrice = {i[5]}, discountPrice = {i[6]} WHERE id = {i[0]}')


	msg = 'Уведомление о изменении цен!\n'

	if (len(product_stand) > 0):
		msg = msg + '\n' + '<b>📌Без изменений:</b>\n' + product_stand

	if (len(product_upper) > 0):
		msg = msg + '\n' + '<b>📈Цена выросла:</b>\n' + product_upper

	if (len(product_lower) > 0):
		msg = msg + '\n' + '<b>📉Цена упала:</b>\n' + product_lower

	if (len(product_lost) > 0):
		msg = msg + '\n' + '<b>✂️Исчез(ли) из продажи:</b>\n' + product_lost

	await bot.send_message(chat_id=id, text=msg, parse_mode='html')

async def update_users(bot: Bot):
	await connection_main.get_pool()
	await connection_main.insert('UPDATE users SET time = time - 1')
	await connection_main.get_pool()
	data = await connection_main.select_many('SELECT id FROM users WHERE time < 1')
	for i in data:
		await notify_users(bot, i[0])

	await connection_main.get_pool()
	await connection_main.insert('UPDATE users SET time = default_time WHERE time < 1')
"""
Main
"""
async def main():
	logging.basicConfig(level=logging.INFO)

	global parser
	parser = Parser()
	global connection_main
	connection_main = NewConnection()
	global cities
	cities = parser.GetCities()
	global all_stores
	all_stores = parser.GetAllStores()

	bot = Bot(token, parse_mode=ParseMode.HTML)

	loop = asyncio.get_event_loop()
	loop.create_task(NewSletter(60, bot=bot))


	await dp.start_polling(bot)
	
	print("\033[93mBOT RUNNING")

if __name__ == '__main__':
	asyncio.run(main())
