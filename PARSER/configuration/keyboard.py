from aiogram.utils.keyboard import InlineKeyboardBuilder, ReplyKeyboardBuilder
from aiogram import Router
from typing import Optional
from aiogram.filters.callback_data import CallbackData

from aiogram.types.reply_keyboard_remove import ReplyKeyboardRemove

def Start_ShowKeyboard():
	builder = ReplyKeyboardBuilder()
	builder.button(text="Определить магазин", request_location=True), 
	builder.button(text="Указать вручную")
	builder.adjust(1)
	return builder.as_markup()

class ShopsCallback(CallbackData, prefix="shop_"):
	action: str
	value: Optional[str] = None
	
def Shops_ShowKeyboard(shops):
	builder = InlineKeyboardBuilder()
	count = 0
	for shop in shops:
		builder.button(
			text=shop['name'], callback_data=ShopsCallback(action="select", value=shop['id'])
		)
		count += 1
		if (count == 64):
			break
	
	builder.adjust(1)
	return builder.as_markup()

def Shops_SelectKeyboard(shop_id: str):
	builder = InlineKeyboardBuilder()
	builder.button(text="Подтвердить", callback_data=ShopsCallback(action="accept", value=shop_id))
	builder.button(text="Отмена", callback_data=ShopsCallback(action="decline", value="-1"))
	return builder.as_markup()

class ProductsCallback(CallbackData, prefix="prod_"):
	action: str
	value: Optional[str] = None

def Product_ChooseVar():
	builder = InlineKeyboardBuilder()
	builder.button(text="Добавить готовую", callback_data=ProductsCallback(action="default", value=""))
	builder.button(text="Заполнить самостоятельно", callback_data=ProductsCallback(action="decline", value=""))
	return builder.as_markup()

def Product_Select(prod_id):
	builder = InlineKeyboardBuilder()
	builder.button(text='Добавить', callback_data=ProductsCallback(action="add", value = prod_id))
	builder.button(text='Отмена', callback_data=ProductsCallback(action="no_add", value = "0"))
	return builder.as_markup()

class InformationCallback(CallbackData, prefix="info_"):
	action: str

def Information_Clear():
	builder = InlineKeyboardBuilder()
	builder.button(text='Очистить корзину', callback_data=InformationCallback(action="clear"))
	builder.button(text='Изменить магазин', callback_data=InformationCallback(action="change"))
	builder.button(text='Изменить корзину', callback_data=InformationCallback(action="edit"))
	builder.adjust(3)
	return builder.as_markup()

def Product_Remove(prod_id):
	builder = InlineKeyboardBuilder()
	builder.button(text='Удалить', callback_data=ProductsCallback(action="remove", value = str(prod_id)))
	return builder.as_markup()