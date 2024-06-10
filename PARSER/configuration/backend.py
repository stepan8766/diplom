import aiomysql
import asyncio

from configuration.config import config_mysql,headers, cookies

import requests
import re

from geopy.distance import geodesic

MINUTE = 60
BASE_URL = "https://lenta.com/api"


def toFixed(numObj, digits=0):
	return f"{numObj:.{digits}f}"

def isInteger(value):
	try:
		int(value)
		return True
	except Exception: return False

def get_nearest_obj(user_coords, objects):
	id = -1
	last_distance = -1
	for i in objects:
		city_coords = (i['lat'], i['long'])
		if last_distance == -1 or last_distance > float(toFixed(geodesic((user_coords), city_coords).km, 1)):
			last_distance = float(toFixed(geodesic(user_coords, city_coords).km))
			id = i

	if (last_distance < 35.0):
		id['distance'] = last_distance
		return id
	else:
		return -1

def get_id_link(link: str):
	return re.findall(r"^.+lenta\.com\/product\/.+-([0-9]{1,8})/$", link)

class Parser:
	def __init__(self, domain: str = BASE_URL):
		self._cities = []
		self._url = domain

	def GetCities(self):

		response = requests.get(url=f"{self._url}/v1/cities/",
								cookies=cookies,
								headers=headers,
								)

		if (response.status_code != 200):
			return {}

		data = response.json()

		new_data = []
		for i in data:
			new_data.append({'id': i.get('id'), 'name': i.get('name'), 'lat': i.get('lat'), 'long': i.get('long')})
			self._cities.append(i.get('id'))

		return new_data

	def GetStores(self, city_id: str):
		response = requests.get(url=f"{self._url}/v1/cities/{city_id}/stores",
								cookies=cookies,
								headers=headers
								)
		
		if (response.status_code != 200):
			return {}

		data = response.json()

		new_data = []
		for i in data:
			new_data.append({'id': i.get('id'), 'name': i.get('name'), 'lat': i.get('lat'), 'long': i.get('long')})

		return new_data

	def GetAllStores(self):
		response = requests.get(url=f"{self._url}/v1/stores", cookies=cookies, headers=headers)
		data = response.json()
		new_data = []
		for i in data:
			new_data.append({'id': i.get('id'), 'name': f"{i.get('cityName')}, {i.get('name')}"})

		return new_data

	def GetProduct(self, store_id: str, product: int):
		response = requests.get(url=f"{self._url}/v2/stores/{store_id}/skus/{product}",
			cookies=cookies,
			headers=headers,
		)
		if(response.status_code != 200):
			return {'status': response.status_code}
		
		data = response.json()
		
		return {
			'status': 'ok', 'id': product, 'name': data.get("title"), 'webUrl': data.get('webUrl'), 'price': data.get('regularPrice'), 'd_price': data.get('discountPrice'), 'image': data.get('image')
		}
	

	def GetShopById(self, id: str):
		response = requests.get(url=f"{self._url}/v1/stores", cookies=cookies, headers=headers)
		data = response.json()

		for i in data:
			if i.get('id') == id:
				return i

		return None
	
	def GetDefaultProducts(self, store_id: str):

		link_products = [
			'https://lenta.com/product/maslo-slivochnoe-ekomilk-825-bez-zmzh-rossiya-380g-547488/',
			'https://lenta.com/product/moloko-prostokvashino-past-pitevoe-celnoe-otbornoe-3445-pet-rossiya-930ml-102065/',
			'https://lenta.com/product/yajjco-kurinoe-solnyshko-s1-rossiya-10sht-281779/',
			'https://lenta.com/product/hleb-inskojj-sibirskijj-narezka-rossiya-450g-229357/',
			'https://lenta.com/product/kartofel-ekonom-ves-1kg-300886/',
			'https://lenta.com/product/svekla-ekonom-ves-1kg-300884/',
			'https://lenta.com/product/saharnyjj-pesok-region-trejjd-bakaleya-rossiya-2kg-368435/',
			'https://lenta.com/product/sol-usolskaya-ekstra-rossiya-1000g-214838/',
			'https://lenta.com/product/priprava-pripravych-perec-chernyjj-molotyjj-rossiya-10g-453900/',
			'https://lenta.com/product/yabloki-gala-ves-1kg-305270/',
			'https://lenta.com/product/banany-ves-1kg-011230/',
			'https://lenta.com/product/501918-rossiya-501918/',
			'https://lenta.com/product/kofe-egoiste-sublimirovannyjj-noir-stb-germaniya-100g-439441/',
			'https://lenta.com/product/cyplenok-brojjler-altajjskijj-brojjler-file-podl-ohl-ves-rossiya-1kg-488602/',
			'https://lenta.com/product/svinina-lenta-fresh-sp-sheya-bez-kosti-kusok-ohlazhdennyjj-ves-rossiya-422842/'
		]

		products = []
		for i in link_products:
			products.append(get_id_link(i)[0])

		new_data = []
		for product in products:
			new_data.append(self.GetProduct(store_id, product))
		
		return new_data


class NewConnection:
		
	def __init__(self):
		self.__pool = None
	
	async def get_pool(self):
		try:
			loop = asyncio.get_event_loop()
			self.__pool = await aiomysql.create_pool(loop=loop, host=config_mysql['ip'], user=config_mysql['user'], password=config_mysql['password'], db=config_mysql['base'])		
		except Exception as e:
			print(e)
				
	async def select_one(self, query):
		try:
			async with self.__pool.acquire() as conn:
				async with conn.cursor() as cur:
					await cur.execute(query)
					return await cur.fetchone()
		except Exception as e:
			print(e)

	async def select_many(self, query):
		try:
			async with self.__pool.acquire() as conn:
				async with conn.cursor() as cur:
					await cur.execute(query)
					return await cur.fetchall()
		except Exception as e:
			print(e)

	async def insert(self, query):
		try:
			async with self.__pool.acquire() as conn:
				async with conn.cursor() as cur:
					await cur.execute(query)
					await conn.commit()
		except Exception as e:
			print(e)

	async def Close(self):
		self.__pool.close()
		await self.__pool.wait_closed()

class AsyncIterator:
	def __init__(self, seq):
		self.iter = iter(seq)

	def __aiter__(self):
		return self

	async def __anext__(self):
		try:
			return next(self.iter)
		except StopIteration:
			raise StopAsyncIteration

class User():
	def __init__(self, user_id: int, sql: NewConnection):
		self._userid = user_id
		self._city: str = None
		self._store: str = None
		self._con = sql
		self._defaultTime = 0
		self._timer = 0

	async def load_data(self):
		await self._con.get_pool()
		data = await self._con.select_one(f'SELECT * FROM users WHERE id = {self._userid}')

		if (data is None):
			await self._con.get_pool()
			await self._con.insert(f'INSERT INTO users (id) VALUES ({self._userid})')
		else:
			self._city = data[2]
			self._store = data[3]
			self._defaultTime = data[5]
			self._timer = data[6]

	async def setTime(self, new_defaultTime: int, new_timer: int = -1):
		self._defaultTime = new_defaultTime if new_defaultTime > 0 else self._defaultTime
		self._timer = new_timer if new_timer > 0 else self._timer
		if self._defaultTime - self._timer <= 0:
			self._timer = self._defaultTime
		await self._con.get_pool()
		await self._con.insert(f"UPDATE users SET default_time = '{self._defaultTime}', time = '{self._timer}' WHERE id = {self._userid}")
		return self._timer, self._defaultTime

	def getTime(self):
		return self._timer

	def getDefaultTime(self):
		return self._defaultTime

	async def SetCity(self, new_city):
		self._city = new_city
		await self._con.get_pool()
		await self._con.insert(f"UPDATE users SET city_id = '{new_city}' WHERE id = {self._userid}")
	
	def GetCity(self) -> str:
		return self._city
	
	async def SetStore(self, new_store: str):
		self._store = new_store
		await self._con.insert(f"UPDATE users SET store_id = '{new_store}' WHERE id = {self._userid}")

	def GetStore(self) -> str:
		return self._store
	
	async def AddProd(self, prod):
		await self._con.get_pool()
		data = await self._con.select_one(f'SELECT * FROM products_list WHERE userid = {self._userid} AND product = {prod['id']}')
		if (data is None):
			await self._con.get_pool()
			await self._con.insert(
				"INSERT INTO products_list (userid, product, name, webUrl, regularPrice, discountPrice) VALUES"
				f"('{self._userid}', '{prod['id']}', '{prod['name']}', '{prod['webUrl']}', '{prod['price']}', '{prod['d_price']}')"
			)

	async def GetProds(self):
		await self._con.get_pool()
		data = await self._con.select_many(f'SELECT * FROM products_list WHERE userid = {self._userid}')
		return data

	async def HaveProd(self, prod):
		await self._con.get_pool()
		data = await self._con.select_one(f'SELECT * FROM products_list WHERE userid = {self._userid} AND product = {prod}')
		if (data is None):
			return False
		else:
			return True
		
	async def CheckProds(self):
		await self._con.get_pool()
		data = await self._con.select_one(f'SELECT * FROM products_list WHERE userid = {self._userid}')
		if (data is None):
			return False
		else:
			return True
	
	async def ClearProds(self):
		await self._con.get_pool()
		await self._con.insert(f'DELETE FROM products_list WHERE userid = {self._userid}')

	async def DeleteProd(self, prod):
		await self._con.get_pool()
		await self._con.insert(f"DELETE FROM products_list WHERE userid = {self._userid} AND product = {prod}")