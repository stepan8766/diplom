from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton

inline_keyboard = InlineKeyboardMarkup(
    inline_keyboard=[
        [
            InlineKeyboardButton(text="Кнопка 1"),
            InlineKeyboardButton(text="Кнопка 2")
        ]
    ]
)